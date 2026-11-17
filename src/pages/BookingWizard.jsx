import React, { useState } from 'react';

const DEPARTMENTS_DATA = [
  { id: 'cardio', name: 'أمراض القلب والشرايين', icon: 'fa-heart-pulse', doctors: ['د. أحمد الشريف', 'د. فاطمة الزهراء'] },
  { id: 'neuro', name: 'جراحة المخ والأعصاب', icon: 'fa-brain', doctors: ['د. محمود حسن', 'د. رانيا محمود'] },
  { id: 'pediatrics', name: 'طب الأطفال حديثي الولادة', icon: 'fa-child', doctors: ['د. سارة خالد', 'د. كريم عبد الله'] },
  { id: 'ortho', name: 'العظام والمفاصل', icon: 'fa-bone', doctors: ['د. طارق العوضي', 'د. ياسمين سامح'] },
  { id: 'internal', name: 'الباطنة العامة', icon: 'fa-stethoscope', doctors: ['د. هشام مهران', 'د. نادية عبد العزيز'] }
];

const AVAILABLE_TIMES = ['09:00 ص', '10:30 ص', '12:00 م', '02:00 م', '04:30 م', '06:00 م'];
const VISIT_TYPES = ['استشارة أولية', 'متابعة دورية', 'استشارة طارئة / عاجلة'];
const PAYMENT_METHODS = ['الدفع الإلكتروني (بطاقة بنكية)', 'الدفع عند الاستقبال بالمستشفى'];

const STEPS = [
  { num: 1, title: 'اسم المريض' },
  { num: 2, title: 'القسم الطبي' },
  { num: 3, title: 'الطبيب المعالج' },
  { num: 4, title: 'التاريخ والوقت' },
  { num: 5, title: 'نوع الزيارة' },
  { num: 6, title: 'الأعراض والشكوى' },
  { num: 7, title: 'مراجعة الحجز' },
  { num: 8, title: 'الدفع والتأكيد' }
];

