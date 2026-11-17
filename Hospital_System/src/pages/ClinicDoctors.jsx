import { FiCalendar, FiClock, FiUser, FiArrowLeft } from "react-icons/fi"
import { Link } from "react-router-dom"

export default function ClinicDoctors({ title, description, doctors }) {
    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div
                className="mb-8 bg-gradient-to-l from-sky-700 to-sky-500
                rounded-2xl p-6 sm:p-8 text-white shadow-lg shadow-sky-100">
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-white/20 p-3 rounded-xl">
                        <FiUser size={28} />
                    </div>

                    <span className="text-sky-100 text-sm font-medium">الأقسام الطبية</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold mb-2">{title}</h1>

                <p className="text-sky-100 text-sm sm:text-base">{description}</p>
            </div>

            {/* Doctors Count */}
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">أطباء العيادة</h2>

                    <p className="text-sm text-slate-500 mt-1">تعرف على أطبائنا ومواعيد العمل</p>
                </div>

                <span
                    className="bg-sky-100 text-sky-700 px-4 py-2
                    rounded-xl text-sm font-bold">
                    {doctors.length} أطباء
                </span>
            </div>

            {/* Doctors Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {doctors.map((doctor) => (
                    <div
                        key={doctor.id}
                        className="bg-white border border-sky-100 rounded-2xl
                            p-5 shadow-sm hover:shadow-xl hover:shadow-sky-100
                            hover:-translate-y-1 transition-all duration-300">
                        <div className="flex items-center gap-4 mb-5">
                            <div
                                className="w-14 h-14 rounded-2xl
                                bg-sky-100 text-sky-600 flex items-center
                                justify-center">
                                <FiUser size={28} />
                            </div>

                            <div>
                                <h3 className="font-bold text-slate-800 text-lg">{doctor.name}</h3>

                                <p className="text-sm text-sky-600 mt-1">{doctor.specialty}</p>
                            </div>
                        </div>

                        <div className="border-t border-slate-100 pt-4 space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="bg-sky-50 p-2 rounded-lg">
                                    <FiCalendar
                                        className="text-sky-600"
                                        size={18}
                                    />
                                </div>

                                <div>
                                    <p className="text-xs text-slate-400 mb-1">أيام العمل</p>

                                    <p className="text-sm font-medium text-slate-700">
                                        {doctor.days}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="bg-sky-50 p-2 rounded-lg">
                                    <FiClock
                                        className="text-sky-600"
                                        size={18}
                                    />
                                </div>

                                <div>
                                    <p className="text-xs text-slate-400 mb-1">مواعيد العمل</p>

                                    <p className="text-sm font-medium text-slate-700">
                                        {doctor.time}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Link
                            to="/appointment"
                            onClick={() => setSelectedDoctor(doctor)}
                            className="w-full mt-5 flex items-center
                                justify-center gap-2 bg-sky-600 text-white
                                py-3 rounded-xl font-bold hover:bg-sky-700
                                active:scale-95 transition-all duration-300">
                            احجز الآن
                            <FiArrowLeft />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
