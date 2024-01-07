import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = 'http://localhost:3000/users';
      await axios.post(apiUrl, { username, password });
      navigate('/login');
      // alert('User registered successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const goToLoginPage = () => {
    navigate('/login');
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <div className='login-register-buttons'>
          <button className='login-button' type="submit">Register</button>
          <button className='register-button' onClick={goToLoginPage}>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
