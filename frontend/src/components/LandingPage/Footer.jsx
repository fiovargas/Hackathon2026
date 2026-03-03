import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div>
            {/* Footer */}
      <footer className="bg-slate-900 py-12 text-slate-400 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 text-white mb-6">
                <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center font-bold">L</div>
                <span className="text-xl font-bold">Bolsa de Empleo La Lima</span>
              </div>
              <p className="max-w-sm">
                La plataforma oficial de empleo para el parque industrial más importante de Cartago, conectando talento local con oportunidades globales.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Plataforma</h4>
              <ul className="space-y-4">
                <li><Link to="/Ofertas" className="hover:text-white transition-colors">Buscar Empleos</Link></li>
                <li><Link to="/Empresas" className="hover:text-white transition-colors">Empresas</Link></li>
                <li><Link to="/registro" className="hover:text-white transition-colors">Crear Cuenta</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Soporte</h4>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-white transition-colors">Ayuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© 2024 Bolsa de Empleo Zona Franca La Lima. Todos los derechos reservados.</p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">Facebook</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
