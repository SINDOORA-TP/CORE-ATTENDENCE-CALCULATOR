/**
 * Attendance Calculation Services
 * 
 * All attendance math is isolated here, separate from UI.
 * Internal calculations use precise values; rounding is only for display.
 */

import {
  TIMETABLES,
  ACADEMIC_CALENDAR,
  SEMESTER_DATES,
  DEFAULT_RULES,
  type TimetableEntry,
  type AttendanceRules,
} from '@/data/timetables';

// ── Types ──────────────────────────────────────────────────────────

export interface SubjectAttendanceInput {
  subject: string;
  attended: number;
  conducted: number;
}

export type AttendanceStatus = 'safe' | 'warning' | 'danger' | 'irreversible';

export interface SubjectResult {
  subject: string;
  attended: number;
  conducted: number;
  currentPercentage: number;
  remainingClasses: number;
  requiredForMinimum: number;
  requiredForTarget: number;
  maximumPossiblePercentage: number;
  canReachMinimum: boolean;
  canReachTarget: boolean;
  status: AttendanceStatus;
  alreadyAboveMinimum: boolean;
  alreadyAboveTarget: boolean;
}

export interface OverallResult {
  totalAttended: number;
  totalConducted: number;
  overallPercentage: number;
  totalRemainingClasses: number;
  totalRequiredForMinimum: number;
  totalRequiredForTarget: number;
  overallStatus: AttendanceStatus;
  maximumPossibleOverall: number;
}

export interface CalculationResult {
  section: string;
  planningDate: string;
  subjects: SubjectResult[];
  overall: OverallResult;
  rules: AttendanceRules;
}

export interface ProjectionPoint {
  classesAttended: number;
  percentage: number;
}

// ── Timetable Calculator ───────────────────────────────────────────

/**
 * Get the day name (lowercase) from a Date object.
 */
function getDayName(date: Date): string {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return days[date.getDay()];
}

/**
 * Check if a date string (YYYY-MM-DD) is a non-working day.
 * Returns true for holidays, exams, and events (non-class days).
 */
function isNonWorkingDay(dateStr: string): boolean {
  return SEMESTER_DATES.holidays.includes(dateStr);
}

/**
 * Check if a date is a special working day (e.g., a Saturday declared working).
 */
function isSpecialWorkingDay(dateStr: string): boolean {
  return false;
}

/**
 * Format a Date to YYYY-MM-DD string.
 */
function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Count remaining classes for a subject between two dates (exclusive of start, inclusive of end)
 * based on the section's timetable, holidays, and special working days.
 */
export function countRemainingClasses(
  timetable: TimetableEntry,
  subjectSlot: string,
  fromDate: Date,
  toDate: Date
): number {
  let count = 0;
  const current = new Date(fromDate);
  current.setDate(current.getDate() + 1); // start from next day

  const semEnd = new Date(SEMESTER_DATES.endDate);

  // Don't count beyond semester end
  const effectiveEnd = toDate < semEnd ? toDate : semEnd;

  while (current <= effectiveEnd) {
    const dateStr = formatDate(current);
    const dayName = getDayName(current);
    const isWeekend = dayName === 'sunday' || dayName === 'saturday';

    let isWorkingDay = false;

    if (isSpecialWorkingDay(dateStr)) {
      // Special working day - treat as working regardless of weekend
      isWorkingDay = true;
    } else if (isNonWorkingDay(dateStr)) {
      // Holiday/exam/event
      isWorkingDay = false;
    } else if (!isWeekend) {
      // Regular weekday
      isWorkingDay = true;
    }

    if (isWorkingDay) {
      // Find the day schedule for this dayName
      // capitalize first letter to match DaySchedule format (e.g. 'Monday')
      const capitalizedDay = dayName.charAt(0).toUpperCase() + dayName.slice(1);
      
      const daySchedule = timetable.schedule.find(s => s.day === capitalizedDay)?.periods || [];
      const mondaySchedule = timetable.schedule.find(s => s.day === 'Monday')?.periods || [];
      
      // For special working Saturdays, use Monday's schedule as a convention
      const schedule = (dayName === 'saturday' && isSpecialWorkingDay(dateStr))
        ? mondaySchedule
        : daySchedule;

      // Count how many times this subject slot appears in the day's schedule
      const subjectCount = schedule.filter(s => s !== null && s.startsWith(subjectSlot)).length;
      count += subjectCount;
    }

    current.setDate(current.getDate() + 1);
  }

  return count;
}

/**
 * Count all remaining classes (sum of all subjects) for a section.
 */
export function countAllRemainingClasses(
  timetable: TimetableEntry,
  fromDate: Date,
  toDate: Date
): Record<string, number> {
  const result: Record<string, number> = {};
  for (const subject of timetable.subjects) {
    if (subject.slot && subject.slot !== '-') {
      result[subject.name] = countRemainingClasses(timetable, subject.slot, fromDate, toDate);
    } else {
      result[subject.name] = 0;
    }
  }
  return result;
}

// ── Attendance Calculator ──────────────────────────────────────────

/**
 * Calculate current attendance percentage.
 */
export function calculatePercentage(attended: number, conducted: number): number {
  if (conducted === 0) return 100; // no classes conducted yet
  return (attended / conducted) * 100;
}

/**
 * Calculate the minimum number of future classes to attend to reach a target percentage.
 * Assumes all future classes are conducted (student can only attend classes that are scheduled).
 * 
 * Formula: (attended + x) / (conducted + remaining) >= target/100
 * Solve:   x >= target/100 * (conducted + remaining) - attended
 * 
 * But x cannot exceed remaining (can't attend more classes than exist).
 * Returns -1 if mathematically impossible.
 */
