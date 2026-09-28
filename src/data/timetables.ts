// Timetable dataset for all 10 class sections
// This data is structured separately from UI and calculation logic
// Replace with actual institutional timetable data before production use

export interface TimetableEntry {
  section: string;
  department: string;
  semester: string;
  academic_year: string;
  subjects: string[];
  timetable: Record<string, string[]>;
}

export interface AcademicCalendarEntry {
  date: string; // YYYY-MM-DD
  type: 'holiday' | 'exam' | 'event' | 'special_working';
  description: string;
}

export interface AttendanceRules {
  minimum_percentage: number;
  target_percentage: number;
  warning_threshold: number; // percentage above minimum that triggers warning
}

export const DEFAULT_RULES: AttendanceRules = {
  minimum_percentage: 75,
  target_percentage: 90,
  warning_threshold: 5, // warn when within 5% of minimum
};

export const SEMESTER_DATES = {
  start: '2026-08-01',
  end: '2026-12-15',
};

export const ACADEMIC_CALENDAR: AcademicCalendarEntry[] = [
  // Independence Day
  { date: '2026-08-15', type: 'holiday', description: 'Independence Day' },
  // Ganesh Chaturthi
  { date: '2026-08-27', type: 'holiday', description: 'Ganesh Chaturthi' },
  // Milad-un-Nabi
  { date: '2026-09-17', type: 'holiday', description: 'Milad-un-Nabi' },
  // Gandhi Jayanti
  { date: '2026-10-02', type: 'holiday', description: 'Gandhi Jayanti' },
  // Dussehra
  { date: '2026-10-19', type: 'holiday', description: 'Dussehra' },
  { date: '2026-10-20', type: 'holiday', description: 'Dussehra (Day 2)' },
  // Diwali
  { date: '2026-11-07', type: 'holiday', description: 'Diwali' },
  { date: '2026-11-08', type: 'holiday', description: 'Diwali (Day 2)' },
  { date: '2026-11-09', type: 'holiday', description: 'Diwali (Day 3)' },
  // Internal exams
  { date: '2026-10-05', type: 'exam', description: 'Internal Assessment 1 - Day 1' },
  { date: '2026-10-06', type: 'exam', description: 'Internal Assessment 1 - Day 2' },
  { date: '2026-10-07', type: 'exam', description: 'Internal Assessment 1 - Day 3' },
  { date: '2026-11-23', type: 'exam', description: 'Internal Assessment 2 - Day 1' },
  { date: '2026-11-24', type: 'exam', description: 'Internal Assessment 2 - Day 2' },
  { date: '2026-11-25', type: 'exam', description: 'Internal Assessment 2 - Day 3' },
  // End semester exams
  { date: '2026-12-01', type: 'exam', description: 'End Semester Exam Begins' },
  // College events
  { date: '2026-09-05', type: 'event', description: 'Teachers Day Celebration' },
  { date: '2026-10-31', type: 'event', description: 'College Annual Day' },
  // Special working day (Saturday made working)
  { date: '2026-09-12', type: 'special_working', description: 'Compensatory Working Day' },
  { date: '2026-10-24', type: 'special_working', description: 'Compensatory Working Day' },
];

