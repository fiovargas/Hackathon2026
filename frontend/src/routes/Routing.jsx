import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from '../pages/Inicio';
import Login from '../pages/Login';
import RegisterEmpresas from '../pages/RegisterEmpresas';
import RegistroEstudiantes from '../pages/RegistroEstudiantes';
import ListadoUsuarios from '../pages/ListadoUsuarios';
import Navbar from '../components/LandingPage/Navbar';
import Footer from '../components/LandingPage/Footer';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import Empresas from '../pages/Empresas';
import AdminPermision from './AdminPermision';

function Routing() {
  return (
    <Router>
      <Routes>
        {/* Rutas Públicas */}
        <Route path='/' element={<Inicio />} />
        <Route path='/register' element={<RegistroEstudiantes />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register/companies' element={<RegisterEmpresas />} />
        <Route path='/ListadoUsuarios' element={<ListadoUsuarios />} />

        {/* Admin */}
        <Route path='/Empresas' element={<Empresas />} />
        {/* Rutas Admin (rol id === 1) */}
        <Route element={<AdminPermision />}>
          <Route path='/admin' element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default Routing;
