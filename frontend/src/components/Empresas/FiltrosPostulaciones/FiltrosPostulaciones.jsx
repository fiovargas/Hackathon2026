import React, { useState } from 'react';
import './FiltrosPostulaciones.css';
import { X, RotateCcw } from 'lucide-react';

function FiltrosPostulaciones({ isOpen, onClose, onAplicarFiltros }) {
  const [filtros, setFiltros] = useState({
    estado: [],
    area: [],
    nivelAcademico: [],
    modalidad: [],
    fecha: 'todos',
    visto: 'todos',
    etiquetas: []
  });

  const estadosDisponibles = [
    { id: 'pendiente', label: 'Pendiente' },
    { id: 'revision', label: 'En Revisión' },
    { id: 'entrevista', label: 'Entrevista' },
    { id: 'finalista', label: 'Finalista' },
    { id: 'rechazado', label: 'Rechazado' },
    { id: 'contratado', label: 'Contratado' }
  ];

  const areasDisponibles = [
    { id: 'ingenieria', label: 'Ingeniería Industrial' },
    { id: 'ingenieria-mecanica', label: 'Ingeniería Mecánica' },
    { id: 'produccion', label: 'Producción' },
    { id: 'calidad', label: 'Calidad' },
    { id: 'rrhh', label: 'Recursos Humanos' },
    { id: 'mantenimiento', label: 'Mantenimiento' }
  ];

  const nivelesAcademicos = [
    { id: 'primaria', label: 'Primaria' },
    { id: 'secundaria', label: 'Secundaria' },
    { id: 'tecnico', label: 'Técnico' },
    { id: 'diplomado', label: 'Diplomado' },
    { id: 'licenciatura', label: 'Licenciatura' },
    { id: 'postgrado', label: 'Postgrado' }
  ];

  const modalidades = [
    { id: 'tiempo-completo', label: 'Tiempo Completo' },
    { id: 'medio-tiempo', label: 'Medio Tiempo' },
    { id: 'practicante', label: 'Practicante' },
    { id: 'contratista', label: 'Contratista' }
  ];

  const etiquetasDisponibles = [
    { id: 'finalista', label: 'Finalista' },
    { id: 'entrevistado', label: 'Entrevistado' },
    { id: 'contratar', label: 'Contratar' },
    { id: 'promisorio', label: 'Promisorio' },
    { id: 'seguimiento', label: 'Seguimiento' }
  ];

  const handleToggleCheckbox = (grupo, id) => {
    setFiltros(prev => ({
      ...prev,
      [grupo]: prev[grupo].includes(id)
        ? prev[grupo].filter(item => item !== id)
        : [...prev[grupo], id]
    }));
  };

  const handleSelectChange = (grupo, valor) => {
    setFiltros(prev => ({
      ...prev,
      [grupo]: valor
    }));
  };

  const handleAplicarFiltros = () => {
    onAplicarFiltros(filtros);
    onClose();
  };

  const handleLimpiarFiltros = () => {
    setFiltros({
      estado: [],
      area: [],
      nivelAcademico: [],
      modalidad: [],
      fecha: 'todos',
      visto: 'todos',
      etiquetas: []
    });
  };

  const tienefiltrosActivos = filtros.estado.length > 0 ||
    filtros.area.length > 0 ||
    filtros.nivelAcademico.length > 0 ||
    filtros.modalidad.length > 0 ||
    filtros.fecha !== 'todos' ||
    filtros.visto !== 'todos' ||
    filtros.etiquetas.length > 0;

  if (!isOpen) return null;

  return (
    <div className="filtros-overlay">
      <div className="filtros-modal">
        {/* Header */}
        <div className="filtros-header">
          <h2>Filtros Avanzados</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Contenido */}
        <div className="filtros-content">
          {/* Estado */}
          <div className="filtro-seccion">
            <h3>Estado de la Postulación</h3>
            <div className="filtro-opciones">
              {estadosDisponibles.map(estado => (
                <label key={estado.id} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={filtros.estado.includes(estado.id)}
                    onChange={() => handleToggleCheckbox('estado', estado.id)}
                  />
                  <span>{estado.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Área */}
          <div className="filtro-seccion">
            <h3>Área de Trabajo</h3>
            <div className="filtro-opciones">
              {areasDisponibles.map(area => (
                <label key={area.id} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={filtros.area.includes(area.id)}
                    onChange={() => handleToggleCheckbox('area', area.id)}
                  />
                  <span>{area.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Nivel Académico */}
          <div className="filtro-seccion">
            <h3>Nivel Académico</h3>
            <div className="filtro-opciones">
              {nivelesAcademicos.map(nivel => (
                <label key={nivel.id} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={filtros.nivelAcademico.includes(nivel.id)}
                    onChange={() => handleToggleCheckbox('nivelAcademico', nivel.id)}
                  />
                  <span>{nivel.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Modalidad */}
          <div className="filtro-seccion">
            <h3>Modalidad</h3>
            <div className="filtro-opciones">
              {modalidades.map(modalidad => (
                <label key={modalidad.id} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={filtros.modalidad.includes(modalidad.id)}
                    onChange={() => handleToggleCheckbox('modalidad', modalidad.id)}
                  />
                  <span>{modalidad.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Fecha de Postulación */}
          <div className="filtro-seccion">
            <h3>Fecha de Postulación</h3>
            <select 
              value={filtros.fecha}
              onChange={(e) => handleSelectChange('fecha', e.target.value)}
              className="select-filtro"
            >
              <option value="todos">Todas las fechas</option>
              <option value="hoy">Hoy</option>
              <option value="ultima-semana">Última semana</option>
              <option value="ultimo-mes">Último mes</option>
              <option value="ultimos-3-meses">Últimos 3 meses</option>
            </select>
          </div>

          {/* Visto / No Visto */}
          <div className="filtro-seccion">
            <h3>Estado de Visualización</h3>
            <select 
              value={filtros.visto}
              onChange={(e) => handleSelectChange('visto', e.target.value)}
              className="select-filtro"
            >
              <option value="todos">Todos</option>
              <option value="visto">Visto</option>
              <option value="no-visto">No visto</option>
            </select>
          </div>

          {/* Etiquetas */}
          <div className="filtro-seccion">
            <h3>Etiquetas</h3>
            <div className="filtro-opciones">
              {etiquetasDisponibles.map(etiqueta => (
                <label key={etiqueta.id} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={filtros.etiquetas.includes(etiqueta.id)}
                    onChange={() => handleToggleCheckbox('etiquetas', etiqueta.id)}
                  />
                  <span>{etiqueta.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="filtros-footer">
          <button 
            className="btn-limpiar"
            onClick={handleLimpiarFiltros}
            disabled={!tienefiltrosActivos}
          >
            <RotateCcw size={16} />
            Limpiar Filtros
          </button>
          
          <div className="filtros-acciones">
            <button className="btn-cancelar" onClick={onClose}>
              Cancelar
            </button>
            <button className="btn-aplicar" onClick={handleAplicarFiltros}>
              Aplicar Filtros
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FiltrosPostulaciones;