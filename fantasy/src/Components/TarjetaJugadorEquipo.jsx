import React, { useState } from 'react';
import '../tarjetaJugadorEquipo.css';
import axios from 'axios'; 


const JugadorCard = ({ nombre, apodo, media, equipo, foto, posicion, puntos_totales, id , onVentaExitosa}) => {
  const [showVenderModal, setShowVenderModal] = useState(false);
  const [showVentaRealizadaModal, setShowVentaRealizadaModal] = useState(false);
  const precio = Math.round(media/2);
  const handleVenderClick = () => {
    setShowVenderModal(true);
  };

  const handleConfirmVender = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://127.0.0.1:8000/api/jugadores/${id}/vender`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Muestra el modal de "Venta realizada"
      setShowVentaRealizadaModal(true);
      // Cierra el modal de venta
      setShowVenderModal(false);
    } catch (error) {
      console.error('Error al vender el jugador:', error);
    }
  };

  const handleCancelVender = () => {
    // Operación cancelada
    setShowVenderModal(false);
  };

  const handleCerrarVentaRealizada = () => {
    // Cierra el modal de "Venta realizada"
    setShowVentaRealizadaModal(false);
    onVentaExitosa();
  };

  return (
    <div className="cardJugador"> 
  <div className="playerContainer">
    <div className="playerImageContainer">
      <img src={foto} alt={nombre} className="playerImage" />
      <img src={equipo.escudo} alt={equipo.nombre} className="teamBadge" />
    </div>

    <div className="playerDetails">
      <div className="detailText">{nombre}</div>
      <div className="detailText">{apodo}</div>
      <div className="detailText">Media: {media}</div>
      <div className="detailText">Posición: <img src={`../../public/${posicion}.png`} alt={posicion} /></div>
      <div className="detailText">Puntos Totales: {puntos_totales}</div>
    </div>
  </div>

  <button className="sellButton" onClick={handleVenderClick}>
    Vender
  </button>


      {/* Modal Venta*/}
      <div className={`modal ${showVenderModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showVenderModal ? 'block' : 'none' }}>
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="currentColor" d="M232 128c0 12.5-17.8 22-22.7 33.7s1.4 30.6-7.8 39.8s-28.5 3.1-39.8 7.8S140.5 232 128 232s-22-17.8-33.7-22.7s-30.6 1.4-39.8-7.8s-3.1-28.5-7.8-39.8S24 140.5 24 128s17.8-22 22.7-33.7s-1.4-30.6 7.8-39.8s28.5-3.1 39.8-7.8S115.5 24 128 24s22 17.8 33.7 22.7s30.6-1.4 39.8 7.8s3.1 28.5 7.8 39.8S232 115.5 232 128Z" opacity=".2"/><path fill="currentColor" d="M225.9 102.8c-3.8-3.9-7.7-8-9.2-11.5s-1.4-8.7-1.5-14c-.1-9.7-.3-20.8-8-28.5s-18.8-7.9-28.5-8c-5.3-.1-10.7-.2-14-1.5s-7.6-5.4-11.5-9.2C146.3 23.5 138.4 16 128 16s-18.3 7.5-25.2 14.1c-3.9 3.8-8 7.7-11.5 9.2s-8.7 1.4-14 1.5c-9.7.1-20.8.3-28.5 8s-7.9 18.8-8 28.5c-.1 5.3-.2 10.7-1.5 14s-5.4 7.6-9.2 11.5C23.5 109.7 16 117.6 16 128s7.5 18.3 14.1 25.2c3.8 3.9 7.7 8 9.2 11.5s1.4 8.7 1.5 14c.1 9.7.3 20.8 8 28.5s18.8 7.9 28.5 8c5.3.1 10.7.2 14 1.5s7.6 5.4 11.5 9.2c6.9 6.6 14.8 14.1 25.2 14.1s18.3-7.5 25.2-14.1c3.9-3.8 8-7.7 11.5-9.2s8.7-1.4 14-1.5c9.7-.1 20.8-.3 28.5-8s7.9-18.8 8-28.5c.1-5.3.2-10.7 1.5-14s5.4-7.6 9.2-11.5c6.6-6.9 14.1-14.8 14.1-25.2s-7.5-18.3-14.1-25.2Zm-11.6 39.3c-4.8 5-9.7 10.2-12.4 16.5s-2.6 13.1-2.7 19.8s-.2 14.4-3.3 17.5s-10.4 3.2-17.5 3.3s-13.7.2-19.8 2.7s-11.5 7.6-16.5 12.4S132 224 128 224s-9.1-4.9-14.1-9.7s-10.2-9.7-16.5-12.4s-13.1-2.6-19.8-2.7s-14.4-.2-17.5-3.3s-3.2-10.4-3.3-17.5s-.2-13.7-2.7-19.8s-7.6-11.5-12.4-16.5S32 132 32 128s4.9-9.1 9.7-14.1s9.7-10.2 12.4-16.5s2.6-13.1 2.7-19.8s.2-14.4 3.3-17.5s10.4-3.2 17.5-3.3s13.7-.2 19.8-2.7s11.5-7.6 16.5-12.4S124 32 128 32s9.1 4.9 14.1 9.7s10.2 9.7 16.5 12.4s13.1 2.6 19.8 2.7s14.4.2 17.5 3.3s3.2 10.4 3.3 17.5s.2 13.7 2.7 19.8s7.6 11.5 12.4 16.5S224 124 224 128s-4.9 9.1-9.7 14.1ZM120 136V80a8 8 0 0 1 16 0v56a8 8 0 0 1-16 0Zm20 36a12 12 0 1 1-12-12a12 12 0 0 1 12 12Z"/></svg></h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleCancelVender}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>¿Quieres vender a {nombre} por {precio}<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="currentColor" d="M196.78 57.09C185.08 37 169.18 26 152 26h-48c-17.18 0-33.08 11-44.78 31.09C48.12 76.13 42 101.31 42 128s6.12 51.87 17.22 70.91C70.92 219 86.82 230 104 230h48c17.18 0 33.08-11 44.78-31.09c11.1-19 17.22-44.22 17.22-70.91s-6.12-51.87-17.22-70.91Zm5.1 64.91h-36c-.65-18.84-4.37-36.73-10.74-52H190c7.06 14.74 11.16 32.77 11.88 52ZM152 38c11.31 0 22.22 7.06 31.14 20h-33.86l-.5-.91A76.8 76.8 0 0 0 133.49 38ZM69.58 192.86C59.54 175.63 54 152.6 54 128s5.54-47.63 15.58-64.86C79 46.93 91.26 38 104 38s25 8.93 34.42 25.14C148.46 80.37 154 103.4 154 128s-5.54 47.63-15.58 64.86C129 209.07 116.74 218 104 218s-25-8.93-34.42-25.14ZM152 218h-18.51a76.8 76.8 0 0 0 15.29-19.09l.5-.91h33.86c-8.92 12.94-19.83 20-31.14 20Zm38-32h-34.86c6.37-15.27 10.09-33.16 10.74-52h36c-.72 19.23-4.82 37.26-11.88 52Z"/></svg>?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleCancelVender}>
                Cancelar
              </button>
              <button type="button" className="btn btn-primary" onClick={handleConfirmVender}>
                Vender
              </button>
            </div>
          </div>
        </div>
      </div>
    {/* Modal Venta realizada*/}
    <div className={`modal ${showVentaRealizadaModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showVentaRealizadaModal ? 'block' : 'none' }}>
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Venta Realizada</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleCerrarVentaRealizada}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Has vendido a {nombre} por {precio} .</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={handleCerrarVentaRealizada}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JugadorCard;
