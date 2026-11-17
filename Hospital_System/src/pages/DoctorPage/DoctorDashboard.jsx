
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  PieChart,
  ListOrdered,
  UserRound,
  FilePlus2,
  ArrowLeft,
} from "lucide-react";

import { getDoctorDashboardData } from "../../services/doctorService";

export default function DoctorDashboard() {
  // const [activeNav, setActiveNav] = useState("dashboard");

  const [dashboardData, setDashboardData] = useState({
    doctor: null,
    stats: [],
    patients: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Sidebar items
  const navItems = [
    { id: "dashboard", name: "لوحة تحكم الطبيب", icon: PieChart },
    { id: "queue", name: "قائمة الانتظار", icon: ListOrdered },
    { id: "consultation", name: "غرفة الكشف", icon: UserRound },
    { id: "records", name: "السجلات الطبية", icon: FilePlus2 },
  ];

  const handleNavigation = (itemId) => {
  setActiveNav(itemId);

  if (itemId === "dashboard") {
    navigate("/doctor/doctordashboard");
  } else if (itemId === "queue") {
    navigate("/doctor/queue");
  } else if (itemId === "consultation") {
    navigate("/doctor/consultation");
  } else if (itemId === "records") {
    navigate("/doctor/records");
  }
};

  // Get dashboard data
  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        setError("");

        const data = await getDoctorDashboardData();

        setDashboardData(data);
      } catch (err) {
        console.error(err);
        setError("حدث خطأ أثناء تحميل البيانات");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const { doctor, stats, patients } = dashboardData;

  // Get current waiting patient
  const currentPatient = patients?.find(
    (patient) => patient.status === "waiting"
  );

 return (
  <main
    dir="rtl"
    className="flex-1 min-w-0 p-4 sm:p-6 lg:p-10 bg-slate-50 min-h-screen"
  >
      {/* Sidebar */}
    





      {/* Main Content */}
   

        {/* Page Header */}
        <div className="mb-8">
          <p className="text-primary font-semibold text-sm mb-2">
            مرحباً بعودتك، دكتور
          </p>

          <h1 className="text-2xl font-bold text-dark">
            لوحة تحكم الطبيب
          </h1>

          <p className="text-slate-500 text-sm mt-2">
            إليك ملخص نشاطك الطبي ومواعيدك اليوم
          </p>
        </div>

        {loading ? (
          <p className="text-slate-500">جاري تحميل البيانات...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            {/* Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

              {stats.map((stat) => (
                <div
                  key={stat.id}
                  className="bg-white border border-slate-200 rounded-2xl p-5"
                >
                  <p className="text-sm text-slate-500">
                    {stat.title}
                  </p>

                  <h2 className={`text-3xl font-bold mt-2 ${stat.color}`}>
                    {stat.value}
                  </h2>
                </div>
              ))}

            </div>

            {/* Current Patient */}
            {currentPatient ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-5">

                <div>
                  <span className="inline-block bg-secondary text-primary text-xs font-bold px-3 py-1 rounded-full mb-3">
                    الكشف الحالي
                  </span>

                  <h2 className="text-xl font-bold">
                    {currentPatient.name} ({currentPatient.patientCode})
                  </h2>

                  <p className="text-sm text-slate-500 mt-2">
                    رقم الانتظار {currentPatient.ticketNumber}
                    {" • "}
                    وقت التسجيل {currentPatient.appointmentTime}
                  </p>
                </div>

                <button
                 onClick={() => navigate("/doctor/consultation")}
                  className="flex items-center justify-center gap-2 bg-primary hover:bg-sky-700 text-white px-6 py-3 rounded-xl transition"
                >
                  فتح غرفة الكشف
                  <ArrowLeft size={18} />
                </button>

              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <p className="text-slate-500">
                  لا يوجد مرضى في الانتظار حاليًا
                </p>
              </div>
            )}
          </>
        )}

      </main>
  
  );
}

