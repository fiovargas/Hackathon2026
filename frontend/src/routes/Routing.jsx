import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterEstudiantes from '../components/RegisterEstudiantes/RegisterEstudiantes';
import Inicio from '../pages/Inicio';
import Login from '../pages/Login';
import RegisterEmpresas from '../pages/RegisterEmpresas';
import ListadoUsuarios from '../pages/ListadoUsuarios';

function Routing() {
  return (
    <Router>
      {/* Rutas Públicas */}
      <Route path='/' element={<Inicio />} />
      {/* <Route path="/Navbar" element={<Navbar/>}/> */}
      <Route path='/register' element={<RegisterEstudiantes />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register/companies' element={<RegisterEmpresas />} />
      <Route path="/ListadoUsuarios" element={<ListadoUsuarios />} />
    </Router>
  );
}

export default Routing;
