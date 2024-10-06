import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Grid, ToggleButton, ToggleButtonGroup, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, TextField } from '@mui/material';
import { format } from 'date-fns';
import { NavLink } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleError, handleSuccess } from '../utils';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './MyAppointments.css';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [displayedAppointments, setDisplayedAppointments] = useState([]);
  const [appointmentType, setAppointmentType] = useState('upcoming');
  const [openDialog, setOpenDialog] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false); // New confirmation dialog state
  const [confirmationAction, setConfirmationAction] = useState(null); // To store which action to confirm
  const [rescheduleData, setRescheduleData] = useState({
    id: '',
    newDate: '',
    newTime: '',
    newOutlet: '',
  });

  const fetchAppointments = () => {
    const loggedInEmail = localStorage.getItem('loggedInEmail');
    axios
      .get(`http://localhost:3000/appointments?email=${loggedInEmail}`)
      .then((response) => {
        const fetchedAppointments = response.data;
        const currentDateTime = new Date();
        const upcoming = fetchedAppointments.filter((appointment) => new Date(appointment.a_date) > currentDateTime);
        const previous = fetchedAppointments.filter((appointment) => new Date(appointment.a_date) <= currentDateTime);
        setAppointments({ upcoming, previous });
        setDisplayedAppointments(upcoming);
      })
      .catch((error) => {
        console.error('Error fetching appointments:', error);
      });
  };
  

  useEffect(() => {
    fetchAppointments(); 
  }, []);

  const navigate = useNavigate();

  const handleToggle = (event, newType) => {
    setAppointmentType(newType);
    setDisplayedAppointments(newType === 'upcoming' ? appointments.upcoming : appointments.previous);
  };

  const openConfirmationDialog = (action, appointment) => {
    setConfirmationAction({ action, appointment });
    setConfirmationDialogOpen(true);
  };

  const handleConfirmation = () => {
    const { action, appointment } = confirmationAction;
    setConfirmationDialogOpen(false);
    if (action === 'cancel') {
      handleCancelAppointment(appointment._id);
    } else if (action === 'reschedule') {
      openRescheduleDialog(appointment._id);
    } else if (action === 'repeat') {
      handleRepeatAppointment(appointment);
    }
  };

  const handleCancelAppointment = (id) => {
    axios
      .delete(`http://localhost:3000/appointments/cancel/${id}`)
      .then((response) => {
        console.log('Appointment canceled:', response.data);
        setDisplayedAppointments(displayedAppointments.filter((appt) => appt._id !== id));
      })
      .catch((error) => {
        console.error('Error canceling appointment:', error);
      });
  };

  const openRescheduleDialog = (id) => {
    setRescheduleData((prevData) => ({ ...prevData, id }));
    setOpenDialog(true);
  };

  const handleRescheduleAppointment = () => {
    const { id, newDate, newTime, newOutlet } = rescheduleData;
    axios
      .put(`http://localhost:3000/appointments/reschedule/${id}`, {
        a_date: newDate,
        a_timeslot: newTime,
        a_outlet: newOutlet,
      })
      .then((response) => {
        console.log('Appointment rescheduled:', response.data);
        setOpenDialog(false);
        // Re-fetch the appointments to update the list
        fetchAppointments(); // Call the fetch function here
      })
      .catch((error) => {
        console.error('Error rescheduling appointment:', error);
      });
  };
  

  const handleRepeatAppointment = (appointment) => {
    navigate('/appointment', { state: { appointment } });
  };

  return (
    <>
      <Navbar />
      <div className="my-appointments" style={{ padding: '20px', backgroundColor: '#fce4ec' }}>
        <Typography variant="h4" align="center" gutterBottom style={{ color: '#57111B' }}>
          My Appointments
        </Typography>

        <ToggleButtonGroup
          value={appointmentType}
          exclusive
          onChange={handleToggle}
          aria-label="appointment type"
          style={{ marginBottom: '20px' }}
        >
          <ToggleButton value="upcoming" style={{ color: '#e91e63', borderColor: '#e91e63' }}>
            Upcoming
          </ToggleButton>
          <ToggleButton value="previous" style={{ color: '#e91e63', borderColor: '#e91e63' }}>
            Previous
          </ToggleButton>
        </ToggleButtonGroup>

        {displayedAppointments.length === 0 ? (
          <Typography variant="h6" align="center" style={{ color: '#57111B', marginBottom: '20px' }}>
            You don't have any appointments yet!
            <br />
            <Button
              variant="contained"
              color="secondary"
              component={NavLink}
              to="/appointment"
              style={{ backgroundColor: '#e91e63', color: '#fff' }}
            >
              Book Your First Appointment
            </Button>
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {displayedAppointments.map((appointment) => (
              <Grid item xs={12} md={6} key={appointment._id}>
                <Card style={{ border: '2px solid #e91e63', margin: '10px', backgroundColor: '#fff' }}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom style={{ color: '#57111B' }}>
                      💈 {appointment.a_service}
                    </Typography>
                    <Typography variant="body1" style={{ color: '#57111B' }}>
                      Outlet Location: {appointment.a_outlet}
                    </Typography>
                    <Typography variant="body2" style={{ color: '#57111B' }}>
                      📅 {format(new Date(appointment.a_date), 'yyyy-MM-dd')} at {appointment.a_timeslot}
                    </Typography>
                    <Typography variant="body2" style={{ color: '#57111B' }}>
                      ✨ Special Request: {appointment.a_specialrequest || 'None'}
                    </Typography>
                  </CardContent>
                  <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between' }}>
                    {appointmentType === 'upcoming' ? (
                      <>
                        <Button
                          variant="contained"
                          style={{ backgroundColor: '#e91e63', color: '#fff' }}
                          onClick={() => openConfirmationDialog('cancel', appointment)}
                          disabled={appointment.status === 'Cancelled'}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="contained"
                          style={{ backgroundColor: '#57111B', color: '#fff' }}
                          onClick={() => openConfirmationDialog('reschedule', appointment)}
                        >
                          Reschedule
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="contained"
                        style={{ backgroundColor: '#e91e63', color: '#fff' }}
                        onClick={() => openConfirmationDialog('repeat', appointment)}
                      >
                        Repeat Appointment
                      </Button>
                    )}
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </div>
      <Footer />

     {/* Reschedule Dialog */}
<Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
  <DialogTitle>Reschedule Appointment</DialogTitle>
  <DialogContent>
    <DialogContentText>
      Please select a new date, time slot, and outlet for your appointment.
    </DialogContentText>
    <TextField
      margin="dense"
      label="New Date"
      type="date"
      fullWidth
      value={rescheduleData.newDate}
      onChange={(e) => setRescheduleData({ ...rescheduleData, newDate: e.target.value })}
      InputLabelProps={{
        shrink: true,
      }}
    />

    {/* Time Slot Selection */}
    <TextField
      margin="dense"
      label="Select Time Slot"
      select
      fullWidth
      value={rescheduleData.newTime}
      onChange={(e) => setRescheduleData({ ...rescheduleData, newTime: e.target.value })}
      SelectProps={{
        native: true,
      }}
      InputLabelProps={{
        shrink: true,
      }}
    >
      <option value="" disabled>Select a time slot</option>
      <option value="9AM - 10AM">9AM - 10AM</option>
      <option value="10AM - 11AM">10AM - 11AM</option>
      <option value="11AM - 12PM">11AM - 12PM</option>
      <option value="12PM - 1PM">12PM - 1PM</option>
      <option value="1PM - 2PM">1PM - 2PM</option>
      <option value="2PM - 3PM">2PM - 3PM</option>
      <option value="3PM - 4PM">3PM - 4PM</option>
      <option value="4PM - 5PM">4PM - 5PM</option>
    </TextField>

    <TextField
      margin="dense"
      label="New Outlet"
      fullWidth
      value={rescheduleData.newOutlet}
      onChange={(e) => setRescheduleData({ ...rescheduleData, newOutlet: e.target.value })}
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenDialog(false)} color="primary">
      Cancel
    </Button>
    <Button onClick={handleRescheduleAppointment} color="secondary">
      Reschedule
    </Button>
  </DialogActions>
</Dialog>


      {/* Confirmation Dialog */}
      <Dialog open={confirmationDialogOpen} onClose={() => setConfirmationDialogOpen(false)}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to {confirmationAction?.action} this appointment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmationDialogOpen(false)} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmation} color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </>
  );
};

export default MyAppointments;
