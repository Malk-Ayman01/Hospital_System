import { FiMoon, FiSun } from "react-icons/fi"
import { useTheme } from "../context/ThemeContext"

function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()

    const isDark = theme === "dark"

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">
            {isDark ?
                <FiSun size={18} />
            :   <FiMoon size={18} />}
            <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
        </button>
    )
}

export default ThemeToggle
