
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  PieChart,
  ListOrdered,
  FilePlus2,
  Search,
  Clock,
  CheckCircle,
  UserRound,
  FileText,
  Bell,
  Stethoscope,
  X,
} from "lucide-react";

import { patients as initialPatients } from "../../data/patientData";

// Patient status configuration
const statusInfo = {
  waiting: {
    label: "في الانتظار",
    color: "bg-amber-100 text-amber-700",
  },
  with_doctor: {
    label: "مع الدكتور",
    color: "bg-blue-100 text-blue-700",
  },
  completed: {
    label: "تم الكشف",
    color: "bg-green-100 text-green-700",
  },
};

export default function PatientQueue() {
  const navigate = useNavigate();

  const [patientList, setPatientList] = useState(initialPatients);
  const [search, setSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);

//   // Sidebar navigation items
//   const navItems = [
//     { id: "dashboard", name: "لوحة تحكم الطبيب", icon: PieChart },
//     { id: "queue", name: "قائمة الانتظار", icon: ListOrdered },
//     { id: "consultation", name: "غرفة الكشف", icon: UserRound },
//     { id: "records", name: "السجلات الطبية", icon: FilePlus2 },
//   ];

  // Update patient status
  function updatePatientStatus(patientId, newStatus) {
    setPatientList((currentPatients) =>
      currentPatients.map((patient) =>
        patient.id === patientId
          ? { ...patient, status: newStatus }
          : patient
      )
    );
  }

  // Filter patients by name, code, or ticket number
  const filteredPatients = patientList.filter((patient) =>
    `${patient.name} ${patient.patientCode} ${patient.ticketNumber}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Calculate patient statistics
  const waitingCount = patientList.filter(
    (patient) => patient.status === "waiting"
  ).length;

  const withDoctorCount = patientList.filter(
    (patient) => patient.status === "with_doctor"
  ).length;

  const completedCount = patientList.filter(
    (patient) => patient.status === "completed"
  ).length;

  // Render the action button for each patient
  function renderAction(patient) {
    switch (patient.status) {
      case "waiting":
        return (
          <button
            onClick={() =>
              updatePatientStatus(patient.id, "with_doctor")
            }
            className="flex items-center justify-center gap-2 bg-primary text-white px-3 py-2 rounded-lg text-sm hover:bg-sky-700 transition whitespace-nowrap w-full sm:w-auto"
          >
            <Bell size={16} />
            استدعاء المريض
          </button>
        );

      case "with_doctor":
        return (
          <button
            onClick={() =>
              updatePatientStatus(patient.id, "completed")
            }
            className="flex items-center justify-center gap-2 bg-green-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-700 transition whitespace-nowrap w-full sm:w-auto"
          >
            <CheckCircle size={16} />
            إنهاء الكشف
          </button>
        );

      case "completed":
        return (
          <button
            onClick={() =>
  navigate("/doctor/consultation", {
    state: {
      patient: patient,
    },
  })
}
            className="flex items-center justify-center gap-2 bg-dark text-white px-3 py-2 rounded-lg text-sm hover:bg-sky-700 transition whitespace-nowrap w-full sm:w-auto"
          >
            <FileText size={16} />
            فتح الروشتة
          </button>
        );

      default:
        return null;
    }
  }

  
   return (
  <main
    dir="rtl"
    className="flex-1 min-w-0 p-4 sm:p-6 lg:p-10 bg-slate-50 min-h-screen"
  >
        <div className="max-w-7xl mx-auto">

          {/* Page Header */}
          <div className="mb-6 md:mb-8">
            <p className="text-primary text-sm font-semibold mb-2">
              إدارة المرضى
            </p>

            <h1 className="text-xl sm:text-2xl font-bold text-dark">
              قائمة انتظار المرضى
            </h1>

            <p className="text-slate-500 mt-2 text-xs sm:text-sm">
              متابعة حالات المرضى وإدارة إجراءات الكشف
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 mb-6 md:mb-8">
            {[
              {
                title: "في الانتظار",
                value: waitingCount,
                icon: Clock,
                color: "text-primary",
              },
              {
                title: "مع الدكتور",
                value: withDoctorCount,
                icon: Stethoscope,
                color: "text-primary",
              },
              {
                title: "تم الكشف",
                value: completedCount,
                icon: CheckCircle,
                color: "text-primary",
              },
            ].map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5"
                >
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-slate-500">
                      {stat.title}
                    </p>

                    <Icon className={stat.color} size={21} />
                  </div>

                  <h2
                    className={`text-2xl sm:text-3xl font-bold mt-3 ${stat.color}`}
                  >
                    {stat.value}
                  </h2>
                </div>
              );
            })}
          </div>

          {/* Patient Search */}
          <div className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-4 mb-5">
            <div className="relative">
              <Search
                size={19}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ابحث باسم المريض أو الكود أو رقم الانتظار..."
                className="w-full min-w-0 border border-slate-200 rounded-xl py-3 pr-10 pl-4 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Patients Table */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-100">
              <h2 className="font-bold text-dark">
                المرضى
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right min-w-[750px]">
                <thead className="bg-slate-50 text-slate-500 text-sm">
                  <tr>
                    <th className="p-4">المريض</th>
                    <th className="p-4">رقم الانتظار</th>
                    <th className="p-4">موعد التسجيل</th>
                    <th className="p-4">الحالة</th>
                    <th className="p-4">الإجراء</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredPatients.map((patient) => (
                    <tr
                      key={patient.id}
                      className="border-t border-slate-100"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-secondary text-primary rounded-full p-2 shrink-0">
                            <UserRound size={20} />
                          </div>

                          <div>
                            <p className="font-semibold">
                              {patient.name}
                            </p>

                            <p className="text-xs text-slate-500 mt-1">
                              {patient.patientCode}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 font-semibold">
                        {patient.ticketNumber}
                      </td>

                      <td className="p-4 text-sm text-slate-500">
                        {patient.appointmentTime}
                      </td>

                      <td className="p-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                            statusInfo[patient.status]?.color || ""
                          }`}
                        >
                          {statusInfo[patient.status]?.label || "غير محدد"}
                        </span>
                      </td>

                      <td className="p-4">
                        {renderAction(patient)}
                      </td>
                    </tr>
                  ))}

                  {filteredPatients.length === 0 && (
                    <tr>
                      <td
                        colSpan="5"
                        className="p-8 text-center text-slate-500"
                      >
                        لا يوجد مرضى مطابقون للبحث
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Prescription Modal */}
        {selectedPatient && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-3 sm:p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-4 sm:p-6">
              <div className="flex items-center justify-between gap-3 mb-5">
                <h2 className="text-lg sm:text-xl font-bold text-dark">
                  روشتة المريض
                </h2>

                <button
                  onClick={() => setSelectedPatient(null)}
                  className="text-slate-500 hover:text-red-500 shrink-0"
                  aria-label="Close prescription"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Patient Information */}
              <div className="bg-secondary rounded-xl p-4 mb-5">
                <p className="font-bold">
                  {selectedPatient.name}
                </p>

                <p className="text-sm text-slate-600 mt-1">
                  {selectedPatient.patientCode}
                </p>
              </div>

              {/* Prescription Details */}
              <div className="border border-slate-200 rounded-xl p-4 sm:p-5 min-h-36">
                <div className="flex items-center gap-2 text-primary mb-3">
                  <FileText size={20} />

                  <h3 className="font-bold">
                    تفاصيل الروشتة
                  </h3>
                </div>

                <p className="text-sm text-slate-500">
                  لم تتم إضافة بيانات الروشتة بعد.
                </p>
              </div>

              <button
                onClick={() => setSelectedPatient(null)}
                className="w-full mt-5 bg-primary text-white py-3 rounded-xl hover:bg-sky-700 transition"
              >
                إغلاق
              </button>
            </div>
          </div>
        )}
      </main>
  );
}
