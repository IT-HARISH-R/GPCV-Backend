import express from 'express'
import {
  register,
  login,
  sendResetLink,
  resetPassword,
  me,
  createEmployee
} from '../controllers/authController.js'
import { auth } from '../middlewares/auth.js'


const authRoutes = express.Router()

authRoutes.post('/register', register)
authRoutes.post('/login', login)
authRoutes.get('/me', auth.checkAuth, me)
authRoutes.post('/createEmployee', auth.checkAuth, auth.allowRoles(['admin']), createEmployee)
authRoutes.post('/send-reset', sendResetLink)
authRoutes.post('/reset-password', resetPassword)

export default authRoutes
