import Appointment from '../models/Appointment.js';
import Availability from '../models/Availability.js';
import User from '../models/User.js';


export const bookAppointment = async (req, res) => {
  try {
    const { professorEmail, time } = req.body;
    const studentId = req.user.userId;

    // Find professor by email
    const professor = await User.findOne({ email: professorEmail, role: 'teacher' });
    if (!professor) {
      return res.status(404).json({ message: 'Professor not found' });
    }

    const availability = await Availability.findOne({ professor: professor._id });
    if (!availability || !availability.slots.includes(time)) {
      return res.status(400).json({ message: 'Selected time not available' });
    }

    const appointment = await Appointment.create({
      professor: professor._id,
      student: studentId,
      time,
    });

    // Remove booked time from availability
    availability.slots = availability.slots.filter(slot => slot !== time);
    await availability.save();

    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate('professor', 'name email')
      .populate('student', 'name email');

    res.status(201).json({ message: 'Appointment booked', appointment: populatedAppointment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to book appointment', error: error.message });
  }
};


export const getStudentAppointments = async (req, res) => {
  try {

    const studentId = req.user.userId;

    const appointments = await Appointment.find({ student: studentId }).populate('professor', 'name email');

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch appointments', error: error.message }).populate('student', 'name email');
  }
};

//booked
export const getBookedAppointments = async (req, res) => {
  try {
    console.log('HIT: getBookedAppointments');
    const studentId = req.user.userId;

    const appointments = await Appointment.find({ 
      student: studentId, 
      status: 'booked' 
    }).populate('professor', 'name email').populate('student', 'name email');

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch appointments', error: error.message });
  }
};


//cancelled
export const getCancelledAppointments = async (req, res) => {
  try {
    console.log('HIT: getCancelledAppointments');

    const studentId = req.user.userId;

    const appointments = await Appointment.find({
      student: studentId,
      status: 'cancelled'
    }).populate('professor', 'name email');

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cancelled appointments', error: error.message });
  }
};



// export const bookAppointment = async (req, res) => {
//   try {
//     const { professorId, time } = req.body;
//     const studentId = req.user.userId;

//     const availability = await Availability.findOne({ professor: professorId });
//     if (!availability || !availability.slots.includes(time)) {
//       return res.status(400).json({ message: 'Selected time not available' });
//     }

//     const appointment = await Appointment.create({
//       professor: professorId,
//       student: studentId,
//       time,
//     });

//     // Remove booked time from availability
//     availability.slots = availability.slots.filter(slot => slot !== time);
//     await availability.save();

//     const populatedAppointment = await Appointment.findById(appointment._id)
//       .populate('professor', 'name email')
//       .populate('student', 'name email');

//     res.status(201).json({ message: 'Appointment booked', populatedAppointment });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to book appointment', error: error.message });
//   }
// };





