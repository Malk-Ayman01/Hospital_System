import { useState } from "react"
import { FiSearch, FiX } from "react-icons/fi"
import { Link } from "react-router-dom"

export default function Sections() {
    const [search, setSearch] = useState("")

    const sections = [
        { id: 1, name: "عيادة العظام", icon: "🦴", path: "/sections/bones" },
        { id: 2, name: "عيادة القلب", icon: "❤️", path: "/sections/cardiology" },
        { id: 3, name: "عيادة الأسنان", icon: "🦷", path: "/sections/dentistry" },
        { id: 4, name: "عيادة الأطفال", icon: "👶", path: "/sections/pediatrics" },
        { id: 5, name: "عيادة الجلدية", icon: "🩺", path: "/sections/dermatology" }
    ]
    // Filter sections based on search input
    const filteredSections = sections.filter((section) =>
        section.name.toLowerCase().includes(search.trim().toLowerCase())
    )

    return (
        <div className="space-y-6 p-7">
            {/* Search */}
            <div className="max-w-xl flex items-center gap-4 mx-auto">
                <label
                    htmlFor="search"
                    className="block text-xl font-bold text-slate-700 mb-3">
                    ابحث عن قسم طبي
                </label>

                <div className="relative group">
                    <FiSearch
                        className="absolute right-4 top-1/2 -translate-y-1/2
                        text-sky-500 text-xl"
                    />

                    <input
                        type="text"
                        id="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="ابحث عن اسم العيادة..."
                        className="w-full bg-white border border-sky-100
                        rounded-xl py-3 pr-12 pl-12 text-slate-700
                        placeholder:text-slate-400 shadow-sm
                        outline-none transition-all duration-300
                        focus:border-sky-500 focus:ring-4
                        focus:ring-sky-100 focus:shadow-md"
                    />

                    {search && (
                        <button
                            type="button"
                            onClick={() => setSearch("")}
                            className="absolute left-4 top-1/2
                            -translate-y-1/2 text-slate-400
                            hover:text-red-500 transition-colors"
                            aria-label="مسح البحث">
                            <FiX size={20} />
                        </button>
                    )}
                </div>
            </div>

            {/* Sections */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSections.length > 0 ?
                    filteredSections.map((section) => (
                        <Link
                            to={section.path}
                            key={section.id}
                            className="group flex items-center gap-4 p-5
                            bg-white border border-sky-100 rounded-2xl
                            shadow-sm hover:shadow-lg hover:shadow-sky-100
                            hover:border-sky-300 hover:-translate-y-1
                            transition-all duration-300">
                            <div
                                className="w-14 h-14 flex items-center
                            justify-center rounded-xl bg-sky-100 text-2xl
                            group-hover:bg-sky-600 group-hover:scale-110
                            transition-all duration-300">
                                {section.icon}
                            </div>

                            <h2
                                className="text-lg font-bold text-slate-800
                            group-hover:text-sky-600 transition-colors">
                                {section.name}
                            </h2>
                        </Link>
                    ))
                :   <div
                        className="col-span-full text-center py-10
                    bg-sky-50 rounded-2xl border border-sky-100">
                        <FiSearch className="mx-auto text-4xl text-sky-400 mb-3" />

                        <h3 className="text-lg font-bold text-slate-700">لا توجد نتائج</h3>

                        <p className="text-sm text-slate-500 mt-2">
                            لم يتم العثور على قسم بهذا الاسم
                        </p>
                    </div>
                }
            </div>
        </div>
    )
}
