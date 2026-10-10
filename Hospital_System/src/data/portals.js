import { FaUserInjured, FaUserDoctor, FaChartLine } from "react-icons/fa6"

export const portals = [
    {
        id: "patient",
        title: "Patient Portal",
        description: "Book appointments and access hospital services.",
        icon: FaUserInjured,
        path: "/patient",
        theme: "blue"
    },
    {
        id: "doctor",
        title: "Doctor Portal",
        description: "Manage appointments and patient records.",
        icon: FaUserDoctor,
        path: "/doctor/login",
        theme: "teal"
    },
    {
        id: "sales",
        title: "Sales Portal",
        description: "Manage billing and sales operations.",
        icon: FaChartLine,
        path: "/sales/login",
        theme: "violet"
    }
]
