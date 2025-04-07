import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../utlis/config.js'
import sendWelcomeEmail from '../middlewares/sendMail.js'


const SECRET = SECRET_KEY

// Register
export const register = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) return res.status(400).json({ message: 'Email already exists' })

        const hashed = await bcrypt.hash(password, 10)
        const user = await User.create({ name, email, password: hashed, role })

        res.status(201).json({ message: 'Registered successfully' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// Login
export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })

        if (!user) return res.status(400).json({ message: 'User not found' })


        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' })


        const token = jwt.sign({ id: user._id, role: user.role }, SECRET, { expiresIn: '7d' })

        res.json({ token, name: user.name, role: user.role, status: true })
    } catch (err) {
        res.status(500).json(err)
    }
}

// Send reset link
export const sendResetLink = async (req, res) => {
    const { email } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) return res.status(404).json({ message: 'Email not found' })

        const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '15m' })
        user.resetToken = token
        user.resetTokenExpire = Date.now() + 15 * 60 * 1000
        await user.save()

        // Here you'd normally send the token via email
        // For testing, return it in response
        res.json({ message: 'Reset link sent', token })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// Reset password
export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body
    try {
        const payload = jwt.verify(token, SECRET)
        const user = await User.findById(payload.id)
        if (!user || user.resetToken !== token || user.resetTokenExpire < Date.now()) {
            return res.status(400).json({ message: 'Token invalid or expired' })
        }

        user.password = await bcrypt.hash(newPassword, 10)
        user.resetToken = undefined
        user.resetTokenExpire = undefined
        await user.save()

        res.json({ message: 'Password reset successful' })
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' })
    }
}

export const me = async (request, response) => {
    try {
        console.log("..................")
        // console.log(request)
        console.log(request.userId)
        const userid = request.userId
        const user = await User.findById(userid);
        if (!user) {
            return response.status(404).json({ message: "user not found" });
        }
        console.log(user)

        response.json({ user })
    }
    catch (error) {
        response.status(500).json({ message: error.message });
    }
}


// createEmployee
export const createEmployee = async (req, res) => {
    const { name, email } = req.body;
    try {
        console.log(req.body)

        const existingUser = await User.findOne({ email })
        if (existingUser) return res.status(400).json({ message: 'Email already exists' })

        const role = 'employee';

        const password = name;


        const hashed = await bcrypt.hash(password, 10)

        const user = await User.create({ name, email, password: hashed, role })

        await sendWelcomeEmail({
            name: name,
            email: "harishmass27.8@gmail.com",
            password: name,
            role: "Lecturer",
        });

        res.status(201).json({ message: 'createEmployee successfully' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


