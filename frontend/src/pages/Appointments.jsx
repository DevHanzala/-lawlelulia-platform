import AppointmentCard from "../components/AppointmentCard";

const Appointments = () => {
    return (
        <>
            <div className="w-full">
                <h5 className="font-medium text-lg">Appointment Management</h5>
                <div className="flex justify-between ">
                    <p className="text-sm text-gray-500">Schedule and manage patient appointments</p>
                    <button className="bg-black text-white p-2 rounded-md">Book Appointment</button>
                </div>
            </div>

            {/* Appointment Section */}
            <div className="w-full flex flex-col md:flex-row gap-4 mt-4">

                {/* History */}
                <div className="w-full md:w-1/2 border border-gray-200 rounded-lg bg-white shadow-sm flex flex-col p-4">
                    <h5 className="text-lg font-medium ">Appointment History</h5>
                    <p className="text-xs text-gray-400 border-b py-2">View your appointment history</p>

                    <div className="space-y-3 h-75 overflow-y-auto">
                        <AppointmentCard name="Cocolaw Admin" date="Feb 10" time="10:30 AM" status="completed" />
                        <AppointmentCard name="Cocolaw Admin" date="Feb 09" time="02:00 PM" status="completed" />
                        <AppointmentCard name="Cocolaw Admin" date="Feb 09" time="02:00 PM" status="completed" />
                        <AppointmentCard name="Cocolaw Admin" date="Feb 09" time="02:00 PM" status="completed" />
                    </div>
                </div>

                {/* Upcoming */}
                <div className="w-full md:w-1/2 border border-gray-200 rounded-lg bg-white shadow-sm flex flex-col p-4">
                    <h5 className="text-lg font-medium">Upcoming Appointments</h5>
                    <p className="text-xs text-gray-400 border-b py-2">Check your upcoming appointments</p>

                    <div className="space-y-3 h-75 overflow-y-auto">
                        <AppointmentCard name="Cocolaw Admin" date="Feb 12" time="09:00 AM" status="confirmed" />
                        <AppointmentCard name="Cocolaw Admin" date="Feb 12" time="11:30 AM" status="pending" />
                    </div>
                </div>

            </div>
        </>
    )
}

export default Appointments;