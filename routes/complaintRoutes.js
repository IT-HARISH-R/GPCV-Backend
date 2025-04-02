import express from "express"
import { fileComplaint, getComplaints } from "../controllers/complaintController.js";
const complaintRoutes = express.Router();
// const { fileComplaint, getComplaints } = require("../controllers/complaintController");

// Route: File a complaint
complaintRoutes.post("/complaints", fileComplaint);

// Route: Get all complaints (Admin)
complaintRoutes.get("/complaints", getComplaints);

export default complaintRoutes;
