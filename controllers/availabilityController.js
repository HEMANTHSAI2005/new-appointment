import Availabilitynew from '../models/Availabilitynew.js';

export const addAvailability = async (req, res) => {
  try {
    const userId = req.user.userId; // professor // warden
    const { slots } = req.body;

    let availability = await Availabilitynew.findOne({ user: userId });

    if (availability) {
      availability.slots = [...new Set([...availability.slots, ...slots])];
    } else {
      availability = new Availabilitynew({ user: userId, slots });
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
    console.log("pid: ",professorId)
    const availability = await Availabilitynew.findOne({ user: professorId });

    console.log("av: ",availability)
    if (!availability) {
      return res.status(404).json({ message: 'No availability found' });
    }

    res.status(200).json(availability);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching availability', error: err.message });
  }
};
