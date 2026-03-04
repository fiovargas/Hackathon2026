import React, { useState } from 'react';
import './ModalEtiquetas.css';
import { X, Plus, Trash2 } from 'lucide-react';

function ModalEtiquetas({ isOpen, onClose, onSaveEtiquetas, candidatoNombre = '', etiquetasActuales = [] }) {
  const [etiquetas, setEtiquetas] = useState(etiquetasActuales);
  const [nuevaEtiqueta, setNuevaEtiqueta] = useState('');

  const etiquetasPredefinidas = [
    { id: 'finalista', label: 'Finalista', color: '#d5f4e6' },
    { id: 'entrevistado', label: 'Entrevistado', color: '#cce5ff' },
    { id: 'contratar', label: 'Contratar', color: '#d4edda' },
    { id: 'promisorio', label: 'Promisorio', color: '#fff3cd' },
    { id: 'seguimiento', label: 'Seguimiento', color: '#d1ecf1' },
    { id: 'rechazado', label: 'Rechazado', color: '#f8d7da' },
    { id: 'en-espera', label: 'En Espera', color: '#e2e3e5' },
  ];

  const etiquetasDisponibles = etiquetasPredefinidas.filter(
    e => !etiquetas.some(t => t.id === e.id)
  );

  const handleAgregarEtiquetaPredefinida = (etiqueta) => {
    setEtiquetas([...etiquetas, etiqueta]);
  };

  const handleAgregarEtiquetaCustom = () => {
    if (nuevaEtiqueta.trim()) {
      const etiquetaCustom = {
        id: `custom-${Date.now()}`,
        label: nuevaEtiqueta.trim(),
        color: '#f0f0f0',
        custom: true
      };
      setEtiquetas([...etiquetas, etiquetaCustom]);
      setNuevaEtiqueta('');
    }
  };

  const handleEliminarEtiqueta = (id) => {
    setEtiquetas(etiquetas.filter(e => e.id !== id));
  };

  const handleGuardar = () => {
    onSaveEtiquetas(etiquetas);
    onClose();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAgregarEtiquetaCustom();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-etiquetas-overlay">
      <div className="modal-etiquetas">
        {/* Header */}
        <div className="modal-etiquetas-header">
          <div>
            <h2>Etiquetar Postulante</h2>
            <p className="candidato-nombre">{candidatoNombre}</p>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Contenido */}
        <div className="modal-etiquetas-content">
          {/* Etiquetas Actuales */}
          <div className="etiquetas-seccion">
            <h3>Etiquetas Actuales</h3>
            {etiquetas.length > 0 ? (
              <div className="etiquetas-lista">
                {etiquetas.map((etiqueta) => (
                  <div 
                    key={etiqueta.id} 
                    className="etiqueta-item"
                    style={{ backgroundColor: etiqueta.color }}
                  >
                    <span className="etiqueta-texto">{etiqueta.label}</span>
                    <button
                      className="etiqueta-eliminar"
                      onClick={() => handleEliminarEtiqueta(etiqueta.id)}
                      title="Eliminar"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="sin-etiquetas">No hay etiquetas agregadas</p>
            )}
          </div>

          {/* Agregar Etiqueta Custom */}
          <div className="etiquetas-seccion">
            <h3>Crear Etiqueta Personalizada</h3>
            <div className="input-custom">
              <input
                type="text"
                value={nuevaEtiqueta}
                onChange={(e) => setNuevaEtiqueta(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe una nueva etiqueta"
                className="custom-input"
              />
              <button
                className="btn-agregar-custom"
                onClick={handleAgregarEtiquetaCustom}
                disabled={!nuevaEtiqueta.trim()}
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* Etiquetas Predefinidas */}
          {etiquetasDisponibles.length > 0 && (
            <div className="etiquetas-seccion">
              <h3>Etiquetas Disponibles</h3>
              <div className="etiquetas-predefinidas">
                {etiquetasDisponibles.map((etiqueta) => (
                  <button
                    key={etiqueta.id}
                    className="etiqueta-predefinida"
                    style={{ backgroundColor: etiqueta.color }}
                    onClick={() => handleAgregarEtiquetaPredefinida(etiqueta)}
                    title="Click para agregar"
                  >
                    {etiqueta.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Si todas están agregadas */}
          {etiquetasDisponibles.length === 0 && etiquetas.length > 0 && (
            <div className="etiquetas-seccion">
              <p className="todas-agregadas">Todas las etiquetas predefinidas han sido agregadas</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="modal-etiquetas-footer">
          <button className="btn-cancelar" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-guardar" onClick={handleGuardar}>
            Guardar Etiquetas
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalEtiquetas;