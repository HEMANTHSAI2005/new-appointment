import express from 'express';
import { addAvailability, getProfessorAvailability } from '../controllers/availabilityController.js';
import { verifyToken, isProfessor } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', verifyToken, isProfessor, addAvailability);
router.get('/:professorId', verifyToken, getProfessorAvailability); // Accessible by students

export default router;
