import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  registerNumber: { type: String, required: true, unique: true },
  name: String,
  department: String,
  year: String,
  dob: String,
  email: String,
  phone: String,
  address: String,
  profileUrl: String,
});

const Student = mongoose.model('Student', studentSchema);
export default Student;
