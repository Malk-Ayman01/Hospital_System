
export const medicalRecords = [
  {
    id: 1,
    patientId: "PAT-84920",
    name: "سارة أحمد",
    age: 28,
    gender: "أنثى",
    phone: "01000000000",
    medicalHistory: "ارتفاع ضغط الدم",
    allergies: "حساسية البنسلين",
    visits: [
      {
        id: 101,
        date: "2026-11-15",
        symptoms: "صداع ودوخة",
        notes: "المريضة تشكو من صداع متكرر",
        diagnosis: "ارتفاع ضغط الدم",
        vitals: {
          bloodPressure: "125/82",
          heartRate: "74",
          temperature: "37",
        },
        prescription: [
          {
            medication: "Amlodipine 5mg",
            dosage: "قرص واحد يوميًا",
            instructions: "بعد الإفطار",
          },
        ],
        labTests: [
          { name: "تحليل دهون الدم", result: "لم تظهر النتيجة بعد" },
        ],
      },
      {
        id: 102,
        date: "2026-10-20",
        symptoms: "متابعة دورية",
        notes: "تحسن الحالة مع الانتظام على العلاج",
        diagnosis: "ارتفاع ضغط الدم",
        vitals: {
          bloodPressure: "130/85",
          heartRate: "76",
          temperature: "37",
        },
        prescription: [
          {
            medication: "Amlodipine 5mg",
            dosage: "قرص واحد يوميًا",
            instructions: "بعد الإفطار",
          },
        ],
        labTests: [],
      },
    ],
  },
  {
    id: 2,
    patientId: "PAT-84921",
    name: "أحمد محمد",
    age: 42,
    gender: "ذكر",
    phone: "01100000000",
    medicalHistory: "مرض السكري من النوع الثاني",
    allergies: "لا يوجد",
    visits: [
      {
        id: 201,
        date: "2026-11-12",
        symptoms: "إرهاق وعطش مستمر",
        notes: "تمت مراجعة مستوى السكر",
        diagnosis: "ارتفاع مستوى السكر في الدم",
        vitals: {
          bloodPressure: "120/80",
          heartRate: "80",
          temperature: "36.8",
        },
        prescription: [
          {
            medication: "Metformin 500mg",
            dosage: "قرص مرتين يوميًا",
            instructions: "مع الطعام",
          },
        ],
        labTests: [
          { name: "تحليل السكر التراكمي", result: "7.2%" },
        ],
      },
    ],
  },
  {
    id: 3,
    patientId: "PAT-84922",
    name: "منى علي",
    age: 35,
    gender: "أنثى",
    phone: "01200000000",
    medicalHistory: "لا يوجد تاريخ مرضي مسجل",
    allergies: "حساسية من بعض المسكنات",
    visits: [
      {
        id: 301,
        date: "2026-11-10",
        symptoms: "ألم في المعدة",
        notes: "تمت مراجعة الأعراض ونمط التغذية",
        diagnosis: "التهاب بالمعدة",
        vitals: {
          bloodPressure: "118/78",
          heartRate: "72",
          temperature: "37",
        },
        prescription: [
          {
            medication: "Omeprazole 20mg",
            dosage: "كبسولة يوميًا",
            instructions: "قبل الإفطار",
          },
        ],
        labTests: [],
      },
    ],
  },
];

export const MEDICAL_RECORDS_KEY = "carepath_medical_records";
