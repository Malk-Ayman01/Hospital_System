import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
    FaHospital,
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaUserTag,
    FaArrowLeft
} from "react-icons/fa"

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/+$/, "")

function Login() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        role: "patient",
        email: "",
        password: ""
    })

    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }))

        setError("")
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError("")

        if (!formData.email.trim() || !formData.password) {
            setError("Please enter your email and password.")
            return
        }

        // Sales is temporarily mapped to the backend receptionist role.
        const apiRole = formData.role === "sales" ? "receptionist" : formData.role

        setLoading(true)

        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: formData.email.trim(),
                    password: formData.password,
                    role: apiRole
                })
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(
                    result.message || result.error || "Login failed. Please check your credentials."
                )
            }

            // Support common API response wrappers.
            const loginData = result.data ?? result
            const token = loginData.access_token ?? loginData.data?.access_token

            const actualRole = loginData.role ?? loginData.user?.role ?? loginData.data?.role

            if (!token || !actualRole) {
                throw new Error("Login response is missing the access token or user role.")
            }

            // Save the token for later authenticated API requests.
            localStorage.setItem("access_token", token)
            localStorage.setItem("userRole", actualRole)

            // Navigate according to the role returned by the backend.
            switch (actualRole) {
                case "patient":
                    navigate("/")
                    break

                case "doctor":
                    navigate("/doctor/dashboard")
                    break

                case "receptionist":
                    navigate("/sales/dashboard")
                    break

                default:
                    localStorage.removeItem("access_token")
                    localStorage.removeItem("userRole")
                    setError("This account does not have a supported portal.")
            }
        } catch (err) {
            if (err instanceof TypeError || err.message === "Failed to fetch") {
                setError("Could not connect to the server. Please check the backend.")
            } else {
                setError(err.message || "Something went wrong.")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
                <Link
                    to="/"
                    className="mb-8 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-teal-600">
                    <FaArrowLeft />
                    Back to Home
                </Link>

                <div className="mb-7 flex flex-col items-center text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-600 text-white shadow-lg">
                        <FaHospital size={30} />
                    </div>

                    <h1 className="text-3xl font-bold text-slate-800">Welcome Back</h1>

                    <p className="mt-2 text-sm text-slate-500">Sign in to your MediCare account</p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5">
                    <div>
                        <label
                            htmlFor="role"
                            className="mb-2 block text-sm font-medium text-slate-700">
                            Login As
                        </label>

                        <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-100">
                            <FaUserTag className="text-slate-400" />

                            <select
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full bg-transparent py-3 text-slate-800 outline-none">
                                <option value="patient">Patient</option>
                                <option value="doctor">Doctor</option>
                                <option value="sales">Sales</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium text-slate-700">
                            Email Address
                        </label>

                        <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-100">
                            <FaEnvelope className="text-slate-400" />

                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-transparent py-3 text-slate-800 outline-none"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-medium text-slate-700">
                            Password
                        </label>

                        <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-100">
                            <FaLock className="text-slate-400" />

                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full bg-transparent py-3 text-slate-800 outline-none"
                                required
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword((previous) => !previous)}
                                className="text-slate-400 hover:text-teal-600"
                                aria-label={showPassword ? "Hide password" : "Show password"}>
                                {showPassword ?
                                    <FaEyeSlash />
                                :   <FaEye />}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <p
                            role="alert"
                            className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-teal-600 py-3 font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60">
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                </form>

                <p className="mt-6 text-center text-xs text-slate-400">
                    MediCare Hospital Management System
                </p>
            </div>
        </main>
    )
}

export default Login
