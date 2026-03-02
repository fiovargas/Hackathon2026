import React, { useState } from 'react';
import Swal from "sweetalert2";
import "./FormEmpresas.css";

function FormEmpresas() {

  const [datos, setDatos] = useState({
    nombre: '',
    descripcion: '',
    email: '',
    consentimiento: false,
  });

  const [cargando, setCargando] = useState(false);
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDatos({ ...datos, [name]: type === 'checkbox' ? checked : value });
    if (errores[name]) {
      setErrores({ ...errores, [name]: '' });
    }
  };

  const validar = () => {
    const erroresTemp = {};
    const nombre = datos.nombre.trim();
    const descripcion = datos.descripcion.trim();
    const correo = datos.email.trim();
    const consentimiento = datos.consentimiento;

    // Validar campos vacíos
    if (!nombre) erroresTemp.nombre = "El nombre es obligatorio";
    if (!descripcion) erroresTemp.descripcion = "La descripción es obligatoria";
    if (!correo) erroresTemp.email = "El email es obligatorio";
    if (!consentimiento) erroresTemp.consentimiento = "Debes aceptar los términos y condiciones";

    // Validar longitud mínima
    if (nombre && nombre.length < 3) {
      erroresTemp.nombre = "El nombre debe tener mínimo 3 caracteres";
    }
    if (descripcion && descripcion.length < 10) {
      erroresTemp.descripcion = "La descripción debe tener mínimo 10 caracteres";
    }

    // Validar email
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (correo && !regexEmail.test(correo)) {
      erroresTemp.email = "El email no es válido";
    }

    setErrores(erroresTemp);
    return Object.keys(erroresTemp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validar()) {
      Swal.fire("Datos incompletos o inválidos", "Revisa los campos con error", "error");
      return;
    }

    setCargando(true);

    try {
      const datosEnvio = {
        nombre: datos.nombre.trim(),
        descripcion: datos.descripcion.trim(),
        email: datos.email.trim().toLowerCase(),
        consentimiento: datos.consentimiento,
      };

      await registerEmpresa(datosEnvio);

      await Swal.fire({
        title: "Solicitud enviada",
        text: "Tu solicitud fue recibida. Un administrador la revisará y te notificará por correo.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });

      setDatos({
        nombre: '',
        descripcion: '',
        email: '',
        consentimiento: false,
      });
      setErrores({});

    } catch (error) {
      const errorMsg = error.response?.data?.errores || error.message;
      Swal.fire({
        title: "Error al enviar la solicitud",
        html: `<p>${JSON.stringify(errorMsg)}</p>`,
        icon: "error",
      });
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="container">
      <h2>Registro de Empresa</h2>

      <div className="form-container">
        <form onSubmit={handleSubmit}>

          <div>
            <label>Nombre de la empresa o institución: *</label>
            <input
              type="text"
              name="nombre"
              placeholder="Escribe el nombre"
              value={datos.nombre}
              onChange={handleChange}
              disabled={cargando}
              required
            />
            {errores.nombre && <span className="error">{errores.nombre}</span>}
          </div>

          <div>
            <label>Descripción: *</label>
            <textarea
              name="descripcion"
              placeholder="Describe brevemente tu empresa o institución"
              value={datos.descripcion}
              onChange={handleChange}
              disabled={cargando}
              required
              rows={4}
            />
            {errores.descripcion && <span className="error">{errores.descripcion}</span>}
          </div>

          <div>
            <label>Email de contacto: *</label>
            <input
              type="email"
              name="email"
              placeholder="Escribe el correo de contacto"
              value={datos.email}
              onChange={handleChange}
              disabled={cargando}
              required
            />
            {errores.email && <span className="error">{errores.email}</span>}
          </div>

          <div>
            <label>
              <input
                type="checkbox"
                name="consentimiento"
                checked={datos.consentimiento}
                onChange={handleChange}
                disabled={cargando}
              />
              {' '}Acepto los <a href="/terminos" target="_blank" rel="noreferrer">Términos y Condiciones</a> y la <a href="/privacidad" target="_blank" rel="noreferrer">Política de Privacidad</a> *
            </label>
            {errores.consentimiento && <span className="error">{errores.consentimiento}</span>}
          </div>

          <br />
          <button type="submit" disabled={cargando}>
            {cargando ? 'Enviando solicitud...' : 'Enviar solicitud de registro'}
          </button>

        </form>
      </div>
    </div>
  );
}

export default FormEmpresas;