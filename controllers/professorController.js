import Appointment from '../models/Appointment.js';
import Availability from '../models/Availability.js';

export const getProfessorAppointments = async (req, res) => {
  try {
    const professorId = req.user.userId;

    const appointments = await Appointment.find({ professor: professorId }).populate('student', 'name email').populate('professor', 'name');

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch appointments', error: error.message });
  }
};


export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findById(id).populate('student', 'name email').populate('professor', 'name email');
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    appointment.status = status;
    await appointment.save();

    if (status === 'cancelled') {
      // Re-add time to professor's availability
      const availability = await Availability.findOne({ professor: appointment.professor });
      if (availability && !availability.slots.includes(appointment.time)) {
        availability.slots.push(appointment.time);
        await availability.save();
      }
    }

    res.status(200).json({ message: 'Appointment status updated', appointment });
                                                                                
  } catch (error) {
    res.status(500).json({ message: 'Failed to update status', error: error.message });
  }
};
