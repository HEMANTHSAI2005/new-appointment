import Availabilitynew from '../models/Availabilitynew.js';
import Appointmentnew from '../models/Appointmentnew.js';
import Usernew from '../models/Usernew.js';

export const setWardenAvailability = async (req, res) => {
  try {
    const wardenId = req.user.userId;
    const { slots } = req.body;
    console.log(slots)
    let availability = await Availabilitynew.findOne({ user: wardenId });
    console.log("av: ",availability)
    if (!availability) {
      availability = new Availabilitynew({ user: wardenId, slots });
    } else {
      availability.slots = [...new Set([...availability.slots, ...slots])];
    }

    await availability.save();

    res.status(200).json({ message: 'Availability updated', availability });
  } catch (error) {
    res.status(500).json({ message: 'Error setting availability', error: error.message });
  }
};

export const bookWardenAppointment = async (req, res) => {
  try {
    const { wardenEmail, time } = req.body;
    const bookingWardenId = req.user.userId;
    console.log("email", wardenEmail)
    console.log("time: ",time)
    const targetWarden = await Usernew.findOne({ email: wardenEmail, role: 'warden' });
    console.log("valu: ",targetWarden)
    if (!targetWarden) {
      return res.status(404).json({ message: 'Target warden not found' });
    }

    const availability = await Availabilitynew.findOne({ user: targetWarden._id });
    if (!availability || !availability.slots.includes(time)) {
      return res.status(400).json({ message: 'Selected time not available' });
    }

    const appointment = await Appointmentnew.create({
      professor: targetWarden._id, 
      student: bookingWardenId,    
      time,
      status: 'booked'
    });

    availability.slots = availability.slots.filter(slot => slot !== time);
    await availability.save();

    const populated = await Appointmentnew.findById(appointment._id)
      .populate('professor', 'name email')
      .populate('student', 'name email');

    res.status(201).json({ message: 'Appointment booked', appointment: populated });
  } catch (error) {
    res.status(500).json({ message: 'Error booking appointment', error: error.message });
  }
};

export const getWardenAppointments = async (req, res) => {
  try {
    const wardenId = req.user.userId;

    const appointments = await Appointmentnew.find({
      $or: [{ professor: wardenId }, { student: wardenId }]
    }).populate('professor', 'name email')
      .populate('student', 'name email');

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error: error.message });
  }
};
