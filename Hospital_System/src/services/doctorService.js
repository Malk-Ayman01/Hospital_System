
import { doctorInfo, doctorStats } from "../data/doctorData";
import { patients } from "../data/patientData";

// Temporary data until Backend is ready

export async function getDoctorDashboardData() {
  return {
    doctor: doctorInfo,
    stats: doctorStats,
    patients: patients,
  };
}


// When data of backend is ready


// export async function getDoctorDashboardData() {
//   const response = await fetch("/api/doctor/dashboard");

//   if (!response.ok) {
//     throw new Error("Failed to fetch dashboard data");
//   }

//   return await response.json();
// }