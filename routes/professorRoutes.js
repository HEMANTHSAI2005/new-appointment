import express from 'express';
import { getProfessorAppointments, updateAppointmentStatus } from '../controllers/professorController.js';
import { verifyToken, isProfessor } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/appointments', verifyToken, isProfessor, getProfessorAppointments);
router.put('/appointments/:id', verifyToken, isProfessor, updateAppointmentStatus);

export default router;
