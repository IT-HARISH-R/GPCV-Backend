import express from 'express';
import { studentController, uploadStudentProfileImage } from '../controllers/studentController.js';
import { auth } from '../middlewares/auth.js';

const studentRoutes = express.Router();

studentRoutes.post('/create', auth.checkAuth, auth.allowRoles(['employee']), uploadStudentProfileImage, studentController.create);
studentRoutes.post('/get', auth.checkAuth, auth.allowRoles(['employee']), studentController.get);
studentRoutes.post('/update', auth.checkAuth, auth.allowRoles(['employee']), uploadStudentProfileImage, studentController.update);

export default studentRoutes;
