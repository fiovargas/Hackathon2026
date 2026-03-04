import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import LogoLima from '../../assets/LogoLima.png';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-grid">

          {/* Marca */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img 
                src= {LogoLima}  
                alt="Logo La Lima" 
                className="navbar-icon"
              />
              <span className="footer-title">
                Bolsa de empleo <span className="footer-title-highlight"> La Lima</span>
              </span>
            </Link>
            <p>
              No somos solo un servicio; somos tu socio en innovación.
              La plataforma oficial de empleo para el parque industrial más importante de Cartago, conectando talento local con oportunidades globales.
            </p>
          </div>

          {/* Plataforma */}
          <div>
            <h4>Plataforma</h4>
            <ul>
              <li><Link to="/Ofertas">Buscar Empleos</Link></li>
              <li><Link to="/empresas">Empresas</Link></li>
              <li><Link to="/register">Crear Cuenta</Link></li>
              <li><Link to="/login">Entrar a la aplicación</Link></li>
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h4>Soporte</h4>
            <ul>
              <li><a href="#">Sobre Nosotros</a></li>
              <li><a href="#">Preguntas Frecuentes</a></li>
              <li><a href="#">Contacto</a></li>
              <li><a href="#">Privacidad</a></li>
            </ul>
          </div>

        </div>

        {/* Footer inferior */}
        <div className="footer-bottom">
          <p>
            © 2026 Bolsa de Empleo Zona Franca La Lima. Todos los derechos reservados.
          </p>
          <div className="footer-social">
            <a href="#">LinkedIn</a>
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
            <a href="#">WhatsApp</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;