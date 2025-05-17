import mongoose from 'mongoose';

const availabilitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Usernew', required: true },
  slots: [{ type: String, required: true }] // e.g., ["10:00", "10:30", "11:00"]
});

export default mongoose.model('Availabilitynew', availabilitySchema);
