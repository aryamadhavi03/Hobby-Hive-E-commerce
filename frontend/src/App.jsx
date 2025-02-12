import { Navigate, Route, Routes } from 'react-router-dom';
import { useState } from 'react'
import './App.css';
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';
import Outlets from './pages/Outlets';

import Home from './pages/Home';
import RefrshHandler from './RefrshHandler';
import OnlineStore from './pages/Onlinestore';
import AppointmentForm from './pages/AppointmentForm';
import MyAppointments from './pages/MyAppointments';
import CommunityPage from './pages/community';
import CustomerSupportPage from './pages/CustomerSupportPage';
import Shop from './pages/Shop';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }

  return (
    <>
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<Navigate to="/home" />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/signup' element={<SignupForm />} />
        <Route path='/location' element={<Outlets />} />
        <Route path='/cutomersupport' element={<CustomerSupportPage />} />
        <Route path='/home' element={<Home />} />
        <Route path='/appointment' element={<AppointmentForm/>} />
        <Route path='/myappointments' element={<MyAppointments/>} />
        <Route path='/communitypage' element={<CommunityPage/>} />
        <Route path='/shop' element={<Shop/>} />
        {/* <Route path='/home' element={<PrivateRoute element={<Home />} />} /> */}
      </Routes>

    </>
  )
}

export default App
