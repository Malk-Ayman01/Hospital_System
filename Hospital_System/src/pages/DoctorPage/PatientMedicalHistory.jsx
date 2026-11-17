
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  UserRound,
  Phone,
  CalendarDays,
  HeartPulse,
  Pill,
  FlaskConical,
  ClipboardList,
} from "lucide-react";
import {
  medicalRecords,
  MEDICAL_RECORDS_KEY,
} from "../../data/medicalRecordsData";

export default function PatientMedicalHistory() {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedRecords = localStorage.getItem(MEDICAL_RECORDS_KEY);
    let records = medicalRecords;

    if (savedRecords) {
      try {
        records = JSON.parse(savedRecords);
      } catch {
        records = medicalRecords;
      }
    }

    const foundPatient = records.find(
      (item) => String(item.id) === String(patientId)
    );

    setPatient(foundPatient || null);
    setLoading(false);
  }, [patientId]);

  const formatDate = (date) =>
    new Date(`${date}T00:00:00`).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  if (loading) {
    return (
      <main dir="rtl" className="min-h-screen bg-slate-50 p-6">
        جاري تحميل بيانات المريض...
      </main>
    );
  }

  if (!patient) {
    return (
      <main dir="rtl" className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold text-dark">
            المريض غير موجود
          </h1>
          <Link
            to="/doctor/records"
            className="mt-4 inline-block font-semibold text-primary"
          >
            الرجوع إلى السجلات الطبية
          </Link>
        </div>
      </main>
    );
  }

  const sortedVisits = [...patient.visits].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <main dir="rtl" className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <Link
          to="/doctor/records"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          <ArrowRight size={18} />
          الرجوع إلى السجلات الطبية
        </Link>

        <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100 text-primary">
              <UserRound size={32} />
            </div>

            <div className="flex-1">
              <h1 className="text-2xl font-bold text-dark">
                {patient.name}
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                كود المريض: {patient.patientId}
              </p>
            </div>

            <div className="rounded-xl bg-sky-50 px-4 py-3 text-sm text-primary">
              عدد الزيارات: {patient.visits.length}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2 lg:grid-cols-3">
            <InfoItem label="العمر" value={`${patient.age} سنة`} />
            <InfoItem label="النوع" value={patient.gender} />
            <InfoItem
              label="رقم الهاتف"
              value={patient.phone}
              icon={<Phone size={17} />}
            />
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <h2 className="mb-3 flex items-center gap-2 font-bold text-dark">
              <HeartPulse size={20} className="text-primary" />
              التاريخ المرضي
            </h2>
            <p className="text-sm leading-7 text-slate-600">
              {patient.medicalHistory || "لا يوجد تاريخ مرضي مسجل"}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <h2 className="mb-3 flex items-center gap-2 font-bold text-dark">
              <ClipboardList size={20} className="text-primary" />
              الحساسية
            </h2>
            <p className="text-sm leading-7 text-slate-600">
              {patient.allergies || "لا توجد حساسية مسجلة"}
            </p>
          </div>
        </section>

        <section className="space-y-5">
          <div>
            <h2 className="text-xl font-bold text-dark">
              تاريخ الزيارات والكشوفات
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              كل زيارة محفوظة بتشخيصها وروشتتها ونتائج تحاليلها
            </p>
          </div>

          {sortedVisits.map((visit, index) => (
            <article
              key={visit.id}
              className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
            >
              <div className="flex flex-col gap-2 border-b border-slate-100 bg-sky-50/70 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-bold text-dark">
                    الزيارة رقم {sortedVisits.length - index}
                  </h3>
                  <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                    <CalendarDays size={16} />
                    {formatDate(visit.date)}
                  </p>
                </div>
                <span className="w-fit rounded-lg bg-white px-3 py-2 text-sm font-semibold text-primary">
                  {visit.diagnosis}
                </span>
              </div>

              <div className="space-y-6 p-5">
                <div>
                  <h4 className="mb-2 font-bold text-dark">الأعراض والملاحظات</h4>
                  <p className="text-sm leading-7 text-slate-600">
                    <span className="font-semibold">الأعراض: </span>
                    {visit.symptoms || "غير مسجلة"}
                  </p>
                  <p className="text-sm leading-7 text-slate-600">
                    <span className="font-semibold">ملاحظات الطبيب: </span>
                    {visit.notes || "لا توجد ملاحظات"}
                  </p>
                </div>

                <div>
                  <h4 className="mb-3 flex items-center gap-2 font-bold text-dark">
                    <HeartPulse size={18} className="text-primary" />
                    القياسات الحيوية
                  </h4>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <VitalItem
                      label="ضغط الدم"
                      value={visit.vitals?.bloodPressure}
                    />
                    <VitalItem
                      label="معدل ضربات القلب"
                      value={visit.vitals?.heartRate}
                      suffix="نبضة/دقيقة"
                    />
                    <VitalItem
                      label="درجة الحرارة"
                      value={visit.vitals?.temperature}
                      suffix="°C"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="mb-3 flex items-center gap-2 font-bold text-dark">
                    <Pill size={18} className="text-primary" />
                    الروشتة الطبية
                  </h4>

                  {visit.prescription?.length > 0 ? (
                    <div className="space-y-3">
                      {visit.prescription.map((medicine, medicineIndex) => (
                        <div
                          key={medicineIndex}
                          className="rounded-xl bg-slate-50 p-4"
                        >
                          <p className="font-semibold text-dark">
                            {medicine.medication}
                          </p>
                          <p className="mt-1 text-sm text-slate-600">
                            الجرعة: {medicine.dosage}
                          </p>
                          <p className="mt-1 text-sm text-slate-500">
                            التعليمات: {medicine.instructions || "غير محددة"}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500">
                      لا توجد أدوية مسجلة في هذه الزيارة
                    </p>
                  )}
                </div>

                <div>
                  <h4 className="mb-3 flex items-center gap-2 font-bold text-dark">
                    <FlaskConical size={18} className="text-primary" />
                    التحاليل والفحوصات
                  </h4>

                  {visit.labTests?.length > 0 ? (
                    <div className="space-y-2">
                      {visit.labTests.map((test, testIndex) => (
                        <div
                          key={testIndex}
                          className="flex flex-col gap-1 rounded-xl bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <span className="text-sm font-semibold text-dark">
                            {typeof test === "string" ? test : test.name}
                          </span>
                          {typeof test === "object" && (
                            <span className="text-sm text-slate-500">
                              النتيجة: {test.result || "لم تسجل"}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500">
                      لا توجد تحاليل مسجلة في هذه الزيارة
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}

          {sortedVisits.length === 0 && (
            <div className="rounded-2xl bg-white p-8 text-center text-slate-500">
              لا توجد زيارات مسجلة لهذا المريض حتى الآن.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function InfoItem({ label, value, icon }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
      {icon && <span className="text-primary">{icon}</span>}
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="mt-1 text-sm font-semibold text-dark">{value}</p>
      </div>
    </div>
  );
}

function VitalItem({ label, value, suffix = "" }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-2 font-bold text-dark">
        {value ? `${value} ${suffix}` : "غير مسجل"}
      </p>
    </div>
  );
}
