import express from 'express';
import { setWardenAvailability, bookWardenAppointment, getWardenAppointments } from '../controllers/wardenController.js';

import { verifyToken, isWarden } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/availability', verifyToken, isWarden, setWardenAvailability);
router.post('/book', verifyToken, isWarden, bookWardenAppointment);
router.get('/appointments', verifyToken, isWarden, getWardenAppointments);

export default router;
