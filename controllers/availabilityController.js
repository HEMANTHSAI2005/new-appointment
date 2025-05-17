import Availability from '../models/Availability.js';

export const addAvailability = async (req, res) => {
  try {
    const professorId = req.user.userId;
    const { slots } = req.body;

    let availability = await Availability.findOne({ professor: professorId });

    if (availability) {
      availability.slots = [...new Set([...availability.slots, ...slots])]; 
    } else {
      availability = new Availability({ professor: professorId, slots });
    }

    await availability.save();
    res.status(201).json({ message: 'Availability added/updated', availability });
  } catch (err) {
    res.status(500).json({ message: 'Error adding availability', error: err.message });
  }
};

export const getProfessorAvailability = async (req, res) => {
  try {
    const { professorId } = req.params;
    const availability = await Availability.findOne({ professor: professorId }).populate('professor', 'name email');;;

    if (!availability) {
      return res.status(404).json({ message: 'No availability found' });
    }

    res.status(200).json(availability);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching availability', error: err.message });
  }
};
