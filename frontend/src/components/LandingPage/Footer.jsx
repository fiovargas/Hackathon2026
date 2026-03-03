import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        <div className="footer-grid">

          {/* Marca */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-box">L</div>
              <span>Bolsa de Empleo La Lima</span>
            </div>
            <p>
              La plataforma oficial de empleo para el parque industrial más importante de Cartago, conectando talento local con oportunidades globales.
            </p>
          </div>

          {/* Plataforma */}
          <div>
            <h4>Plataforma</h4>
            <ul>
              <li><Link to="/Ofertas">Buscar Empleos</Link></li>
              <li><Link to="/register/companies">Empresas</Link></li>
              <li><Link to="/register">Crear Cuenta</Link></li>
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h4>Soporte</h4>
            <ul>
              <li><a href="#">Ayuda</a></li>
              <li><a href="#">Contacto</a></li>
              <li><a href="#">Privacidad</a></li>
            </ul>
          </div>

        </div>

        {/* Footer inferior */}
        <div className="footer-bottom">
          <p>
            © 2024 Bolsa de Empleo Zona Franca La Lima. Todos los derechos reservados.
          </p>
          <div className="footer-social">
            <a href="#">LinkedIn</a>
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;