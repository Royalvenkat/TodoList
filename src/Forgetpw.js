// ForgotPassword.js

import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the Forgot Password API
      const response = await axios.post('http://test.touchapp.in/auth/forgotPassword', {
        'mobile': mobile,
      });

      // Handle success, show a success message to the user
      console.log('Forgot Password request successful:', response.data);
      setSuccessMessage('OTP sent successfully. Check your mobile or email.');

      // You may also redirect the user to the OTP verification page here
      // Replace '/verify-otp' with the actual route for your OTP verification page
      // Example: history.push('/verify-otp');
    } catch (error) {
      // Handle errors
      console.error('Forgot Password request failed:', error.message);
      if (error.response && error.response.status === 404) {
        // User not found
        setError('User not found. Please check your mobile number.');
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  const handleChange = (e) => {
    setMobile(e.target.value);
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleForgotPassword}>
        <label>
          Mobile Number:
          <input
            type="text"
            value={mobile}
            onChange={handleChange}
          />
        </label>
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
