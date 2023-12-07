import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import "../LoginForm.css"
const CrearJugador = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [datos, setDatos] = useState({
    nombre: '',
    apodo: '',
    media: '',
    posicion_id: '',
    equipo_id: '',
    foto: ''
  });

  const [errors, setErrors] = useState({
    nombre: '',
    apodo: '',
    media: '',
    posicion_id: '',
    equipo_id: '',
    foto: ''
  });
  const menuItems = [
    { name: 'Volver', route: '/adminIndex' },
];
  

  const [equipos, setEquipos] = useState([]);
  const [posiciones, setPosiciones] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    navigate('/adminIndex');
    setShowModal(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const equiposResponse = await axios.get('http://127.0.0.1:8000/api/equipos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const posicionesResponse = await axios.get('http://127.0.0.1:8000/api/posiciones', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEquipos(equiposResponse.data.data);
        setPosiciones(posicionesResponse.data.data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, [token]);

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!datos.nombre) {
      newErrors.nombre = 'El nombre es obligatorio';
    }

    if (!datos.apodo) {
      newErrors.apodo = 'El apodo es obligatorio';
    }

    const mediaValue = parseInt(datos.media, 10);
    if (isNaN(mediaValue) || mediaValue < 1 || mediaValue > 99) {
      newErrors.media = 'La media debe ser un número entero entre 1 y 99';
    }

    if (!datos.posicion_id) {
      newErrors.posicion_id = 'La posición es obligatoria';
    }

    if (!datos.equipo_id) {
      newErrors.equipo_id = 'El equipo es obligatorio';
    }

    const urlPattern = /^(http|https):\/\/\S+\.\S+$/;
    if (!urlPattern.test(datos.foto)) {
      newErrors.foto = 'La URL de la foto no es válida';
    }

    setErrors(newErrors);
    const areErrorsEmpty = Object.values(newErrors).every((value) => value === '');

    if (areErrorsEmpty) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/jugadores', datos, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        handleShowModal();

        console.log(response.data);
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
      }
    }
  };

  return (
    <div>
       <Header menuItems={menuItems} />
      
       <div className="d-flex align-items-center justify-content-center vh-100">
        
    <form onSubmit={handleSubmit} className="text-center w-50 p-4 border rounded bg-warning mt-1">
    <h2 className="text-center mt-3">Crear Jugador</h2>
      <div className="mb-3 row">
        <label htmlFor="nombre" className="col-sm-4 col-form-label text-end">Nombre:</label>
        <div className="col-sm-8">
          <input type="text" name="nombre" value={datos.nombre} onChange={handleChange} className="form-control" />
          <span style={{ color: 'red' }}>{errors.nombre}</span>
        </div>
      </div>

      <div className="mb-3 row">
        <label htmlFor="apodo" className="col-sm-4 col-form-label text-end">Apodo:</label>
        <div className="col-sm-8">
          <input type="text" name="apodo" value={datos.apodo} onChange={handleChange} className="form-control" />
          <span style={{ color: 'red' }}>{errors.apodo}</span>
        </div>
      </div>

      <div className="mb-3 row">
        <label htmlFor="media" className="col-sm-4 col-form-label text-end">Media:</label>
        <div className="col-sm-8">
          <input type="text" name="media" value={datos.media} onChange={handleChange} className="form-control" />
          <span style={{ color: 'red' }}>{errors.media}</span>
        </div>
      </div>

      <div className="mb-3 row">
        <label htmlFor="posicion_id" className="col-sm-4 col-form-label text-end">Posición:</label>
        <div className="col-sm-8">
          <select name="posicion_id" value={datos.posicion_id} onChange={handleChange} className="form-select">
            <option value="">Seleccionar Posición</option>
            {posiciones.map((posicion) => (
              <option key={posicion.id} value={posicion.id}>
                {posicion.nombre}
              </option>
            ))}
          </select>
          <span style={{ color: 'red' }}>{errors.posicion_id}</span>
        </div>
      </div>

      <div className="mb-3 row">
        <label htmlFor="equipo_id" className="col-sm-4 col-form-label text-end">Equipo:</label>
        <div className="col-sm-8">
          <select name="equipo_id" value={datos.equipo_id} onChange={handleChange} className="form-select">
            <option value="">Seleccionar Equipo</option>
            {equipos.map((equipo) => (
              <option key={equipo.id} value={equipo.id}>
                {equipo.nombre}
              </option>
            ))}
          </select>
          <span style={{ color: 'red' }}>{errors.equipo_id}</span>
        </div>
      </div>

      <div className="mb-3 row">
        <label htmlFor="foto" className="col-sm-4 col-form-label text-end">Foto:</label>
        <div className="col-sm-8">
          <input type="text" name="foto" value={datos.foto} onChange={handleChange} className="form-control" />
          <span style={{ color: 'red' }}>{errors.foto}</span>
        </div>
      </div>

      <div className="mb-3 row">
        <div className="col-sm-12">
          <button type="submit" className="custom-btn">Enviar</button>
        </div>
      </div>
    </form>

    {/* Modal */}
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Jugador creado</Modal.Title>
      </Modal.Header>
      <Modal.Body>El jugador {datos.apodo} ha sido creado exitosamente.</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleCloseModal}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  </div>
    </div>
  );
};

export default CrearJugador;

