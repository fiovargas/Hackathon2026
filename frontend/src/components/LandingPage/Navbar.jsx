import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Briefcase, Building2, User, LogIn, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import './Navbar.css';
import LogoLima from '../../assets/LogoLima.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Practicantes/Pasantes', path: '/Pasantias' },
    { name: 'Empresas', path: '/Empresas' },
    { name: 'Directorio', path: '/Ofertas' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-inner">
          <div className="navbar-left">
            <Link to="/" className="navbar-logo">
              <img 
                src= {LogoLima}  
                alt="Logo La Lima" 
                className="navbar-icon"
              />
              <span className="navbar-title">
                Bolsa de empleo <span className="navbar-title-highlight"> La Lima</span>
              </span>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="navbar-desktop-menu">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${isActive(link.path) ? 'active' : 'inactive'}`}
              >
                {link.name}
              </Link>
            ))}
            <div className="navbar-divider" />
            <Link
              to="/login"
              className="nav-login-btn"
            >
              <span>Entrar a la aplicación</span>
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="navbar-mobile-toggle">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="mobile-toggle-btn"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mobile-menu"
          >
            <div className="mobile-menu-inner">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`mobile-nav-link ${isActive(link.path) ? 'active' : 'inactive'}`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="mobile-menu-divider">
                <Link
                  to="/perfil"
                  onClick={() => setIsOpen(false)}
                  className="mobile-nav-link inactive"
                >
                  Mi Perfil
                </Link>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="mobile-nav-link mobile-login-btn"
                >
                  Login/Register <ArrowRight size={16} style={{ display: 'inline', marginLeft: '4px', verticalAlign: 'middle' }} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}