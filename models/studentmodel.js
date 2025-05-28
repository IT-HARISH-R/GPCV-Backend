import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  registerNumber: { type: String, required: true, unique: true },
  name: String,
  department: String,
  year: String,
  dob: String,
  email: { type: String, required: true, unique: true },
  phone: String,
  address: String,
  profileUrl: String,
  aadhaarNumber: { type: String, unique: true }
});

const Student = mongoose.model('Student', studentSchema);
export default Student;
