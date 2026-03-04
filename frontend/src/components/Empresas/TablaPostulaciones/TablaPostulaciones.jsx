import React, { useState } from 'react';
import './TablaPostulaciones.css';
import { Eye, Tag, Download, CheckCircle, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

function TablaPostulaciones({ onFilterClick }) {
  const [postulaciones, setPostulaciones] = useState([
    {
      id: 1,
      nombre: 'Juan Pérez',
      email: 'juan.perez@example.com',
      puesto: 'Ingeniero de Calidad',
      area: 'Ingeniería Industrial',
      fecha: '2024-05-21',
      estado: 'Pendiente',
      visto: false,
      etiquetas: []
    },
    {
      id: 2,
      nombre: 'María Rodríguez',
      email: 'm.rodriguez@example.com',
      puesto: 'Ingeniero de Calidad',
      area: 'Ingeniería Mecánica',
      fecha: '2024-05-22',
      estado: 'En Revisión',
      visto: true,
      etiquetas: ['Finalista']
    },
    {
      id: 3,
      nombre: 'Carlos López',
      email: 'carlos.lopez@example.com',
      puesto: 'Técnico de Calidad',
      area: 'Técnología',
      fecha: '2024-05-20',
      estado: 'Rechazado',
      visto: true,
      etiquetas: []
    },
    {
      id: 4,
      nombre: 'Ana Martínez',
      email: 'ana.martinez@example.com',
      puesto: 'Ingeniero de Procesos',
      area: 'Ingeniería Industrial',
      fecha: '2024-05-19',
      estado: 'Entrevista',
      visto: true,
      etiquetas: ['Finalista', 'Entrevistado']
    },
    {
      id: 5,
      nombre: 'Roberto Sánchez',
      email: 'r.sanchez@example.com',
      puesto: 'Operario de Producción',
      area: 'Producción',
      fecha: '2024-05-18',
      estado: 'Contratado',
      visto: true,
      etiquetas: ['Contratado']
    },
  ]);

  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [paginaActual, setPaginaActual] = useState(1);
  const [postulacionesSeleccionadas, setPostulacionesSeleccionadas] = useState([]);

  const elementosPorPagina = 5;
  const totalPaginas = Math.ceil(postulaciones.length / elementosPorPagina);

  const postulacionesFiltradas = filtroEstado === 'todos' 
    ? postulaciones 
    : postulaciones.filter(p => p.estado === filtroEstado);

  const postulacionesPaginadas = postulacionesFiltradas.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );

  const getEstadoColor = (estado) => {
    const colores = {
      'Pendiente': 'pendiente',
      'En Revisión': 'revision',
      'Entrevista': 'entrevista',
      'Finalista': 'finalista',
      'Rechazado': 'rechazado',
      'Contratado': 'contratado'
    };
    return colores[estado] || 'pendiente';
  };

  const toggleEtiqueta = (id) => {
    // Simulación de modal de etiquetas
    alert(`Agregar/editar etiquetas para postulante ${id}`);
  };

  const descargarPerfil = (id) => {
    // Simulación de descarga
    alert(`Descargando perfil de candidato ${id}`);
  };

  const marcarContratado = (id) => {
    setPostulaciones(postulaciones.map(p => 
      p.id === id 
        ? { ...p, estado: 'Contratado', etiquetas: [...p.etiquetas, 'Contratado'] }
        : p
    ));
  };

  const verDetalle = (id) => {
    alert(`Ver detalle del candidato ${id}`);
  };

  return (
    <div className="tabla-postulaciones-container">
      {/* Header de la tabla */}
      <div className="tabla-header">
        <div className="tabla-titulo">
          <h2>Postulaciones Recientes</h2>
          <p className="contador">Mostrando {postulacionesPaginadas.length} de {postulacionesFiltradas.length} postulaciones</p>
        </div>
        <div className="tabla-acciones">
          <button className="filtro-btn" onClick={onFilterClick}>
            <Filter size={18} />
            Filtrar
          </button>
          <button className="ver-todas-btn">Ver todas</button>
        </div>
      </div>

      {/* Filtros rápidos */}
      <div className="filtros-rapidos">
        {['todos', 'Pendiente', 'En Revisión', 'Entrevista', 'Contratado'].map((filtro) => (
          <button
            key={filtro}
            className={`filtro-rapido ${filtroEstado === filtro ? 'activo' : ''}`}
            onClick={() => {
              setFiltroEstado(filtro);
              setPaginaActual(1);
            }}
          >
            {filtro === 'todos' ? 'Todos' : filtro}
          </button>
        ))}
      </div>

      {/* Tabla */}
      <div className="tabla-wrapper">
        <table className="tabla-postulaciones">
          <thead>
            <tr>
              <th>
                <input 
                  type="checkbox" 
                  onChange={(e) => {
                    if (e.target.checked) {
                      setPostulacionesSeleccionadas(postulacionesPaginadas.map(p => p.id));
                    } else {
                      setPostulacionesSeleccionadas([]);
                    }
                  }}
                />
              </th>
              <th>CANDIDATO</th>
              <th>PUESTO</th>
              <th>FECHA</th>
              <th>ESTADO</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {postulacionesPaginadas.map((postulacion) => (
              <tr key={postulacion.id} className={`${postulacion.visto ? '' : 'no-visto'}`}>
                <td>
                  <input 
                    type="checkbox"
                    checked={postulacionesSeleccionadas.includes(postulacion.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setPostulacionesSeleccionadas([...postulacionesSeleccionadas, postulacion.id]);
                      } else {
                        setPostulacionesSeleccionadas(postulacionesSeleccionadas.filter(id => id !== postulacion.id));
                      }
                    }}
                  />
                </td>
                <td>
                  <div className="candidato-cell">
                    <div className="avatar">{postulacion.nombre.charAt(0)}</div>
                    <div className="candidato-info">
                      <strong>{postulacion.nombre}</strong>
                      <p>{postulacion.email}</p>
                      <div className="etiquetas">
                        {postulacion.etiquetas.map((etiq, idx) => (
                          <span key={idx} className="etiqueta">{etiq}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="puesto-cell">
                    <strong>{postulacion.puesto}</strong>
                    <p>{postulacion.area}</p>
                  </div>
                </td>
                <td className="fecha">{postulacion.fecha}</td>
                <td>
                  <span className={`estado ${getEstadoColor(postulacion.estado)}`}>
                    {postulacion.estado}
                  </span>
                </td>
                <td>
                  <div className="acciones-cell">
                    <button 
                      className="accion-btn" 
                      title="Ver detalle"
                      onClick={() => verDetalle(postulacion.id)}
                    >
                      <Eye size={16} />
                    </button>
                    <button 
                      className="accion-btn" 
                      title="Etiquetar"
                      onClick={() => toggleEtiqueta(postulacion.id)}
                    >
                      <Tag size={16} />
                    </button>
                    <button 
                      className="accion-btn" 
                      title="Descargar perfil"
                      onClick={() => descargarPerfil(postulacion.id)}
                    >
                      <Download size={16} />
                    </button>
                    {postulacion.estado !== 'Contratado' && (
                      <button 
                        className="accion-btn contratado" 
                        title="Marcar como contratado"
                        onClick={() => marcarContratado(postulacion.id)}
                      >
                        <CheckCircle size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="paginacion">
        <button 
          className="paginacion-btn"
          disabled={paginaActual === 1}
          onClick={() => setPaginaActual(paginaActual - 1)}
        >
          <ChevronLeft size={18} />
          Anterior
        </button>
        
        <div className="paginacion-info">
          Página {paginaActual} de {totalPaginas}
        </div>

        <button 
          className="paginacion-btn"
          disabled={paginaActual === totalPaginas}
          onClick={() => setPaginaActual(paginaActual + 1)}
        >
          Siguiente
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default TablaPostulaciones;