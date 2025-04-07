import express from "express"
import { delComplaintsBYid, fileComplaint, getComplaints } from "../controllers/complaintController.js";
const complaintRoutes = express.Router();
import { auth } from '../middlewares/auth.js'

// Route: File a complaint
complaintRoutes.post("/complaints", auth.checkAuth, fileComplaint);

// Route: Get all complaints (Admin)
complaintRoutes.get("/complaints", auth.checkAuth, auth.allowRoles(['admin']), getComplaints);

complaintRoutes.delete("/delete/:id", auth.checkAuth, auth.allowRoles(['admin']), delComplaintsBYid);

export default complaintRoutes;
