import React from 'react';
import '../UsuarioTarjeta.css';
const UsuarioTarjeta = ({ usuario, posicion, esPrimero ,puntos}) => (
    <div className={`usuario-tarjeta ${esPrimero ? 'primero' : ''}`}>
    <div className="posicion">{posicion}</div>
    <div className="usuario-info">
      <p className="usuario-nombre">{usuario}</p>
      <p className="usuario-puntos">Puntos: {puntos}</p>
    </div>
    {esPrimero && (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 48">
        <g fill="none" stroke="currentColor" stroke-width="4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13 42h22l6-21l-10 5l-7-14l-7 14l-10-5l6 21Z" />
          <circle cx="7" cy="18" r="3" />
          <circle cx="24" cy="9" r="3" />
          <circle cx="41" cy="18" r="3" />
        </g>
      </svg>
    )}
  </div>
);

export default UsuarioTarjeta;