import { BrowserRouter, Routes, Route } from "react-router-dom"

import HomePage from "./pages/Home"
import DoctorLogin from "./pages/DoctorLogin"
import SalesLogin from "./pages/SalesLogin"
import DoctorDashboard from "./pages/DoctorDashboard"
import SalesDashboard from "./pages/SalesDashboard"
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<HomePage />}
                />

                <Route
                    path="/doctor/login"
                    element={<DoctorLogin />}
                />

                <Route
                    path="/doctor/dashboard"
                    element={<DoctorDashboard />}
                />
                <Route
                    path="/sales/dashboard"
                    element={<SalesDashboard />}
                />
                <Route
                    path="/sales/login"
                    element={<SalesLogin />}
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App
