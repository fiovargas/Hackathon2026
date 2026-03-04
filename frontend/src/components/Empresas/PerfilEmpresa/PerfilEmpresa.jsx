import React, { useState } from 'react';
import './PerfilEmpresa.css';
import { Edit2, Save, X, Upload, Mail, Phone, MapPin, Globe, Users } from 'lucide-react';
import nexternLogo from '../../../assets/NexternLogo.png';

function PerfilEmpresa() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre: 'Nextern Costa Rica',
    descripcion: 'Empresa líder en dispositivos médicos de innovación',
    email: 'contacto@nextern.com',
    telefono: '+506 2104-0550',
    ubicacion: 'San José, Costa Rica',
    sitioWeb: 'www.nextern.com',
    empleados: '150+',
    industria: 'Tecnología Médica',
    fundacion: '2015',
    logo: null,
    servicios: 'Dispositivos Médicos, Consultoría Tecnológica'
  });

  const [tempFormData, setTempFormData] = useState({ ...formData });

  const handleEdit = () => {
    setIsEditing(true);
    setTempFormData({ ...formData });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempFormData({ ...formData });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setFormData({ ...tempFormData });
    setIsEditing(false);
  };

  return (
    <div className="perfil-empresa-container">
      <div className="perfil-header">
        <div>
          <h1>Perfil de Empresa</h1>
          <p>Administra la información de tu empresa</p>
        </div>
        <button
          className={`btn-edit ${isEditing ? 'editing' : ''}`}
          onClick={isEditing ? handleCancel : handleEdit}
        >
          {isEditing ? (
            <>
              <X size={18} />
              Cancelar
            </>
          ) : (
            <>
              <Edit2 size={18} />
              Editar Perfil
            </>
          )}
        </button>
      </div>

      <div className="perfil-content">
        {/* Logo y Nombre */}
        <div className="perfil-section">
          <div className="logo-section">
            <div className="logo-placeholder">
              <img src={nexternLogo} alt="Logo Empresa" className="perfil-logo-img" />
            </div>
            {isEditing && (
              <button className="btn-upload">
                <Upload size={16} />
                Cambiar Logo
              </button>
            )}
          </div>

          <div className="nombre-section">
            {isEditing ? (
              <input
                type="text"
                name="nombre"
                value={tempFormData.nombre}
                onChange={handleChange}
                className="input-nombre"
              />
            ) : (
              <h2>{formData.nombre}</h2>
            )}
            <p className="industria">{formData.industria}</p>
          </div>
        </div>

        {/* Grid de información */}
        <div className="perfil-grid">
          {/* Descripción */}
          <div className="perfil-card">
            <h3>Descripción</h3>
            {isEditing ? (
              <textarea
                name="descripcion"
                value={tempFormData.descripcion}
                onChange={handleChange}
                className="input-textarea"
                rows="3"
              />
            ) : (
              <p>{formData.descripcion}</p>
            )}
          </div>

          {/* Email */}
          <div className="perfil-card">
            <div className="card-header">
              <Mail size={18} />
              <h3>Email</h3>
            </div>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={tempFormData.email}
                onChange={handleChange}
                className="input-field"
              />
            ) : (
              <p>{formData.email}</p>
            )}
          </div>

          {/* Teléfono */}
          <div className="perfil-card">
            <div className="card-header">
              <Phone size={18} />
              <h3>Teléfono</h3>
            </div>
            {isEditing ? (
              <input
                type="tel"
                name="telefono"
                value={tempFormData.telefono}
                onChange={handleChange}
                className="input-field"
              />
            ) : (
              <p>{formData.telefono}</p>
            )}
          </div>

          {/* Ubicación */}
          <div className="perfil-card">
            <div className="card-header">
              <MapPin size={18} />
              <h3>Ubicación</h3>
            </div>
            {isEditing ? (
              <input
                type="text"
                name="ubicacion"
                value={tempFormData.ubicacion}
                onChange={handleChange}
                className="input-field"
              />
            ) : (
              <p>{formData.ubicacion}</p>
            )}
          </div>

          {/* Sitio Web */}
          <div className="perfil-card">
            <div className="card-header">
              <Globe size={18} />
              <h3>Sitio Web</h3>
            </div>
            {isEditing ? (
              <input
                type="text"
                name="sitioWeb"
                value={tempFormData.sitioWeb}
                onChange={handleChange}
                className="input-field"
              />
            ) : (
              <a href={`https://${formData.sitioWeb}`} target="_blank" rel="noopener noreferrer">
                {formData.sitioWeb}
              </a>
            )}
          </div>

          {/* Empleados */}
          <div className="perfil-card">
            <div className="card-header">
              <Users size={18} />
              <h3>Empleados</h3>
            </div>
            {isEditing ? (
              <input
                type="text"
                name="empleados"
                value={tempFormData.empleados}
                onChange={handleChange}
                className="input-field"
              />
            ) : (
              <p>{formData.empleados}</p>
            )}
          </div>

          {/* Año de Fundación */}
          <div className="perfil-card">
            <h3>Fundación</h3>
            {isEditing ? (
              <input
                type="text"
                name="fundacion"
                value={tempFormData.fundacion}
                onChange={handleChange}
                className="input-field"
              />
            ) : (
              <p>{formData.fundacion}</p>
            )}
          </div>

          {/* Servicios */}
          <div className="perfil-card full-width">
            <h3>Servicios / Productos</h3>
            {isEditing ? (
              <textarea
                name="servicios"
                value={tempFormData.servicios}
                onChange={handleChange}
                className="input-textarea"
                rows="2"
              />
            ) : (
              <p>{formData.servicios}</p>
            )}
          </div>
        </div>

        {/* Botón Guardar */}
        {isEditing && (
          <div className="perfil-footer">
            <button className="btn-guardar" onClick={handleSave}>
              <Save size={18} />
              Guardar Cambios
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PerfilEmpresa;