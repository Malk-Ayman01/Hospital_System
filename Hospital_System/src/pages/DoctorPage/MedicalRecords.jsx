
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Users, ClipboardList, ChevronLeft } from "lucide-react";
import {
  medicalRecords,
  MEDICAL_RECORDS_KEY,
} from "../../data/medicalRecordsData";

export default function MedicalRecords() {
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedRecords = localStorage.getItem(MEDICAL_RECORDS_KEY);

    if (savedRecords) {
      try {
        setRecords(JSON.parse(savedRecords));
      } catch {
        setRecords(medicalRecords);
      }
    } else {
      setRecords(medicalRecords);
      localStorage.setItem(
        MEDICAL_RECORDS_KEY,
        JSON.stringify(medicalRecords)
      );
    }
  }, []);

  const filteredRecords = records.filter((patient) => {
    const search = searchTerm.trim().toLowerCase();

    return (
      patient.name.toLowerCase().includes(search) ||
      patient.patientId.toLowerCase().includes(search)
    );
  });

  const totalVisits = records.reduce(
    (total, patient) => total + patient.visits.length,
    0
  );

  const formatDate = (date) =>
    new Date(`${date}T00:00:00`).toLocaleDateString("ar-EG");

  return (
    <main dir="rtl" className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-dark sm:text-3xl">
            السجلات الطبية
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            أرشيف جميع المرضى الذين سبق لهم زيارة الطبيب
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="rounded-xl bg-sky-100 p-3 text-primary">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500">إجمالي المرضى</p>
              <p className="mt-1 text-2xl font-bold text-dark">
                {records.length}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="rounded-xl bg-sky-100 p-3 text-primary">
              <ClipboardList size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500">إجمالي الزيارات</p>
              <p className="mt-1 text-2xl font-bold text-dark">
                {totalVisits}
              </p>
            </div>
          </div>
        </div>

        <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-4 sm:p-5">
            <h2 className="mb-4 font-bold text-dark">قائمة المرضى</h2>

            <div className="relative max-w-lg">
              <Search
                size={19}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ابحث باسم المريض أو كود المريض..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pr-10 pl-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-right">
              <thead className="bg-slate-50 text-sm text-slate-500">
                <tr>
                  <th className="px-5 py-4 font-semibold">اسم المريض</th>
                  <th className="px-5 py-4 font-semibold">كود المريض</th>
                  <th className="px-5 py-4 font-semibold">آخر زيارة</th>
                  <th className="px-5 py-4 font-semibold">عدد الزيارات</th>
                  <th className="px-5 py-4 font-semibold">السجل</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredRecords.map((patient) => {
                  const latestVisit = [...patient.visits].sort(
                    (a, b) => new Date(b.date) - new Date(a.date)
                  )[0];

                  return (
                    <tr
                      key={patient.id}
                      className="transition hover:bg-sky-50/50"
                    >
                      <td className="px-5 py-4">
                        <Link
                          to={`/doctor/records/${patient.id}`}
                          className="font-bold text-dark transition hover:text-primary"
                        >
                          {patient.name}
                        </Link>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-500">
                        {patient.patientId}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {latestVisit ? formatDate(latestVisit.date) : "—"}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {patient.visits.length}
                      </td>

                      <td className="px-5 py-4">
                        <Link
                          to={`/doctor/records/${patient.id}`}
                          className="inline-flex items-center gap-1 rounded-lg bg-sky-50 px-3 py-2 text-sm font-semibold text-primary transition hover:bg-sky-100"
                        >
                          عرض التفاصيل
                          <ChevronLeft size={16} />
                        </Link>
                      </td>
                    </tr>
                  );
                })}

                {filteredRecords.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-5 py-12 text-center text-sm text-slate-500"
                    >
                      مفيش مريض مطابق لعملية البحث.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
