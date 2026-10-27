export default function DoctorDashboard() {
  const doctor = { name: "Dr. Mohamed Ali", specialty: "Cardiology" };

  const appointments = [
    { id: 1, patient: "talia mohamed", time: "10:00 AM", status: "Confirmed" },
    { id: 2, patient: "younis ahmed", time: "11:30 AM", status: "Pending" },
    { id: 3, patient: "mahmoud ahmed", time: "01:00 PM", status: "Confirmed" },
  ];

  return (
    <div className="min-h-screen bg-[#e0f2fe] p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-[#0369a1]">{doctor.name}</h1>
        <p className="text-[#0f172a] opacity-70 mb-6">{doctor.specialty}</p>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold text-[#0f172a] mb-4">
            Today's Appointments
          </h2>

          {appointments.map((a) => (
            <div
              key={a.id}
              className="flex justify-between items-center border-b py-3 last:border-b-0"
            >
              <div>
                <p className="font-medium text-[#0f172a]">{a.patient}</p>
                <p className="text-sm text-[#0f172a] opacity-60">{a.time}</p>
              </div>
              <span className="text-sm px-3 py-1 rounded-full bg-[#0369a1] text-white">
                {a.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}