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
import PatientQueue from "./pages/DoctorPage/PatientQueue";
import DoctorDashboard from "./pages/DoctorPage/DoctorDashboard";
import ConsultationRoom from "./pages/DoctorPage/ConsultationRoom";
import DoctorLayout from "./layouts/DoctorLayout";
import MedicalRecords from "./pages/DoctorPage/MedicalRecords";
import PatientMedicalHistory from "./pages/DoctorPage/PatientMedicalHistory";



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
                    
  {/* Doctor Routes */}
          <Route path="doctor" element={<DoctorLayout />}>
            <Route
              path="doctordashboard"
              element={<DoctorDashboard />}
            />
            <Route path="queue" element={<PatientQueue />} />
            <Route path="consultation" element={<ConsultationRoom />} />
            <Route path="records" element={<MedicalRecords />} />
              <Route
    path="records/:patientId"
    element={<PatientMedicalHistory />}
  />
          </Route>

                    <Route
                        path="/sections/dashboard"
                        element={<Sections />}
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
                        path="/appointment"
                        element={<BookingWizard />}
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


