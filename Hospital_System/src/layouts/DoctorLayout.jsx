import { NavLink, Outlet } from "react-router-dom";
import {
  PieChart,
  ListOrdered,
  UserRound,
  FilePlus2,
} from "lucide-react";

import { doctorInfo } from "../data/doctorData";

const navItems = [
  {
    name: "لوحة تحكم الطبيب",
    path: "/doctor/doctordashboard",
    icon: PieChart,
  },
  {
    name: "قائمة الانتظار",
    path: "/doctor/queue",
    icon: ListOrdered,
  },
  {
    name: "غرفة الكشف",
    path: "/doctor/consultation",
    icon: UserRound,
  },
  {
    name: "السجلات الطبية",
    path: "/doctor/records",
    icon: FilePlus2,
  },
];

export default function DoctorLayout() {
  return (
    <div
      dir="rtl"
      className="min-h-screen flex flex-col md:flex-row bg-slate-50"
    >
      {/* Doctor Sidebar */}
      <aside className="w-full md:w-64 md:min-h-screen bg-white border-b md:border-b-0 md:border-l border-slate-200 p-4 md:p-5 shrink-0">
        {/* Doctor Information */}
        <div className="bg-secondary rounded-xl p-4 mb-4 md:mb-6">
          <p className="text-xs text-primary font-bold mb-2">
            مساحة عمل الطبيب
          </p>

          <h2 className="font-bold text-dark">
            {doctorInfo.name}
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            {doctorInfo.specialty}
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1 gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end
                className={({ isActive }) =>
                  `flex items-center justify-center md:justify-start gap-2 md:gap-3 p-3 rounded-xl text-xs sm:text-sm transition ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`
                }
              >
                <Icon size={18} className="shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Page Content */}
     <div className="flex-1 min-w-0">
  <Outlet />
</div>
    </div>
  );
}



