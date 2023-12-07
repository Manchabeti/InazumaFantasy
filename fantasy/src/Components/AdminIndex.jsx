import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Tarjeta from './Tarjeta';
import Header from './Header';
import '../LoginForm.css';

const AdminIndex = () => {
    const [jugadores, setJugadores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const token = localStorage.getItem('token');
    const rute = "http://127.0.0.1:8000/api/jugadores/";
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const menuItems = [
    ];

    const fetchJugadores = useCallback(async () => {
        try {
            const response = await axios.get(rute + searchTerm, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setJugadores(response.data.data);
            setLoading(false);
            setError(null);
        } catch (error) {
            setLoading(false);
            if (error.response && (error.response.status === 403 || error.response.status === 401)) {
                navigate('/');
            } else if (error.response && error.response.status === 404) {
                setError('No se encontraron coincidencias');
            } else {
                console.error('Error fetching jugadores:', error);
            }
        }
    }, [token, searchTerm, navigate, rute]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchJugadores();
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [fetchJugadores]);

    const handleCrearClick = () => {
        navigate('crearJugador');
    };

    return (
        <div>
            <Header menuItems={menuItems} />
            <div className="container mt-5 text-center">

                {loading ? (
                    <img src="../../carga.png" alt="Rotating Image" className="rotating-image" />
                ) : (
                    <div className="container mt-3">
                        <div className="row justify-content-center mb-3">
                            <div className="col-md-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Buscar jugadores por apodo o nombre"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="col-md-2">
                                <button className="custom-btn2" onClick={handleCrearClick}>
                                    Crear Jugador
                                </button>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            {error ? (
                                <div className="col-md-6">
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>
                                </div>
                            ) : (
                                jugadores.map((jugador) => (
                                    <div className="col-md-4 mb-3" key={jugador.id}>
                                        <Tarjeta datosJugador={jugador} />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminIndex;

