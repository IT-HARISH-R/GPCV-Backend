import Student from '../models/student.model.js';


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
            profileUrl,
        } = req.body;
        console.log("he")
        try {
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
            });

            await newStudent.save();
            res.status(201).json({ message: 'Student profile created', student: newStudent });
        } catch (error) {
            res.status(400).json({ message: 'Error creating student', error });
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
            profileUrl,
        } = req.body;

        try {
            const student = await Student.findOneAndUpdate(
                { registerNumber },
                {
                    $set: {
                        name,
                        department,
                        year,
                        dob,
                        email,
                        phone,
                        address,
                        profileUrl,
                    },
                },
                { new: true }
            );

            if (!student) return res.status(404).json({ message: 'Student not found' });

            res.json({ message: 'Student profile updated', student });
        } catch (err) {
            res.status(500).json({ message: 'Server error', err });
        }
    }
}