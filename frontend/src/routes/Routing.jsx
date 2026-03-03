import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterEstudiantes from '../pages/RegisterEstudiantes';
import Inicio from '../pages/Inicio';
import Login from '../pages/Login';
import RegisterEmpresas from '../pages/RegisterEmpresas';
// import Navbar from '../pages/Navbar';

function Routing() {
  return (
    <Router>
      <Routes>
        {/* Rutas Públicas */}
        <Route path='/' element={<Inicio />} />
        {/* <Route path="/Navbar" element={<Navbar/>}/> */}
        <Route path='/register' element={<RegisterEstudiantes />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register/companies' element={<RegisterEmpresas />} />
      </Routes>
    </Router>
  );
}

export default Routing;
