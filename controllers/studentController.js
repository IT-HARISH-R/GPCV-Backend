import Student from '../models/studentmodel.js';
import multer from 'multer';
import { storage } from '../config/cloudinary.js';

const upload = multer({ storage });
export const uploadStudentProfileImage = upload.single('profileImage');

export const studentController = {
    create: async (req, res) => {
        const {
            registerNumber,
            name,
            department,
            year,
            dob,
            email,
            phone,
            address,
            aadhaarNumber,
        } = req.body;

        try {
            // Required field checks
            if (!registerNumber) {
                return res.status(400).json({ message: 'Register Number is required' });
            }
            if (!email) {
                return res.status(400).json({ message: 'Email is required' });
            }

            // Uniqueness checks
            const [existingRegisterNumber, existingEmail, existingAadhaar, existingAddress] = await Promise.all([
                Student.findOne({ registerNumber }),
                Student.findOne({ email }),
                aadhaarNumber ? Student.findOne({ aadhaarNumber }) : null,
                Student.findOne({ address }),
            ]);

            if (existingRegisterNumber) {
                return res.status(409).json({ message: 'Register Number already exists' });
            }
            if (existingEmail) {
                return res.status(409).json({ message: 'Email already in use' });
            }
            if (existingAadhaar) {
                return res.status(409).json({ message: 'Aadhaar Number already registered' });
            }


            // Upload profile image to Cloudinary if provided
            let profileUrl = '';
            if (req.file) {
                profileUrl = req.file.path; // multer-storage-cloudinary attaches `path` with Cloudinary URL
            }

            // Create and save new student
            const newStudent = new Student({
                registerNumber,
                name,
                department,
                year,
                dob,
                email,
                phone,
                address,
                profileUrl,
                aadhaarNumber,
            });
            await newStudent.save();

            res.status(201).json({ message: 'Student profile created successfully', student: newStudent });
        } catch (error) {
            console.error('Error creating student:', error);
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    },

    get: async (req, res) => {
        const { registerNumber } = req.body;

        try {
            const student = await Student.findOne({ registerNumber });
            if (!student) return res.status(404).json({ message: 'Student not found' });

            res.json(student);
        } catch (err) {
            res.status(500).json({ message: 'Server error', err });
        }
    },

    update: async (req, res) => {
        const {
            registerNumber,
            name,
            department,
            year,
            dob,
            email,
            phone,
            address,
            aadhaarNumber,
        } = req.body;

        try {
            // Prepare updated data
            let updateData = {
                name,
                department,
                year,
                dob,
                email,
                phone,
                address,
                aadhaarNumber,
            };

            // If profile image uploaded, update profileUrl
            if (req.file) {
                console.log(req.file.path)

                updateData.profileUrl = req.file.path; // new uploaded Cloudinary URL
            }

            const student = await Student.findOneAndUpdate(
                { registerNumber },
                { $set: updateData },
                { new: true }
            );

            if (!student) return res.status(404).json({ message: 'Student not found' });

            res.json({ message: 'Student profile updated', student });
        } catch (err) {
            res.status(500).json({ message: 'Server error', err });
        }
    },
};
