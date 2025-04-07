import express from "express"
import { fileComplaint, getComplaints } from "../controllers/complaintController.js";
const complaintRoutes = express.Router();
import { auth } from '../middlewares/auth.js'

// Route: File a complaint
complaintRoutes.post("/complaints", auth.checkAuth, fileComplaint);

// Route: Get all complaints (Admin)
complaintRoutes.get("/complaints", getComplaints);

export default complaintRoutes;
