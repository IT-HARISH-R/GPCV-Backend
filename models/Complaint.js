import mongoose from "mongoose"

 const complaintSchema = new mongoose.Schema(
    {
        department: {
            type: String,
            required: true,
        },
        incidentDetails: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Complaint", complaintSchema);
