import { useState } from "react"
import { useNavigate } from "react-router-dom"

// Static data for now, replace with the API response when it is ready
const initialQueue = [
    {
        id: 1,
        queueNumber: "Q-101",
        patient: "محمد إبراهيم",
        department: "أمراض القلب",
        doctor: "د. أحمد الشريف",
        status: "في انتظار الكشف",
        price: 300,
        paid: true
    },
    {
        id: 2,
        queueNumber: "Q-102",
        patient: "منى عبد الله",
        department: "الأعصاب",
        doctor: "د. محمود حسن",
        status: "داخل العيادة",
        price: 400,
        paid: true
    },
    {
        id: 3,
        queueNumber: "Q-103",
        patient: "خالد مصطفى",
        department: "الباطنة",
        doctor: "د. هشام مهران",
        status: "تم الكشف",
        price: 250,
        paid: false
    },
    {
        id: 4,
        queueNumber: "Q-104",
        patient: "أحمد سعيد",
        department: "العظام",
        doctor: "د. طارق العوضي",
        status: "في الاستقبال",
        price: 350,
        paid: false
    }
]

const statusClasses = {
    "في الاستقبال": "bg-secondary text-primary",
    "في انتظار الكشف": "bg-amber-50 text-amber-700",
    "داخل العيادة": "bg-primary text-white",
    "تم الكشف": "bg-green-100 text-green-700"
}

const statuses = Object.keys(statusClasses)

const textFields = [
    ["queueNumber", "رقم الطابور"],
    ["patient", "اسم المريض"],
    ["department", "القسم الطبي"],
    ["doctor", "الطبيب"]
]

export default function SalesDashboard() {
    const navigate = useNavigate()
    const [queue, setQueue] = useState(initialQueue)
    const [search, setSearch] = useState("")
    const [form, setForm] = useState(null)
    const [message, setMessage] = useState("")

    const filteredQueue = queue.filter((item) =>
        [item.queueNumber, item.patient, item.department, item.doctor, item.status]
            .join(" ")
            .toLowerCase()
            .includes(search.trim().toLowerCase())
    )

    const openEditForm = (item) => {
        setForm({ ...item, paid: String(item.paid) })
    }

    const handleCall = (item) => {
        setMessage(`تم استدعاء المريض ${item.patient}`)
        setTimeout(() => setMessage(""), 3000)
    }

    const handleChange = (event) => {
        const { name, value } = event.target

        setForm((previous) => ({
            ...previous,
            [name]: value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        const row = {
            ...form,
            price: Number(form.price),
            paid: form.paid === "true"
        }

        setQueue((previous) => previous.map((item) => (item.id === row.id ? row : item)))
        setForm(null)
    }

    const inputClass =
        "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-secondary"

    const labelClass = "mb-1.5 block text-sm font-medium text-slate-700"

    return (
        <main className="min-h-screen bg-secondary px-4 py-10 sm:px-6">
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-dark">
                            مكتب الاستقبال وتسجيل الدخول
                        </h1>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            إدارة الطوابير الفورية، تسكين المرضى، ومعالجة الحالات الاستثنائية
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90">
                            تسجيل مريض جديد
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/signup")}
                            className="rounded-xl border border-primary bg-white px-5 py-3 text-sm font-semibold text-primary transition hover:bg-secondary">
                            تسجيل حساب جديد
                        </button>
                    </div>
                </div>

                {message && (
                    <div
                        role="status"
                        aria-live="polite"
                        className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                        {message}
                    </div>
                )}

                {/* Queue table */}
                <section className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                        <h2 className="text-xl font-bold text-dark">طوابير الانتظار الحالية</h2>

                        <input
                            type="text"
                            placeholder="ابحث بالاسم أو الرقم أو القسم"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            className={`${inputClass} sm:max-w-xs`}
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-start text-sm">
                            <thead className="bg-secondary text-primary">
                                <tr>
                                    <th className="p-4 font-semibold">رقم الطابور</th>
                                    <th className="p-4 font-semibold">اسم المريض</th>
                                    <th className="p-4 font-semibold">القسم الطبي</th>
                                    <th className="p-4 font-semibold">الطبيب</th>
                                    <th className="p-4 font-semibold">الحالة</th>
                                    <th className="p-4 font-semibold">سعر الكشف</th>
                                    <th className="p-4 font-semibold">التكلفة</th>
                                    <th className="p-4 font-semibold">الإجراءات</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-200">
                                {filteredQueue.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="text-slate-700">
                                        <td className="p-4 font-mono font-bold text-primary">
                                            {item.queueNumber}
                                        </td>
                                        <td className="p-4 font-medium text-dark">{item.patient}</td>
                                        <td className="p-4">{item.department}</td>
                                        <td className="p-4">{item.doctor}</td>
                                        <td className="p-4">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClasses[item.status]}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="p-4">{item.price} ج.م</td>
                                        <td className="p-4 font-semibold">
                                            {item.paid ? item.price : 0} ج.م
                                        </td>
                                        <td className="p-4">
                                            <div className="flex gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => handleCall(item)}
                                                    className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white">
                                                    استدعاء
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => openEditForm(item)}
                                                    className="rounded-lg bg-dark px-3 py-1.5 text-xs font-semibold text-white">
                                                    تعديل
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {filteredQueue.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={8}
                                            className="p-6 text-center text-slate-500">
                                            لا توجد نتائج.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>

            {/* Edit modal */}
            {form && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <form
                        onSubmit={handleSubmit}
                        className="w-full max-w-md space-y-4 rounded-3xl bg-white p-6 shadow-xl">
                        <h2 className="text-2xl font-bold text-dark">تعديل البيانات</h2>

                        {textFields.map(([name, label]) => (
                            <div key={name}>
                                <label
                                    htmlFor={name}
                                    className={labelClass}>
                                    {label}
                                </label>
                                <input
                                    id={name}
                                    name={name}
                                    type="text"
                                    value={form[name]}
                                    onChange={handleChange}
                                    required
                                    className={inputClass}
                                />
                            </div>
                        ))}

                        <div>
                            <label
                                htmlFor="status"
                                className={labelClass}>
                                الحالة
                            </label>
                            <select
                                id="status"
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                                className={inputClass}>
                                {statuses.map((status) => (
                                    <option key={status}>{status}</option>
                                ))}
                            </select>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="price"
                                    className={labelClass}>
                                    سعر الكشف (ج.م)
                                </label>
                                <input
                                    id="price"
                                    name="price"
                                    type="number"
                                    min="0"
                                    value={form.price}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="paid"
                                    className={labelClass}>
                                    الدفع
                                </label>
                                <select
                                    id="paid"
                                    name="paid"
                                    value={form.paid}
                                    onChange={handleChange}
                                    className={inputClass}>
                                    <option value="true">تم الدفع</option>
                                    <option value="false">لم يدفع</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                type="submit"
                                className="flex-1 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90">
                                حفظ
                            </button>

                            <button
                                type="button"
                                onClick={() => setForm(null)}
                                className="flex-1 rounded-xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200">
                                إلغاء
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </main>
    )
}