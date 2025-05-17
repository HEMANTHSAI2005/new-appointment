import express from 'express';
import { bookAppointment, getStudentAppointments, getCancelledAppointments, getBookedAppointments } from '../controllers/studentController.js';
import { verifyToken, isStudent } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/book', verifyToken, isStudent, bookAppointment);
router.get('/appointments', verifyToken, isStudent, getStudentAppointments);
router.get('/appointments/cancelled', verifyToken, isStudent, getCancelledAppointments);
router.get('/appointments/booked', verifyToken, isStudent, getBookedAppointments);


export default router;
