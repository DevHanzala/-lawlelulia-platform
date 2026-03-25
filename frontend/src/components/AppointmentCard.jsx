// components/AppointmentCard.jsx
const AppointmentCard = ({ name, date, time, status }) => {

    const statusStyles = {
        completed: "bg-green-100 text-green-700",
        pending: "bg-yellow-100 text-yellow-700",
        confirmed: "bg-blue-100 text-blue-700",
    };

    return (
        <div className="flex justify-between items-center shadow-sm rounded-md p-3">

            {/* Left */}
            <div>
                <p className="font-medium">{name}</p>
                <p className="text-xs text-gray-500">
                    {date} • {time}
                </p>
            </div>

            {/* Right */}
            <span className={`text-xs px-2 py-1 rounded ${statusStyles[status]}`}>
                {status}
            </span>
        </div>
    );
};

export default AppointmentCard;