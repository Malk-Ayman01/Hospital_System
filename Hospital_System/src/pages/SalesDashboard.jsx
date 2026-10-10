import { useNavigate } from "react-router-dom"
import { FaHospital } from "react-icons/fa6"
import { FiLogOut, FiDollarSign, FiFileText, FiTrendingUp, FiCreditCard } from "react-icons/fi"

const salesFeatures = [
    {
        title: "Sales Overview",
        description: "View a summary of hospital sales and revenue.",
        icon: FiTrendingUp,
        color: "violet"
    },
    {
        title: "Invoices",
        description: "Review and manage hospital invoices.",
        icon: FiFileText,
        color: "blue"
    },
    {
        title: "Payments",
        description: "Track payments and outstanding balances.",
        icon: FiCreditCard,
        color: "teal"
    }
]

function SalesDashboard() {
    const navigate = useNavigate()

    function handleLogout() {
        sessionStorage.removeItem("demoRole")
        navigate("/sales/login")
    }

    const colorClasses = {
        violet: "bg-violet-50 text-violet-600 dark:bg-violet-950 dark:text-violet-400",
        blue: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
        teal: "bg-teal-50 text-teal-600 dark:bg-teal-950 dark:text-teal-400"
    }

    return (
        <main className="min-h-screen bg-slate-50 transition-colors dark:bg-slate-950">
            <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600 text-white">
                            <FaHospital size={23} />
                        </div>

                        <div>
                            <h1 className="font-bold text-slate-900 dark:text-white">
                                MediCare Hospital
                            </h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Sales Dashboard
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
                        <FiLogOut />
                        Logout
                    </button>
                </div>
            </header>

            <section className="mx-auto max-w-7xl px-6 py-12">
                <div className="mb-10">
                    <span className="text-sm font-bold tracking-wider text-violet-600 dark:text-violet-400">
                        SALES PORTAL
                    </span>

                    <h2 className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
                        Welcome to Sales Dashboard
                    </h2>

                    <p className="mt-3 text-slate-500 dark:text-slate-400">
                        Manage billing operations and monitor hospital sales.
                    </p>
                </div>

                <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                Total Sales
                            </p>
                            <FiDollarSign className="text-xl text-violet-600" />
                        </div>

                        <p className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">—</p>

                        <p className="mt-2 text-xs text-slate-400">Awaiting backend data</p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                Total Invoices
                            </p>
                            <FiFileText className="text-xl text-blue-600" />
                        </div>

                        <p className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">—</p>

                        <p className="mt-2 text-xs text-slate-400">Awaiting backend data</p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                Payments
                            </p>
                            <FiCreditCard className="text-xl text-teal-600" />
                        </div>

                        <p className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">—</p>

                        <p className="mt-2 text-xs text-slate-400">Awaiting backend data</p>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {salesFeatures.map((feature) => {
                        const Icon = feature.icon

                        return (
                            <div
                                key={feature.title}
                                className="rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                                <div
                                    className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${colorClasses[feature.color]}`}>
                                    <Icon size={24} />
                                </div>

                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                    {feature.title}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                    {feature.description}
                                </p>

                                <span className="mt-5 inline-block text-sm font-semibold text-violet-600 dark:text-violet-400">
                                    Coming Soon
                                </span>
                            </div>
                        )
                    })}
                </div>
            </section>
        </main>
    )
}

export default SalesDashboard
