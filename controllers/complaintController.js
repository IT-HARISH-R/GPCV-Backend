import { sendComplaintMail } from "../middlewares/sendComplaintMail.js";
import Complaint from "../models/Complaint.js"
import User from "../models/User.js";


// Submit a complaint (POST)
export const fileComplaint = async (req, res) => {
    try {
        const { name, department, incident } = req.body;

        if (!department || !incident) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newComplaint = new Complaint({ name, department, incident });

        const user = await User.findById(req.userId)



        await sendComplaintMail(name, department, incident, user.email);

        await newComplaint.save();

        res.status(201).json({ message: "Complaint filed successfully", newComplaint });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

// Get all complaints (GET)
export const getComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find().sort({ createdAt: -1 });
        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

export const delComplaintsBYid = async (req, res) => {
    console.log(req)
    const { id } = req.params
    console.log(req.params)

    await Complaint.findByIdAndDelete(id)

    res.json({ status: true })

}

