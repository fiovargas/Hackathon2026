import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Briefcase, Building2, User, LogIn, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import './Navbar.css'; // Importamos el CSS

const Navbar = () => {
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
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            <div className="navbar-icon">L</div>
            <span className="navbar-title">
              Bolsa de Empleo <span className="highlight">La Lima</span>
            </span>
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="navbar-desktop">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
          <div className="divider" />
          <Link to="/login" className="nav-link login-link">
            <LogIn size={18} />
            <span>Ingresar</span>
          </Link>
          <Link to="/perfil" className="profile-btn">
            <User size={20} />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="navbar-mobile-btn">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
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
            <div className="mobile-links">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`mobile-link ${isActive(link.path) ? 'active' : ''}`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="mobile-divider">
                <Link to="/login" onClick={() => setIsOpen(false)} className="mobile-link">
                  Ingresar
                </Link>
                <Link to="/perfil" onClick={() => setIsOpen(false)} className="mobile-link profile-link">
                  Mi Perfil
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;