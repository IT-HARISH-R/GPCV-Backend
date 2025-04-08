import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../utlis/config.js'
import sendWelcomeEmail from '../middlewares/sendMail.js'
import studentMail from '../middlewares/studentMail.js'
import sendResetEmail from '../middlewares/sendResetEmail.js'


const SECRET = SECRET_KEY

// Register
export const register = async (req, res) => {
    const { name, email, role } = req.body;
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) return res.status(400).json({ message: 'Email already exists' })
        const password = name;
        const hashed = await bcrypt.hash(password, 10)
        const user = await User.create({ name, email, password: hashed, role })
        await studentMail({ name, email, password })
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
    const { email } = req.body;
    console.log(email)
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const token = jwt.sign({ id: user._id }, SECRET, {
            expiresIn: '15m',
        });

        await sendResetEmail(email, token);

        return res.status(200).json({ status: true, message: 'Reset email sent' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: false, message: 'Server error' });
    }
}

// Reset password
export const resetPassword = async (req, res) => {
    const { password, token } = req.body;

    try {
        const decoded = jwt.verify(token, SECRET);
        const user = await User.findById(decoded.id);

        if (!user) return res.status(404).json({ message: 'Invalid or expired token' });

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;

        await user.save();

        res.status(200).json({ status: true, message: 'Password updated successfully' });

    } catch (error) {
        res.status(400).json({ status: false, message: 'Invalid or expired token' });
    }
}

export const me = async (request, response) => {
    try {
        console.log("..................me ")
        // console.log(request)
        // console.log(request.userId)
        const userid = request.userId
        const user = await User.findById(userid).select('-__v -_id');
        if (!user) {
            return response.status(404).json({ message: "user not found" });
        }
        // console.log(user)

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
            email: email,
            password: name,
            role: "Lecturer",
        });

        res.status(201).json({ message: 'createEmployee successfully' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


