export default function SalesDashboard() {
  const patients = [
    { id: 1, name: "basmala mohamed", status: "Waiting" },
    { id: 2, name: "younis ahmed", status: "Checked In" },
    { id: 3, name: "ahmed mohamed", status: "Waiting" },
  ];

  return (
    <div className="min-h-screen bg-[#e0f2fe] p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-[#0369a1]">Talia mohamed</h1>
        <p className="text-[#0f172a] opacity-70 mb-6">Reception & Billing</p>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold text-[#0f172a] mb-4">
            Today's Patients
          </h2>
          {patients.map((p) => (
            <div
              key={p.id}
              className="flex justify-between items-center border-b py-3 last:border-b-0"
            >
              <p className="text-[#0f172a]">{p.name}</p>
              <span className="text-sm px-3 py-1 rounded-full bg-[#0369a1] text-white">
                {p.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}