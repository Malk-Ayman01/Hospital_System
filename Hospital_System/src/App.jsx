import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./Layout"
import Nav from "./components/Nav"
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
                    element={<Layout />}
                >
              

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
             </Route>
            </Routes>
        </BrowserRouter>

        
    )
}

export default App
