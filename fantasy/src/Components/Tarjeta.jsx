import React, { useState, useEffect } from 'react';
import '../Tarjeta.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Tarjeta = ({ datosJugador }) => {
    const { apodo, foto, nombre, media, id ,equipo_id} = datosJugador;
    const [equipo, setEquipo] = useState([]);
    const navigate = useNavigate();
    const handleEditarClick = () => {
      localStorage.setItem('datosJugador', JSON.stringify(datosJugador)); 
      navigate({
        pathname: `/adminIndex/EditarJugador/${id}`
      });
    };

    return (
        <div className="tarjeta">
       
        <div className="imagen-container">
          <img className="imagen" src={foto} alt={nombre} />
        </div>
        <div className="info">
          <div className="nombre">{nombre}</div>
          <div className="apodo">{apodo}</div>
          <div className="media">{`Media: ${media}`}</div>
        </div>
        <button className="editar-btn" onClick={handleEditarClick}>Editar</button>
      </div>
    );
  };
  
  export default Tarjeta;