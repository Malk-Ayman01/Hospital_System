import { FaHospital } from "react-icons/fa6"
import PortalCard from "../components/PortalCard"
import { portals } from "../data/portals"
import ThemeToggle from "../components/ThemeToggle"

function HomePage() {
    return (
        <main className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
            <header className="border-b border-slate-200 bg-white transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                            <FaHospital size={23} />
                        </div>

                        <div>
                            <h1 className="text-lg font-bold text-slate-900 dark:text-white">
                                MediCare Hospital
                            </h1>

                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Hospital Management System
                            </p>
                        </div>
                    </div>

                    <ThemeToggle />
                </div>
            </header>

            <section className="mx-auto flex w-full max-w-7xl flex-col justify-center px-6 py-16">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                        Welcome to MediCare
                    </span>

                    <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                        Your Healthcare,
                        <span className="block text-blue-600 dark:text-blue-400">One Place.</span>
                    </h2>

                    <p className="text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
                        Choose your portal to access the services designed for you.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {portals.map((portal) => (
                        <PortalCard
                            key={portal.id}
                            portal={portal}
                        />
                    ))}
                </div>
            </section>

            <footer className="border-t border-slate-200 bg-white px-6 py-5 text-center text-sm text-slate-500 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                © {new Date().getFullYear()} MediCare Hospital. All rights reserved.
            </footer>
        </main>
    )
}

export default HomePage
