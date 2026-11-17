
// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import {
//   PieChart,
//   ListOrdered,
//   UserRound,
//   FilePlus2,
//   Save,
// } from "lucide-react";


// export default function ConsultationRoom() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Receive the selected patient from the waiting queue
//   const patient = location.state?.patient || {};

//   // Consultation form data
//   const [formData, setFormData] = useState({
//     medicalHistory: "",
//     vitals: {
//       bloodPressure: "",
//       heartRate: "",
//       temperature: "",
//     },
//     notes: "",
//     diagnosis: "",
//     medication: "",
//     dosage: "",
//     labTest: "",
//   });

//   const navItems = [
//     { name: "لوحة تحكم الطبيب", icon: PieChart, path: "/doctor/doctordashboard" },
//     { name: "قائمة الانتظار", icon: ListOrdered, path: "/doctor/queue" },
//     { name: "غرفة الكشف", icon: UserRound, path: "/doctor/consultation" },
//     { name: "السجلات الطبية", icon: FilePlus2, path: "/doctor/records" },
//   ];

//   // Update a single form field
//   const handleChange = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   // Update vital signs
//   const handleVitalChange = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       vitals: {
//         ...prev.vitals,
//         [field]: value,
//       },
//     }));
//   };

//   // Save consultation data
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const consultation = {
//       patientId: patient.id,
//       ...formData,
//     };

//     console.log("Consultation data:", consultation);

//     // Replace this with an API request when the backend is ready
//   };

//   return (
//    <main
//     dir="rtl"
//     className="flex-1 min-w-0 p-4 sm:p-6 lg:p-10 bg-slate-50 min-h-screen"
//   >
//     {/* SideBar */}
    
//         <div className="max-w-7xl mx-auto">
//           {/* Page Header */}
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
//             <div>
//               <h1 className="text-2xl font-bold text-dark">
//                 غرفة الكشف
//               </h1>

//               <p className="text-sm text-slate-500 mt-2">
//                 بيانات المريض: {patient.name || "غير محدد"}
//               </p>
//             </div>

//             <button
//               type="button"
//               onClick={handleSubmit}
//               className="flex items-center justify-center gap-2 bg-primary hover:bg-sky-700 text-white px-5 py-3 rounded-xl transition"
//             >
//               <Save size={18} />
//               حفظ الروشتة
//             </button>
//           </div>

//           {/* Patient Information */}
//           <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-6">
//             <h2 className="font-bold text-dark mb-4">بيانات المريض</h2>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
//               <p>
//                 <span className="text-slate-500">الاسم: </span>
//                 <span className="font-semibold">
//                   {patient.name || "غير متوفر"}
//                 </span>
//               </p>

//               <p>
//                 <span className="text-slate-500">كود المريض: </span>
//                 <span className="font-semibold">
//                   {patient.patientCode || "غير متوفر"}
//                 </span>
//               </p>

//               <p>
//                 <span className="text-slate-500">رقم الانتظار: </span>
//                 <span className="font-semibold">
//                   {patient.ticketNumber || "غير متوفر"}
//                 </span>
//               </p>
//             </div>
//           </div>

//           <form onSubmit={handleSubmit}>
//             <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
//               {/* Medical History and Vitals */}
//               <section className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 space-y-5">
//                 <div>
//                   <h2 className="font-bold text-dark mb-3">
//                     التاريخ الطبي
//                   </h2>

//                   <textarea
//                     rows={4}
//                     value={formData.medicalHistory}
//                     onChange={(e) =>
//                       handleChange("medicalHistory", e.target.value)
//                     }
//                     placeholder="اكتب التاريخ الطبي للمريض..."
//                     className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-primary"
//                   />
//                 </div>

//                 <div>
//                   <h2 className="font-bold text-dark mb-3">
//                     القياسات الحيوية
//                   </h2>

//                   <div className="space-y-3">
//                     <label className="block text-sm text-slate-600">
//                       ضغط الدم
//                       <input
//                         value={formData.vitals.bloodPressure}
//                         onChange={(e) =>
//                           handleVitalChange("bloodPressure", e.target.value)
//                         }
//                         placeholder="مثال: 120/80"
//                         className="w-full mt-1 border border-slate-200 rounded-xl p-3"
//                       />
//                     </label>

//                     <label className="block text-sm text-slate-600">
//                       معدل ضربات القلب
//                       <input
//                         value={formData.vitals.heartRate}
//                         onChange={(e) =>
//                           handleVitalChange("heartRate", e.target.value)
//                         }
//                         placeholder="مثال: 75 bpm"
//                         className="w-full mt-1 border border-slate-200 rounded-xl p-3"
//                       />
//                     </label>

//                     <label className="block text-sm text-slate-600">
//                       درجة الحرارة
//                       <input
//                         value={formData.vitals.temperature}
//                         onChange={(e) =>
//                           handleVitalChange("temperature", e.target.value)
//                         }
//                         placeholder="مثال: 37 °C"
//                         className="w-full mt-1 border border-slate-200 rounded-xl p-3"
//                       />
//                     </label>
//                   </div>
//                 </div>
//               </section>

//               {/* Consultation Form */}
//               <section className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-5 space-y-5">
//                 <div>
//                   <label className="block text-sm font-bold text-slate-700 mb-2">
//                     الأعراض والملاحظات الطبية
//                   </label>
//                   <textarea
//                     rows={4}
//                     value={formData.notes}
//                     onChange={(e) => handleChange("notes", e.target.value)}
//                     placeholder="اكتب أعراض المريض وملاحظات الكشف..."
//                     className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-primary"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-bold text-slate-700 mb-2">
//                     التشخيص
//                   </label>
//                   <input
//                     value={formData.diagnosis}
//                     onChange={(e) => handleChange("diagnosis", e.target.value)}
//                     placeholder="اكتب التشخيص..."
//                     className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-primary"
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-bold text-slate-700 mb-2">
//                       الدواء
//                     </label>
//                     <input
//                       value={formData.medication}
//                       onChange={(e) =>
//                         handleChange("medication", e.target.value)
//                       }
//                       placeholder="اسم الدواء"
//                       className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-primary"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-bold text-slate-700 mb-2">
//                       الجرعة والتعليمات
//                     </label>
//                     <input
//                       value={formData.dosage}
//                       onChange={(e) => handleChange("dosage", e.target.value)}
//                       placeholder="الجرعة وطريقة الاستخدام"
//                       className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-primary"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-bold text-slate-700 mb-2">
//                     التحاليل المطلوبة
//                   </label>
//                   <input
//                     value={formData.labTest}
//                     onChange={(e) => handleChange("labTest", e.target.value)}
//                     placeholder="اكتب التحاليل المطلوبة..."
//                     className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-primary"
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full sm:w-auto bg-primary hover:bg-sky-700 text-white px-6 py-3 rounded-xl transition"
//                 >
//                   حفظ بيانات الكشف
//                 </button>
//               </section>
//             </div>
//           </form>
//         </div>
//       </main>

//   );
// }




import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Save } from "lucide-react";
import {
  medicalRecords,
  MEDICAL_RECORDS_KEY,
} from "../../data/medicalRecordsData";

