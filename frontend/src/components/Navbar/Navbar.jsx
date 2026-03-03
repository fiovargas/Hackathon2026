import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Briefcase, Building2, User, LogIn, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Inicio', path: '/', icon: <Briefcase size={18} /> },
    { name: 'Empresas', path: '/empresas', icon: <Building2 size={18} /> },
    { name: 'Ofertas', path: '/ofertas', icon: <Briefcase size={18} /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-inner">
          <div className="navbar-left">
            <Link to="/" className="navbar-logo">
              <div className="navbar-icon">L</div>
              <span className="navbar-title">
                Bolsa de Empleo <span className="navbar-title-highlight">La Lima</span>
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
              className="nav-link inactive"
            >
              <LogIn size={18} />
              <span>Ingresar</span>
            </Link>
            <Link
              to="/perfil"
              className="nav-btn-icon"
            >
              <User size={20} />
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
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="mobile-nav-link inactive"
                >
                  Ingresar
                </Link>
                <Link
                  to="/perfil"
                  onClick={() => setIsOpen(false)}
                  className="mobile-nav-link active"
                >
                  Mi Perfil
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}