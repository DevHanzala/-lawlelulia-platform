import { FaTrash } from "react-icons/fa";

const TimeSlotItem = ({ time, onDelete }) => {
    return (
        <div className="flex justify-between items-center bg-white rounded-lg p-2 shadow-sm">
            <span className="text-gray-700">{time}</span>
            <button
                onClick={onDelete}
                className="flex items-center gap-1 px-2 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200"
            >
                <FaTrash /> Delete
            </button>
        </div>
    );
};

export default TimeSlotItem;