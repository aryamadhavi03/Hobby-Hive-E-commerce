import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
// import GoogleLogin from 'react-google-login';
import ReCAPTCHA from 'react-google-recaptcha';
import './SignupForm.css';



function SignupForm() {
  // const handleGoogleLogin = (response) => {
  //   console.log(response);
  // };

  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [confirm, setConfirm] = useState({
   confirmPassword:''
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  }
  const handleChangeconfirm = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyConfirm = { ...confirm };
    copyConfirm[name] = value;
    setConfirm(copyConfirm);
  }
  const [captchaCompleted, setCaptchaCompleted] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
        return handleError('name, email and password are required')
    }
    if (signupInfo.password !== confirm.confirmPassword) {
      return handleError('Passwords do not match !')
    }

    if (!captchaCompleted) {
      return handleError('Please complete the CAPTCHA')
    }

    try {
        const url = `http://localhost:3000/auth/signup`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupInfo)
        });
        const result = await response.json();
        const { success, message, error } = result;
        if (success) {
            handleSuccess(message);
            setTimeout(() => {
                navigate('/login')
            }, 2000)
        } else if (error) {
            const details = error?.details[0].message;
            handleError(details);
        } else if (!success) {
            handleError(message);
        }
        console.log(result);
    } catch (err) {
        handleError(err);
    }
  }


  const handleCaptcha = (value) => {
    if (value) {
      setCaptchaCompleted(true);
    } else {
      setCaptchaCompleted(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="metallic-ball small metallic-ball1"></div>
      <div className="metallic-ball medium metallic-ball2"></div>
      <div className="metallic-ball small metallic-ball3"></div>
      <div className="metallic-ball large metallic-ball4"></div>
      <div className="metallic-ball medium metallic-ball5"></div>

      <div className="form-container">
        <h2>Signup Form</h2>
        <form  onSubmit={handleSignup}>
          <label>
            Username
            <input  onChange={handleChange} type="text" name="name" required value={signupInfo.name} />
          </label>
          <label>
            Mobile No.
            <input type="text" name="mobile" />
          </label>
          <label>
            Password
            <input  onChange={handleChange} type="password" name="password" required value={signupInfo.password} />
          </label>
          <label>
            Confirm Password
            <input onChange={handleChangeconfirm} type="password" name="confirmPassword"  />
          </label>
          <label>
            Email
            <input  onChange={handleChange} type="email" name="email" value={signupInfo.email} />
          </label>


          <div className="captcha">
            <ReCAPTCHA
              sitekey="6LeBQygqAAAAALAGXxzoXz58fQI3QqtnozpIui66"
              onChange={handleCaptcha}
            />
          </div>
          <button type="submit">Signup</button>
        </form>
        <ToastContainer />
        {/* <div className="google-login">
          <GoogleLogin
            clientId="YOUR_GOOGLE_CLIENT_ID"
            buttonText="Sign up with Google"
            onSuccess={handleGoogleLogin}
            onFailure={handleGoogleLogin}
            cookiePolicy={'single_host_origin'}
          />
        </div> */}
        <p>
          Already have an account? <Link to="/login">Login Here</Link>
        </p>
      </div>
      <div className="image-container">
        <img src="/bg.png" alt="Signup Illustration" />
      </div>
    </div>
  );
}

export default SignupForm;
