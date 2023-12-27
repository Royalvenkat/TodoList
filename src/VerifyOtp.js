import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const VerifyOtp = ({ history }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [isOtpVerified, setOtpVerified] = useState(false);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      // Validate input
      if (!otp) {
        setError('OTP is required.');
        return;
      }

      // POST request to the verify OTP API Making Headers as Stringify
      const response = await axios.post(
        'http://test.touchapp.in/auth/verifyOtp',
        { otp },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // To see The Handle success
      console.log('Verify OTP successful:', response.data);

      // Set state to indicate OTP verification success
      setOtpVerified(true);
    } catch (error) {
      // Handle errors
      console.error('Verify OTP failed:', error.message);
      if (error.response && error.response.status === 422) {
        // Unprocessable Entity - Validation error from the server
        setError('Invalid OTP. Please enter the correct OTP.');
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  const handleResendOtp = async () => {
    if (isResending) return;

    try {
      // To send a POST request to the resend OTP API
      setIsResending(true);
      const response = await axios.post('http://test.touchapp.in/auth/resendOtp');

      // Handle success
      console.log('OTP resent successfully:', response.data);
      setError('');
    } catch (error) {
      // Handle errors
      console.error('Resending OTP failed:', error.message);
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {isOtpVerified ? (
        <div>
          <p>OTP verification successful! Redirecting to Login...</p>
          <Link to="/Login">Go to Login</Link>
          
        </div>
      ) : (
        <form onSubmit={handleVerifyOtp}>
          <label>
            OTP:
            <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
          </label>
          <br />
          <br />
          <button type="submit">Verify OTP</button>
        </form>
      )}
      <br />
      <button onClick={handleResendOtp} disabled={isResending}>
        {isResending ? 'Resending...' : 'Resend OTP'}
      </button>
    </div>
  );
};

export default VerifyOtp;
