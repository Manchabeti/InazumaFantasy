import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TarjetaMercado from './TarjetaMercado';
import Header from './Header';
import '../LoginForm.css'

const Mercado = () => {
    const [jugadores, setJugadores] = useState([]);
    const [forceUpdate, setForceUpdate] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const token = localStorage.getItem('token');
    const rute = "http://127.0.0.1:8000/api/mercado/";
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [saldo, setSaldo] = useState("")
    const menuItems = [
        { name: 'Mi Equipo', route: '/MiEquipo' },
        { name: 'Jornadas', route: '/Jornadas' },
    ];


    const fetchJugadores = useCallback(async () => {
        try {
            const response = await axios.get(rute + searchTerm, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setJugadores(response.data.data);

            setError(null);
        } catch (error) {

            setLoading(false);
            if (error.response && (error.response.status === 403 || error.response.status === 401)) {
                navigate('/login');
            } else if (error.response && error.response.status === 404) {
                setError('No se encontraron coincidencias');
            }
            else {
                console.error('Error fetching jugadores:', error);
            }
        }

        try {
            const user = await axios.post(`http://127.0.0.1:8000/api/user`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSaldo(user.data.usuario.saldo)
            setLoading(false);
        } catch (error) {
            console.error('Error al vender el jugador:', error);
            // Puedes manejar el error y mostrar un mensaje al usuario si lo deseas
        }
    }, [token, searchTerm, navigate, forceUpdate]);

    useEffect(() => {

        const delayDebounceFn = setTimeout(() => {
            fetchJugadores();
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [fetchJugadores]);

    const handleActualizarLista = () => {
        setForceUpdate(prevState => !prevState);
    };

    return (
        <div>
            <Header menuItems={menuItems} />

            <div className="container mt-5 text-center">
                {loading ? (
                    <img src="../../carga.png" alt="Rotating Image" className="rotating-image" />
                ) : (
                    <div className="main-container">
                        <div className="search-container d-flex align-items-center">
                            <input
                                type="text"
                                placeholder="Buscar jugadores por apodo o nombre"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="form-control mr-2"
                                style={{ maxWidth: "600px" }} // Ajusta el ancho máximo de la barra de búsqueda
                            />
                            <div className="d-flex align-items-center" style={{ backgroundColor: "#FFA500", color: "#000000", padding: "5px" }}>
                                <h2 className="mb-0 mr-2" >
                                    {saldo}
                                </h2>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="52"
                                    height="52"
                                    viewBox="0 0 256 256"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M196.78 57.09C185.08 37 169.18 26 152 26h-48c-17.18 0-33.08 11-44.78 31.09C48.12 76.13 42 101.31 42 128s6.12 51.87 17.22 70.91C70.92 219 86.82 230 104 230h48c17.18 0 33.08-11 44.78-31.09c11.1-19 17.22-44.22 17.22-70.91s-6.12-51.87-17.22-70.91Zm5.1 64.91h-36c-.65-18.84-4.37-36.73-10.74-52H190c7.06 14.74 11.16 32.77 11.88 52ZM152 38c11.31 0 22.22 7.06 31.14 20h-33.86l-.5-.91A76.8 76.8 0 0 0 133.49 38ZM69.58 192.86C59.54 175.63 54 152.6 54 128s5.54-47.63 15.58-64.86C79 46.93 91.26 38 104 38s25 8.93 34.42 25.14C148.46 80.37 154 103.4 154 128s-5.54 47.63-15.58 64.86C129 209.07 116.74 218 104 218s-25-8.93-34.42-25.14ZM152 218h-18.51a76.8 a 76.8 0 0 0 15.29-19.09l.5-.91h33.86c-8.92 12.94-19.83 20-31.14 20Zm38-32h-34.86c6.37-15.27 10.09-33.16 10.74-52h36c-.72 19.23-4.82 37.26-11.88 52Z"
                                    />
                                </svg>
                            </div>
                        </div>


                        <div className="tarjeta-container">
                            {error ? (
                                <div className="error-tarjeta">
                                    <p>{error}</p>
                                </div>
                            ) : (
                                jugadores.map((jugador) => (
                                    <TarjetaMercado key={jugador.id} datosJugador={jugador} forceUpdate={handleActualizarLista} />
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Mercado;
