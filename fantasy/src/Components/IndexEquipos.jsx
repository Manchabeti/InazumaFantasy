import React, { useState, useEffect } from 'react';
import TarjetaEquipo from './TarjetaEquipo';
import axios from 'axios';

const IndexEquipos = () => {
  const [equipos, setEquipos] = useState([]);
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/equipos', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        setEquipos(response.data.data);
      } catch (error) {
        
        if (error.response && (error.response.status === 403 || error.response.status === 401)) {
            navigate('/');
        } else if (error.response && error.response.status === 404) {
            setError('No se encontraron coincidencias');
        }else{
            console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, []); 

  return (
    <div>
      {equipos.map((equipo) => (
        <TarjetaEquipo key={equipo.id} datosEquipo={equipo} />
      ))}
    </div>
  );
};

export default IndexEquipos;
