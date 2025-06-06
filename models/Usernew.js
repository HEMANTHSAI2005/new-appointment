import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'professor', 'warden'], required: true },
  hostel: { type: String }, //this one is optional field
});

export default mongoose.model('Usernew', userSchema);
 