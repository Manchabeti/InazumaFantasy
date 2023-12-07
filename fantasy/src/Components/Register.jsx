import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import '../LoginForm.css';  

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const menuItems = [
    { name: 'Login', route: '/' },
  ];

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', { username, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 500) {
        setError('Ya existe ese usuario.');
      } else {
        console.error('Error de inicio de sesión', error);
      }
    }
  };

  return (
    <div>
      <Header menuItems={menuItems} />
      <div className="container d-flex flex-column align-items-center vh-100 mb-auto">
        <div className="login-container">
          <form onSubmit={handleLogin} className="login-form">
            <label>Usuario:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <label>Contraseña:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" className="custom-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16">
                <path fill="currentColor" d="M6.75 1.5a.75.75 0 0 0 0 1.5h4.75A1.5 1.5 0 0 1 13 4.5v7a1.5 1.5 0 0 1-1.5 1.5H6.75a.75.75 0 0 0 0 1.5h4.75a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3H6.75Zm3.03 5.97l-2.5-2.5a.75.75 0 0 0-1.06 1.06l1.22 1.22H1.75a.75.75 0 0 0 0 1.5h5.69L6.22 9.97a.75.75 0 1 0 1.06 1.06l2.5-2.5a.75.75 0 0 0 0-1.06Z"/>
              </svg>
              <span>Iniciar Sesión</span>
            </button>
          </form>
        </div>
        {error && (
          <div className="mt-3 alert alert-danger" role="alert" style={{ maxWidth: '300px', width: '100%' }}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;