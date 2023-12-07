import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const EditarJugador = () => {
  const token = localStorage.getItem('token');
  const datosJugador = JSON.parse(localStorage.getItem('datosJugador'));
  const { id } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    nombre: '',
    apodo: '',
    media: '',
    posicion_id: '',
    equipo_id: '',
    foto: ''
  });
  const [loading, setLoading] = useState(false);

  console.log(datosJugador)
  const route = 'http://127.0.0.1:8000/api/jugadores/' + id
  const [datos, setDatos] = useState({
    nombre: datosJugador.nombre,
    apodo: datosJugador.apodo,
    media: datosJugador.media,
    posicion_id: datosJugador.posicion_id,
    equipo_id: datosJugador.equipo_id,
    foto: datosJugador.foto
  });

  const menuItems = [
    { name: 'Volver', route: '/adminIndex' },
];
  // Estados para almacenar datos de equipos y posiciones
  const [equipos, setEquipos] = useState([]);
  const [posiciones, setPosiciones] = useState([]);
  //Modales
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const handleCloseSuccessModal = () => setShowSuccessModal(false);
  const handleShowSuccessModal = () => setShowSuccessModal(true);
  const handleShowConfirmDeleteModal = () => setShowConfirmDeleteModal(true);
  const handleCloseConfirmDeleteModal = () => {
    setShowConfirmDeleteModal(false);
  }
  useEffect(() => {
    setLoading(true);
 
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
      finally {
        setLoading(false); 
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
    const areErrorsEmpty = Object.values(newErrors).every(value => value === '');

    if (areErrorsEmpty) {
      try {
        const response = await axios.put(route, datos, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        console.log(response.data);
        handleShowSuccessModal();
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
      }
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    handleShowConfirmDeleteModal(); 
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(route, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      handleCloseConfirmDeleteModal(); 
      console.log(response.data);
      navigate('/adminIndex');
    } catch (error) {
      handleCloseConfirmDeleteModal();
      console.error('Error al borrar el jugador:', error);
      setDeleteError('No se ha podido borrar al jugador');
      setShowErrorModal(true); 
    }

  };

  const handleCloseErrorModal = () => {
    setDeleteError('');
    setShowErrorModal(false);
  };

  return (
    <div>
      <Header menuItems={menuItems} />
      <div className="d-flex align-items-center justify-content-center vh-100">
        {loading && <img src="../../public/carga.png" alt="Rotating Image" className="rotating-image" />}
        {!loading && (
          <form onSubmit={handleSubmit} className="text-center w-50 p-4 border rounded bg-warning mt-2">
            <label>
              Nombre:
              <input type="text" name="nombre" value={datos.nombre} onChange={handleChange} className="form-control" />
              <span style={{ color: 'red' }}>{errors.nombre}</span>
            </label>
            <br />
            <label>
              Apodo:
              <input type="text" name="apodo" value={datos.apodo} onChange={handleChange} className="form-control" />
              <span style={{ color: 'red' }}>{errors.apodo}</span>
            </label>
            <br />
            <label>
              Media:
              <input type="text" name="media" value={datos.media} onChange={handleChange} className="form-control" />
              <span style={{ color: 'red' }}>{errors.media}</span>
            </label>
            <br />
            <label>
              Posición:
              <select name="posicion_id" value={datos.posicion_id} onChange={handleChange} className="form-select">
                <option value="">Seleccionar Posición</option>
                {posiciones.map((posicion) => (
                  <option key={posicion.id} value={posicion.id}>
                    {posicion.nombre}
                  </option>
                ))}
              </select>
              <span style={{ color: 'red' }}>{errors.posicion_id}</span>
            </label>
            <br />
            <label>
              Equipo:
              <select name="equipo_id" value={datos.equipo_id} onChange={handleChange} className="form-select">
                <option value="">Seleccionar Equipo</option>
                {equipos.map((equipo) => (
                  <option key={equipo.id} value={equipo.id}>
                    {equipo.nombre}
                  </option>
                ))}
              </select>
              <span style={{ color: 'red' }}>{errors.equipo_id}</span>
            </label>
            <br />
            <label>
              Foto:
              <img src={datos.foto} alt={datos.nombre} className="img-fluid" />
              <span style={{ color: 'red' }}>{errors.foto}</span>
            </label>
            <br />
            <button type="submit" className="btn btn-primary">Editar</button>
            <button onClick={handleDelete} className="btn btn-danger">Eliminar Jugador</button>
          </form>
        )}
        {/* Modal de éxito */}
        <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
          <Modal.Header closeButton>
            <Modal.Title>Editado con Éxito</Modal.Title>
          </Modal.Header>
          <Modal.Body>El jugador ha sido editado exitosamente.</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleCloseSuccessModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal de confirmación de eliminación */}
        <Modal show={showConfirmDeleteModal} onHide={handleCloseConfirmDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>¿Seguro que quieres eliminar?</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseConfirmDeleteModal}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Sí, Eliminar
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal de error al borrar */}
        <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
          <Modal.Header closeButton>
            <Modal.Title>Error al borrar jugador</Modal.Title>
          </Modal.Header>
          <Modal.Body>{deleteError}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseErrorModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default EditarJugador;
