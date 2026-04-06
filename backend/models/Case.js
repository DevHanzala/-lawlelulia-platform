import mongoose from "mongoose";

// Case Schema
const caseSchema = new mongoose.Schema({

    caseTitle: {
        type: String,
        required: true,
        minlength: [3, 'Case title must be at least 3 characters long'],
        maxlength: [50, 'Case title cannot exceed 50 characters']
    },
    caseDescription: {
        type: String,
        required: true,
        minlength: [50, 'Case description must be at least 50 characters long'],
        maxlength: [1500, 'Case description cannot exceed 1500 characters']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // References the User collection
        required: true
    },
    status: {
        type: String,
        default: "active",
        enum: {
            values: ["active", "closed"],
            message: "Status must be either 'active' or 'closed'"
        },
    }
}, {
    timestamps: true // Optional: adds createdAt and updatedAt
});

export default mongoose.model("Case", caseSchema);