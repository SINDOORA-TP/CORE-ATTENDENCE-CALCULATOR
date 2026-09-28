'use client';

import { useState, useMemo, useCallback } from 'react';
import { TIMETABLES, DEFAULT_RULES, SEMESTER_DATES, type AttendanceRules, type TimetableEntry } from '@/data/timetables';
import {
  calculateAttendance,
  generateProjection,
  calculatePercentage,
  type SubjectAttendanceInput,
  type CalculationResult,
  type SubjectResult,
  type AttendanceStatus,
} from '@/services/attendanceCalculator';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Area,
  AreaChart,
} from 'recharts';
import Chatbot from '@/components/Chatbot';

// ─── Types ─────────────────────────────────────────────────────────

type AppScreen = 'landing' | 'section' | 'input' | 'results';

interface SubjectInput {
  subject: string;
  attended: string;
  conducted: string;
}

// ─── Status helpers ────────────────────────────────────────────────

function statusLabel(status: AttendanceStatus): string {
  switch (status) {
    case 'safe': return '✓ SAFE';
    case 'warning': return '⚠ WARNING';
    case 'danger': return '✕ DANGER';
    case 'irreversible': return '☠ IRREVERSIBLE DETENTION';
  }
}

function statusColor(status: AttendanceStatus): string {
  switch (status) {
    case 'safe': return 'status-safe';
    case 'warning': return 'status-warning';
    case 'danger': return 'status-danger';
    case 'irreversible': return 'status-irreversible';
  }
}

function statusRawColor(status: AttendanceStatus): string {
  switch (status) {
    case 'safe': return '#22c55e';
    case 'warning': return '#f59e0b';
    case 'danger': return '#ef4444';
    case 'irreversible': return '#dc2626';
  }
}

// ─── Progress Ring Component ───────────────────────────────────────

function ProgressRing({
  percentage,
  size = 120,
  strokeWidth = 8,
  color,
}: {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedPct = Math.min(100, Math.max(0, percentage));
  const offset = circumference - (clampedPct / 100) * circumference;

  const ringColor = color || (percentage >= 90 ? '#22c55e' : percentage >= 75 ? '#f59e0b' : '#ef4444');

  return (
    <div className="progress-ring-container" style={{ width: size, height: size }}>
      <svg className="progress-ring" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={ringColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ filter: `drop-shadow(0 0 6px ${ringColor}40)` }}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          textAlign: 'center',
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        <div style={{ fontSize: size * 0.22, fontWeight: 700, color: ringColor }}>
          {percentage.toFixed(1)}%
        </div>
      </div>
    </div>
  );
}

// ─── Landing Screen ────────────────────────────────────────────────

