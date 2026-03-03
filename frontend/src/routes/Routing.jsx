import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from '../pages/Inicio';
import Login from '../pages/Login';
import RegisterEmpresas from '../pages/RegisterEmpresas';
import RegistroEstudiantes from '../pages/RegistroEstudiantes';
import ListadoUsuarios from '../pages/ListadoUsuarios';

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register-empresas' element={<RegisterEmpresas />} />
        <Route path='/registro-estudiantes' element={<RegistroEstudiantes />} />
        <Route path='/listado-usuarios' element={<ListadoUsuarios />} />
      </Routes>
    </Router>
  );
}

export default Routing;
