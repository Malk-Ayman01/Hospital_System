export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-white px-6 py-6">
      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center justify-between gap-6 md:flex-row">

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-500">
          <a href="/" className="transition hover:text-[#0369a1]">
            الرئيسية
          </a>

          <a href="/patient/appointments" className="transition hover:text-[#0369a1]">
            حجز المواعيد
          </a>

          <a href="/patient/medical-records" className="transition hover:text-[#0369a1]">
            تتبع الرحلة الطبية
          </a>

          <a href="/privacy-policy" className="transition hover:text-[#0369a1]">
            سياسة الخصوصية
          </a>
        </nav>

        <div className="text-center md:text-right">
          <h3 className="font-bold text-[#0f172a]">
            CarePath Hospital System
          </h3>
          <p className="mt-1 text-xs text-slate-400">
            جميع الحقوق محفوظة © {new Date().getFullYear()}
          </p>
        </div>

      </div>
    </footer>
  );
}