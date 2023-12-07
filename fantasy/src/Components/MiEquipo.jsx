import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JugadorCard from './TarjetaJugadorEquipo';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
const MiEquipo = () => {
  const [jugadores, setJugadores] = useState([]);
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(true);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const menuItems = [
    { name: 'Mercado', route: '/Mercado' },
    { name: 'Jornadas', route: '/Jornadas' },
  ];
  useEffect(() => {
    const fetchJugadores = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/jugadores-del-usuario', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setJugadores(response.data.jugadores);
        
      } catch (error) {
        if (error.response && (error.response.status === 403 || error.response.status === 401)) {
          navigate('/login');
        } else if (error.response && error.response.status === 404) {
          setError('No hay jugadores');
        } else {
          console.error('Error fetching jugadores:', error);
        }
      }

      try {
        const user = await axios.post(`http://127.0.0.1:8000/api/user`, null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsername(user.data.usuario.username)
        setLoading(false);
      } catch (error) {
        console.error('', error);
      }
    };

    fetchJugadores();
  }, [forceUpdate]);
  const handleActualizarLista = () => {
    setForceUpdate(prevState => !prevState);
  };

  return (
    <div>
      <Header menuItems={menuItems} />
      <div className="container mt-4">
        {loading ? (
          <img src="../../carga.png" alt="Rotating Image" className="rotating-image" />
        ) : (
          <div>
            <h1 className="text-center mb-4">Jugadores de {username}</h1>
            <div className="row justify-content-center">
              {jugadores.map((jugador) => (
                <div key={jugador.id} className="col-md-7 mb-6">
                  <JugadorCard
                    nombre={jugador.nombre}
                    apodo={jugador.apodo}
                    media={jugador.media}
                    equipo={jugador.equipo}
                    foto={jugador.foto}
                    posicion={jugador.posicion_id}
                    puntos_totales={jugador.puntos_totales}
                    id={jugador.id}
                    onVentaExitosa={handleActualizarLista} 
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MiEquipo;
