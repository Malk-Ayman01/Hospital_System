import { Link } from "react-router-dom"

function PortalCard({ portal }) {
    const Icon = portal.icon

    const themeClasses = {
        blue: "bg-blue-50 text-blue-600 group-hover:bg-blue-600",
        teal: "bg-teal-50 text-teal-600 group-hover:bg-teal-600",
        violet: "bg-violet-50 text-violet-600 group-hover:bg-violet-600"
    }

    return (
        <Link
            to={portal.path}
            className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
            <div
                className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl transition-colors group-hover:text-white ${themeClasses[portal.theme]}`}>
                <Icon size={26} />
            </div>

            <h2 className="mb-2 text-xl font-bold text-slate-900">{portal.title}</h2>

            <p className="mb-6 text-sm leading-6 text-slate-500">{portal.description}</p>

            <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                Continue
                <span aria-hidden="true">→</span>
            </span>
        </Link>
    )
}

export default PortalCard
