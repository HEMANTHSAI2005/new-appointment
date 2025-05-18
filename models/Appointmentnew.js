import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Usernew' },   
  professor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usernew' }, 

  warden1: { type: mongoose.Schema.Types.ObjectId, ref: 'Usernew' },
  warden2: { type: mongoose.Schema.Types.ObjectId, ref: 'Usernew' },

  time: { type: String, required: true },
  status: { type: String, enum: ['booked', 'cancelled'], default: 'booked' }
});

export default mongoose.model('Appointmentnew', appointmentSchema);
