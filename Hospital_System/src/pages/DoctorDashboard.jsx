import { Link, useNavigate } from "react-router-dom"
import { FaHospital } from "react-icons/fa6"
import { FiCalendar, FiUsers, FiLogOut, FiClipboard } from "react-icons/fi"

function DoctorDashboard() {
    const navigate = useNavigate()

    function handleLogout() {
        sessionStorage.removeItem("demoRole")
        navigate("/doctor/login")
    }

    return (
        <main className="min-h-screen bg-slate-50 transition-colors dark:bg-slate-950">
            <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-600 text-white">
                            <FaHospital size={23} />
                        </div>

                        <div>
                            <h1 className="font-bold text-slate-900 dark:text-white">
                                MediCare Hospital
                            </h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Doctor Dashboard
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
                        <FiLogOut />
                        Logout
                    </button>
                </div>
            </header>

            <section className="mx-auto max-w-7xl px-6 py-12">
                <div className="mb-10">
                    <p className="font-semibold text-teal-600 dark:text-teal-400">DOCTOR PORTAL</p>

                    <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                        Welcome, Doctor 👋
                    </h2>

                    <p className="mt-3 text-slate-500 dark:text-slate-400">
                        Manage your appointments and patient visits from one place.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600 dark:bg-teal-950 dark:text-teal-400">
                            <FiCalendar size={24} />
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                            Appointments
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                            View and manage your scheduled appointments.
                        </p>

                        <span className="mt-5 inline-block text-sm font-semibold text-teal-600 dark:text-teal-400">
                            Coming Soon
                        </span>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                            <FiClipboard size={24} />
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                            Patient Visits
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                            Add visit notes and treatment details for your patients.
                        </p>

                        <span className="mt-5 inline-block text-sm font-semibold text-blue-600 dark:text-blue-400">
                            Coming Soon
                        </span>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default DoctorDashboard
