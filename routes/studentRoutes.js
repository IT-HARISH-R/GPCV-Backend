import express from 'express';
import Student from '../models/student.model.js';
import { studentController } from '../controllers/studentController.js';

const studentRoutes = express.Router();

// ✅ Create Student Profile
studentRoutes.post('/create', studentController.create);

// 🔍 Get Student Profile by registerNumber (from body)
studentRoutes.post('/get', studentController.get);

// 🛠️ Update Student Profile
studentRoutes.put('/update', studentController.update);

export default studentRoutes;