function LandingScreen({ onStart, onHowItWorks }: { onStart: () => void; onHowItWorks: () => void }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* Decorative elements */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,168,83,0.08), transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '10%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(107,91,149,0.08), transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="animate-fade-in-up" style={{ textAlign: 'center', maxWidth: 600 }}>
        {/* Logo */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(212,168,83,0.15), rgba(107,91,149,0.15))',
            border: '2px solid rgba(212,168,83,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 32px',
            fontSize: '2rem',
          }}
        >
          📊
        </div>

        <h1
          style={{
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            fontWeight: 900,
            letterSpacing: '-1px',
            marginBottom: 16,
            lineHeight: 1.1,
          }}
          className="gradient-text"
        >
          THE CORE
          <br />
          CALCULATOR
        </h1>

        <p
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            color: 'var(--text-secondary)',
            marginBottom: 48,
            lineHeight: 1.6,
          }}
        >
          Know exactly how many classes you need to attend.
          <br />
          Plan your attendance. Avoid detention.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
          <button
            className="btn-primary"
            onClick={onStart}
            id="cta-calculate"
            style={{ minWidth: 260, fontSize: '1.1rem', padding: '16px 40px' }}
          >
            Calculate Attendance
          </button>
          <button
            className="btn-secondary"
            onClick={onHowItWorks}
            id="cta-how-it-works"
            style={{ minWidth: 260 }}
          >
            How It Works
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          color: 'var(--text-muted)',
          fontSize: '0.75rem',
          opacity: 0.5,
        }}
      >
        <div
          style={{
            width: 20,
            height: 32,
            borderRadius: 10,
            border: '2px solid var(--text-muted)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: 4,
          }}
        >
          <div
            style={{
              width: 4,
              height: 8,
              borderRadius: 2,
              background: 'var(--text-muted)',
              animation: 'fadeInUp 1.5s ease infinite',
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── How It Works Modal ────────────────────────────────────────────

function HowItWorksModal({ onClose }: { onClose: () => void }) {
  const steps = [
    { icon: '🏫', title: 'Select Your Class', desc: 'Choose your section from the available list.' },
    { icon: '📝', title: 'Enter Attendance', desc: 'Input classes attended and conducted for each subject.' },
    { icon: '📅', title: 'Pick a Date', desc: 'Choose the future date you want to plan until.' },
    { icon: '⚡', title: 'Get Results', desc: 'See exactly how many classes you need to attend, subject by subject.' },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: 24,
      }}
      onClick={onClose}
    >
      <div
        className="glass-card animate-fade-in-up"
        style={{ maxWidth: 500, width: '100%', padding: 32 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 24, color: 'var(--gold)' }}>
          How It Works
        </h2>
        <div className="stagger-children" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {steps.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(212,168,83,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  flexShrink: 0,
                }}
              >
                {step.icon}
              </div>
              <div>
                <h3 style={{ fontWeight: 600, marginBottom: 4 }}>{step.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          className="btn-primary"
          onClick={onClose}
          style={{ width: '100%', marginTop: 32 }}
          id="modal-close"
        >
          Got It
        </button>
      </div>
    </div>
  );
}

// ─── Section Selection Screen ──────────────────────────────────────

function SectionScreen({
  onSelect,
  onBack,
}: {
  onSelect: (section: string) => void;
  onBack: () => void;
}) {
  // Group sections by department
  const departments = useMemo(() => {
    const map = new Map<string, TimetableEntry[]>();
    Object.values(TIMETABLES).forEach((t) => {
      const existing = map.get(t.department) || [];
      existing.push(t);
      map.set(t.department, existing);
    });
    return map;
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '24px',
        maxWidth: 800,
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <button
        className="btn-secondary"
        onClick={onBack}
        id="btn-back-landing"
        style={{ marginBottom: 24, padding: '8px 16px', fontSize: '0.85rem' }}
      >
        ← Back
      </button>

      <h1
        className="gradient-text animate-fade-in-up"
        style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 8 }}
      >
        Select Your Class
      </h1>
      <p
        className="animate-fade-in-up"
        style={{ color: 'var(--text-secondary)', marginBottom: 32, animationDelay: '0.1s' }}
      >
        Choose your section to get started
      </p>

      <div className="stagger-children" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {Array.from(departments.entries()).map(([dept, sections]) => (
          <div key={dept}>
            <h2
              style={{
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                color: 'var(--purple-light)',
                marginBottom: 12,
                fontWeight: 600,
              }}
            >
              {dept}
            </h2>
            <div className="section-grid">
              {sections.map((section) => (
                <button
                  key={section.section}
                  className="glass-card glow-border"
                  onClick={() => onSelect(section.section)}
                  id={`section-${section.section.replace(/\s+/g, '-')}`}
                  style={{
                    padding: '20px 16px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    border: '1px solid var(--border-card)',
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.borderColor = 'var(--gold-dim)';
                    (e.target as HTMLElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.borderColor = 'var(--border-card)';
                    (e.target as HTMLElement).style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--cream)' }}>
                    {section.section}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>
                    Sem {section.semester}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Attendance Input Screen ───────────────────────────────────────

function InputScreen({
  section,
  onCalculate,
  onBack,
}: {
  section: string;
  onCalculate: (result: CalculationResult) => void;
  onBack: () => void;
}) {
  const timetable = TIMETABLES[section]!;

  const [subjectInputs, setSubjectInputs] = useState<SubjectInput[]>(
    timetable.subjects.map((s) => ({ subject: s.name, attended: '', conducted: '' }))
  );

  const todayStr = new Date().toISOString().split('T')[0];
  const [planningDate, setPlanningDate] = useState<string>(SEMESTER_DATES.endDate);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);

  const updateSubject = useCallback((index: number, field: 'attended' | 'conducted', value: string) => {
    setSubjectInputs((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
    setErrors({});
  }, []);

  const validate = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    subjectInputs.forEach((input, i) => {
      const attended = parseInt(input.attended);
      const conducted = parseInt(input.conducted);

      if (input.attended === '' || input.conducted === '') {
        newErrors[`subject-${i}`] = 'Both fields are required';
      } else if (isNaN(attended) || isNaN(conducted)) {
        newErrors[`subject-${i}`] = 'Must be numeric';
      } else if (attended < 0 || conducted < 0) {
        newErrors[`subject-${i}`] = 'Cannot be negative';
      } else if (attended > conducted) {
        newErrors[`subject-${i}`] = 'Attended cannot exceed conducted';
      }
    });

    if (!planningDate) {
      newErrors['date'] = 'Please select a planning date';
    } else if (planningDate < todayStr) {
      newErrors['date'] = 'Date must be today or later';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [subjectInputs, planningDate, todayStr]);

  const handleCalculate = useCallback(() => {
    if (!validate()) return;

    setIsCalculating(true);

    // Small delay for UX feedback
    setTimeout(() => {
      const inputs: SubjectAttendanceInput[] = subjectInputs.map((s) => ({
        subject: s.subject,
        attended: parseInt(s.attended),
        conducted: parseInt(s.conducted),
      }));

      const result = calculateAttendance(section, inputs, new Date(planningDate));

      if ('error' in result) {
        setErrors({ general: result.error });
        setIsCalculating(false);
        return;
      }

      onCalculate(result);
      setIsCalculating(false);
    }, 300);
  }, [validate, subjectInputs, section, planningDate, onCalculate]);

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '24px',
        maxWidth: 700,
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <button
        className="btn-secondary"
        onClick={onBack}
        id="btn-back-section"
        style={{ marginBottom: 24, padding: '8px 16px', fontSize: '0.85rem' }}
      >
        ← Back
      </button>

      <div className="animate-fade-in-up">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span
            style={{
              background: 'linear-gradient(135deg, rgba(212,168,83,0.2), rgba(107,91,149,0.2))',
              padding: '4px 12px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'var(--gold)',
            }}
          >
            {section}
          </span>
        </div>
        <h1 className="gradient-text" style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 4 }}>
          Enter Your Attendance
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 32, fontSize: '0.9rem' }}>
          Enter classes attended and total classes conducted for each subject
        </p>
      </div>

      {errors.general && (
        <div
          className="status-danger animate-fade-in"
          style={{
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            marginBottom: 20,
            fontSize: '0.9rem',
          }}
        >
          {errors.general}
        </div>
      )}

      <div className="stagger-children" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {subjectInputs.map((input, i) => {
          const pct =
            input.attended && input.conducted
              ? calculatePercentage(parseInt(input.attended) || 0, parseInt(input.conducted) || 1)
              : null;
          const error = errors[`subject-${i}`];

          return (
            <div
              key={input.subject}
              className="glass-card"
              style={{ padding: '20px', position: 'relative', overflow: 'hidden' }}
            >
              {/* Subject color accent */}
              {pct !== null && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 4,
                    height: '100%',
                    background: pct >= 90 ? '#22c55e' : pct >= 75 ? '#f59e0b' : '#ef4444',
                    borderRadius: '4px 0 0 4px',
                  }}
                />
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h3 style={{ fontWeight: 600, fontSize: '0.95rem' }}>{input.subject}</h3>
                {pct !== null && (
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      color: pct >= 90 ? '#22c55e' : pct >= 75 ? '#f59e0b' : '#ef4444',
                    }}
                  >
                    {pct.toFixed(1)}%
                  </span>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label
                    style={{
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      color: 'var(--text-muted)',
                      marginBottom: 4,
                      display: 'block',
                    }}
                  >
                    Attended
                  </label>
                  <input
                    type="number"
                    className="input-field"
                    value={input.attended}
                    onChange={(e) => updateSubject(i, 'attended', e.target.value)}
                    placeholder="0"
                    min="0"
                    id={`input-attended-${i}`}
                    aria-label={`Classes attended for ${input.subject}`}
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      color: 'var(--text-muted)',
                      marginBottom: 4,
                      display: 'block',
                    }}
                  >
                    Conducted
                  </label>
                  <input
                    type="number"
                    className="input-field"
                    value={input.conducted}
                    onChange={(e) => updateSubject(i, 'conducted', e.target.value)}
                    placeholder="0"
                    min="0"
                    id={`input-conducted-${i}`}
                    aria-label={`Classes conducted for ${input.subject}`}
                  />
                </div>
              </div>

              {error && (
                <p style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: 8 }}>{error}</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Planning Date */}
      <div className="glass-card animate-fade-in-up" style={{ padding: 20, marginTop: 20 }}>
        <h3 style={{ fontWeight: 600, marginBottom: 12 }}>📅 Planning Date</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label
              style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                color: 'var(--text-muted)',
                marginBottom: 4,
                display: 'block',
              }}
            >
              Today
            </label>
            <div
              style={{
                padding: '10px 14px',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-secondary)',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.9rem',
              }}
            >
              {new Date().toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </div>
          </div>
          <div>
            <label
              style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                color: 'var(--text-muted)',
                marginBottom: 4,
                display: 'block',
              }}
            >
              Plan Until
            </label>
            <input
              type="date"
              className="input-field"
              value={planningDate}
              onChange={(e) => {
                setPlanningDate(e.target.value);
                setErrors({});
              }}
              min={todayStr}
              max={SEMESTER_DATES.endDate}
              id="input-planning-date"
              aria-label="Planning date"
            />
          </div>
        </div>
        {errors.date && (
          <p style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: 8 }}>{errors.date}</p>
        )}
      </div>

      {/* Calculate Button */}
      <button
        className="btn-primary"
        onClick={handleCalculate}
        disabled={isCalculating}
        id="btn-calculate"
        style={{ width: '100%', marginTop: 24, padding: '18px', fontSize: '1.1rem' }}
      >
        {isCalculating ? (
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <span
              style={{
                width: 20,
                height: 20,
                border: '2px solid rgba(0,0,0,0.3)',
                borderTopColor: 'var(--bg-primary)',
                borderRadius: '50%',
                display: 'inline-block',
                animation: 'spin 0.8s linear infinite',
              }}
            />
            Calculating...
          </span>
        ) : (
          '⚡ Calculate Attendance'
        )}
      </button>

      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

// ─── Results Dashboard ─────────────────────────────────────────────

function ResultsDashboard({
  result,
  onBack,
  onReset,
}: {
  result: CalculationResult;
  onBack: () => void;
  onReset: () => void;
}) {
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);

  // Projection data for overall
  const overallProjection = useMemo(() => {
    return generateProjection(
      result.overall.totalAttended,
      result.overall.totalConducted,
      result.overall.totalRemainingClasses
    );
  }, [result]);

  return (
    <div style={{ minHeight: '100vh', padding: '24px', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div
          className="animate-fade-in-up"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: 12,
            marginBottom: 32,
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <button
                className="btn-secondary"
                onClick={onBack}
                id="btn-back-input"
                style={{ padding: '6px 12px', fontSize: '0.8rem' }}
              >
                ← Edit
              </button>
              <span
                style={{
                  background: 'linear-gradient(135deg, rgba(212,168,83,0.2), rgba(107,91,149,0.2))',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--gold)',
                }}
              >
                {result.section}
              </span>
            </div>
            <h1 className="gradient-text" style={{ fontSize: '1.8rem', fontWeight: 800 }}>
              Attendance Dashboard
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Planning until {new Date(result.planningDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <button className="btn-secondary" onClick={onReset} id="btn-new-calculation" style={{ fontSize: '0.85rem' }}>
            🔄 New Calculation
          </button>
        </div>

        <div className="desktop-layout">
          {/* Summary Panel */}
          <div className="input-panel" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Overall Attendance Card */}
            <div
              className="glass-card animate-fade-in-up"
              style={{ padding: 24, textAlign: 'center' }}
            >
              <h2
                style={{
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  color: 'var(--text-muted)',
                  marginBottom: 20,
                }}
              >
                Overall Attendance
              </h2>
              <ProgressRing
                percentage={result.overall.overallPercentage}
                size={160}
                strokeWidth={10}
              />
              <div style={{ marginTop: 20 }}>
                <span
                  className={statusColor(result.overall.overallStatus)}
                  style={{
                    padding: '6px 16px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                  }}
                >
                  {statusLabel(result.overall.overallStatus)}
                </span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="glass-card" style={{ padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: 8 }}>
                  Remaining
                </div>
                <div
                  style={{
                    fontSize: '1.8rem',
                    fontWeight: 800,
                    fontFamily: "'JetBrains Mono', monospace",
                    color: 'var(--cream)',
                  }}
                  className="count-value"
                >
                  {result.overall.totalRemainingClasses}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>classes</div>
              </div>

              <div className="glass-card" style={{ padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: 8 }}>
                  Required for {result.rules.minimumPercentage}%
                </div>
                <div
                  style={{
                    fontSize: '1.8rem',
                    fontWeight: 800,
                    fontFamily: "'JetBrains Mono', monospace",
                    color: result.overall.totalRequiredForMinimum > result.overall.totalRemainingClasses ? 'var(--danger)' : 'var(--safe)',
                  }}
                  className="count-value"
                >
                  {result.overall.totalRequiredForMinimum > result.overall.totalRemainingClasses
                    ? 'N/A'
                    : result.overall.totalRequiredForMinimum}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>classes</div>
              </div>

              <div className="glass-card" style={{ padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: 8 }}>
                  Target {result.rules.targetPercentage}%
                </div>
                <div
                  style={{
                    fontSize: '1.8rem',
                    fontWeight: 800,
                    fontFamily: "'JetBrains Mono', monospace",
                    color: result.overall.totalRequiredForTarget > result.overall.totalRemainingClasses ? 'var(--warning)' : 'var(--gold)',
                  }}
                  className="count-value"
                >
                  {result.overall.totalRequiredForTarget > result.overall.totalRemainingClasses
                    ? 'N/A'
                    : result.overall.totalRequiredForTarget}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>classes</div>
              </div>

              <div className="glass-card" style={{ padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: 8 }}>
                  Max Possible
                </div>
                <div
                  style={{
                    fontSize: '1.8rem',
                    fontWeight: 800,
                    fontFamily: "'JetBrains Mono', monospace",
                    color: result.overall.maximumPossibleOverall >= 90 ? 'var(--safe)' : result.overall.maximumPossibleOverall >= 75 ? 'var(--warning)' : 'var(--danger)',
                  }}
                  className="count-value"
                >
                  {result.overall.maximumPossibleOverall.toFixed(1)}%
                </div>
              </div>
            </div>

            {/* Projection Chart */}
            {overallProjection.length > 0 && (
              <div className="glass-card animate-fade-in-up" style={{ padding: 20, animationDelay: '0.2s' }}>
                <h3
                  style={{
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    color: 'var(--text-muted)',
                    marginBottom: 16,
                  }}
                >
                  📈 Attendance Projection
                </h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 12 }}>
                  If you attend the next N classes:
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={overallProjection}>
                    <defs>
                      <linearGradient id="gradientArea" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#d4a853" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#d4a853" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                    <XAxis
                      dataKey="classesAttended"
                      stroke="var(--text-muted)"
                      fontSize={11}
                      tickLine={false}
                      label={{ value: 'Classes', position: 'insideBottom', offset: -5, fill: 'var(--text-muted)', fontSize: 10 }}
                    />
                    <YAxis
                      stroke="var(--text-muted)"
                      fontSize={11}
                      tickLine={false}
                      domain={['auto', 'auto']}
                      tickFormatter={(v: number) => `${v}%`}
                    />
                    <Tooltip
                      contentStyle={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-card)',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--text-primary)',
                        fontSize: '0.8rem',
                      }}
                      formatter={(value: any) => [`${value.toFixed(1)}%`, 'Attendance']}
                      labelFormatter={(label) => `After ${label} classes`}
                    />
                    <ReferenceLine
                      y={result.rules.minimumPercentage}
                      stroke="var(--danger)"
                      strokeDasharray="4 4"
                      label={{ value: `${result.rules.minimumPercentage}%`, fill: 'var(--danger)', fontSize: 10, position: 'right' }}
                    />
                    <ReferenceLine
                      y={result.rules.targetPercentage}
                      stroke="var(--safe)"
                      strokeDasharray="4 4"
                      label={{ value: `${result.rules.targetPercentage}%`, fill: 'var(--safe)', fontSize: 10, position: 'right' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="percentage"
                      stroke="#d4a853"
                      strokeWidth={2}
                      fill="url(#gradientArea)"
                      dot={{ r: 3, fill: '#d4a853' }}
                      activeDot={{ r: 5, fill: '#f0d48a' }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Subject Cards Panel */}
          <div className="results-panel">
            <h2
              className="animate-fade-in-up"
              style={{
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                color: 'var(--purple-light)',
                marginBottom: 16,
                fontWeight: 600,
              }}
            >
              Subject Breakdown
            </h2>

            <div className="subject-grid stagger-children">
              {result.subjects.map((subject) => (
                <SubjectCard
                  key={subject.subject}
                  subject={subject}
                  rules={result.rules}
                  isExpanded={expandedSubject === subject.subject}
                  onToggle={() =>
                    setExpandedSubject(
                      expandedSubject === subject.subject ? null : subject.subject
                    )
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Subject Card ──────────────────────────────────────────────────

function SubjectCard({
  subject,
  rules,
  isExpanded,
  onToggle,
}: {
  subject: SubjectResult;
  rules: AttendanceRules;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const projection = useMemo(() => {
    if (!isExpanded) return [];
    return generateProjection(subject.attended, subject.conducted, subject.remainingClasses);
  }, [isExpanded, subject]);

  return (
    <div
      className="glass-card"
      style={{
        padding: 0,
        overflow: 'hidden',
        cursor: 'pointer',
        borderColor: subject.status === 'irreversible' ? 'var(--irreversible-border)' : undefined,
      }}
      onClick={onToggle}
      id={`subject-card-${subject.subject.replace(/\s+/g, '-')}`}
    >
      {/* Status indicator bar */}
      <div
        style={{
          height: 3,
          background: statusRawColor(subject.status),
          boxShadow: `0 0 12px ${statusRawColor(subject.status)}40`,
        }}
      />

      <div style={{ padding: '16px 20px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div>
            <h3 style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: 4 }}>{subject.subject}</h3>
            <span
              className={statusColor(subject.status)}
              style={{
                padding: '2px 10px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.7rem',
                fontWeight: 600,
              }}
            >
              {statusLabel(subject.status)}
            </span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div
              style={{
                fontSize: '1.6rem',
                fontWeight: 800,
                fontFamily: "'JetBrains Mono', monospace",
                color: statusRawColor(subject.status),
              }}
            >
              {subject.currentPercentage.toFixed(1)}%
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              {subject.attended}/{subject.conducted}
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', padding: '8px 10px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: 4 }}>Remaining</div>
            <div style={{ fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", fontSize: '1rem' }}>
              {subject.remainingClasses}
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', padding: '8px 10px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: 4 }}>For {rules.minimumPercentage}%</div>
            <div
              style={{
                fontWeight: 700,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '1rem',
                color: !subject.canReachMinimum ? 'var(--danger)' : subject.alreadyAboveMinimum ? 'var(--safe)' : 'var(--warning)',
              }}
            >
              {subject.alreadyAboveMinimum ? '✓' : !subject.canReachMinimum ? '✕' : subject.requiredForMinimum}
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', padding: '8px 10px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: 4 }}>For {rules.targetPercentage}%</div>
            <div
              style={{
                fontWeight: 700,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '1rem',
                color: !subject.canReachTarget ? 'var(--danger)' : subject.alreadyAboveTarget ? 'var(--safe)' : 'var(--gold)',
              }}
            >
              {subject.alreadyAboveTarget ? '✓' : !subject.canReachTarget ? '✕' : subject.requiredForTarget}
            </div>
          </div>
        </div>

        {/* Expand indicator */}
        <div
          style={{
            textAlign: 'center',
            marginTop: 8,
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            transition: 'transform 0.3s ease',
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
          }}
        >
          ▼
        </div>

        {/* Expanded details */}
        {isExpanded && (
          <div
            className="animate-fade-in"
            style={{
              marginTop: 16,
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: 16,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Irreversible detention warning */}
            {subject.status === 'irreversible' && (
              <div
                className="status-irreversible"
                style={{
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: 16,
                  textAlign: 'center',
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 4 }}>
                  ☠ IRREVERSIBLE DETENTION
                </div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                  Your attendance cannot reach the minimum required percentage
                  ({rules.minimumPercentage}%) with the remaining scheduled classes.
                </div>
              </div>
            )}

            {/* Detailed stats */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Current Attendance</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>
                  {subject.currentPercentage.toFixed(2)}%
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Classes Attended</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>
                  {subject.attended}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Classes Conducted</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>
                  {subject.conducted}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Remaining Classes</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>
                  {subject.remainingClasses}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Maximum Possible</span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 600,
                    color: subject.maximumPossiblePercentage >= rules.targetPercentage ? 'var(--safe)' : subject.maximumPossiblePercentage >= rules.minimumPercentage ? 'var(--warning)' : 'var(--danger)',
                  }}
                >
                  {subject.maximumPossiblePercentage.toFixed(2)}%
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Required for {rules.minimumPercentage}%</span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 600,
                    color: subject.canReachMinimum ? 'var(--safe)' : 'var(--danger)',
                  }}
                >
                  {subject.alreadyAboveMinimum
                    ? 'Already above'
                    : subject.canReachMinimum
                    ? `${subject.requiredForMinimum} classes`
                    : 'Not possible'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Required for {rules.targetPercentage}%</span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 600,
                    color: subject.canReachTarget ? 'var(--gold)' : 'var(--danger)',
                  }}
                >
                  {subject.alreadyAboveTarget
                    ? 'Already above'
                    : subject.canReachTarget
                    ? `${subject.requiredForTarget} classes`
                    : 'Not possible within semester'}
                </span>
              </div>
            </div>

            {/* Subject projection chart */}
            {projection.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 8 }}>
                  Projection (attending all future classes):
                </div>
                <ResponsiveContainer width="100%" height={140}>
                  <LineChart data={projection}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="classesAttended" stroke="var(--text-muted)" fontSize={10} tickLine={false} />
                    <YAxis
                      stroke="var(--text-muted)"
                      fontSize={10}
                      tickLine={false}
                      domain={['auto', 'auto']}
                      tickFormatter={(v: number) => `${v}%`}
                    />
                    <Tooltip
                      contentStyle={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-card)',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--text-primary)',
                        fontSize: '0.75rem',
                      }}
                      formatter={(value: any) => [`${value.toFixed(1)}%`, 'Attendance']}
                    />
                    <ReferenceLine y={rules.minimumPercentage} stroke="var(--danger)" strokeDasharray="3 3" />
                    <ReferenceLine y={rules.targetPercentage} stroke="var(--safe)" strokeDasharray="3 3" />
                    <Line
                      type="monotone"
                      dataKey="percentage"
                      stroke={statusRawColor(subject.status)}
                      strokeWidth={2}
                      dot={{ r: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main App Component ────────────────────────────────────────────

export default function Home() {
  const [screen, setScreen] = useState<AppScreen>('landing');
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const handleSelectSection = useCallback((section: string) => {
    setSelectedSection(section);
    setScreen('input');
  }, []);

  const handleCalculate = useCallback((result: CalculationResult) => {
    setCalculationResult(result);
    setScreen('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleReset = useCallback(() => {
    setScreen('landing');
    setSelectedSection('');
    setCalculationResult(null);
  }, []);

  return (
    <main>
      {screen === 'landing' && (
        <LandingScreen
          onStart={() => setScreen('section')}
          onHowItWorks={() => setShowHowItWorks(true)}
        />
      )}

      {screen === 'section' && (
        <SectionScreen
          onSelect={handleSelectSection}
          onBack={() => setScreen('landing')}
        />
      )}

      {screen === 'input' && (
        <InputScreen
          section={selectedSection}
          onCalculate={handleCalculate}
          onBack={() => setScreen('section')}
        />
      )}

      {screen === 'results' && calculationResult && (
        <ResultsDashboard
          result={calculationResult}
          onBack={() => setScreen('input')}
          onReset={handleReset}
        />
      )}

      {showHowItWorks && <HowItWorksModal onClose={() => setShowHowItWorks(false)} />}
      
      <Chatbot context={{ selectedSection, calculationResult }} />
    </main>
  );
}
