import ClinicDoctors from "../pages/ClinicDoctors"

export default function Heart() {
    const doctors = [
        {
            id: 1,
            name: "دكتور محمود أحمد",
            specialty: "استشاري أمراض القلب",
            days: "السبت - الاثنين",
            time: "10:00 صباحاً - 2:00 مساءً"
        },
        {
            id: 2,
            name: "دكتور محمد حسن",
            specialty: "أخصائي القلب والأوعية الدموية",
            days: "الأحد - الثلاثاء",
            time: "4:00 مساءً - 8:00 مساءً"
        }
    ]

    return (
        <ClinicDoctors
            title="عيادة القلب"
            description="رعاية متكاملة لصحة القلب والأوعية الدموية"
            doctors={doctors}
        />
    )
}
