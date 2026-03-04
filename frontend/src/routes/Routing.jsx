import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from '../pages/Inicio';
import Login from '../pages/Login';
import RegisterEmpresas from '../pages/RegisterEmpresas';
import RegistroEstudiantes from '../pages/RegistroEstudiantes';
import ListadoUsuarios from '../pages/ListadoUsuarios';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import Empresas from '../pages/Empresas';
import Perfil from '../pages/Perfil';
import DirectorioEmpresas from '../pages/DirectorioEmpresas';
import AdminPermision from './AdminPermision';
import InstitutionRoute from './InstitutionRoute';
import PrivateRoute from './PrivateRoute';

function Routing() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path='/' element={<Inicio />} />
        <Route path='/register' element={<RegistroEstudiantes />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register/companies' element={<RegisterEmpresas />} />
        <Route path='/Empresas' element={<Empresas />} />

        {/* Rutas privadas (autenticado) */}
        <Route element={<PrivateRoute />}>
          <Route path='/perfil' element={<Perfil />} />
          <Route path='/directorio' element={<DirectorioEmpresas />} />
        </Route>

        {/* Rutas Institución de formación (rol id === 5) */}
        <Route element={<InstitutionRoute />}>
          <Route path='/ListadoUsuarios' element={<ListadoUsuarios />} />
        </Route>

        {/* Rutas Admin (rol id === 1) */}
        <Route element={<AdminPermision />}>
          <Route path='/admin' element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default Routing;
