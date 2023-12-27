// SignUp.js

import React, { useState } from 'react';
import axios from 'axios';
import VerifyOtp from './VerifyOtp';
import "./SignUp.css"


const SignUp = () => {
  const [formData, setFormData] = useState({
    gender: '',
    password: '',
    user_name: '',
    udid: '29073', // Fixed value, hidden
    fcm_token: 'testtoken', // Fixed value, hidden
    dob: '',
    mobile: '',
    full_name: '',
    countryCode: 'IN', // India
  });

  const [error, setError] = useState('');
  const [isSignUpSuccessful, setIsSignUpSuccessful] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await axios.post('http://test.touchapp.in/auth/register', formData);
      
      console.log('Registration successful:', response.data);
     
      setIsSignUpSuccessful(true);

  
      setFormData({
        gender: '',
        password: '',
        user_name: '',
        udid: '29073',
        fcm_token: 'testtoken',
        dob: '',
        mobile: '',
        full_name: '',
        countryCode: 'IN',
      });
      setError('');
    } catch (error) {
      // Handle errors
      console.error('Registration failed:', error.message);
      if (error.response && error.response.status === 422) {
        setError('Invalid data. Please check your inputs.');
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  return (
    <div>
      <h2>Sign Up</h2>

        <div className='Sign'>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {isSignUpSuccessful ? (
        <div>
          <p>Registration successful! Redirecting to Verify OTP page...</p>
          {<VerifyOtp />}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Gender */}
          <label>
            Gender:
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            />
          </label>
          <br />
          <br />

          {/* Password */}
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          <br />
          <br />

          {/* User Name */}
          <label>
            User Name:
            <input
              type="text"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
            />
          </label>
          <br />
          <br />

          {/* UDID (Hidden) */}
          <input type="hidden" name="udid" value={formData.udid} />

          {/* FCM Token (Hidden) */}
          <input type="hidden" name="fcm_token" value={formData.fcm_token} />

          {/* Date of Birth (DOB) */}
          <label>
            Date of Birth:
            <input
              type="text"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
          </label>
          <br />
          <br />

          {/* Mobile Number */}
          <label>
            Mobile Number:
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
          </label>
          <br />
          <br />

          {/* Full Name */}
          <label>
            Full Name:
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
            />
          </label>
          <br />
          <br />

          {/* Country Code (Hidden) */}
          <input type="hidden" name="countryCode" value={formData.countryCode} />

          <button type="submit">Sign Up</button>
        </form>
      )}
    </div>

    </div>
    
  
  );
};

export default SignUp;
