import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UsuarioTarjeta from './UsuarioTarjeta';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import "../LoginForm.css"

const MiComponente = () => {
  const [jornadas, setJornadas] = useState([]);
  const [selectedJornada, setSelectedJornada] = useState(null);
  const [puntuaciones, setPuntuaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const menuItems = [
    { name: 'Mi Equipo', route: '/MiEquipo' },
    { name: 'Mercado', route: '/Mercado' },
  ];
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jornadasResponse = await axios.get('http://127.0.0.1:8000/api/jornadas', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setJornadas(jornadasResponse.data.data);

        if (jornadasResponse.data.data.length > 0) {
          setSelectedJornada(jornadasResponse.data.data[jornadasResponse.data.data.length - 1].id);
        }
      } catch (error) {
        console.error('Error fetching jornadas:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchPuntuaciones = async () => {
      try {
        if (selectedJornada !== 'General') {
          const posicionesResponse = await axios.get(
            `http://127.0.0.1:8000/api/puntuaciones/jornada/${selectedJornada}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setPuntuaciones(posicionesResponse.data);
          setTimeout(() => {
            setLoading(false);
          }, 1500);
        } else {
          const posicionesResponse = await axios.get(
            'http://127.0.0.1:8000/api/puntuaciones-totales',
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setPuntuaciones(posicionesResponse.data);
          setTimeout(() => {
            setLoading(false);
          }, 1500);
        }
      } catch (error) {
        console.error('Error fetching puntuaciones:', error);
      }
    };

    fetchPuntuaciones();
  }, [selectedJornada]);

  const handleJornadaChange = (event) => {
    setSelectedJornada(event.target.value);
  };

  const handleJugarJornadaClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleJugarJornadaConfirm = async () => {
    setShowModal(false);
    try {
      const jornadasResponse = await axios.post('http://127.0.0.1:8000/api/crear-nueva-jornada', null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJornadas(jornadasResponse.data.data);

      if (jornadasResponse.data.data.length > 0) {
        setSelectedJornada(jornadasResponse.data.data[jornadasResponse.data.data.length - 1].id);
      }
    } catch (error) {
      console.error('Error fetching jornadas:', error);
    }

    navigate('/GenerandoJornada');

  };

  if (loading) {
    return (
      <div>
        <Header menuItems={menuItems} />
        <img src="../../carga.png" alt="Rotating Image" className="rotating-image" />
      </div>
    )
  }
  return (
    <div>
      <Header menuItems={menuItems} />
      <div className="container text-center mt-5">
        <label htmlFor="jornadaSelect">Selecciona una jornada: </label>
        <select
          id="jornadaSelect"
          className="mx-2 orangeSelect" // Asigna la clase al select
          onChange={handleJornadaChange}
          value={selectedJornada}
        >
          <option key="General">General</option>
          {jornadas.map((jornada) => (
            <option key={jornada.id} value={jornada.id}>
              {jornada.fecha}
            </option>
          ))}
        </select>

        <Button
          variant="dark"
          onClick={handleJugarJornadaClick}
        >
          Jugar Jornada
        </Button>

        <div className="mt-3">
  <h2>Puntuaciones:</h2>
  {puntuaciones.length === 0 ? (
     <div className="alert alert-danger rounded">
     No se han jugado jornadas aún.
   </div>
  ) : (
    <ul>
      {puntuaciones.map((puntuacion, index) => (
        <UsuarioTarjeta
          key={puntuacion.usuario}
          usuario={puntuacion.usuario}
          puntos={puntuacion.puntos_totales}
          posicion={index + 1}
          esPrimero={index === 0}
        />
      ))}
    </ul>
  )}
</div>

        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="currentColor" d="M232 128c0 12.5-17.8 22-22.7 33.7s1.4 30.6-7.8 39.8s-28.5 3.1-39.8 7.8S140.5 232 128 232s-22-17.8-33.7-22.7s-30.6 1.4-39.8-7.8s-3.1-28.5-7.8-39.8S24 140.5 24 128s17.8-22 22.7-33.7s-1.4-30.6 7.8-39.8s28.5-3.1 39.8-7.8S115.5 24 128 24s22 17.8 33.7 22.7s30.6-1.4 39.8 7.8s3.1 28.5 7.8 39.8S232 115.5 232 128Z" opacity=".2" /><path fill="currentColor" d="M225.9 102.8c-3.8-3.9-7.7-8-9.2-11.5s-1.4-8.7-1.5-14c-.1-9.7-.3-20.8-8-28.5s-18.8-7.9-28.5-8c-5.3-.1-10.7-.2-14-1.5s-7.6-5.4-11.5-9.2C146.3 23.5 138.4 16 128 16s-18.3 7.5-25.2 14.1c-3.9 3.8-8 7.7-11.5 9.2s-8.7 1.4-14 1.5c-9.7.1-20.8.3-28.5 8s-7.9 18.8-8 28.5c-.1 5.3-.2 10.7-1.5 14s-5.4 7.6-9.2 11.5C23.5 109.7 16 117.6 16 128s7.5 18.3 14.1 25.2c3.8 3.9 7.7 8 9.2 11.5s1.4 8.7 1.5 14c.1 9.7.3 20.8 8 28.5s18.8 7.9 28.5 8c5.3.1 10.7.2 14 1.5s7.6 5.4 11.5 9.2c6.9 6.6 14.8 14.1 25.2 14.1s18.3-7.5 25.2-14.1c3.9-3.8 8-7.7 11.5-9.2s8.7-1.4 14-1.5c9.7-.1 20.8-.3 28.5-8s7.9-18.8 8-28.5c.1-5.3.2-10.7 1.5-14s5.4-7.6 9.2-11.5c6.6-6.9 14.1-14.8 14.1-25.2s-7.5-18.3-14.1-25.2Zm-11.6 39.3c-4.8 5-9.7 10.2-12.4 16.5s-2.6 13.1-2.7 19.8s-.2 14.4-3.3 17.5s-10.4 3.2-17.5 3.3s-13.7.2-19.8 2.7s-11.5 7.6-16.5 12.4S132 224 128 224s-9.1-4.9-14.1-9.7s-10.2-9.7-16.5-12.4s-13.1-2.6-19.8-2.7s-14.4-.2-17.5-3.3s-3.2-10.4-3.3-17.5s-.2-13.7-2.7-19.8s-7.6-11.5-12.4-16.5S32 132 32 128s4.9-9.1 9.7-14.1s9.7-10.2 12.4-16.5s2.6-13.1 2.7-19.8s.2-14.4 3.3-17.5s10.4-3.2 17.5-3.3s13.7-.2 19.8-2.7s11.5-7.6 16.5-12.4S124 32 128 32s9.1 4.9 14.1 9.7s10.2 9.7 16.5 12.4s13.1 2.6 19.8 2.7s14.4.2 17.5 3.3s3.2 10.4 3.3 17.5s.2 13.7 2.7 19.8s7.6 11.5 12.4 16.5S224 124 224 128s-4.9 9.1-9.7 14.1ZM120 136V80a8 8 0 0 1 16 0v56a8 8 0 0 1-16 0Zm20 36a12 12 0 1 1-12-12a12 12 0 0 1 12 12Z" /></svg></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ¿Quieres que se juegue una jornada?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              No
            </Button>
            <Button variant="primary" onClick={handleJugarJornadaConfirm}>
              Si
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default MiComponente;
