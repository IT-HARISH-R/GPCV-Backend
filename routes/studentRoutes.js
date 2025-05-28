import express from 'express';
import { studentController, uploadStudentProfileImage } from '../controllers/studentController.js';
import { auth } from '../middlewares/auth.js';

const studentRoutes = express.Router();

// ✅ Create Student Profile
studentRoutes.post('/create', auth.allowRoles(['employee']), uploadStudentProfileImage, studentController.create);

// 🔍 Get Student Profile by registerNumber (from body)
studentRoutes.post('/get', auth.allowRoles(['employee']), uploadStudentProfileImage, studentController.get);

// 🛠️ Update Student Profile
studentRoutes.post('/update', auth.allowRoles(['employee']), studentController.update);

export default studentRoutes;
