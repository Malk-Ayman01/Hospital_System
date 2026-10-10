import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaHospital } from "react-icons/fa6"
import { FiArrowLeft, FiLock, FiUser, FiLogIn } from "react-icons/fi"

function SalesLogin() {
    const [error, setError] = useState("")
    const navigate = useNavigate()

    function handleSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const username = formData.get("username")
        const password = formData.get("password")

        if (username === "sales" && password === "sales123") {
            sessionStorage.setItem("demoRole", "sales")
            navigate("/sales/dashboard")
            return
        }

        setError("Invalid username or password.")
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 transition-colors dark:bg-slate-950">
            <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900">
                <Link
                    to="/"
                    className="mb-8 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-violet-600 dark:text-slate-400">
                    <FiArrowLeft />
                    Back to Home
                </Link>

                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-lg shadow-violet-600/20">
                    <FaHospital size={28} />
                </div>

                <span className="text-sm font-semibold text-violet-600 dark:text-violet-400">
                    SALES PORTAL
                </span>

                <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                    Welcome Back
                </h1>

                <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    Sign in to access the hospital sales and billing system.
                </p>

                <form
                    onSubmit={handleSubmit}
                    onChange={() => setError("")}
                    className="mt-8 space-y-5">
                    <div>
                        <label
                            htmlFor="sales-username"
                            className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                            Username
                        </label>

                        <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 transition focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-500/10 dark:border-slate-700 dark:bg-slate-950">
                            <FiUser
                                className="text-slate-400"
                                size={18}
                            />

                            <input
                                id="sales-username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                placeholder="Enter your username"
                                className="w-full bg-transparent py-3.5 text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="sales-password"
                            className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                            Password
                        </label>

                        <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 transition focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-500/10 dark:border-slate-700 dark:bg-slate-950">
                            <FiLock
                                className="text-slate-400"
                                size={18}
                            />

                            <input
                                id="sales-password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                placeholder="Enter your password"
                                className="w-full bg-transparent py-3.5 text-slate-900 outline-none placeholder:text-slate-400 dark:text-white"
                            />
                        </div>
                    </div>

                    {error && (
                        <p
                            role="alert"
                            className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-400">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 py-3.5 font-semibold text-white transition hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-500/20">
                        <FiLogIn size={19} />
                        Sign In
                    </button>
                </form>

                <p className="mt-6 text-center text-xs leading-5 text-slate-400">
                    Authorized hospital personnel only.
                </p>
            </div>
        </main>
    )
}

export default SalesLogin
