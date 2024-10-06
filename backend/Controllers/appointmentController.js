const Appointment = require('../Models/Appointment');
const { sendConfirmationEmail, sendRescheduleEmail } = require('../utils/mailer'); // Import both mail functions


// Controller to book an appointment
const bookAppointment = async (req, res) => {
  try {
    const { a_name, a_email, a_service, a_date, a_outlet, a_timeslot, a_specialrequest, local_email } = req.body;

    // Check if there are already 3 appointments for the same date, time slot, outlet, and local email
    const appointmentCount = await Appointment.countDocuments({
      a_date: new Date(a_date), // Convert date string to Date object if needed
      a_timeslot: a_timeslot,
      a_outlet: a_outlet,

    });

    if (appointmentCount >= 3) {
      return res.status(400).json({ message: 'Maximum appointment limit reached for this Time slot, Date. Please choose another Time or Date.' });
    }

    // Create new appointment
    const newAppointment = new Appointment({
      a_name,
      a_email,
      a_service,
      a_date,
      a_outlet,
      a_timeslot,
      a_specialrequest,
      local_email // Include local_email in the appointment document
    });

    // Save to database
    await newAppointment.save();

    // Send confirmation email
    sendConfirmationEmail(a_email, newAppointment);

    res.status(201).json({ message: 'Appointment booked successfully', appointment: newAppointment });
  } catch (error) {
    res.status(500).json({ message: 'Error booking appointment', error });
  }
};

// Controller to get all appointments (for testing)
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({});
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving appointments', error });
  }
};

const getAppointmentsByEmail = async (req, res) => {
  const { email } = req.query; // Get email from query parameters

  try {
    const appointments = await Appointment.find({ local_email: email }); // Fetch appointments based on email
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving appointments', error });
  }
};

// Reschedule Appointment
const rescheduleAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { a_date, a_timeslot, a_outlet } = req.body; // New date, timeslot, and outlet

    // Update the appointment
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      {
        a_date: new Date(a_date),
        a_timeslot: a_timeslot,
        a_outlet: a_outlet || undefined, // Optional outlet change
      },
      { new: true } // Return the updated document
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Send the reschedule email
    sendRescheduleEmail(updatedAppointment.a_email, updatedAppointment); // Sending email notification

    res.status(200).json({ message: 'Appointment rescheduled successfully', appointment: updatedAppointment });
  } catch (error) {
    res.status(500).json({ message: 'Error rescheduling appointment', error });
  }
};


// Cancel Appointment
const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the appointment from the database
    const deletedAppointment = await Appointment.findByIdAndDelete(id);

    if (!deletedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment canceled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error canceling appointment', error });
  }
};


module.exports = {
  bookAppointment,
  getAllAppointments,
  getAppointmentsByEmail,
  rescheduleAppointment, // Export the reschedule function
  cancelAppointment,     // Export the cancel function
};
