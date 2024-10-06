import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
// import GoogleLogin from 'react-google-login';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ReCAPTCHA from 'react-google-recaptcha';
import './LoginForm.css';

function LoginForm() {
  // const handleGoogleLogin = (response) => {
  //   console.log(response);
  // };
  
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate();
  const [captchaCompleted, setCaptchaCompleted] = useState(false);
  const handleChange = (e) => {
      const { name, value } = e.target;
      console.log(name, value);
      const copyLoginInfo = { ...loginInfo };
      copyLoginInfo[name] = value;
      setLoginInfo(copyLoginInfo);
  }

  const handleCaptcha = (value) => {
    if (value) {
      setCaptchaCompleted(true);
    } else {
      setCaptchaCompleted(false);
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
        return handleError('email and password are required')
    }
    if (!captchaCompleted) {
      return handleError('Please complete the CAPTCHA')
    }
    try {
        const url = `http://localhost:3000/auth/login`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginInfo)
        });
        const result = await response.json();
        const { success, message, jwtToken, name, email , error } = result;
        if (success) {
            handleSuccess(message);
            localStorage.setItem('token', jwtToken);
            localStorage.setItem('loggedInUser', name);
            localStorage.setItem('loggedInEmail', email);
            setTimeout(() => {
                navigate('/home')
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












  return (
    <div className="login-container">
      <div className="metallic-ball small metallic-ball1"></div>
      <div className="metallic-ball medium metallic-ball2"></div>
      <div className="metallic-ball small metallic-ball3"></div>
      <div className="metallic-ball large metallic-ball4"></div>
      <div className="metallic-ball medium metallic-ball5"></div>

      <div className="form-container">
        <h2>Login Form</h2>
        <form onSubmit={handleLogin}>
          <label>
            Email
            <input  onChange={handleChange} type="email" name="email" required  value={loginInfo.email} />
          </label>
          <label>
            Password
            <input  onChange={handleChange} type="password" name="password" required  value={loginInfo.password} />
            
          </label>
          <div className="captcha">
            <ReCAPTCHA
              sitekey="6LePQygqAAAAACnj8jLrvZYyHJrOqejBgaokJpzL"
              onChange={handleCaptcha}
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <ToastContainer />
        {/* <div className="google-login">
          <GoogleLogin
            clientId="102881683393-em7bbcvvc9ari7s82mc36ea65u120tg9.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={handleGoogleLogin}
            onFailure={handleGoogleLogin}
            cookiePolicy={'single_host_origin'}
          />
        </div> */}
        <p>
          Don't have an account yet? <Link to="/signup">Register Here</Link>
        </p>
      </div>
      <div className="image-container">
        <img src="/girl.png" alt="Login Illustration" />
      </div>
    </div>
  );
}

export default LoginForm;

