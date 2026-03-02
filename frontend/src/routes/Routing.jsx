import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterEstudiantes from '../pages/RegisterEstudiantes';
import Inicio from '../pages/Inicio';
import LoginGeneral from '../components/Login estudiantes/LoginGeneral';

function Routing() {
  return (
    <Router>
        <Routes>  
          {/* Rutas Públicas */}
          <Route path="/" element={<Inicio/>}/>
          <Route path="/RegisterEstudiantes" element={<RegisterEstudiantes/>}/>
          <Route path="/LoginGeneral" element={<LoginGeneral/>}/>

        </Routes>
    </Router> 
  )
}

export default Routing
