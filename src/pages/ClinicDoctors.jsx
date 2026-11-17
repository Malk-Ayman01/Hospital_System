import { useState } from "react"
import { FiCalendar, FiClock, FiUser, FiArrowLeft, FiX } from "react-icons/fi"

export default function ClinicDoctors({ title, description, doctors }) {
    const [selectedDoctor, setSelectedDoctor] = useState(null)

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

                        <button
                            onClick={() => setSelectedDoctor(doctor)}
                            className="w-full mt-5 flex items-center
                                justify-center gap-2 bg-sky-600 text-white
                                py-3 rounded-xl font-bold hover:bg-sky-700
                                active:scale-95 transition-all duration-300">
                            احجز الآن
                            <FiArrowLeft />
                        </button>
                    </div>
                ))}
            </div>

            {/* Booking Modal */}
            {selectedDoctor && (
                <div
                    className="fixed inset-0 z-50 bg-slate-900/50
                    flex items-center justify-center p-4"
                    onClick={() => setSelectedDoctor(null)}>
                    <div
                        className="bg-white rounded-2xl p-6
                        w-full max-w-md shadow-2xl relative"
                        onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setSelectedDoctor(null)}
                            className="absolute left-5 top-5 text-slate-400
                                hover:text-red-500 transition-colors">
                            <FiX size={22} />
                        </button>

                        <h2 className="text-xl font-bold text-slate-800 mb-4">حجز موعد</h2>

                        <p className="text-slate-600 mb-2">أنت على وشك حجز موعد مع:</p>

                        <p className="text-sky-600 font-bold mb-5">{selectedDoctor.name}</p>

                        <div className="bg-sky-50 rounded-xl p-4 space-y-3 mb-5">
                            <p className="text-sm text-slate-600">
                                <FiCalendar className="inline ml-2 text-sky-600" />
                                {selectedDoctor.days}
                            </p>

                            <p className="text-sm text-slate-600">
                                <FiClock className="inline ml-2 text-sky-600" />
                                {selectedDoctor.time}
                            </p>
                        </div>

                        <button
                            onClick={() => setSelectedDoctor(null)}
                            className="w-full bg-sky-600 text-white
                                py-3 rounded-xl font-bold hover:bg-sky-700
                                transition-colors">
                            إغلاق
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
