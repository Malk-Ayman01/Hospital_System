
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHospitalUser, FaBars, FaXmark } from "react-icons/fa6";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: 'حجز موعد', path: '/Appointment' },
    { name: 'رحلة المريض الفورية', path: '/PatientJourney' },
    { name: 'لوحة المريض', path: '/PatientDashboard' },
    { name: 'الاستقبال', path: '/SalesDashboard' },
    { name: 'الأطباء', path: '/DoctorDashboard' },
    { name: 'الإدارة', path: '/AdminDashboard' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">

        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary sm:h-12 sm:w-12">
            <FaHospitalUser className="text-xl text-white sm:text-2xl" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-primary sm:text-2xl">
              CarePath
            </h1>
            <p className="text-[10px] text-gray-400 sm:text-xs">
              نظام إدارة المستشفيات الذكي
            </p>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-4 text-sm text-gray-600 xl:flex 2xl:gap-6 2xl:text-base">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="whitespace-nowrap transition-colors hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden shrink-0 items-center gap-3 xl:flex">
          <button className="whitespace-nowrap text-gray-600 transition-colors hover:text-primary">
            تسجيل الدخول
          </button>

          <button className="whitespace-nowrap rounded-xl bg-primary px-4 py-2 text-white transition-colors hover:bg-primary/90">
            حساب جديد
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-2xl text-primary transition-colors hover:bg-sky-50 xl:hidden"
          aria-label={isOpen ? "إغلاق القائمة" : "فتح القائمة"}
          aria-expanded={isOpen}
        >
          {isOpen ? <FaXmark /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-4 shadow-md xl:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-4 py-3 text-gray-600 transition-colors hover:bg-sky-50 hover:text-primary"
              >
                {link.name}
              </Link>
            ))}

            <div className="mt-2 flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row">
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-xl border border-primary px-4 py-2 text-primary transition-colors hover:bg-sky-50"
              >
                تسجيل الدخول
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="rounded-xl bg-primary px-4 py-2 text-white transition-colors hover:bg-primary/90"
              >
                حساب جديد
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}