// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import authRoutes from './routes/authRoutes.js';

// dotenv.config();

// const app = express();

// app.use(express.json()); // for parsing application/json

// app.use('/api/auth', authRoutes); // this is the key line

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import professorRoutes from './routes/professorRoutes.js';
import availabilityRoutes from './routes/availabilityRoutes.js';
import wardenRoutes from './routes/wardenRoutes.js';



dotenv.config();

const app = express();

app.use(express.json()); // for parsing application/json

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/professor', professorRoutes);
app.use('/api/warden', wardenRoutes);
app.use('/api/availability', availabilityRoutes);


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
