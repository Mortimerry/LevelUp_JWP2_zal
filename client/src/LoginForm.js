import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include',
    });

    if (response.status === 200) {
      const data = await response.json();
      setUser(data);
      setMessage('Login successful!');
      navigate('/user');
    } else {
      const data = await response.json();
      setMessage(data.message || 'Login failed');
    }
  };

  return (
    <div className="content">
      <h2>Logowanie</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Login:  </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Hasło:  </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};


export default LoginForm;
