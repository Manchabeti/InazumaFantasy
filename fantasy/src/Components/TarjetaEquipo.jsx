import React from 'react';
import '../Tarjeta.css';
import { useNavigate } from 'react-router-dom';


const TarjetaEquipo = ({ datosEquipo }) => {
    const { nombre, escudo, id } = datosEquipo;
    
    const navigate = useNavigate();
   
   
    const handleEditarClick = () => {
      localStorage.setItem('datosEquipo', JSON.stringify(datosEquipo));
      navigate({
        pathname: `/adminIndex/EditarJugador/${id}`
      });
    };

    
    return (
        <div className="tarjeta">
       
        <div className="imagen-container">
          <img className="imagen" src={escudo} alt={nombre} />
        </div>
        <div className="info">
          <div className="nombre">{nombre}</div>
        </div>
        <button className="editar-btn" onClick={handleEditarClick}>Editar</button>
      </div>
    );
  };
  
  export default TarjetaEquipo;