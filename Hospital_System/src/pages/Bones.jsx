import ClinicDoctors from "../pages/ClinicDoctors"

export default function Bones() {
    const doctors = [
        {
            id: 1,
            name: "دكتور أحمد محمد",
            specialty: "استشاري جراحة العظام",
            days: "السبت - الاثنين - الأربعاء",
            time: "10:00 صباحاً - 2:00 مساءً"
        },
        {
            id: 2,
            name: "دكتور محمد علي",
            specialty: "أخصائي العظام والمفاصل",
            days: "الأحد - الثلاثاء - الخميس",
            time: "4:00 مساءً - 8:00 مساءً"
        },
        {
            id: 3,
            name: "دكتور علي حسن",
            specialty: "استشاري إصابات الملاعب",
            days: "السبت - الاثنين",
            time: "12:00 ظهراً - 4:00 مساءً"
        }
    ]

    return (
        <ClinicDoctors
            title="عيادة العظام"
            description="اختر الطبيب المناسب واحجز موعدك بكل سهولة"
            doctors={doctors}
        />
    )
}
