import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import RegisterEstudiantes from '../components/RegisterEstudiantes/RegisterEstudiantes';
import Inicio from '../pages/Inicio';
import Login from '../pages/Login';
import RegisterEmpresas from '../pages/RegisterEmpresas';
import RegistroEstudiantes from '../pages/RegistroEstudiantes';
import ListadoUsuarios from '../pages/ListadoUsuarios';
import Navbar from '../components/LandingPage/Navbar';
import Footer from '../components/LandingPage/Footer';

function Routing() {
  return (
    <Router>
      <Routes>
        {/* Rutas Públicas */}
        <Route path='/' element={<Inicio />} />
        <Route path='/Navbar' element={<Navbar />} />
        <Route path='/Footer' element={<Footer />} />
        <Route path='/register' element={<RegisterEstudiantes />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register/companies' element={<RegisterEmpresas />} />
        <Route path='/ListadoUsuarios' element={<ListadoUsuarios />} />
      </Routes>
    </Router>
  );
}

export default Routing;