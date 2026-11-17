import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./Layout"

import HomePage from "./pages/Home"
import Login from "./pages/Login"
import SalesLogin from "./pages/SalesLogin"

import SalesDashboard from "./pages/SalesDashboard"
import Signup from "./pages/Signup"
import Sections from "./pages/Sections"
import Bones from "./pages/Bones"
import Cardiology from "./pages/Cardiology"
import BookingWizard from "./pages/BookingWizard"

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
                        path="/appointment" 
                        element={<BookingWizard />} 
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
                        path="/sections/dashboard"
                        element={<Sections />}
                    />
                    <Route
                        path="/sections/bones"
                        element={<Bones />}
                    />
                    <Route
                        path="/sections/bones"
                        element={<Bones />}
                    />
                    <Route
                        path="/sections/cardiology"
                        element={<Cardiology />}
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
