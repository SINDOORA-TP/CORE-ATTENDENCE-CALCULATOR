// Timetable dataset extracted from actual SRM IST Tiruchirappalli PDFs
// School of Electrical and Electronics Engineering
// Odd Semester (2026-2027) for II, III, IV year
// Even Semester (2024-25) for I year (older timetable)

export interface TimetableEntry {
  section: string;
  department: string;
  year: number;
  semester: string;
  venue: string;
  subjects: SubjectInfo[];
  schedule: DaySchedule[];
}

export interface SubjectInfo {
  code: string;
  name: string;
  slot: string;
  creditLTPC: string;
  faculty: string;
  department: string;
  isLab: boolean;
}

export interface DaySchedule {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  periods: (string | null)[]; // slots A-I or LAB or null, index 0=period1, etc.
}

export interface AttendanceRules {
  minimumPercentage: number;
  warningPercentage: number;
  detentionPercentage: number;
  targetPercentage: number;
}

export const DEFAULT_RULES: AttendanceRules = {
  minimumPercentage: 75,
  warningPercentage: 80,
  detentionPercentage: 65,
  targetPercentage: 90,
};

export const SEMESTER_DATES = {
  startDate: '2026-08-29',
  endDate: '2026-11-29',
  holidays: [
    '2026-09-05', // Teachers Day
    '2026-10-02', // Gandhi Jayanti
    '2026-10-12', // Dussehra
    '2026-10-20', // Milad-un-Nabi
    '2026-10-31', // Diwali
    '2026-11-01', // Diwali
    '2026-11-14', // Children's Day
  ],
};

export const ACADEMIC_CALENDAR = {
  totalWeeks: 18,
  examWeeks: 2,
  teachingWeeks: 16,
};

// ═══════════════════════════════════════════════════════════════════════
// II ECE-DS A — III Semester — Odd Semester (2026-2027)
// ═══════════════════════════════════════════════════════════════════════

