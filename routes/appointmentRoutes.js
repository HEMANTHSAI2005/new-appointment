import express from 'express';
import { bookAppointment, getStudentAppointments, getCancelledAppointments} from '../controllers/studentController.js';

import { verifyToken, isStudent } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/book', verifyToken, isStudent, bookAppointment);
router.get('/appointments', verifyToken, isStudent, getStudentAppointments);
router.get('/appointments/cancelled', verifyToken, isStudent, getCancelledAppointments);

export default router;
