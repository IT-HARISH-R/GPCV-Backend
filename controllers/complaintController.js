import Complaint from "../models/Complaint.js"

// Submit a complaint (POST)
export const fileComplaint = async (req, res) => {
    try {
        console.log(req.body)
        const { name, department, incident } = req.body;



        if (!department || !incident) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newComplaint = new Complaint({ name, department, incident });
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
 

// [
//     {
//       "_id": "65f7e92d3b3a8d001ce842b1",
//       "department": "Computer Science",
//       "incidentDetails": "Bullying incident in the dormitory.",
//       "createdAt": "2025-04-02T12:00:00.000Z"
//     },
//     {
//       "_id": "65f7e9f4b3a8d001ce842b2",
//       "department": "Mechanical Engineering",
//       "incidentDetails": "Senior students harassing juniors.",
//       "createdAt": "2025-04-02T12:05:00.000Z"
//     }
//   ]