export const TIMETABLES: TimetableEntry[] = [
  // CSE-A
  {
    section: 'CSE-A',
    department: 'Computer Science & Engineering',
    semester: '5',
    academic_year: '2026-27',
    subjects: [
      'Operating Systems',
      'Database Management Systems',
      'Computer Networks',
      'Software Engineering',
      'Theory of Computation',
      'OS Lab',
      'DBMS Lab',
    ],
    timetable: {
      monday: ['Operating Systems', 'Database Management Systems', 'Computer Networks', 'Software Engineering', 'Theory of Computation'],
      tuesday: ['Database Management Systems', 'Operating Systems', 'Theory of Computation', 'Computer Networks', 'OS Lab'],
      wednesday: ['Computer Networks', 'Software Engineering', 'Operating Systems', 'DBMS Lab', 'DBMS Lab'],
      thursday: ['Theory of Computation', 'Computer Networks', 'Software Engineering', 'Operating Systems', 'Database Management Systems'],
      friday: ['Software Engineering', 'Theory of Computation', 'OS Lab', 'OS Lab', 'Database Management Systems'],
    },
  },
  // CSE-B
  {
    section: 'CSE-B',
    department: 'Computer Science & Engineering',
    semester: '5',
    academic_year: '2026-27',
    subjects: [
      'Operating Systems',
      'Database Management Systems',
      'Computer Networks',
      'Software Engineering',
      'Theory of Computation',
      'OS Lab',
      'DBMS Lab',
    ],
    timetable: {
      monday: ['Theory of Computation', 'Computer Networks', 'Software Engineering', 'Operating Systems', 'Database Management Systems'],
      tuesday: ['Operating Systems', 'Database Management Systems', 'Computer Networks', 'Software Engineering', 'Theory of Computation'],
      wednesday: ['Software Engineering', 'Theory of Computation', 'DBMS Lab', 'DBMS Lab', 'Operating Systems'],
      thursday: ['Database Management Systems', 'Operating Systems', 'Theory of Computation', 'Computer Networks', 'OS Lab'],
      friday: ['Computer Networks', 'Software Engineering', 'Operating Systems', 'OS Lab', 'Database Management Systems'],
    },
  },
  // ECE-A
  {
    section: 'ECE-A',
    department: 'Electronics & Communication Engineering',
    semester: '5',
    academic_year: '2026-27',
    subjects: [
      'Digital Signal Processing',
      'VLSI Design',
      'Microprocessors & Microcontrollers',
      'Antenna & Wave Propagation',
      'Control Systems',
      'DSP Lab',
      'VLSI Lab',
    ],
    timetable: {
      monday: ['Digital Signal Processing', 'VLSI Design', 'Microprocessors & Microcontrollers', 'Antenna & Wave Propagation', 'Control Systems'],
      tuesday: ['VLSI Design', 'Digital Signal Processing', 'Control Systems', 'Microprocessors & Microcontrollers', 'DSP Lab'],
      wednesday: ['Microprocessors & Microcontrollers', 'Antenna & Wave Propagation', 'Digital Signal Processing', 'VLSI Lab', 'VLSI Lab'],
      thursday: ['Control Systems', 'Microprocessors & Microcontrollers', 'Antenna & Wave Propagation', 'Digital Signal Processing', 'VLSI Design'],
      friday: ['Antenna & Wave Propagation', 'Control Systems', 'DSP Lab', 'DSP Lab', 'VLSI Design'],
    },
  },
  // ECE-B
  {
    section: 'ECE-B',
    department: 'Electronics & Communication Engineering',
    semester: '5',
    academic_year: '2026-27',
    subjects: [
      'Digital Signal Processing',
      'VLSI Design',
      'Microprocessors & Microcontrollers',
      'Antenna & Wave Propagation',
      'Control Systems',
      'DSP Lab',
      'VLSI Lab',
    ],
    timetable: {
      monday: ['Control Systems', 'Microprocessors & Microcontrollers', 'Antenna & Wave Propagation', 'Digital Signal Processing', 'VLSI Design'],
      tuesday: ['Digital Signal Processing', 'VLSI Design', 'Microprocessors & Microcontrollers', 'Antenna & Wave Propagation', 'Control Systems'],
      wednesday: ['Antenna & Wave Propagation', 'Control Systems', 'VLSI Lab', 'VLSI Lab', 'Digital Signal Processing'],
      thursday: ['VLSI Design', 'Digital Signal Processing', 'Control Systems', 'Microprocessors & Microcontrollers', 'DSP Lab'],
      friday: ['Microprocessors & Microcontrollers', 'Antenna & Wave Propagation', 'Digital Signal Processing', 'DSP Lab', 'VLSI Design'],
    },
  },
  // EEE-A
  {
    section: 'EEE-A',
    department: 'Electrical & Electronics Engineering',
    semester: '5',
    academic_year: '2026-27',
    subjects: [
      'Power Systems',
      'Electrical Machines II',
      'Power Electronics',
      'Measurements & Instrumentation',
      'Transmission & Distribution',
      'Power Electronics Lab',
      'Machines Lab',
    ],
    timetable: {
      monday: ['Power Systems', 'Electrical Machines II', 'Power Electronics', 'Measurements & Instrumentation', 'Transmission & Distribution'],
      tuesday: ['Electrical Machines II', 'Power Systems', 'Transmission & Distribution', 'Power Electronics', 'Power Electronics Lab'],
      wednesday: ['Power Electronics', 'Measurements & Instrumentation', 'Power Systems', 'Machines Lab', 'Machines Lab'],
      thursday: ['Measurements & Instrumentation', 'Power Electronics', 'Electrical Machines II', 'Power Systems', 'Transmission & Distribution'],
      friday: ['Transmission & Distribution', 'Measurements & Instrumentation', 'Power Electronics Lab', 'Power Electronics Lab', 'Electrical Machines II'],
    },
  },
  // EEE-B
  {
    section: 'EEE-B',
    department: 'Electrical & Electronics Engineering',
    semester: '5',
    academic_year: '2026-27',
    subjects: [
      'Power Systems',
      'Electrical Machines II',
      'Power Electronics',
      'Measurements & Instrumentation',
      'Transmission & Distribution',
      'Power Electronics Lab',
      'Machines Lab',
    ],
    timetable: {
      monday: ['Transmission & Distribution', 'Power Electronics', 'Electrical Machines II', 'Power Systems', 'Measurements & Instrumentation'],
      tuesday: ['Power Systems', 'Electrical Machines II', 'Power Electronics', 'Measurements & Instrumentation', 'Transmission & Distribution'],
      wednesday: ['Measurements & Instrumentation', 'Transmission & Distribution', 'Machines Lab', 'Machines Lab', 'Power Systems'],
      thursday: ['Electrical Machines II', 'Power Systems', 'Transmission & Distribution', 'Power Electronics', 'Power Electronics Lab'],
      friday: ['Power Electronics', 'Measurements & Instrumentation', 'Power Systems', 'Power Electronics Lab', 'Electrical Machines II'],
    },
  },
  // MECH-A
  {
    section: 'MECH-A',
    department: 'Mechanical Engineering',
    semester: '5',
    academic_year: '2026-27',
    subjects: [
      'Thermodynamics II',
      'Manufacturing Technology',
      'Fluid Mechanics',
      'Strength of Materials II',
      'Kinematics of Machines',
      'Fluids Lab',
      'Manufacturing Lab',
    ],
    timetable: {
      monday: ['Thermodynamics II', 'Manufacturing Technology', 'Fluid Mechanics', 'Strength of Materials II', 'Kinematics of Machines'],
      tuesday: ['Manufacturing Technology', 'Thermodynamics II', 'Kinematics of Machines', 'Fluid Mechanics', 'Fluids Lab'],
      wednesday: ['Fluid Mechanics', 'Strength of Materials II', 'Thermodynamics II', 'Manufacturing Lab', 'Manufacturing Lab'],
      thursday: ['Strength of Materials II', 'Fluid Mechanics', 'Manufacturing Technology', 'Thermodynamics II', 'Kinematics of Machines'],
      friday: ['Kinematics of Machines', 'Strength of Materials II', 'Fluids Lab', 'Fluids Lab', 'Manufacturing Technology'],
    },
  },
  // MECH-B
  {
    section: 'MECH-B',
    department: 'Mechanical Engineering',
    semester: '5',
    academic_year: '2026-27',
    subjects: [
      'Thermodynamics II',
      'Manufacturing Technology',
      'Fluid Mechanics',
      'Strength of Materials II',
      'Kinematics of Machines',
      'Fluids Lab',
      'Manufacturing Lab',
    ],
    timetable: {
      monday: ['Kinematics of Machines', 'Fluid Mechanics', 'Strength of Materials II', 'Thermodynamics II', 'Manufacturing Technology'],
      tuesday: ['Thermodynamics II', 'Manufacturing Technology', 'Fluid Mechanics', 'Strength of Materials II', 'Kinematics of Machines'],
      wednesday: ['Strength of Materials II', 'Kinematics of Machines', 'Manufacturing Lab', 'Manufacturing Lab', 'Thermodynamics II'],
      thursday: ['Manufacturing Technology', 'Thermodynamics II', 'Kinematics of Machines', 'Fluid Mechanics', 'Fluids Lab'],
      friday: ['Fluid Mechanics', 'Strength of Materials II', 'Thermodynamics II', 'Fluids Lab', 'Manufacturing Technology'],
    },
  },
  // CIVIL-A
  {
    section: 'CIVIL-A',
    department: 'Civil Engineering',
    semester: '5',
    academic_year: '2026-27',
    subjects: [
      'Structural Analysis',
      'Geotechnical Engineering',
      'Water Resources Engineering',
      'Transportation Engineering',
      'Environmental Engineering',
      'Survey Lab',
      'Concrete Lab',
    ],
    timetable: {
      monday: ['Structural Analysis', 'Geotechnical Engineering', 'Water Resources Engineering', 'Transportation Engineering', 'Environmental Engineering'],
      tuesday: ['Geotechnical Engineering', 'Structural Analysis', 'Environmental Engineering', 'Water Resources Engineering', 'Survey Lab'],
      wednesday: ['Water Resources Engineering', 'Transportation Engineering', 'Structural Analysis', 'Concrete Lab', 'Concrete Lab'],
      thursday: ['Transportation Engineering', 'Water Resources Engineering', 'Geotechnical Engineering', 'Structural Analysis', 'Environmental Engineering'],
      friday: ['Environmental Engineering', 'Transportation Engineering', 'Survey Lab', 'Survey Lab', 'Geotechnical Engineering'],
    },
  },
  // CIVIL-B
  {
    section: 'CIVIL-B',
    department: 'Civil Engineering',
    semester: '5',
    academic_year: '2026-27',
    subjects: [
      'Structural Analysis',
      'Geotechnical Engineering',
      'Water Resources Engineering',
      'Transportation Engineering',
      'Environmental Engineering',
      'Survey Lab',
      'Concrete Lab',
    ],
    timetable: {
      monday: ['Environmental Engineering', 'Water Resources Engineering', 'Transportation Engineering', 'Structural Analysis', 'Geotechnical Engineering'],
      tuesday: ['Structural Analysis', 'Geotechnical Engineering', 'Water Resources Engineering', 'Transportation Engineering', 'Environmental Engineering'],
      wednesday: ['Transportation Engineering', 'Environmental Engineering', 'Concrete Lab', 'Concrete Lab', 'Structural Analysis'],
      thursday: ['Geotechnical Engineering', 'Structural Analysis', 'Environmental Engineering', 'Water Resources Engineering', 'Survey Lab'],
      friday: ['Water Resources Engineering', 'Transportation Engineering', 'Structural Analysis', 'Survey Lab', 'Geotechnical Engineering'],
    },
  },
];
