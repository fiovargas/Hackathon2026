import React from "react";
import { Link } from "react-router-dom";
import "./LoginGeneral.css";

function LoginGeneral() {
  return (
    <div className="zfll-login-wrapper">
      <div className="zfll-login-card">

        <div className="zfll-login-logo">L</div>

        <h2 className="zfll-login-title">Bienvenido de nuevo</h2>

        <p className="zfll-login-subtitle">
          ¿No tienes cuenta?{" "}
          <Link to="/RegisterEmpresas" className="zfll-login-link">
            Regístrate gratis
          </Link>
        </p>

        <form className="zfll-login-form">

          <div className="zfll-login-group">
            <label>Correo Electrónico</label>
            <input 
              type="email" 
              placeholder="ejemplo@email.com" 
            />
          </div>

          <div className="zfll-login-group">
            <label>Contraseña</label>
            <input 
              type="password" 
              placeholder="********" 
            />
          </div>

          <div className="zfll-login-options">
            <label className="zfll-login-remember">
              <input type="checkbox" />
              Recordarme
            </label>

            <a href="#" className="zfll-login-link">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button type="submit" className="zfll-login-button">
            Ingresar
          </button>

        </form>

        <div className="zfll-login-divider">
          <span>O continuar con</span>
        </div>

      </div>
    </div>
  );
}

export default LoginGeneral;