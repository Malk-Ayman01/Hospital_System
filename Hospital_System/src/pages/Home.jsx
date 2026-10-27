
import React from "react";
import { Link } from "react-router-dom";
import {
  FaCalendarCheck,
  FaUserGroup,
  FaUserDoctor,
  FaHospital,
  FaArrowLeft,
  FaClipboardCheck,
  FaClock,
  FaFileMedical,

} from "react-icons/fa6";
import { 
    SiGoogleanalytics,
   
 } from "react-icons/si";



 const features = [
    {
      title: "حجز ذكي من 7 خطوات",
      description:
        "تحديد القسم، الطبيب، التاريخ، نوع الزيارة، الأعراض، وإتمام الحجز والدفع بكل سهولة ويسر.",
      icon: <FaCalendarCheck />,
    
    },
    {
      title: "طوابير الانتظار الفورية",
      description:
        "تتبع حركة المريض لحظة بلحظة: من الاستقبال وحتى دخول العيادة، الصيدلية، ومعمل التحاليل.",
      icon: <FaClock />,
    
    },
    {
      title: "ملفات طبية رقمية مؤمنة",
      description:
        "حفظ الروشتات، نتائج التحاليل، والأشعة في ملف المريض مع إمكانية طباعتها ومشاركتها فوراً.",
      icon: <FaFileMedical />,
    
    },
  ];


export default function Home() {
  return (
    <>
    <section
      dir="rtl"
      className="min-h-screen bg-slate-50 px-5 py-12 sm:px-8 lg:px-12 lg:py-20"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">

        {/* right-content*/}
        <div>
          <span className="mb-6 inline-block rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-primary">
           الجيل القادم من إدارة المستشفيات والرعاية الصحية

          </span>

          <h1 className="text-4xl font-extrabold leading-tight text-dark sm:text-5xl lg:text-6xl">
           رعاية صحية متكاملة،
            <span className="mt-2 block text-primary">
              سريعة وبدون انتظار
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
        
نظام CarePath يربط الأقسام الطبية، الطوابير الفورية، المواعيد الذكية، والملفات الطبية في منصة موحدة فائقة السرعة.          </p>

          {/* buttons */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/Appointment"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-primary px-6 py-4 font-bold text-white transition hover:bg-primary/90"
            >
              <FaCalendarCheck />
              احجز موعدك الآن
            </Link>

            <Link
              to="/PatientJourney"
              className="inline-flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-6 py-4 font-bold text-dark transition hover:bg-secondary"
            >
              <FaClipboardCheck className="text-primary" />
              تتبع رحلتك الطبية
            </Link>
          </div>

          {/* analysis */}
          <div className="mt-10 grid grid-cols-3 gap-3 border-t border-slate-200 pt-8 sm:gap-6">
            <div>
              <h3 className="text-2xl font-extrabold text-primary sm:text-3xl">
                15+
              </h3>
              <p className="mt-2 text-xs leading-5 text-slate-500 sm:text-sm">
               تخصص طبى متقدم
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-primary sm:text-3xl">
                100%
              </h3>
              <p className="mt-2 text-xs leading-5 text-slate-500 sm:text-sm">
                ملفات رقمية
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-primary sm:text-3xl">
                أسرع
              </h3>
              <p className="mt-2 text-xs leading-5 text-slate-500 sm:text-sm">
                في متابعة المرضى
              </p>
            </div>
          </div>
        </div>

        {/* Control panel card*/}
        <div className="mx-auto w-full max-w-xl rounded-3xl border border-slate-100 bg-white p-5 shadow-xl sm:p-7">

          <div className="mb-6 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white">
                <FaHospital className="text-xl" />
              </div>

          {/*  Title of control panel */}
              <div>
                <h1 className="text-2xl font-bold text-dark">
                 لوحات التحكم السريعة
                </h1>
                
              </div>
            </div>

          </div>

          {/*  Patient Item */}
          <Link
            to="/PatientDashboard"
            className="mb-3 flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:border-primary hover:bg-secondary"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-dark text-white">
              <FaUserGroup className="text-xl" />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-dark">
                 
              بوابة المريض الذكية  

              </h3>
              <p className="mt-1 text-xs leading-5 text-slate-500">
               
            حجز مواعيد، روشتات، وتقارير  

              </p>
            </div>

            <FaArrowLeft className="shrink-0 text-primary" />
          </Link>

          {/* Sales Item */}
          <Link
            to="/SalesDashboard"
            className="mb-3 flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:border-primary hover:bg-secondary"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
              <FaClipboardCheck className="text-xl" />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-dark">          
             مكتب الاستقبال والتسجيل
              </h3>
              <p className="mt-1 text-xs leading-5 text-slate-500">
               إدارة الطوابير، ودخول المرضى
              </p>
            </div>

            <FaArrowLeft className="shrink-0 text-primary" />
          </Link>

          {/* Doctor Item */}
          <Link
            to="/DoctorDashboard"
            className="mb-3 flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:border-primary hover:bg-secondary"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-dark text-white">
              <FaUserDoctor className="text-xl" />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-dark">
              
             عيادة الطبيب (Consultation Suite)         

              </h3>
              <p className="mt-1 text-xs leading-5 text-slate-500">
        الكشف الطبي، الروشتات الفورية، والتحاليل
              </p>
            </div>

            <FaArrowLeft className="shrink-0 text-primary" />
          </Link>

          {/*  Item 5 */}
      <Link
            to="/AdminDashboard"
            className="mb-3 flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:border-primary hover:bg-secondary"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
              <SiGoogleanalytics className="text-xl" />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-dark">
              
          لوحة الإدارة والتقارير       

              </h3>
              <p className="mt-1 text-xs leading-5 text-slate-500">

            إحصائيات الأقسام والأداء المالي

              </p>
            </div>

            <FaArrowLeft className="shrink-0 text-primary" />
          </Link>


        </div>
      </div>
    </section>
    

    {/*  Features Section */}

    <section className="bg-white px-6 py-20 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1300px]">

        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-extrabold text-black lg:text-4xl">
            مميزات نظام CarePath الشاملة
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-base text-gray-500">
            كل ما تحتاجه المستشفيات الحديثة لإدارة المرضى والطاقم الطبي بكفاءة
            واحترافية تامة.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-3xl border border-gray-200/70 bg-gray-50 p-8 text-right transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Icon */}
              <div
                className={`mb-8 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl bg-primary text-white`}
              >
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="mb-3 text-2xl font-extrabold text-black">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-7 text-gray-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
</>
  );
}