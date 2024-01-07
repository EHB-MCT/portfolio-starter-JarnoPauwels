import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = 'http://localhost:3000/users/login';
      const response = await axios.post(apiUrl, { username, password });

      // Store user id in browser storage
      localStorage.setItem('userId', response.data.id);
      navigate('/');
      // alert(`Welcome, ${response.data.username}! User ID: ${response.data.id}`);
    } catch (error) {
      console.error('Error:', error);
      alert('Invalid username or password. Please try again.');
    }
  };

  const goToRegisterPage = () => {
    navigate('/register');
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
          <button className='login-button' type="submit">Login</button>
          <button className='register-button' onClick={goToRegisterPage}>Register</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
