import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn, User } from 'lucide-react';
import './Navbar.css';

export const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <div className="navbar__logo-icon">L</div>
          <span className="navbar__logo-text">
            Bolsa de Empleo <span>La Lima</span>
          </span>
        </Link>

        {/* Navigation links */}
        <ul className="navbar__links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/empresas">Empresas</Link></li>
          <li><Link to="/empleos">Ofertas</Link></li>
        </ul>

        {/* Action buttons */}
        <div className="navbar__actions">
          <Link to="/ingresar" className="navbar__btn-login">
            <LogIn />
            Ingresar
          </Link>
          <button className="navbar__btn-profile" aria-label="Perfil">
            <User />
          </button>
        </div>
      </nav>

      {/* Hero placeholder — remove this once you add the real hero section */}
      <div className="hero-placeholder" />
    </>
  );
};

export default Navbar;