export default function ConsultationRoom() {
  const navigate = useNavigate();
  const location = useLocation();

  // Receive the selected patient from the waiting queue
  const patient = location.state?.patient || {};

  // Consultation form data
  const [formData, setFormData] = useState({
    medicalHistory: "",
    vitals: {
      bloodPressure: "",
      heartRate: "",
      temperature: "",
    },
    notes: "",
    diagnosis: "",
    medication: "",
    dosage: "",
    labTest: "",
  });

  const [error, setError] = useState("");

  // Update a single form field
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Update vital signs
  const handleVitalChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      vitals: {
        ...prev.vitals,
        [field]: value,
      },
    }));
  };

  // Get today's date using the local timezone
  const getLocalDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // Save consultation data to the patient's medical record
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!patient.name) {
      setError(
        "لم يتم تحديد المريض. ارجع لقائمة الانتظار واختار المريض الأول."
      );
      return;
    }

    try {
      const savedRecords = localStorage.getItem(MEDICAL_RECORDS_KEY);
      let records = medicalRecords;

      if (savedRecords) {
        try {
          records = JSON.parse(savedRecords);
        } catch {
          records = medicalRecords;
        }
      }

      const patientCode = patient.patientCode || patient.patientId || "";

      // Find the existing patient
      const patientIndex = records.findIndex((record) => {
        if (patientCode && record.patientId === patientCode) {
          return true;
        }

        if (patient.phone && record.phone === patient.phone) {
          return true;
        }

        return (
          record.name.trim() === patient.name.trim()
        );
      });

      // Generate a new patient ID if needed
      const nextRecordId =
        records.reduce((maxId, record) => {
          const currentId = Number(record.id);

          return Number.isFinite(currentId)
            ? Math.max(maxId, currentId)
            : maxId;
        }, 0) + 1;

      const recordId =
        patientIndex !== -1
          ? records[patientIndex].id
          : nextRecordId;

      const finalPatientCode =
        patientCode || `PAT-${String(recordId).padStart(5, "0")}`;

      // Create the prescription
      const prescription = formData.medication.trim()
        ? [
            {
              medication: formData.medication.trim(),
              dosage: formData.dosage.trim(),
              instructions: formData.dosage.trim(),
            },
          ]
        : [];

      // Convert lab tests into a list
      const labTests = formData.labTest
        .split(/[,،]/)
        .map((test) => test.trim())
        .filter(Boolean)
        .map((name) => ({
          name,
          result: "لم تظهر النتيجة بعد",
        }));

      // Create the new visit
      const newVisit = {
        id: Date.now(),
        date: getLocalDate(),
        symptoms: formData.notes.trim(),
        notes: formData.notes.trim(),
        diagnosis: formData.diagnosis.trim(),
        vitals: { ...formData.vitals },
        prescription,
        labTests,
      };

      if (patientIndex !== -1) {
        // Add the visit without deleting previous visits
        const existingPatient = records[patientIndex];

        records[patientIndex] = {
          ...existingPatient,
          medicalHistory:
            formData.medicalHistory.trim() ||
            existingPatient.medicalHistory ||
            "",
          visits: [
            ...(existingPatient.visits || []),
            newVisit,
          ],
        };
      } else {
        // Create a new patient record
        const newPatient = {
          id: recordId,
          patientId: finalPatientCode,
          name: patient.name,
          age: patient.age || "",
          gender: patient.gender || "",
          phone: patient.phone || "",
          medicalHistory: formData.medicalHistory.trim(),
          allergies: patient.allergies || "",
          visits: [newVisit],
        };

        records = [...records, newPatient];
      }

      // Save the updated records
      localStorage.setItem(
        MEDICAL_RECORDS_KEY,
        JSON.stringify(records)
      );

      // Navigate to the patient's medical history
      navigate(`/doctor/records/${recordId}`);
    } catch (saveError) {
      console.error("Error saving consultation:", saveError);
      setError("حصلت مشكلة أثناء حفظ الكشف. حاول مرة تانية.");
    }
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen min-w-0 bg-slate-50 p-4 sm:p-6 lg:p-10"
    >
      <div className="mx-auto max-w-7xl">

        {/* Page Header */}
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-dark">
              غرفة الكشف
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              بيانات المريض: {patient.name || "غير محدد"}
            </p>
          </div>

          <button
            type="submit"
            form="consultation-form"
            className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-white transition hover:bg-sky-700"
          >
            <Save size={18} />
            حفظ الروشتة
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div
            role="alert"
            className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {/* Patient Information */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="mb-4 font-bold text-dark">
            بيانات المريض
          </h2>

          <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
            <p>
              <span className="text-slate-500">الاسم: </span>
              <span className="font-semibold">
                {patient.name || "غير متوفر"}
              </span>
            </p>

            <p>
              <span className="text-slate-500">كود المريض: </span>
              <span className="font-semibold">
                {patient.patientCode ||
                  patient.patientId ||
                  "سيتم إنشاؤه عند الحفظ"}
              </span>
            </p>

            <p>
              <span className="text-slate-500">رقم الانتظار: </span>
              <span className="font-semibold">
                {patient.ticketNumber || "غير متوفر"}
              </span>
            </p>
          </div>
        </div>

        {/* Consultation Form */}
        <form id="consultation-form" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">

            {/* Medical History and Vitals */}
            <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 lg:col-span-4">
              <div>
                <h2 className="mb-3 font-bold text-dark">
                  التاريخ الطبي
                </h2>

                <textarea
                  rows={4}
                  value={formData.medicalHistory}
                  onChange={(e) =>
                    handleChange("medicalHistory", e.target.value)
                  }
                  placeholder="اكتب التاريخ الطبي للمريض..."
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <h2 className="mb-3 font-bold text-dark">
                  القياسات الحيوية
                </h2>

                <div className="space-y-3">
                  <label className="block text-sm text-slate-600">
                    ضغط الدم
                    <input
                      value={formData.vitals.bloodPressure}
                      onChange={(e) =>
                        handleVitalChange("bloodPressure", e.target.value)
                      }
                      placeholder="مثال: 120/80"
                      className="mt-1 w-full rounded-xl border border-slate-200 p-3"
                    />
                  </label>

                  <label className="block text-sm text-slate-600">
                    معدل ضربات القلب
                    <input
                      value={formData.vitals.heartRate}
                      onChange={(e) =>
                        handleVitalChange("heartRate", e.target.value)
                      }
                      placeholder="مثال: 75 bpm"
                      className="mt-1 w-full rounded-xl border border-slate-200 p-3"
                    />
                  </label>

                  <label className="block text-sm text-slate-600">
                    درجة الحرارة
                    <input
                      value={formData.vitals.temperature}
                      onChange={(e) =>
                        handleVitalChange("temperature", e.target.value)
                      }
                      placeholder="مثال: 37 °C"
                      className="mt-1 w-full rounded-xl border border-slate-200 p-3"
                    />
                  </label>
                </div>
              </div>
            </section>

            {/* Consultation Details */}
            <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 lg:col-span-8">

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  الأعراض والملاحظات الطبية
                </label>

                <textarea
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  placeholder="اكتب أعراض المريض وملاحظات الكشف..."
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  التشخيص
                </label>

                <input
                  value={formData.diagnosis}
                  onChange={(e) =>
                    handleChange("diagnosis", e.target.value)
                  }
                  placeholder="اكتب التشخيص..."
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    الدواء
                  </label>

                  <input
                    value={formData.medication}
                    onChange={(e) =>
                      handleChange("medication", e.target.value)
                    }
                    placeholder="اسم الدواء"
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-slate-700">
                    الجرعة والتعليمات
                  </label>

                  <input
                    value={formData.dosage}
                    onChange={(e) =>
                      handleChange("dosage", e.target.value)
                    }
                    placeholder="الجرعة وطريقة الاستخدام"
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  التحاليل المطلوبة
                </label>

                <input
                  value={formData.labTest}
                  onChange={(e) =>
                    handleChange("labTest", e.target.value)
                  }
                  placeholder="اكتب التحاليل وافصل بينها بفاصلة"
                  className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-primary focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-primary px-6 py-3 text-white transition hover:bg-sky-700 sm:w-auto"
              >
                حفظ بيانات الكشف
              </button>
            </section>
          </div>
        </form>
      </div>
    </main>
  );
}