export default function BookingWizard({ onConfirm }) {
  const [step, setStep] = useState(1);
  const [touched, setTouched] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const [bookingData, setBookingData] = useState({
    patientName: '',
    department: DEPARTMENTS_DATA[0].name,
    doctor: DEPARTMENTS_DATA[0].doctors[0],
    date: '2026-06-10',
    time: '10:30 ص',
    visitType: 'استشارة أولية',
    symptoms: '',
    paymentMethod: 'الدفع الإلكتروني (بطاقة بنكية)'
  });

  const showNotification = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const selectedDeptObj = DEPARTMENTS_DATA.find((d) => d.name === bookingData.department) || DEPARTMENTS_DATA[0];
  const nameOk = bookingData.patientName.trim().length > 0;

  const handleNext = () => {
    if (step === 1 && !nameOk) {
      setTouched(true);
      return;
    }
    setStep((prev) => Math.min(prev + 1, 8));
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleConfirmBooking = () => {
    const queueId = `Q-${Math.floor(101 + Math.random() * 90)}`;
    showNotification(`تم تأكيد الحجز بنجاح ورقم الطابور ${queueId}`);

    const existing = JSON.parse(localStorage.getItem('carepath_queue') || '[]');
    const newEntry = {
      id: queueId,
      patient: bookingData.patientName,
      dept: bookingData.department,
      doctor: bookingData.doctor,
      status: 'في الاستقبال / تسجيل الدخول',
      time: bookingData.time
    };
    localStorage.setItem('carepath_queue', JSON.stringify([...existing, newEntry]));

    if (onConfirm) {
      onConfirm({ ...bookingData, queueId });
    }

    setBookingData({
      patientName: '',
      department: DEPARTMENTS_DATA[0].name,
      doctor: DEPARTMENTS_DATA[0].doctors[0],
      date: '2026-06-10',
      time: '10:30 ص',
      visitType: 'استشارة أولية',
      symptoms: '',
      paymentMethod: 'الدفع الإلكتروني (بطاقة بنكية)'
    });
    setStep(1);
    setTouched(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 flex-grow flex flex-col justify-center font-['Cairo']" dir="rtl">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">حجز موعد طبي جديد</h2>
        <p className="text-slate-500 text-sm">أتمم الخطوات الثماني التالية لحجز موعدك بكل سهولة</p>

        <div className="flex items-center justify-between mt-6 relative">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-200 dark:bg-slate-800 -z-0"></div>
          {STEPS.map((s) => (
            <div key={s.num} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  step >= s.num
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                }`}
              >
                {s.num}
              </div>
              <span className="text-[11px] font-semibold mt-2 text-slate-600 dark:text-slate-400 hidden sm:block">
                {s.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 mb-8">
        {step === 1 && (
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <i className="fa-solid fa-user text-indigo-600 ml-2"></i> اسم المريض
            </h3>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">الاسم بالكامل</label>
              <input
                type="text"
                value={bookingData.patientName}
                autoFocus
                placeholder="اكتب اسم المريض..."
                onChange={(e) => setBookingData({ ...bookingData, patientName: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  touched && !nameOk ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                }`}
              />
              {touched && !nameOk && <p className="text-xs text-rose-600 mt-2">من فضلك اكتب اسم المريض للمتابعة</p>}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <i className="fa-solid fa-hospital text-indigo-600 ml-2"></i> اختر القسم الطبي المطلوب
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {DEPARTMENTS_DATA.map((d) => (
                <div
                  key={d.id}
                  onClick={() => setBookingData({ ...bookingData, department: d.name, doctor: d.doctors[0] })}
                  className={`p-6 rounded-2xl border-2 cursor-pointer transition flex items-center justify-between ${
                    bookingData.department === d.name
                      ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
                  }`}
                >
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">{d.name}</div>
                    <div className="text-xs text-slate-500 mt-1">يضم {d.doctors.length} استشاريين</div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-xl shrink-0">
                    <i className={`fa-solid ${d.icon}`}></i>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <i className="fa-solid fa-user-doctor text-indigo-600 ml-2"></i> اختر الطبيب المعالج ({selectedDeptObj.name})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {selectedDeptObj.doctors.map((doc) => (
                <div
                  key={doc}
                  onClick={() => setBookingData({ ...bookingData, doctor: doc })}
                  className={`p-6 rounded-2xl border-2 cursor-pointer transition flex items-center justify-between ${
                    bookingData.doctor === doc
                      ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
                  }`}
                >
                  <div>
                    <div className="font-bold text-lg text-slate-900 dark:text-white">{doc}</div>
                    <div className="text-xs text-emerald-600 font-medium mt-1">
                      <i className="fa-solid fa-circle-check ml-1"></i> متاح اليوم
                    </div>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-2xl shrink-0">
                    <i className="fa-solid fa-stethoscope"></i>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <i className="fa-solid fa-calendar text-indigo-600 ml-2"></i> حدد تاريخ ووقت الموعد
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">تاريخ الزيارة</label>
                <input
                  type="date"
                  value={bookingData.date}
                  onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">الوقت المتاح</label>
                <div className="grid grid-cols-3 gap-2">
                  {AVAILABLE_TIMES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setBookingData({ ...bookingData, time: t })}
                      className={`py-3 rounded-xl border text-sm font-semibold transition ${
                        bookingData.time === t
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <i className="fa-solid fa-clipboard-question text-indigo-600 ml-2"></i> نوع الزيارة الطبية
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {VISIT_TYPES.map((type) => (
                <div
                  key={type}
                  onClick={() => setBookingData({ ...bookingData, visitType: type })}
                  className={`p-6 rounded-2xl border-2 cursor-pointer text-center transition ${
                    bookingData.visitType === type
                      ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
                  }`}
                >
                  <div className="font-bold text-slate-900 dark:text-white mb-2">{type}</div>
                  <div className="text-xs text-slate-500">فحص شامل وتوجيه دقيق للحالة</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 6 && (
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <i className="fa-solid fa-notes-medical text-indigo-600 ml-2"></i> الأعراض والشكوى الرئيسية
            </h3>
            <textarea
              rows="4"
              placeholder="اكتب باختصار الأعراض التي تشعر بها أو سبب الزيارة..."
              value={bookingData.symptoms}
              onChange={(e) => setBookingData({ ...bookingData, symptoms: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        )}

        {step === 7 && (
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <i className="fa-solid fa-file-invoice text-indigo-600 ml-2"></i> مراجعة تفاصيل الموعد
            </h3>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
              <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
                <span className="text-slate-500">اسم المريض:</span>
                <span className="font-bold text-slate-900 dark:text-white">{bookingData.patientName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
                <span className="text-slate-500">القسم الطبي:</span>
                <span className="font-bold text-slate-900 dark:text-white">{bookingData.department}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
                <span className="text-slate-500">الطبيب المعالج:</span>
                <span className="font-bold text-slate-900 dark:text-white">{bookingData.doctor}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
                <span className="text-slate-500">التاريخ والوقت:</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {bookingData.date} | {bookingData.time}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
                <span className="text-slate-500">نوع الزيارة:</span>
                <span className="font-bold text-slate-900 dark:text-white">{bookingData.visitType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">الأعراض:</span>
                <span className="font-bold text-slate-900 dark:text-white">{bookingData.symptoms || 'غير محددة'}</span>
              </div>
            </div>
          </div>
        )}

        {step === 8 && (
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <i className="fa-solid fa-credit-card text-indigo-600 ml-2"></i> طريقة الدفع والتأكيد النهائي
            </h3>
            <div className="space-y-4">
              {PAYMENT_METHODS.map((m) => (
                <div
                  key={m}
                  onClick={() => setBookingData({ ...bookingData, paymentMethod: m })}
                  className={`p-4 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition ${
                    bookingData.paymentMethod === m
                      ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
                  }`}
                >
                  <span className="font-bold text-slate-900 dark:text-white">{m}</span>
                  <i
                    className={`fa-solid fa-circle-check text-xl ${
                      bookingData.paymentMethod === m ? 'text-indigo-600' : 'text-slate-300'
                    }`}
                  ></i>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        {step > 1 ? (
          <button
            type="button"
            onClick={handlePrev}
            className="px-6 py-3 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl transition"
          >
            <i className="fa-solid fa-arrow-right ml-2"></i> السابق
          </button>
        ) : (
          <div></div>
        )}

        {step < 8 ? (
          <button
            type="button"
            onClick={handleNext}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition"
          >
            التالي <i className="fa-solid fa-arrow-left mr-2"></i>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleConfirmBooking}
            className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 transition"
          >
            تأكيد ودفع الحجز <i className="fa-solid fa-check mr-2"></i>
          </button>
        )}
      </div>

      {toastMessage && (
        <div className="fixed bottom-5 left-5 z-50 flex items-center px-4 py-3 rounded-xl shadow-lg bg-emerald-600 text-white transition-all">
          <i className="fa-solid fa-circle-check ml-3 text-lg"></i>
          <span className="font-medium text-sm">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}