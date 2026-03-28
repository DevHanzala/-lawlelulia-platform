const AppointmentItem = ({ time, name, status }) => {
    return (
        <div className="w-full bg-gray-100 text-gray-900 rounded-xl p-2 flex items-center justify-between mb-1 shadow-sm">

            {/* Left: Name on top, Time below */}
            <div>
                <p className="text-sm font-semibold">{name}</p>
                <h6 className="text-xs text-gray-600 mt-1">{time}</h6>
            </div>

            {/* Status */}
            <div className="text-sm">
                <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                    ${status.toLowerCase() === "pending" && "bg-gray-300 text-yellow-600"}
                    ${status.toLowerCase() === "confirmed" && "bg-gray-300 text-green-600"}
                    ${status.toLowerCase() === "cancelled" && "bg-gray-300 text-red-600"}
                `}
                >
                    {status}
                </span>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
                <button className="px-3 py-1 text-xs bg-green-100 text-green-600 rounded-lg hover:bg-green-200">
                    Confirm
                </button>
                <button className="px-3 py-1 text-xs bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
                    Cancel
                </button>
            </div>

        </div>
    );
};

export default AppointmentItem;