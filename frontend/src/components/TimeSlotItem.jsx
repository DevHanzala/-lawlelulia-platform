import { FaTrash } from "react-icons/fa";

const TimeSlotItem = ({ time, onDelete }) => {
    return (
        <div className="flex justify-between items-center bg-gray-100 rounded-lg p-2 shadow-sm mt-2">
            <span className=" text-sm text-gray-700 font-medium">{time}</span>
            <button
                onClick={onDelete}
                className="flex items-center gap-1 px-2 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200"
            >
                <FaTrash />
            </button>
        </div>
    );
};

export default TimeSlotItem;