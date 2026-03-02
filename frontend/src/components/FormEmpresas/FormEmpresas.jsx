import React, { useState } from 'react';
import Swal from "sweetalert2";
import React from 'react';
import "./FormEmpresas.css";

function FormEmpresas() {
  return (
    <div className="zfem-wrapper">
      <div className="zfem-card">

        <div className="zfem-logo">L</div>
        <h2 className="zfem-title">Registro de Empresa</h2>
        <p className="zfem-subtitle">Completa el formulario para registrar tu empresa o institución</p>

        <form className="zfem-form">

          <div className="zfem-group">
            <label>Nombre de la empresa o institución *</label>
            <input
              type="text"
              name="nombre"
              placeholder="Escribe el nombre"
              required
            />
          </div>

          <div className="zfem-group">
            <label>Descripción *</label>
            <textarea
              name="descripcion"
              placeholder="Describe brevemente tu empresa o institución"
              required
              rows={4}
            />
          </div>

          <div className="zfem-group">
            <label>Email de contacto *</label>
            <input
              type="email"
              name="email"
              placeholder="Escribe el correo de contacto"
              required
            />
          </div>

          <div className="zfem-options">
            <label className="zfem-remember">
              <input type="checkbox" name="consentimiento" />
              <span>Acepto los <a href="/terminos" target="_blank" rel="noreferrer" className="zfem-link">Términos y Condiciones</a> y la <a href="/privacidad" target="_blank" rel="noreferrer" className="zfem-link">Política de Privacidad</a> *</span>
            </label>
          </div>

          <button type="submit" className="zfem-button">
            Enviar solicitud de registro
          </button>

        </form>
      </div>
    </div>
  );
}

export default FormEmpresas; 