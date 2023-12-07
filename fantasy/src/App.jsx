// Ejemplo de uso de react-router-dom
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom"
import LoginForm from './Components/LoginForm'
import AdminIndex from './Components/AdminIndex'
import CrearJugador from "./Components/CrearJugador"
import EditarJugador from "./Components/EditarJugador"
import IndexEquipos from "./Components/IndexEquipos"
import MiEquipo from "./Components/MiEquipo"
import Modal from 'react-modal';
import Jornadas from "./Components/Jornadas"
import Mercado from "./Components/Mercado"
import LoadingScreen from "./Components/LoadingScreen"
import Register from "./Components/Register"
Modal.setAppElement('#root');
const App = () => {
  return (
   
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/Registro" element={<Register />} />
      
        <Route path="/adminIndex" element={<AdminIndex />} />
        <Route path="/adminIndex/CrearJugador" element={<CrearJugador />} />
        <Route path="/adminIndex/EditarJugador/:id" element={<EditarJugador />} />
        <Route path="/adminIndex/Equipos" element={<IndexEquipos />} />
    
      {/* Ruta para usuarios normales*/}
      <Route path="/MiEquipo" element={<MiEquipo />} />
      <Route path="/Jornadas" element={<Jornadas />} />
      <Route path="/Mercado" element={<Mercado />} />
      <Route path="/GenerandoJornada" element={<LoadingScreen/>} />
    </Routes>
  </BrowserRouter>
    
  );
};

export default App;
