import mongoose from "mongoose"

const complaintSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        department: {
            type: String,
            required: true,
        },
        incident: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Complaint", complaintSchema);
