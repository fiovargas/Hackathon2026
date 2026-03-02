import React from "react";
import "./LoginGeneral.css";

function LoginGeneral() {
  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Iniciar Sesión</h2>

        <form className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="ejemplo@email.com" />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input type="password" placeholder="********" />
          </div>

          <button type="submit" className="login-button">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginGeneral;