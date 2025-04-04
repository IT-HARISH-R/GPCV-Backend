import express from 'express'
import {
  register,
  login,
  sendResetLink,
  resetPassword
} from '../controllers/authController.js'

const authRoutes = express.Router()

authRoutes.post('/register', register)
authRoutes.post('/login', login)
authRoutes.post('/send-reset', sendResetLink)
authRoutes.post('/reset-password', resetPassword)

export default authRoutes
