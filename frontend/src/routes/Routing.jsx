import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterEstudiantes from '../components/RegisterEstudiantes/RegisterEstudiantes';
import Inicio from '../pages/Inicio';
import Login from '../pages/Login';
import RegisterEmpresas from '../pages/RegisterEmpresas';
import Navbar from "../components/Navbar/Navbar";
import ListadoUsuarios from '../pages/ListadoUsuarios';

function Routing() {
  return (
    <Router>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<Inicio />} />
        <Route path="/Navbar" element={<Navbar />} />
        <Route path="/RegisterEstudiantes" element={<RegisterEstudiantes />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/RegisterEmpresas" element={<RegisterEmpresas />} />
        <Route path="/ListadoUsuarios" element={<ListadoUsuarios/>} />
      </Routes>
    </Router>
  )
}

export default Routing
