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
              <span>Registrarse</span>
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