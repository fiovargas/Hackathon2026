import React, { useState } from 'react';
import './FormularioVacante.css';
import { X, Save, AlertCircle } from 'lucide-react';

function FormularioVacante({ isOpen, onClose, onSave, vacante = null }) {
  const [formData, setFormData] = useState(vacante || {
    titulo: '',
    descripcion: '',
    area: '',
    nivelAcademico: '',
    salario: '',
    modalidad: '',
    duracion: '',
    requisitos: '',
    beneficios: '',
    responsabilidades: '',
    contacto: '',
    estado: 'activa'
  });

  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error si existe
    if (errores[name]) {
      setErrores(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    
    if (!formData.titulo.trim()) {
      nuevosErrores.titulo = 'El título es requerido';
    }
    if (!formData.descripcion.trim()) {
      nuevosErrores.descripcion = 'La descripción es requerida';
    }
    if (!formData.area) {
      nuevosErrores.area = 'El área es requerida';
    }
    if (!formData.nivelAcademico) {
      nuevosErrores.nivelAcademico = 'El nivel académico es requerido';
    }
    if (!formData.modalidad) {
      nuevosErrores.modalidad = 'La modalidad es requerida';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validarFormulario()) {
      onSave(formData);
      setFormData({
        titulo: '',
        descripcion: '',
        area: '',
        nivelAcademico: '',
        salario: '',
        modalidad: '',
        duracion: '',
        requisitos: '',
        beneficios: '',
        responsabilidades: '',
        contacto: '',
        estado: 'activa'
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="formulario-vacante-overlay">
      <div className="formulario-vacante-modal">
        {/* Header */}
        <div className="modal-header">
          <h2>{vacante ? 'Editar Vacante' : 'Publicar Nueva Vacante'}</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="formulario-vacante">
          <div className="form-section">
            <h3>Información Básica</h3>
            
            <div className="form-group full">
              <label htmlFor="titulo">Título de la Vacante *</label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                placeholder="Ej: Ingeniero de Calidad"
                className={errores.titulo ? 'error' : ''}
              />
              {errores.titulo && <span className="error-message">{errores.titulo}</span>}
            </div>

            <div className="form-group full">
              <label htmlFor="descripcion">Descripción General *</label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Describe brevemente la vacante y sus principales funciones"
                rows="4"
                className={errores.descripcion ? 'error' : ''}
              />
              {errores.descripcion && <span className="error-message">{errores.descripcion}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="area">Área de Trabajo *</label>
                <select
                  id="area"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  className={errores.area ? 'error' : ''}
                >
                  <option value="">Selecciona un área</option>
                  <option value="ingenieria">Ingeniería Industrial</option>
                  <option value="ingenieria-mecanica">Ingeniería Mecánica</option>
                  <option value="produccion">Producción</option>
                  <option value="calidad">Calidad</option>
                  <option value="rrhh">Recursos Humanos</option>
                  <option value="ventas">Ventas</option>
                  <option value="admin">Administración</option>
                  <option value="otro">Otro</option>
                </select>
                {errores.area && <span className="error-message">{errores.area}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="nivelAcademico">Nivel Académico Requerido *</label>
                <select
                  id="nivelAcademico"
                  name="nivelAcademico"
                  value={formData.nivelAcademico}
                  onChange={handleChange}
                  className={errores.nivelAcademico ? 'error' : ''}
                >
                  <option value="">Selecciona un nivel</option>
                  <option value="primaria">Educación Primaria</option>
                  <option value="secundaria">Educación Secundaria</option>
                  <option value="tecnico">Técnico</option>
                  <option value="diplomado">Diplomado</option>
                  <option value="licenciatura">Licenciatura</option>
                  <option value="postgrado">Postgrado</option>
                </select>
                {errores.nivelAcademico && <span className="error-message">{errores.nivelAcademico}</span>}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Detalles de la Oferta</h3>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="modalidad">Modalidad *</label>
                <select
                  id="modalidad"
                  name="modalidad"
                  value={formData.modalidad}
                  onChange={handleChange}
                  className={errores.modalidad ? 'error' : ''}
                >
                  <option value="">Selecciona modalidad</option>
                  <option value="tiempo-completo">Tiempo Completo</option>
                  <option value="medio-tiempo">Medio Tiempo</option>
                  <option value="practicante">Practicante</option>
                  <option value="contratista">Contratista</option>
                </select>
                {errores.modalidad && <span className="error-message">{errores.modalidad}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="duracion">Duración (meses)</label>
                <input
                  type="number"
                  id="duracion"
                  name="duracion"
                  value={formData.duracion}
                  onChange={handleChange}
                  placeholder="Ej: 6"
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="salario">Rango Salarial</label>
                <input
                  type="text"
                  id="salario"
                  name="salario"
                  value={formData.salario}
                  onChange={handleChange}
                  placeholder="Ej: $1000 - $1500"
                />
              </div>
            </div>

            <div className="form-group full">
              <label htmlFor="responsabilidades">Responsabilidades Principales</label>
              <textarea
                id="responsabilidades"
                name="responsabilidades"
                value={formData.responsabilidades}
                onChange={handleChange}
                placeholder="Lista las responsabilidades principales del puesto"
                rows="3"
              />
            </div>

            <div className="form-group full">
              <label htmlFor="requisitos">Requisitos</label>
              <textarea
                id="requisitos"
                name="requisitos"
                value={formData.requisitos}
                onChange={handleChange}
                placeholder="Lista los requisitos necesarios para el puesto"
                rows="3"
              />
            </div>

            <div className="form-group full">
              <label htmlFor="beneficios">Beneficios</label>
              <textarea
                id="beneficios"
                name="beneficios"
                value={formData.beneficios}
                onChange={handleChange}
                placeholder="Describe los beneficios que ofrece la empresa"
                rows="2"
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Contacto</h3>

            <div className="form-group full">
              <label htmlFor="contacto">Persona de Contacto / Email</label>
              <input
                type="email"
                id="contacto"
                name="contacto"
                value={formData.contacto}
                onChange={handleChange}
                placeholder="contacto@empresa.com"
              />
            </div>
          </div>

          {/* Botones */}
          <div className="modal-footer">
            <button type="button" className="btn-cancelar" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-guardar">
              <Save size={18} />
              {vacante ? 'Guardar Cambios' : 'Publicar Vacante'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormularioVacante;