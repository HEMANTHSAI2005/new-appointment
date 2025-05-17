import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  professor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  time: String,
  status: { type: String, enum: ['booked', 'cancelled'], default: 'booked' }
});

export default mongoose.model('Appointmentnew', appointmentSchema); // Use 'export default'
