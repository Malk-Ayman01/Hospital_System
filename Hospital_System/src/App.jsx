import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./Layout"

import HomePage from "./pages/Home"
import Login from "./pages/Login"
import SalesLogin from "./pages/SalesLogin"
import DoctorDashboard from "./pages/DoctorDashboard"
import SalesDashboard from "./pages/SalesDashboard"
import Signup from "./pages/Signup"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Layout />}>
                    <Route
                        path="/"
                        element={<HomePage />}
                    />

                    <Route
                        path="/signup"
                        element={<Signup />}
                    />

                    <Route
                        path="/login"
                        element={<Login />}
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
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
