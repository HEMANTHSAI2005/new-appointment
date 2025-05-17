import mongoose from 'mongoose';

const availabilitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  slots: [{ type: String, required: true }] // e.g., ["10:00", "10:30", "11:00"]
});

export default mongoose.model('Availability', availabilitySchema);