const II_ECE_DS_A: TimetableEntry = {
  section: 'II ECE-DS A',
  department: 'ECE - Data Science',
  year: 2,
  semester: 'III Semester - Odd (2026-27)',
  venue: 'IST 416 / FN',
  subjects: [
    { code: '21MAB201T', name: 'Transforms and Boundary Value Problems', slot: 'A', creditLTPC: '3-1-0-4', faculty: 'Dr.C. Arun Kumar', department: 'AP/Maths', isLab: false },
    { code: '21ECC201T', name: 'Solid State Devices', slot: 'B', creditLTPC: '3-0-0-3', faculty: 'Dr. Jeevanantham S', department: 'AP/ECE-DS', isLab: false },
    { code: '21CSS201T', name: 'Computer Organization and Architecture', slot: 'C', creditLTPC: '3-1-0-4', faculty: 'Dr. P. Murugapandiyan', department: 'Prof./ECE', isLab: false },
    { code: '21ECC203T', name: 'Digital Logic Design', slot: 'D', creditLTPC: '3-0-0-3', faculty: 'Dr.S.Krishnakumar', department: 'AP/ECE-DS', isLab: false },
    { code: '21ECC205T', name: 'Electromagnetic Theory and Interference', slot: 'E', creditLTPC: '3-0-0-3', faculty: 'Dr.V. Bharathi', department: 'AP/ECE', isLab: false },
    { code: '21LEM201T', name: 'Professional Ethics', slot: 'F', creditLTPC: '1-0-0-0', faculty: 'Dr. Jothi M', department: 'AP/ECE', isLab: false },
    { code: '21LEM202T', name: 'Universal Human Values-II', slot: 'G', creditLTPC: '2-1-0-3', faculty: 'Mrs.N.Suganthi', department: 'RS - ECE', isLab: false },
    { code: '21PDM201L', name: 'Verbal Reasoning', slot: 'H', creditLTPC: '0-0-2-0', faculty: '', department: 'CDC – TB -106', isLab: false },
    { code: '21PDH209T', name: 'Social Engineering', slot: 'I', creditLTPC: '2-0-0-2', faculty: 'Mrs.D. Lavanya', department: 'RS - ECE', isLab: false },
    { code: '21ECC211L', name: 'Devices and Digital IC Laboratory', slot: 'LAB', creditLTPC: '0-0-4-2', faculty: 'Dr. Jeevanantham S / Dr.V. Bharathi', department: 'AP/ECE-DS / AP/ECE', isLab: true },
  ],
  schedule: [
    { day: 'Monday', periods: ['E', 'A', null, 'I', null, 'G-602', 'G-602', null, 'LAB-309/107'] },
    { day: 'Tuesday', periods: ['C', 'A', null, 'E', 'D', null, 'G-602', 'G-602', 'H-TB-106'] },
    { day: 'Wednesday', periods: ['A', 'B', null, 'C', 'D', null, 'H-TB-106', 'H-TB-106', null] },
    { day: 'Thursday', periods: ['B', 'C', null, 'A', 'F', null, 'LAB-309/107', 'LAB-309/107', null] },
    { day: 'Friday', periods: ['D', 'B', null, 'E', 'C', null, null, null, null] },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// II ECE-DS B — III Semester — Odd Semester (2026-2027)
// ═══════════════════════════════════════════════════════════════════════

const II_ECE_DS_B: TimetableEntry = {
  section: 'II ECE-DS B',
  department: 'ECE - Data Science',
  year: 2,
  semester: 'III Semester - Odd (2026-27)',
  venue: 'IST 411 / AN',
  subjects: [
    { code: '21MAB201T', name: 'Transforms and Boundary Value Problems', slot: 'A', creditLTPC: '3-1-0-4', faculty: 'NEW FACULTY 3', department: 'AP/MAT', isLab: false },
    { code: '21ECC201T', name: 'Solid State Devices', slot: 'B', creditLTPC: '3-0-0-3', faculty: 'Dr. Jeevanantham S', department: 'AP/ECE DS', isLab: false },
    { code: '21CSS201T', name: 'Computer Organization and Architecture', slot: 'C', creditLTPC: '3-1-0-4', faculty: 'Dr. P. Murugapandiyan', department: 'Prof./ECE', isLab: false },
    { code: '21ECC203T', name: 'Digital Logic Design', slot: 'D', creditLTPC: '3-0-0-3', faculty: 'Dr.S.Krishnakumar', department: 'AP/ECE DS', isLab: false },
    { code: '21ECC205T', name: 'Electromagnetic Theory and Interference', slot: 'E', creditLTPC: '3-0-0-3', faculty: 'Dr.V. Bharathi', department: 'AP/ECE', isLab: false },
    { code: '21LEM201T', name: 'Professional Ethics', slot: 'F', creditLTPC: '1-0-0-0', faculty: 'Dr. K. Vigneshwaran', department: 'AP/ECE', isLab: false },
    { code: '21LEM202T', name: 'Universal Human Values-II', slot: 'G', creditLTPC: '2-1-0-3', faculty: 'Mrs.D.Lavanya', department: 'RS - ECE', isLab: false },
    { code: '21PDM201L', name: 'Verbal Reasoning', slot: 'H', creditLTPC: '0-0-2-0', faculty: '', department: 'CDC-TB-106', isLab: false },
    { code: '21PDH209T', name: 'Social Engineering', slot: 'I', creditLTPC: '2-0-0-2', faculty: 'Mrs.D. Lavanya', department: 'RS - ECE', isLab: false },
    { code: '21ECC211L', name: 'Devices and Digital IC Laboratory', slot: 'LAB', creditLTPC: '0-0-4-2', faculty: 'Dr.S.Krishnakumar', department: 'AP/ECE DS', isLab: true },
  ],
  schedule: [
    { day: 'Monday', periods: [null, null, null, 'LAB-309/107', 'LAB-309/107', null, 'D', 'B', 'C', 'I'] },
    { day: 'Tuesday', periods: ['LAB-309/107', 'LAB-309/107', null, null, null, null, 'C', 'D', 'E', 'A'] },
    { day: 'Wednesday', periods: ['G-401', 'G-401', null, null, null, null, 'I', 'E', 'A', 'D'] },
    { day: 'Thursday', periods: ['G-401', 'G-401', null, 'H-TB-106', 'H-TB-106', null, 'A', 'C', 'B', 'E'] },
    { day: 'Friday', periods: ['H-TB-106', 'H-TB-106', null, null, null, null, 'F', 'A', 'B', 'C'] },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// II BME — III Semester — Odd Semester (2026-2027)
// ═══════════════════════════════════════════════════════════════════════

const II_BME: TimetableEntry = {
  section: 'II BME',
  department: 'Biomedical Engineering',
  year: 2,
  semester: 'III Semester - Odd (2026-27)',
  venue: 'IST 602 / FN',
  subjects: [
    { code: '21MAB201T', name: 'Transforms and Boundary Value Problems', slot: 'A', creditLTPC: '3-1-0-4', faculty: 'Dr.A.Manickam', department: 'ASP/MAT', isLab: false },
    { code: '21BMC202T', name: 'Biomedical Signals and Systems', slot: 'B', creditLTPC: '3-0-0-3', faculty: 'Dr. Senthil Kumaran V N', department: 'ASP & HOD / ECE', isLab: false },
    { code: '21BMC203J', name: 'Electric and Electronic Circuits', slot: 'C', creditLTPC: '3-0-2-4', faculty: 'Dr. Prabin Kumar Bera', department: 'AP/ECE', isLab: false },
    { code: '21BMC204J', name: 'Digital Logic for Medical Systems', slot: 'D', creditLTPC: '2-0-2-3', faculty: 'Dr. G. Gifta', department: 'AP/BME', isLab: false },
    { code: '21PYS202T', name: 'Medical Physics', slot: 'E', creditLTPC: '3-0-0-3', faculty: 'Dr.D.Rajeswari', department: 'ASP/PHY', isLab: false },
    { code: '21LEM201T', name: 'Professional Ethics', slot: 'F', creditLTPC: '1-0-0-0', faculty: 'Dr. H.SriBhuvaneshwari', department: 'AP/ECE', isLab: false },
    { code: '21LEM202T', name: 'Universal Human Values-II', slot: 'G', creditLTPC: '2-1-0-3', faculty: 'Mrs.N.Suganthi', department: 'RS - ECE', isLab: false },
    { code: '21PDM201L', name: 'Verbal Reasoning', slot: 'H', creditLTPC: '0-0-2-0', faculty: '', department: 'CDC-TB-106', isLab: false },
    { code: '21PDH209T', name: 'Social Engineering', slot: 'I', creditLTPC: '2-0-0-2', faculty: 'Mrs. Francis Arockiya Mary', department: 'RS - EEE', isLab: false },
  ],
  schedule: [
    { day: 'Monday', periods: ['E', 'C', null, 'I', null, null, 'DLMS/EEC-107,309', 'DLMS/EEC-107,309', null] },
    { day: 'Tuesday', periods: ['C', 'E', null, 'B', 'A', null, 'H-TB-106', 'H-TB-106', null] },
    { day: 'Wednesday', periods: ['B', 'D', null, 'A', null, null, 'H-TB-106', 'G-602', null] },
    { day: 'Thursday', periods: ['A', 'E', null, 'B', 'D', null, null, null, 'DLMS/EEC-107,309'] },
    { day: 'Friday', periods: ['F', 'A', null, 'C', 'D', null, null, null, 'G-602'] },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// III ECE A — V Semester — Odd Semester (2026-2027)
// ═══════════════════════════════════════════════════════════════════════

const III_ECE_A: TimetableEntry = {
  section: 'III ECE-A',
  department: 'Electronics and Communication Engineering',
  year: 3,
  semester: 'V Semester - Odd (2026-27)',
  venue: 'IST 518/FN',
  subjects: [
    { code: '21MAB302T', name: 'Discrete Mathematics', slot: 'A', creditLTPC: '3-1-0-4', faculty: 'New Faculty 3', department: 'AP/Maths', isLab: false },
    { code: '21ECC301P', name: 'Microprocessor, Microcontroller, and Interfacing Techniques', slot: 'B', creditLTPC: '3-1-0-4', faculty: 'Dr.M.Manikandan', department: 'AP/ECE', isLab: false },
    { code: '21ECC303T', name: 'VLSI Design and Technology', slot: 'C', creditLTPC: '3-0-0-3', faculty: 'Dr.M.Jothi', department: 'AP/ECE', isLab: false },
    { code: '21ECE468T', name: 'System and Network on Chip', slot: 'D', creditLTPC: '3-0-0-3', faculty: 'Dr.V. Manikandan', department: 'AP/ECE-DS', isLab: false },
    { code: '21CSO355T', name: 'Machine learning for all', slot: 'E', creditLTPC: '3-0-0-3', faculty: 'Dr. J.Jencia', department: 'AP/BME', isLab: false },
    { code: '21GNP301L', name: 'Community connect', slot: 'F', creditLTPC: '0-0-2-1', faculty: 'Dr.V .Rajesh / Dr. V.Bharathi', department: 'AP/ECE', isLab: false },
    { code: '21PDM301L', name: 'Analytical and logical thinking skills', slot: 'G', creditLTPC: '0-0-2-0', faculty: '', department: 'CDC / 625', isLab: false },
    { code: '21LEM301T', name: 'Indian Art Form', slot: 'H', creditLTPC: '1-0-0-0', faculty: 'Dr.K.Vigneshwaran', department: 'AP/ECE', isLab: false },
    { code: '21ECC311L', name: 'VLSI Design/ Microprocessor Laboratory', slot: 'LAB', creditLTPC: '0-0-4-2', faculty: 'Dr.M.Jothi & Dr. P. Murugapandiyan / Dr.V. Manikandan', department: 'AP /ECE / Prof. /ECE / AP / ECE-DS', isLab: true },
  ],
  schedule: [
    { day: 'Monday', periods: ['E', 'B', null, 'B', 'A', null, 'G-625', 'G-625', null] },
    { day: 'Tuesday', periods: ['H', 'D', null, 'B', 'B-Proj', null, null, 'G-625', 'G-625'] },
    { day: 'Wednesday', periods: ['C', 'A', null, 'D', 'F', null, null, null, 'LAB-108/309'] },
    { day: 'Thursday', periods: ['A', 'E', null, 'C', 'F', null, null, null, null] },
    { day: 'Friday', periods: ['D', 'A', null, 'E', 'C', null, 'LAB-108/309', 'LAB-108/309', null] },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// III ECE B — V Semester — Odd Semester (2026-2027)
// ═══════════════════════════════════════════════════════════════════════

const III_ECE_B: TimetableEntry = {
  section: 'III ECE-B',
  department: 'Electronics and Communication Engineering',
  year: 3,
  semester: 'V Semester - Odd (2026-27)',
  venue: 'IST 518/AN',
  subjects: [
    { code: '21MAB302T', name: 'Discrete Mathematics', slot: 'A', creditLTPC: '3-1-0-4', faculty: 'Dr.M.Thanga Rejini', department: 'AP/Maths', isLab: false },
    { code: '21ECC301P', name: 'Microprocessor, Microcontroller, and Interfacing Techniques', slot: 'B', creditLTPC: '3-1-0-4', faculty: 'Mrs. B. Abirami', department: 'EO/SRMIST', isLab: false },
    { code: '21ECC303T', name: 'VLSI Design and Technology', slot: 'C', creditLTPC: '3-0-0-3', faculty: 'Dr.R.Vinoth Raj', department: 'AP/ECE-DS', isLab: false },
    { code: '21ECE468T', name: 'System and Network on Chip', slot: 'D', creditLTPC: '3-0-0-3', faculty: 'Dr.V. Manikandan', department: 'AP/ECE-DS', isLab: false },
    { code: '21CSO355T', name: 'Machine learning for all', slot: 'E', creditLTPC: '3-0-0-3', faculty: 'Dr. J.Jencia', department: 'AP/BME', isLab: false },
    { code: '21GNP301L', name: 'Community connect', slot: 'F', creditLTPC: '0-0-2-1', faculty: 'Dr. H. Sudharsan / Ms. T.Swetha', department: 'AP/ECE', isLab: false },
    { code: '21PDM301L', name: 'Analytical and logical thinking skills', slot: 'G', creditLTPC: '0-0-2-0', faculty: '', department: 'CDC – 625', isLab: false },
    { code: '21LEM301T', name: 'Indian Art Form', slot: 'H', creditLTPC: '1-0-0-0', faculty: 'Dr. A.Anand', department: 'AP/ECE', isLab: false },
    { code: '21ECC311L', name: 'VLSI Design/ Microprocessor Laboratory', slot: 'LAB', creditLTPC: '0-0-4-2', faculty: 'Dr.Sreenivasa Ijada Rao / Dr. B. DeviSri & Dr. Prassanna Venkatesh', department: 'Prof. /ECE / AP / ECE / AP / BME', isLab: true },
  ],
  schedule: [
    { day: 'Monday', periods: ['LAB-108/309', 'LAB-108/309', null, null, null, null, 'E', 'B', 'A', 'D'] },
    { day: 'Tuesday', periods: ['G-625', 'G-625', null, null, null, null, 'F', 'B', 'D', 'C'] },
    { day: 'Wednesday', periods: ['G-625', 'G-625', null, null, null, null, 'B-Proj', 'B', 'A', 'H'] },
    { day: 'Thursday', periods: ['LAB-108/309', 'LAB-108/309', null, null, null, null, 'A', 'C', 'E', 'F'] },
    { day: 'Friday', periods: [null, null, null, null, null, null, 'C', 'A', 'E', 'D'] },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// III ECE-DS — V Semester — Odd Semester (2026-2027)
// ═══════════════════════════════════════════════════════════════════════

const III_ECE_DS: TimetableEntry = {
  section: 'III ECE-DS',
  department: 'ECE - Data Science',
  year: 3,
  semester: 'V Semester - Odd (2026-27)',
  venue: 'IST 519/FN',
  subjects: [
    { code: '21MAB302T', name: 'Discrete Mathematics', slot: 'A', creditLTPC: '3-1-0-4', faculty: 'New faculty 2', department: 'AP/Maths', isLab: false },
    { code: '21ECC301P', name: 'Microprocessor, Microcontroller, and Interfacing Techniques', slot: 'B', creditLTPC: '3-1-0-4', faculty: 'Mrs. B. Abirami', department: 'EO/SRMIST', isLab: false },
    { code: '21ECC303T', name: 'VLSI Design and Technology', slot: 'C', creditLTPC: '3-0-0-3', faculty: 'Dr.R.Vinoth Raj', department: 'AP/ECE-DS', isLab: false },
    { code: '21CSO355T', name: 'Machine learning for all', slot: 'D', creditLTPC: '3-0-0-3', faculty: 'Dr. Dr.Chitra Devi', department: 'ASP/SoC', isLab: false },
    { code: '21ECE371T', name: 'Database Design and Management', slot: 'E', creditLTPC: '3-0-0-3', faculty: 'Dr. S.Saraswathi', department: 'AP/SoC', isLab: false },
    { code: '21GNP301L', name: 'Community connect', slot: 'F', creditLTPC: '0-0-2-1', faculty: 'Dr. S.Jeevanantham / Dr.V. Manikandan', department: 'AP/ECE-DS', isLab: false },
    { code: '21PDM301L', name: 'Analytical and logical thinking skills', slot: 'G', creditLTPC: '0-0-2-0', faculty: '', department: 'CDC-625', isLab: false },
    { code: '21LEM301T', name: 'Indian Art Form', slot: 'H', creditLTPC: '1-0-0-0', faculty: 'Dr.Prabin Kumar Bera', department: 'AP/ECE', isLab: false },
    { code: '21ECC311L', name: 'VLSI Design/ Microprocessor Laboratory', slot: 'LAB', creditLTPC: '0-0-4-2', faculty: 'Dr. R. Vinothraj / Dr. H. Sri Bhuvaneshwari', department: 'AP/ECE DS / AP/ECE', isLab: true },
  ],
  schedule: [
    { day: 'Monday', periods: ['E', 'B', null, 'C', 'A', null, null, null, null] },
    { day: 'Tuesday', periods: ['C', 'B', null, 'D', 'F', null, 'LAB-108/107', 'LAB-108/107', null] },
    { day: 'Wednesday', periods: ['H', 'B', null, 'A', 'C', null, null, null, 'G-625'] },
    { day: 'Thursday', periods: [null, 'D', null, 'E', 'F', null, null, null, null] },
    { day: 'Friday', periods: ['D', 'A', null, 'E', 'B-Proj', null, 'G-625', 'G-625', 'LAB-108/107'] },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// III BME — V Semester — Odd Semester (2026-2027)
// ═══════════════════════════════════════════════════════════════════════

const III_BME: TimetableEntry = {
  section: 'III BME',
  department: 'Biomedical Engineering',
  year: 3,
  semester: 'V Semester - Odd (2026-27)',
  venue: 'IST 211 / AN',
  subjects: [
    { code: '21MAB301T', name: 'Probability and Statistics', slot: 'A', creditLTPC: '3-1-0-4', faculty: 'Dr. K. M. Karuppusamy', department: 'AP/Maths', isLab: false },
    { code: '21BMC302J', name: 'Microcontrollers and Its Application in Medicine', slot: 'B', creditLTPC: '3-0-2-4', faculty: 'Dr.K.Vigneshwaran', department: 'ASP/ECE', isLab: false },
    { code: '21BMC301J', name: 'Biomedical Signal Processing', slot: 'C', creditLTPC: '3-0-2-4', faculty: 'Dr. V.N. Senthilkumaran', department: 'ASP & HOD / ECE', isLab: false },
    { code: '21BME266T', name: 'Biometrics', slot: 'D', creditLTPC: '3-0-0-3', faculty: 'Dr. G. Gifta', department: 'AP/BME', isLab: false },
    { code: '21ECO103T', name: 'Modern wireless communication system', slot: 'E', creditLTPC: '3-0-0-3', faculty: 'Dr. Vaishnavi', department: 'AP/ECE', isLab: false },
    { code: '21BMC303T', name: 'Principles of Medical Imaging', slot: 'F', creditLTPC: '3-0-0-3', faculty: 'Dr.N.Prasana venkatesh', department: 'AP/BME', isLab: false },
    { code: '21PDM301L', name: 'Analytical and Logical Thinking Skills', slot: 'G', creditLTPC: '0-0-2-0', faculty: '', department: 'CDC-625', isLab: false },
    { code: '21LEM301T', name: 'Indian Art Form', slot: 'H', creditLTPC: '1-0-0-0', faculty: 'Dr. G. Gifta', department: 'AP/BME', isLab: false },
    { code: '21GNP301L', name: 'Community Connect', slot: 'I', creditLTPC: '0-0-2-1', faculty: 'Dr. J.Jencia / Dr.N.Prasanna Venkatesh', department: 'AP/BME', isLab: false },
  ],
  schedule: [
    { day: 'Monday', periods: ['G-625', 'G-625', null, 'MPMC LAB-107', 'MPMC LAB-107', null, 'E', 'B', 'F', 'H'] },
    { day: 'Tuesday', periods: ['BIO DSP LAB-108', 'BIO DSP LAB-108', null, 'G-625', null, null, 'C', 'D', 'A', 'B'] },
    { day: 'Wednesday', periods: [null, null, null, null, null, null, 'C', 'A', 'F', 'D'] },
    { day: 'Thursday', periods: [null, null, null, 'I-108', null, null, 'A', 'C', 'E', 'B'] },
    { day: 'Friday', periods: ['I-108', 'I-108', null, null, null, null, 'F', 'A', 'D', 'E'] },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// IV ECE-A — VII Semester — Odd Semester (2026-2027)
// ═══════════════════════════════════════════════════════════════════════

const IV_ECE_A: TimetableEntry = {
  section: 'IV ECE-A',
  department: 'Electronics and Communication Engineering',
  year: 4,
  semester: 'VII Semester - Odd (2026-27)',
  venue: 'IST 225',
  subjects: [
    { code: '21GNH401T', name: 'Behavioural Psychology', slot: 'A', creditLTPC: '2-1-0-3', faculty: 'Dr.A.Anand', department: 'AP/ECE', isLab: false },
    { code: '21ECC401T', name: 'Wireless Communication and Antenna Systems', slot: 'B', creditLTPC: '3-0-0-3', faculty: 'Dr.K.Vigneshwaran,', department: 'AP/ECE', isLab: false },
    { code: '21ECC402P', name: 'Computer Communication and Network Security', slot: 'C', creditLTPC: '2-1-0-3', faculty: 'Dr.S.Jeevanantham', department: 'AP/ECE-DS', isLab: false },
    { code: '21ECE461T', name: 'Semiconductor Memory Design', slot: 'D', creditLTPC: '3-0-0-3', faculty: 'Dr. H.SriBhuvaneshwari', department: 'AP/ECE', isLab: false },
    { code: '21ECE463T', name: 'Scripting Language for Electronic Design Automation', slot: 'E', creditLTPC: '3-0-0-3', faculty: 'Dr. Sreenivasa Rao Ijada,', department: 'Prof/ECE', isLab: false },
    { code: '21CSO355T', name: 'Machine learning for all', slot: 'F', creditLTPC: '3-0-0-3', faculty: 'Dr.N.Prasanna Venkatesh', department: 'AP/BME', isLab: false },
    { code: '21ECC402P', name: 'Computer Communication and Network Security (LAB)', slot: 'LAB', creditLTPC: '2-1-0-3', faculty: 'Mrs.T.Swetha', department: 'AP/ECE', isLab: true },
  ],
  schedule: [
    { day: 'Monday', periods: ['C', null, null, 'A', 'D', null, null, null, null] },
    { day: 'Tuesday', periods: ['C', 'D', null, 'B', 'F', null, null, null, null] },
    { day: 'Wednesday', periods: ['B', null, 'LAB-IST-108', 'E', 'F', null, null, null, null] },
    { day: 'Thursday', periods: ['F', 'A', null, 'E', 'B', null, null, null, null] },
    { day: 'Friday', periods: ['C', 'A', null, 'D', 'E', null, null, null, null] },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// IV ECE-B — VII Semester — Odd Semester (2026-2027)
// ═══════════════════════════════════════════════════════════════════════

const IV_ECE_B: TimetableEntry = {
  section: 'IV ECE-B',
  department: 'Electronics and Communication Engineering',
  year: 4,
  semester: 'VII Semester - Odd (2026-27)',
  venue: 'IST 227',
  subjects: [
    { code: '21GNH401T', name: 'Behavioural Psychology', slot: 'A', creditLTPC: '2-1-0-3', faculty: 'Dr.A.Annand', department: 'AP/ECE', isLab: false },
    { code: '21ECC401T', name: 'Wireless Communication and Antenna Systems', slot: 'B', creditLTPC: '3-0-0-3', faculty: 'Dr.K.Vigneshwaran,', department: 'AP/ECE', isLab: false },
    { code: '21ECC402P', name: 'Computer Communication and Network Security', slot: 'C', creditLTPC: '2-1-0-3', faculty: 'Dr. R. Rajasekar', department: 'ASP & HOD ECE – DS', isLab: false },
    { code: '21ECE461T', name: 'Semiconductor Memory Design', slot: 'D', creditLTPC: '3-0-0-3', faculty: 'Dr. H.SriBhuvaneshwari', department: 'AP/ECE', isLab: false },
    { code: '21ECE463T', name: 'Scripting Language for Electronic Design Automation', slot: 'E', creditLTPC: '3-0-0-3', faculty: 'Dr. Sreenivasa Rao Ijada', department: 'Prof/ECE', isLab: false },
    { code: '21CSO355T', name: 'Machine learning for all', slot: 'F', creditLTPC: '3-0-0-3', faculty: 'Dr.N.Prasanna Venkatesh', department: 'AP/BME', isLab: false },
    { code: '21ECC402P', name: 'Computer Communication and Network Security (LAB)', slot: 'LAB', creditLTPC: '2-1-0-3', faculty: 'Ms.T.Swetha', department: 'AP / ECE', isLab: true },
  ],
  schedule: [
    { day: 'Monday', periods: ['C', 'A', null, 'E', 'F', null, null, null, null] },
    { day: 'Tuesday', periods: ['C', 'E', null, 'F', 'B', null, null, null, null] },
    { day: 'Wednesday', periods: ['C', 'D', null, 'A', 'B', null, null, null, null] },
    { day: 'Thursday', periods: ['D', 'B', null, 'LAB-IST-108', 'A', null, null, null, null] },
    { day: 'Friday', periods: ['E', 'D', null, null, 'F', null, null, null, null] },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// I ECE-A — I Semester — Odd (2024-25) [older timetable]
// ═══════════════════════════════════════════════════════════════════════

const I_ECE_A: TimetableEntry = {
  section: 'I ECE-A',
  department: 'Electronics and Communication Engineering',
  year: 1,
  semester: 'I Semester - Odd (2024-25)',
  venue: 'IST 602',
  subjects: [
    { code: '21LEH104T', name: 'German', slot: '-', creditLTPC: '2-1-0-3', faculty: 'Mr. Selva', department: 'German', isLab: false },
    { code: '21GNH101J', name: 'Philosophy of Engineering', slot: 'E', creditLTPC: '1-0-2-2', faculty: 'Dr. R. Aarthi', department: 'AP/Phy', isLab: false },
    { code: '21MAB102T', name: 'Advanced Calculus and Complex Analysis', slot: 'A', creditLTPC: '3-1-0-4', faculty: 'Dr. R. Ragul', department: 'AP / Maths', isLab: false },
    { code: '21CYB101J', name: 'Chemistry', slot: 'B', creditLTPC: '3-1-2-5', faculty: 'Dr. P. Pachamuthu', department: 'AP/Che', isLab: false },
    { code: '21BTB102J', name: 'Electronic System and PCB Design', slot: 'C', creditLTPC: '2-0-0-2', faculty: 'Dr. U. Shajith Ali', department: 'Asso.Prof/EEE', isLab: false },
    { code: '21CSS101J', name: 'Programming for Problem Solving', slot: 'D', creditLTPC: '3-0-2-4', faculty: 'Dr. A. Rama Prasath', department: 'Asso.Prof/CA', isLab: false },
    { code: '21MES101L', name: 'Basic Civil and Mechanical Workshop', slot: '-', creditLTPC: '0-0-4-2', faculty: 'Dr. N.S. Balaji / Dr. M. Kumaran', department: 'Asst.Prof/Mech', isLab: true },
    { code: '21PDM102L', name: 'General Aptitude', slot: '-', creditLTPC: '0-0-2-0', faculty: 'Mr. Sivanandhan', department: 'Communication Trainer', isLab: false },
    { code: '21GNM102L', name: 'NSS', slot: '-', creditLTPC: '0-0-2-0', faculty: 'Dr. R. Manickam', department: 'Physical Director', isLab: false },
    { code: '21BTB103T', name: 'Biology', slot: 'F', creditLTPC: '2-0-0-2', faculty: 'Dr. M. Jaya Priya', department: 'AP/Biotech.', isLab: false },
  ],
  schedule: [
    { day: 'Monday', periods: ['E', 'E', 'B', null, 'A', null, null, 'F', 'CDC'] },
    { day: 'Tuesday', periods: ['C', 'B', 'A', null, 'D', null, null, null, null] },
    { day: 'Wednesday', periods: ['B', 'E', 'D', null, null, null, 'PPS LAB', 'PPS LAB', 'PCB Lab'] },
    { day: 'Thursday', periods: [null, 'German', null, 'A', null, null, 'CDC', 'CDC', null] },
    { day: 'Friday', periods: ['D', 'A', 'C', null, 'B', null, 'F', null, 'German'] },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// I ECE-B & EEE — I Semester — Odd (2024-25) [older timetable]
// ═══════════════════════════════════════════════════════════════════════

const I_ECE_B_EEE: TimetableEntry = {
  section: 'I ECE-B & EEE',
  department: 'ECE / EEE',
  year: 1,
  semester: 'I Semester - Odd (2024-25)',
  venue: 'IST 602',
  subjects: [
    { code: '21LEH104T', name: 'German', slot: '-', creditLTPC: '2-1-0-3', faculty: 'Mr. Selva', department: 'German', isLab: false },
    { code: '21GNH101J', name: 'Philosophy of Engineering', slot: 'E', creditLTPC: '1-0-2-2', faculty: 'Dr. R. Aarthi', department: 'AP/Phy', isLab: false },
    { code: '21MAB102T', name: 'Advanced Calculus and Complex Analysis', slot: 'A', creditLTPC: '3-1-0-4', faculty: 'Dr. M. Deepa', department: 'AP / Maths', isLab: false },
    { code: '21CYB101J', name: 'Chemistry', slot: 'B', creditLTPC: '3-1-2-5', faculty: 'Dr. N. Prabhu', department: 'AP/Che', isLab: false },
    { code: '21BTB102J', name: 'Electronic System and PCB Design (for ECE)', slot: 'F', creditLTPC: '2-0-0-2', faculty: 'Dr. U. Shajith Ali', department: 'Asso.Prof./EEE', isLab: false },
    { code: '21CSS101J', name: 'Programming for Problem Solving', slot: 'D', creditLTPC: '3-0-2-4', faculty: 'Dr. A. Rama Prasath', department: 'Asso.Prof./CA', isLab: false },
    { code: '21MES101L', name: 'Basic Civil and Mechanical Workshop', slot: '-', creditLTPC: '0-0-4-2', faculty: 'Dr. Modasir MD Khan / Mr.M.Karthikeyan', department: 'AP/Mech', isLab: true },
    { code: '21PDM102L', name: 'General Aptitude', slot: '-', creditLTPC: '0-0-2-0', faculty: 'Mrs. Thenmozhi', department: 'Communication Trainer', isLab: false },
    { code: '21GNM102L', name: 'NSS', slot: '-', creditLTPC: '0-0-2-0', faculty: 'Dr. R. Manickam', department: 'Physical Director', isLab: false },
    { code: '21BTB103T', name: 'Biology', slot: 'C', creditLTPC: '2-0-0-2', faculty: 'Dr. M. Jaya Priya', department: 'AP/Biotech.', isLab: false },
    { code: '21EEC101J', name: 'Electrical Circuits (for EEE)', slot: 'G', creditLTPC: '2-0-0-2', faculty: 'Dr.Dheepanchakkravarthy', department: 'Asso.Prof/EEE', isLab: false },
  ],
  schedule: [
    { day: 'Monday', periods: ['CDC', 'F/G', null, null, 'Che lab', null, 'E', 'E', 'B', 'A'] },
    { day: 'Tuesday', periods: [null, null, null, 'Workshop (IST 20,21)', null, null, 'C', 'B', 'A', 'D'] },
    { day: 'Wednesday', periods: ['F', 'PPS Lab', 'CDC', 'CDC', 'PPS LAB', null, 'B', 'E', 'D', null] },
    { day: 'Thursday', periods: ['NSS', 'NSS', 'C', 'A', null, null, 'D', null, 'German', null] },
    { day: 'Friday', periods: [null, 'PCB Lab/EC Lab', null, 'German', null, null, null, 'B', 'A', null] },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// I ECE-DS — II Semester — Even (2024-25) [older timetable]
// ═══════════════════════════════════════════════════════════════════════

const I_ECE_DS: TimetableEntry = {
  section: 'I ECE-DS',
  department: 'ECE - Data Science',
  year: 1,
  semester: 'II Semester - Even (2024-25)',
  venue: 'IST 502',
  subjects: [
    { code: '21LEH104T', name: 'German', slot: '-', creditLTPC: '2-1-0-3', faculty: 'Mr. Selva', department: 'German', isLab: false },
    { code: '21GNH101J', name: 'Philosophy of Engineering', slot: 'E', creditLTPC: '1-0-2-2', faculty: 'Dr. R. Ramesh', department: 'Asso.Prof./Mech', isLab: false },
    { code: '21MAB102T', name: 'Advanced Calculus and Complex Analysis', slot: 'A', creditLTPC: '3-1-0-4', faculty: 'Dr. Pandivarajan', department: 'AP / Maths', isLab: false },
    { code: '21CYB101J', name: 'Chemistry', slot: 'B', creditLTPC: '3-1-2-5', faculty: 'Dr. Ujjwala', department: 'AP/Che', isLab: false },
    { code: '21BTB102J', name: 'Electronic System and PCB Design', slot: 'C', creditLTPC: '2-0-0-2', faculty: 'Dr. V.N.Senthil Kumaran', department: 'Asso.Prof/ECE', isLab: false },
    { code: '21CSS101J', name: 'Programming for Problem Solving', slot: 'D', creditLTPC: '3-0-2-4', faculty: 'Mrs. R. Sharanya', department: 'AP/CSE', isLab: false },
    { code: '21MES101L', name: 'Basic Civil and Mechanical Workshop', slot: '-', creditLTPC: '0-0-4-2', faculty: 'Dr. Sakthibalan / Dr. MD Modasir Khan', department: 'AP/Mech', isLab: true },
    { code: '21PDM102L', name: 'General Aptitude', slot: '-', creditLTPC: '0-0-2-0', faculty: 'Mr. Sivanandhan', department: 'Communication Trainer', isLab: false },
    { code: '21GNM102L', name: 'NSS', slot: '-', creditLTPC: '0-0-2-0', faculty: 'Dr. R. Manickam', department: 'Physical Director', isLab: false },
    { code: '21BTB103T', name: 'Biology', slot: 'F', creditLTPC: '2-0-0-2', faculty: 'Dr.M.Maria Leena', department: 'AP/Biotech.', isLab: false },
  ],
  schedule: [
    { day: 'Monday', periods: ['F', 'CDC', null, 'PCB Lab', null, null, 'E', 'E', 'B', 'A'] },
    { day: 'Tuesday', periods: [null, 'Che lab', null, 'NSS', 'NSS', null, 'C', 'B', 'A', 'D'] },
    { day: 'Wednesday', periods: ['CDC', 'CDC', 'A', null, 'PPS Lab/PPS LAB', null, 'B', 'E', 'D', null] },
    { day: 'Thursday', periods: ['F', 'A', 'D', null, null, null, 'B', null, 'C', 'B'] },
    { day: 'Friday', periods: [null, null, 'German', null, null, null, null, null, 'Workshop (IST 20,21)', null] },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// I Biotech-B / Biomedical Engg — II Semester — Even (2024-25)
// ═══════════════════════════════════════════════════════════════════════

const I_BIOTECH_B_BIOMED: TimetableEntry = {
  section: 'I Biotech-B / Biomed. Engg.',
  department: 'Biotech / Biomedical Engineering',
  year: 1,
  semester: 'II Semester - Even (2024-25)',
  venue: 'IST 702',
  subjects: [
    { code: '21LEH105T', name: 'Japanese', slot: '-', creditLTPC: '2-1-0-3', faculty: 'Mr. Nadeem', department: 'Japanese', isLab: false },
    { code: '21GNH101J', name: 'Philosophy of Engineering', slot: 'E', creditLTPC: '1-0-2-2', faculty: 'Dr. J. Ramya Parkavi', department: 'AP/Phy', isLab: false },
    { code: '21MAB102T', name: 'Advanced Calculus and Complex Analysis', slot: 'A', creditLTPC: '3-1-0-4', faculty: 'Dr. R. Suresh', department: 'AP / Maths', isLab: false },
    { code: '21CYB101J', name: 'Chemistry', slot: 'B', creditLTPC: '3-1-2-5', faculty: 'Dr. R. Logudurai', department: 'AP/Che', isLab: false },
    { code: '21CSS101J', name: 'Programming for Problem Solving', slot: 'D', creditLTPC: '3-0-2-4', faculty: 'Dr. B. Chitradevi', department: 'AP/CSE', isLab: false },
    { code: '21BTC105T', name: 'Cell biology (for Biotech)', slot: 'C', creditLTPC: '2-0-0-2', faculty: 'Dr. Daniel Paul', department: 'AP/Biotech.', isLab: false },
    { code: '21MES101L', name: 'Basic Civil and Mechanical Workshop', slot: '-', creditLTPC: '0-0-4-2', faculty: 'Dr.R.Manimaran / Dr.R.Ramesh', department: 'AP/Mech / Asso.Prof/Mech', isLab: true },
    { code: '21PDM102L', name: 'General Aptitude', slot: '-', creditLTPC: '0-0-2-0', faculty: 'Mr. Sivanandhan', department: 'Communication Trainer', isLab: false },
    { code: '21GNM101L', name: 'Physical and Mental Health using Yoga', slot: '-', creditLTPC: '0-0-2-0', faculty: 'Ms. Balasivapriya', department: 'Physical Instructor', isLab: false },
    { code: '21BTC101T', name: 'Biochemistry (for Biotech)', slot: 'F', creditLTPC: '3-0-0-3', faculty: 'Dr. M. Jaya Priya', department: 'AP/Biotech.', isLab: false },
    { code: '21BTB104T', name: 'Biology: Human physiology and anatomy (only for BME)', slot: 'G', creditLTPC: '2-0-0-2', faculty: '', department: '', isLab: false },
  ],
  schedule: [
    { day: 'Monday', periods: ['C', 'YOGA', 'YOGA', 'F/G', null, null, 'E', 'E', 'A', 'B'] },
    { day: 'Tuesday', periods: ['CDC', 'CDC', 'C', 'F', null, null, null, 'B', 'A', 'D'] },
    { day: 'Wednesday', periods: [null, null, null, 'Workshop (IST 20,21)', null, null, 'D', 'B', 'E', 'D'] },
    { day: 'Thursday', periods: [null, 'A', 'C/G', null, null, null, 'B', null, null, 'Japanese'] },
    { day: 'Friday', periods: ['F', 'CDC', 'A', null, 'Japanese', null, null, null, 'PPS LAB', 'PPS LAB'] },
  ],
};


// ═══════════════════════════════════════════════════════════════════════
// Exported map: section name → timetable data
// ═══════════════════════════════════════════════════════════════════════

export const TIMETABLES: Record<string, TimetableEntry> = {
  'II ECE-DS A': II_ECE_DS_A,
  'II ECE-DS B': II_ECE_DS_B,
  'II BME': II_BME,
  'III ECE-A': III_ECE_A,
  'III ECE-B': III_ECE_B,
  'III ECE-DS': III_ECE_DS,
  'III BME': III_BME,
  'IV ECE-A': IV_ECE_A,
  'IV ECE-B': IV_ECE_B,
  'I ECE-A': I_ECE_A,
  'I ECE-B & EEE': I_ECE_B_EEE,
  'I ECE-DS': I_ECE_DS,
  'I Biotech-B / Biomed. Engg.': I_BIOTECH_B_BIOMED,
};

// Helper to get subjects list for a section (for the input form)
export function getSubjectsForSection(sectionKey: string): SubjectInfo[] {
  const entry = TIMETABLES[sectionKey];
  if (!entry) return [];
  return entry.subjects.filter(s => !s.isLab || s.creditLTPC !== '0-0-0-0');
}

// Helper to count weekly periods per subject slot
export function countWeeklyPeriods(sectionKey: string, subjectSlot: string): number {
  const entry = TIMETABLES[sectionKey];
  if (!entry) return 0;
  let count = 0;
  for (const day of entry.schedule) {
    for (const period of day.periods) {
      if (period === subjectSlot) count++;
    }
  }
  return count;
}