export function requiredClassesForTarget(
  attended: number,
  conducted: number,
  remaining: number,
  targetPercent: number
): number {
  if (conducted === 0 && remaining === 0) return 0;

  const currentPct = calculatePercentage(attended, conducted);
  if (currentPct >= targetPercent && conducted > 0) return 0;

  const targetFraction = targetPercent / 100;
  const totalFutureConducted = conducted + remaining;
  const needed = Math.ceil(targetFraction * totalFutureConducted - attended);

  if (needed <= 0) return 0;
  if (needed > remaining) return -1; // impossible

  return needed;
}

/**
 * Calculate the maximum possible attendance if student attends ALL remaining classes.
 */
export function maxPossibleAttendance(
  attended: number,
  conducted: number,
  remaining: number
): number {
  const totalAttended = attended + remaining;
  const totalConducted = conducted + remaining;
  if (totalConducted === 0) return 100;
  return (totalAttended / totalConducted) * 100;
}

/**
 * Determine the attendance status for a subject.
 */
export function determineStatus(
  currentPct: number,
  maxPossiblePct: number,
  rules: AttendanceRules
): AttendanceStatus {
  if (maxPossiblePct < rules.minimumPercentage) {
    return 'irreversible';
  }
  if (currentPct < rules.minimumPercentage) {
    return 'danger';
  }
  if (currentPct < rules.warningPercentage) {
    return 'warning';
  }
  return 'safe';
}

// ── Projection Calculator ──────────────────────────────────────────

/**
 * Generate attendance projection data points.
 * Shows what attendance would be after attending the next N classes.
 */
export function generateProjection(
  attended: number,
  conducted: number,
  remaining: number,
  steps?: number[]
): ProjectionPoint[] {
  if (!steps) {
    // Generate reasonable steps based on remaining classes
    const maxStep = Math.min(remaining, 50);
    steps = [];
    if (maxStep > 0) {
      const interval = Math.max(1, Math.floor(maxStep / 6));
      for (let i = interval; i <= maxStep; i += interval) {
        steps.push(i);
      }
      if (steps[steps.length - 1] !== maxStep) {
        steps.push(maxStep);
      }
    }
  }

  return steps.map(n => ({
    classesAttended: n,
    percentage: calculatePercentage(attended + n, conducted + n),
  }));
}

// ── Main Calculation Engine ────────────────────────────────────────

/**
 * Perform the complete attendance calculation for a section.
 */
export function calculateAttendance(
  sectionName: string,
  subjectInputs: SubjectAttendanceInput[],
  planningDate: Date,
  rules: AttendanceRules = DEFAULT_RULES
): CalculationResult | { error: string } {
  // Find timetable for this section
  const timetable = TIMETABLES[sectionName];
  if (!timetable) {
    return { error: 'Timetable data is unavailable for this section. Please contact the administrator.' };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Calculate remaining classes for each subject
  const remainingMap = countAllRemainingClasses(timetable, today, planningDate);

  // Calculate results for each subject
  const subjectResults: SubjectResult[] = subjectInputs.map(input => {
    const remaining = remainingMap[input.subject] || 0;
    const currentPct = calculatePercentage(input.attended, input.conducted);
    const maxPossible = maxPossibleAttendance(input.attended, input.conducted, remaining);
    const reqMin = requiredClassesForTarget(input.attended, input.conducted, remaining, rules.minimumPercentage);
    const reqTarget = requiredClassesForTarget(input.attended, input.conducted, remaining, rules.targetPercentage);
    const status = determineStatus(currentPct, maxPossible, rules);

    return {
      subject: input.subject,
      attended: input.attended,
      conducted: input.conducted,
      currentPercentage: currentPct,
      remainingClasses: remaining,
      requiredForMinimum: reqMin === -1 ? remaining + 1 : reqMin, // signal impossibility
      requiredForTarget: reqTarget === -1 ? remaining + 1 : reqTarget,
      maximumPossiblePercentage: maxPossible,
      canReachMinimum: reqMin !== -1,
      canReachTarget: reqTarget !== -1,
      status,
      alreadyAboveMinimum: currentPct >= rules.minimumPercentage,
      alreadyAboveTarget: currentPct >= rules.targetPercentage,
    };
  });

  // Calculate overall (weighted by actual class counts)
  const totalAttended = subjectResults.reduce((sum, s) => sum + s.attended, 0);
  const totalConducted = subjectResults.reduce((sum, s) => sum + s.conducted, 0);
  const totalRemaining = subjectResults.reduce((sum, s) => sum + s.remainingClasses, 0);
  const overallPct = calculatePercentage(totalAttended, totalConducted);
  const maxOverall = maxPossibleAttendance(totalAttended, totalConducted, totalRemaining);
  const overallReqMin = requiredClassesForTarget(totalAttended, totalConducted, totalRemaining, rules.minimumPercentage);
  const overallReqTarget = requiredClassesForTarget(totalAttended, totalConducted, totalRemaining, rules.targetPercentage);

  // Determine overall status (worst of all subjects)
  const statusPriority: AttendanceStatus[] = ['irreversible', 'danger', 'warning', 'safe'];
  const worstStatus = statusPriority.find(s => subjectResults.some(sr => sr.status === s)) || 'safe';

  const overall: OverallResult = {
    totalAttended,
    totalConducted,
    overallPercentage: overallPct,
    totalRemainingClasses: totalRemaining,
    totalRequiredForMinimum: overallReqMin === -1 ? totalRemaining + 1 : overallReqMin,
    totalRequiredForTarget: overallReqTarget === -1 ? totalRemaining + 1 : overallReqTarget,
    overallStatus: worstStatus,
    maximumPossibleOverall: maxOverall,
  };

  return {
    section: sectionName,
    planningDate: formatDate(planningDate),
    subjects: subjectResults,
    overall,
    rules,
  };
}
