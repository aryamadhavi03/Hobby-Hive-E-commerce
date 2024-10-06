const express = require('express');
const router = express.Router();
const appointmentController = require('../Controllers/appointmentController');
const checkAppointmentLimit = require('../Middlewares/limitMiddleware');

// Route to book an appointment
router.post('/book', checkAppointmentLimit, appointmentController.bookAppointment);

// Route to get appointments by email
router.get('/', appointmentController.getAppointmentsByEmail);

// Route to reschedule an appointment
router.put('/reschedule/:id', appointmentController.rescheduleAppointment);  // Use PUT for updating (rescheduling)

// Route to cancel an appointment
router.delete('/cancel/:id', appointmentController.cancelAppointment);  // Use DELETE for canceling appointments

module.exports = router;
