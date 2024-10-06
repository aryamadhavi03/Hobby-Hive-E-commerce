import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleError, handleSuccess } from '../utils';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './AppointmentForm.css'

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    service: '',
    stylist: '',
    location: '',
    notes: '',
    referral: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('loggedInEmail');
    handleSuccess('User Logged out');
    setTimeout(() => {
      navigate('/home');
    }, 2000);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check required fields
    if (!formData.name || !formData.email || !formData.date || !formData.service) {
      return handleError('Name, Email, Date, and Service are required!');
    }

    try {
      // Retrieve local_email from local storage
      const localEmail = localStorage.getItem('loggedInEmail');
      if (!localEmail) {
        return handleError('Local email not found. Please Login or Signup.');
      }

      const url = `http://localhost:3000/appointments/book`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          a_name: formData.name,
          a_email: formData.email,
          a_date: formData.date,
          a_timeslot: formData.time,
          a_service: formData.service,
          a_outlet: formData.location,
          a_specialrequest: formData.notes,
          local_email: localEmail // Include the local_email field
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong!');
      }

      const result = await response.json();
      console.log('Appointment booked successfully:', result);

      // Display success message or perform any action after successful booking
      handleSuccess('Appointment booked successfully!');

      // Reset form data
      setFormData({
        name: '',
        email: '',
        date: '',
        time: '',
        service: '',
        stylist: '',
        location: '',
        notes: '',
        referral: ''
      });
    } catch (error) {
      console.error('Error booking appointment:', error.message);
      handleError(error.message || 'Failed to book appointment');
    }
  };

  return (
    <>
      <Navbar handleLogout={handleLogout} />
      <div className="appointment-page-wrapper">
        <div className="appointment-form-container">
          <h2 className="appointment-form-heading">Get Your Salon Appointment Now!</h2>
          <form className="appointment-appointment-form" onSubmit={handleSubmit}>
            {/* Row 1: Name and Email */}
            <div className="appointment-form-row">
              <div className="appointment-form-group">
                <label htmlFor="name" className="appointment-form-label">Full Name*</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="appointment-form-input"
                  required
                />
              </div>
              <div className="appointment-form-group">
                <label htmlFor="email" className="appointment-form-label">Email Address*</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email address"
                  className="appointment-form-input"
                  required
                />
              </div>
            </div>

            {/* Row 2: Date, Time, Location, and Service */}
            <div className="appointment-form-row">
              <div className="appointment-form-group">
                <label htmlFor="date" className="appointment-form-label">Appointment Date*</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="appointment-form-input"
                  min={new Date().toISOString().split("T")[0]} // Restrict past dates
                  required
                />
              </div>
              <div className="appointment-form-group">
                <label htmlFor="time" className="appointment-form-label">Preferred Time Slot*</label>
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="appointment-form-select"
                  required
                >
                  <option value="">Choose a time slot</option>
                  <option value="11AM - 12PM">11 AM - 12 PM</option>
                  <option value="12PM - 1PM">12 PM - 1 PM</option>
                  <option value="1PM - 2PM">1 PM - 2 PM</option>
                  <option value="2PM - 3PM">2 PM - 3 PM</option>
                  <option value="3PM - 4PM">3 PM - 4 PM</option>
                  <option value="4PM - 5PM">4 PM - 5 PM</option>

                </select>
              </div>
              <div className="appointment-form-group">
                <label htmlFor="location" className="appointment-form-label">Location*</label>
                <select
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="appointment-form-select"
                  required
                >
                  <option value="">Choose an Outlet</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Thane">Thane</option>
                  <option value="Dadar">Dadar</option>
                  <option value="Kalyan">Kalyan</option>
                </select>
              </div>
              <div className="appointment-form-group">
                <label htmlFor="service" className="appointment-form-label">Select Services/Packages*</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="appointment-form-select"
                  required
                >
                  <option value="">Choose a service</option>
                  <option value="Haircut">Haircut</option>
                  <option value="Hair Coloring">Hair Coloring</option>
                  <option value="Facial">Facial</option>
                  <option value="Manicure">Manicure</option>
                </select>
              </div>
            </div>

            {/* Row 3: Notes */}
            <div className="appointment-form-row">
              <div className="appointment-form-group">
                <label htmlFor="notes" className="appointment-form-label">Special Requests?</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Any special requests or instructions?"
                  className="appointment-form-textarea"
                />
              </div>
            </div>

            <button type="submit" className="appointment-submit-button">Book Appointment</button>
            {message && <p className="appointment-success-message">{message}</p>}
          </form>
        </div>
      </div>
      <Footer />
          <ToastContainer style={{ zIndex: 99999 }}  />
    </>
  );
}

export default AppointmentForm;
