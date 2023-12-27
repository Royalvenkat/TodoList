import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./Login.css"


const Login = () => {
  const [formData, setFormData] = useState({
    mobile: '',
    password: '',
    udid: '29073', // Fixed value, hidden
    fcm_token: 'testtoken', // Fixed value, hidden
  });

  const [error, setError] = useState('');
  const [isLoginSuccessful, setLoginSuccessful] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
    
      if (!formData.mobile || !formData.password) {
        setError('Mobile number and password are required.');
        return;
      }

      // Convert form data to JSON format
      const jsonData = JSON.stringify(formData);

      const response = await axios.post('http://test.touchapp.in/auth/login', jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const accessToken = response.data.access_token;

      

      setLoginSuccessful(true);
    } catch (error) {
      // Handle errors
      console.error('Login failed:', error.message);
      if (error.response && error.response.status === 401) {
        // Unauthorized - Invalid credentials
        setError('Invalid mobile number or password. Please try again.');
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };


  return (
    <div>
      <h3>TouchUi</h3>
      <p className='Home'> Please login the page to access the touchui App</p>
      <div className='Login'>
     
      
      <h1>Login </h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {isLoginSuccessful ? (
        <div>
          <p>Login successful! Redirecting to  <Link to="/HomePage" className="LinkStyle">Click Here to HomePage</Link>...</p>
          <span>Welcome to TouchUi App</span>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          
<div className="input-container">
 
    <label className='mobile'>
        Mobile Number:
        <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
        />
    </label>
        <br/><br/>
    <label>
        Password:
        <input
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
    </label>
</div>


       
          <input type="hidden" name="udid" value={formData.udid} />
          <input type="hidden" name="fcm_token" value={formData.fcm_token} />
          <br />
          <br />

          <button type="submit" className='Button'>Login</button>
        </form>
      )}
    </div>
 
    </div>
     );
};

export default Login;
