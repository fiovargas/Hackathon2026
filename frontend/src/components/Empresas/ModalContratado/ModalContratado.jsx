import React, { useState } from 'react';
import './ModalContratado.css';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

function ModalContratado({ isOpen, onClose, onConfirmar, candidatoNombre = '', puesto = '' }) {
  const [formData, setFormData] = useState({
    fechaInicio: '',
    salario: '',
    tipoContrato: '',
    notas: '',
    notificar: true
  });

  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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

    if (!formData.fechaInicio.trim()) {
      nuevosErrores.fechaInicio = 'La fecha de inicio es requerida';
    }
    if (!formData.tipoContrato) {
      nuevosErrores.tipoContrato = 'El tipo de contrato es requerido';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleConfirmar = () => {
    if (validarFormulario()) {
      onConfirmar(formData);
      setFormData({
        fechaInicio: '',
        salario: '',
        tipoContrato: '',
        notas: '',
        notificar: true
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-contratado-overlay">
      <div className="modal-contratado">
        {/* Header */}
        <div className="modal-contratado-header">
          <div className="header-content">
            <CheckCircle size={28} className="header-icon" />
            <div>
              <h2>Marcar como Contratado</h2>
              <p className="candidato-info">{candidatoNombre}</p>
              <p className="puesto-info">{puesto}</p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Advertencia */}
        <div className="modal-advertencia">
          <AlertCircle size={18} />
          <p>Esta acción notificará al candidato sobre su contratación y lo marcará como ocupado en la plataforma.</p>
        </div>

        {/* Formulario */}
        <div className="modal-contratado-content">
          <div className="form-group">
            <label htmlFor="fechaInicio">Fecha de Inicio *</label>
            <input
              type="date"
              id="fechaInicio"
              name="fechaInicio"
              value={formData.fechaInicio}
              onChange={handleChange}
              className={errores.fechaInicio ? 'error' : ''}
            />
            {errores.fechaInicio && (
              <span className="error-message">{errores.fechaInicio}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="tipoContrato">Tipo de Contrato *</label>
            <select
              id="tipoContrato"
              name="tipoContrato"
              value={formData.tipoContrato}
              onChange={handleChange}
              className={errores.tipoContrato ? 'error' : ''}
            >
              <option value="">Selecciona un tipo</option>
              <option value="indefinido">Plazo Indefinido</option>
              <option value="plazo-fijo">Plazo Fijo</option>
              <option value="practicante">Practicante</option>
              <option value="temporal">Temporal</option>
              <option value="contratista">Contratista</option>
            </select>
            {errores.tipoContrato && (
              <span className="error-message">{errores.tipoContrato}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="salario">Salario / Remuneración</label>
            <input
              type="text"
              id="salario"
              name="salario"
              value={formData.salario}
              onChange={handleChange}
              placeholder="Ej: $1500 - $2000"
            />
          </div>

          <div className="form-group full">
            <label htmlFor="notas">Notas Adicionales</label>
            <textarea
              id="notas"
              name="notas"
              value={formData.notas}
              onChange={handleChange}
              placeholder="Agrega cualquier información relevante (horario, beneficios, etc.)"
              rows="4"
            />
          </div>

          <div className="form-checkbox">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="notificar"
                checked={formData.notificar}
                onChange={handleChange}
              />
              <span>Notificar al candidato por email sobre su contratación</span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="modal-contratado-footer">
          <button className="btn-cancelar" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-confirmar" onClick={handleConfirmar}>
            <FiCheckCircle size={18} />
            Confirmar Contratación
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalContratado;