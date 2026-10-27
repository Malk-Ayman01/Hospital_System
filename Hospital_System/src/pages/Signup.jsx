import { useState } from "react"

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/+$/, "")
const initialForm = {
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    gender: "",
    dateOfBirth: ""
}

export default function Signup() {
    const [form, setForm] = useState(initialForm)
    const [accountType, setAccountType] = useState("patient")
    const [accessCode, setAccessCode] = useState("")
    const [errors, setErrors] = useState({})
    const [message, setMessage] = useState("")
    const [isSuccess, setIsSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleChange = (event) => {
        const { name, value } = event.target

        setForm((previous) => ({
            ...previous,
            [name]: value
        }))

        setErrors((previous) => ({
            ...previous,
            [name]: ""
        }))

        setMessage("")
    }

    const validateForm = () => {
        const nextErrors = {}
        const trimmedName = form.fullName.trim()
        const email = form.email.trim()
        const phone = form.phone.trim()
        const today = new Date().toISOString().slice(0, 10)

        if (trimmedName.length < 3 || trimmedName.length > 60) {
            nextErrors.fullName = "Name must be between 3 and 60 characters."
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            nextErrors.email = "Enter a valid email address."
        }

        if (!/^\+?[0-9]{8,15}$/.test(phone)) {
            nextErrors.phone = "Enter 8–15 digits. A leading + is allowed."
        }

        if (
            form.password.length < 8 ||
            form.password.length > 64 ||
            !/[a-z]/.test(form.password) ||
            !/[A-Z]/.test(form.password) ||
            !/[0-9]/.test(form.password) ||
            !/[^A-Za-z0-9]/.test(form.password)
        ) {
            nextErrors.password =
                "Use 8–64 characters with uppercase, lowercase, a number, and a special character."
        }

        if (form.password !== form.confirmPassword) {
            nextErrors.confirmPassword = "Passwords do not match."
        }

        if (accountType !== "patient" && !accessCode.trim()) {
            nextErrors.accessCode = "Access code is required for Doctor and Receptionist accounts."
        }

        if (form.gender === "") {
            nextErrors.gender = "Please select your gender."
        } else if (!["0", "1"].includes(form.gender)) {
            nextErrors.gender = "Invalid gender selection."
        }

        if (!form.dateOfBirth) {
            nextErrors.dateOfBirth = "Date of birth is required."
        } else if (Number.isNaN(Date.parse(form.dateOfBirth)) || form.dateOfBirth > today) {
            nextErrors.dateOfBirth = "Enter a valid date that is not in the future."
        }

        setErrors(nextErrors)
        return Object.keys(nextErrors).length === 0
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (loading || !validateForm()) return

        setLoading(true)
        setMessage("")
        setIsSuccess(false)

        const payload = {
            fullName: form.fullName.trim(),
            email: form.email.trim().toLowerCase(),
            phone: form.phone.trim(),
            password: form.password,
            confirmPassword: form.confirmPassword,
            gender: Number(form.gender),
            dateOfBirth: form.dateOfBirth,
            // requestedRole: accountType,
            ...(accessCode.trim() ? { code: accessCode.trim() } : {})
        }

        try {
            const response = await fetch(`${API_URL}/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })

            const result = await response.json().catch(() => ({}))
            console.log("Signup response:", response.status, result)

            if (!response.ok) {
                const serverMessage =
                    result.message || result.error?.message || result.errors?.[0]?.message

                throw new Error(serverMessage || `Registration failed (HTTP ${response.status}).`)
            }

            setIsSuccess(true)
            setMessage(result.message || "Account created successfully!")
            setForm(initialForm)
            setAccountType("patient")
            setAccessCode("")
            setErrors({})
        } catch (error) {
            setIsSuccess(false)

            if (error instanceof TypeError || error.message === "Failed to fetch") {
                setMessage("Could not connect to the server. Check the backend and CORS settings.")
            } else {
                setMessage(error.message || "Something went wrong.")
            }
        } finally {
            setLoading(false)
        }
    }

    const inputClass =
        "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-100"

    const labelClass = "mb-1.5 block text-sm font-medium text-slate-700"

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
            <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/60 md:grid-cols-5">
                {/* Branding */}
                <section className="relative hidden flex-col justify-between overflow-hidden bg-teal-800 p-10 text-white md:col-span-2 md:flex">
                    <div className="absolute -right-20 -top-16 h-64 w-64 rounded-full bg-teal-500/30 blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />

                    <div className="relative">
                        <div className="mb-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-2xl font-bold">
                            +
                        </div>

                        <p className="text-sm font-semibold tracking-[0.2em] text-teal-100">
                            MEDICARE HOSPITAL
                        </p>

                        <h1 className="mt-6 text-4xl font-bold leading-tight">
                            Your health,
                            <br />
                            our priority.
                        </h1>

                        <p className="mt-5 text-sm leading-7 text-teal-100">
                            Create your account to access the right services for your role at our
                            hospital.
                        </p>
                    </div>

                    <div className="relative border-t border-white/20 pt-5">
                        <p className="text-sm font-medium">Healthcare made simpler.</p>
                        <p className="mt-1 text-xs text-teal-200">
                            Your care. Your account. Your information.
                        </p>
                    </div>
                </section>

                {/* Signup Form */}
                <section className="p-6 sm:p-10 md:col-span-3">
                    <div className="mb-8">
                        <p className="text-sm font-semibold tracking-wider text-teal-700">
                            CREATE YOUR ACCOUNT
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-slate-900">Sign up</h2>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Choose your account type and fill in your information to register.
                        </p>
                    </div>

                    {message && (
                        <div
                            role="status"
                            aria-live="polite"
                            className={`mb-6 rounded-xl border p-4 text-sm ${
                                isSuccess ?
                                    "border-green-200 bg-green-50 text-green-700"
                                :   "border-red-200 bg-red-50 text-red-700"
                            }`}>
                            {message}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        noValidate
                        className="space-y-5">
                        {/* Account type and access code */}
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="accountType"
                                    className={labelClass}>
                                    Account type
                                </label>
                                <select
                                    id="accountType"
                                    name="accountType"
                                    value={accountType}
                                    onChange={(event) => {
                                        setAccountType(event.target.value)
                                        setErrors((previous) => ({ ...previous, accessCode: "" }))
                                        setMessage("")
                                    }}
                                    className={inputClass}>
                                    <option value="patient">Patient</option>
                                    <option value="doctor">Doctor</option>
                                    <option value="receptionist">Receptionist</option>
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="accessCode"
                                    className={labelClass}>
                                    Access code{" "}
                                    {accountType === "patient" ? "(optional)" : "(required)"}
                                </label>
                                <input
                                    id="accessCode"
                                    name="code"
                                    type="text"
                                    autoComplete="off"
                                    placeholder={
                                        accountType === "doctor" ? "Enter doctor access code"
                                        : accountType === "receptionist" ?
                                            "Enter receptionist access code"
                                        :   "Enter code if you have one"
                                    }
                                    value={accessCode}
                                    onChange={(event) => {
                                        setAccessCode(event.target.value)
                                        setErrors((previous) => ({ ...previous, accessCode: "" }))
                                        setMessage("")
                                    }}
                                    required={accountType !== "patient"}
                                    className={inputClass}
                                    aria-invalid={Boolean(errors.accessCode)}
                                />
                                {errors.accessCode && (
                                    <p className="mt-1 text-xs text-red-600">{errors.accessCode}</p>
                                )}
                            </div>
                        </div>

                        {/* Full name */}
                        <div>
                            <label
                                htmlFor="fullName"
                                className={labelClass}>
                                Full name
                            </label>
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                autoComplete="name"
                                placeholder="Enter your full name"
                                value={form.fullName}
                                onChange={handleChange}
                                className={inputClass}
                                aria-invalid={Boolean(errors.fullName)}
                            />
                            {errors.fullName && (
                                <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>
                            )}
                        </div>

                        {/* Email and Phone */}
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="email"
                                    className={labelClass}>
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="you@example.com"
                                    value={form.email}
                                    onChange={handleChange}
                                    className={inputClass}
                                    aria-invalid={Boolean(errors.email)}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="phone"
                                    className={labelClass}>
                                    Phone number
                                </label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    autoComplete="tel"
                                    placeholder="+201012345678"
                                    value={form.phone}
                                    onChange={handleChange}
                                    className={inputClass}
                                    aria-invalid={Boolean(errors.phone)}
                                />
                                {errors.phone && (
                                    <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                                )}
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className={labelClass}>
                                Password
                            </label>

                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    placeholder="Create a strong password"
                                    value={form.password}
                                    onChange={handleChange}
                                    className={`${inputClass} pr-20`}
                                    aria-invalid={Boolean(errors.password)}
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword((previous) => !previous)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-teal-700">
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>

                            {errors.password && (
                                <p className="mt-1 text-xs text-red-600">{errors.password}</p>
                            )}
                        </div>

                        {/* Confirm password */}
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className={labelClass}>
                                Confirm password
                            </label>

                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showPassword ? "text" : "password"}
                                autoComplete="new-password"
                                placeholder="Re-enter your password"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                className={inputClass}
                                aria-invalid={Boolean(errors.confirmPassword)}
                            />

                            {errors.confirmPassword && (
                                <p className="mt-1 text-xs text-red-600">
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>

                        {/* Gender and Date of birth */}
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="gender"
                                    className={labelClass}>
                                    Gender
                                </label>

                                <select
                                    id="gender"
                                    name="gender"
                                    value={form.gender}
                                    onChange={handleChange}
                                    className={inputClass}
                                    aria-invalid={Boolean(errors.gender)}>
                                    <option value="">Select gender</option>
                                    <option value="0">Male</option>
                                    <option value="1">Female</option>
                                </select>

                                {errors.gender && (
                                    <p className="mt-1 text-xs text-red-600">{errors.gender}</p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="dateOfBirth"
                                    className={labelClass}>
                                    Date of birth
                                </label>

                                <input
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                    type="date"
                                    max={new Date().toISOString().slice(0, 10)}
                                    value={form.dateOfBirth}
                                    onChange={handleChange}
                                    className={inputClass}
                                    aria-invalid={Boolean(errors.dateOfBirth)}
                                />

                                {errors.dateOfBirth && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.dateOfBirth}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3.5 font-semibold text-white transition hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-100 disabled:cursor-not-allowed disabled:opacity-60">
                            {loading ?
                                <>
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                                    Creating account...
                                </>
                            :   "Create account"}
                        </button>

                        <p className="text-center text-xs leading-5 text-slate-500">
                            Please make sure your information is accurate before submitting.
                        </p>
                    </form>
                </section>
            </div>
        </main>
    )
}
