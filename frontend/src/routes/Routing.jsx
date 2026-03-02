import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterEstudiantes from '../pages/RegisterEstudiantes';
import RegisterEmpresas from '../pages/RegisterEmpresas';

function Routing() {
  return (
    <Router>
        <Routes>  
            {/* Rutas Públicas */}
            {/* <Route path="/" element={<Home/>}/> */}
            <Route path="/RegisterEstudiantes" element={<RegisterEstudiantes/>}/>
            <Route path="/RegisterEmpresas" element={<RegisterEmpresas/>}/>

            RegisterEmpresas
        </Routes>
    </Router> 
  )
}

export default Routing
