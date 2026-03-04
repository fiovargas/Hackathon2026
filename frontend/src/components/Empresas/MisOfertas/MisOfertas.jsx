import React, { useState } from 'react';
import './MisOfertas.css';
import { Edit2, X, Eye, Download, Users } from 'lucide-react';
import FormularioVacante from '../FormularioVacante/FormularioVacante';

function MisOfertas() {
  const [ofertas, setOfertas] = useState([
    {
      id: 1,
      titulo: 'Ingeniero de Calidad',
      area: 'Ingeniería Industrial',
      modalidad: 'Tiempo Completo',
      nivelAcademico: 'Licenciatura',
      fechaPublicacion: '2024-05-15',
      estado: 'activa',
      postulaciones: 12,
      vistas: 156
    },
    {
      id: 2,
      titulo: 'Técnico de Mantenimiento',
      area: 'Mantenimiento',
      modalidad: 'Tiempo Completo',
      nivelAcademico: 'Técnico',
      fechaPublicacion: '2024-05-10',
      estado: 'activa',
      postulaciones: 8,
      vistas: 98
    },
    {
      id: 3,
      titulo: 'Practicante de Ingeniería',
      area: 'Ingeniería Industrial',
      modalidad: 'Practicante',
      nivelAcademico: 'Diplomado',
      fechaPublicacion: '2024-05-01',
      estado: 'activa',
      postulaciones: 24,
      vistas: 312
    },
    {
      id: 4,
      titulo: 'Operario de Producción',
      area: 'Producción',
      modalidad: 'Tiempo Completo',
      nivelAcademico: 'Educación Secundaria',
      fechaPublicacion: '2024-04-28',
      estado: 'cerrada',
      postulaciones: 15,
      vistas: 204
    },
    {
      id: 5,
      titulo: 'Supervisor de Calidad',
      area: 'Calidad',
      modalidad: 'Tiempo Completo',
      nivelAcademico: 'Licenciatura',
      fechaPublicacion: '2024-04-20',
      estado: 'cerrada',
      postulaciones: 6,
      vistas: 87
    },
  ]);

  const [filtroEstado, setFiltroEstado] = useState('todas');
  const [formularioAberto, setFormularioAberto] = useState(false);
  const [ofertaEditando, setOfertaEditando] = useState(null);
  const [vistaActual, setVistaActual] = useState('grid');

  const ofertasFiltradas = filtroEstado === 'todas'
    ? ofertas
    : ofertas.filter(o => o.estado === filtroEstado);

  const handleAbrirFormulario = (oferta = null) => {
    setOfertaEditando(oferta);
    setFormularioAberto(true);
  };

  const handleCerrarFormulario = () => {
    setFormularioAberto(false);
    setOfertaEditando(null);
  };

  const handleGuardarOferta = (datosOferta) => {
    if (ofertaEditando) {
      // Editar
      setOfertas(ofertas.map(o =>
        o.id === ofertaEditando.id
          ? { ...o, ...datosOferta }
          : o
      ));
    } else {
      // Crear
      const nuevaOferta = {
        id: Math.max(...ofertas.map(o => o.id), 0) + 1,
        ...datosOferta,
        fechaPublicacion: new Date().toISOString().split('T')[0],
        estado: 'activa',
        postulaciones: 0,
        vistas: 0
      };
      setOfertas([nuevaOferta, ...ofertas]);
    }
    handleCerrarFormulario();
  };

  const handleCerrarOferta = (id) => {
    if (window.confirm('¿Está seguro que desea cerrar esta oferta?')) {
      setOfertas(ofertas.map(o =>
        o.id === id
          ? { ...o, estado: 'cerrada' }
          : o
      ));
    }
  };

  const handleEliminarOferta = (id) => {
    if (window.confirm('¿Está seguro que desea eliminar esta oferta? Esta acción no puede deshacerse.')) {
      setOfertas(ofertas.filter(o => o.id !== id));
    }
  };

  const handleDescargarPostulantes = (id) => {
    alert(`Descargando postulantes de la oferta ${id} en Excel`);
  };

  const handleVerPostulantes = (id) => {
    alert(`Ver postulantes de la oferta ${id}`);
  };

  return (
    <div className="mis-ofertas-container">
      {/* Header */}
      <div className="ofertas-header">
        <div className="ofertas-titulo">
          <h2>Vacantes</h2>
          <p className="contador">{ofertasFiltradas.length} vacante{ofertasFiltradas.length !== 1 ? 's' : ''}</p>
        </div>
        <button className="btn-publicar" onClick={() => handleAbrirFormulario()}>
          + Publicar Nueva Vacante
        </button>
      </div>

      {/* Filtros */}
      <div className="filtros-ofertas">
        <div className="filtros-botones">
          {['todas', 'activa', 'cerrada'].map((filtro) => (
            <button
              key={filtro}
              className={`filtro-btn ${filtroEstado === filtro ? 'activo' : ''}`}
              onClick={() => setFiltroEstado(filtro)}
            >
              {filtro === 'todas' && 'Todas'}
              {filtro === 'activa' && 'Activas'}
              {filtro === 'cerrada' && 'Cerradas'}
            </button>
          ))}
        </div>

        <div className="vista-toggle">
          <button
            className={`toggle-btn ${vistaActual === 'grid' ? 'activo' : ''}`}
            onClick={() => setVistaActual('grid')}
            title="Vista de Grid"
          >
            ⊞
          </button>
          <button
            className={`toggle-btn ${vistaActual === 'lista' ? 'activo' : ''}`}
            onClick={() => setVistaActual('lista')}
            title="Vista de Lista"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Contenido */}
      {ofertasFiltradas.length > 0 ? (
        <div className={`ofertas-contenido vista-${vistaActual}`}>
          {vistaActual === 'grid' ? (
            // Grid View
            <div className="ofertas-grid">
              {ofertasFiltradas.map((oferta) => (
                <div key={oferta.id} className={`oferta-card ${oferta.estado}`}>
                  {/* Etiqueta de estado */}
                  <div className={`estado-badge ${oferta.estado}`}>
                    {oferta.estado === 'activa' ? 'Activa' : 'Cerrada'}
                  </div>

                  {/* Contenido */}
                  <div className="oferta-content">
                    <h3>{oferta.titulo}</h3>
                    <p className="area">{oferta.area}</p>

                    <div className="oferta-details">
                      <span className="detail">
                        <strong>{oferta.modalidad}</strong>
                      </span>
                      <span className="detail">
                        {oferta.nivelAcademico}
                      </span>
                    </div>

                    <div className="oferta-stats">
                      <div className="stat">
                        <span className="stat-numero">{oferta.vistas}</span>
                        <span className="stat-label">Vistas</span>
                      </div>
                      <div className="stat">
                        <span className="stat-numero">{oferta.postulaciones}</span>
                        <span className="stat-label">Postulaciones</span>
                      </div>
                    </div>

                    <p className="fecha">Publicado: {new Date(oferta.fechaPublicacion).toLocaleDateString()}</p>
                  </div>

                  {/* Acciones */}
                  <div className="oferta-acciones">
                    <button
                      className="accion-btn ver"
                      title="Ver postulantes"
                      onClick={() => handleVerPostulantes(oferta.id)}
                    >
                      <Users size={16} />
                      <span>Ver ({oferta.postulaciones})</span>
                    </button>
                    <button
                      className="accion-btn descargar"
                      title="Descargar postulantes"
                      onClick={() => handleDescargarPostulantes(oferta.id)}
                    >
                      <Download size={16} />
                    </button>
                    <button
                      className="accion-btn editar"
                      title="Editar"
                      onClick={() => handleAbrirFormulario(oferta)}
                    >
                      <Edit2 size={16} />
                    </button>
                    {oferta.estado === 'activa' ? (
                      <button
                        className="accion-btn cerrar"
                        title="Cerrar oferta"
                        onClick={() => handleCerrarOferta(oferta.id)}
                      >
                        <X size={16} />
                      </button>
                    ) : (
                      <button
                        className="accion-btn eliminar"
                        title="Eliminar"
                        onClick={() => handleEliminarOferta(oferta.id)}
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Lista View
            <div className="ofertas-lista">
              <table className="tabla-ofertas">
                <thead>
                  <tr>
                    <th>TÍTULO</th>
                    <th>ÁREA</th>
                    <th>MODALIDAD</th>
                    <th>ESTADO</th>
                    <th>VISTAS</th>
                    <th>POSTULACIONES</th>
                    <th>FECHA</th>
                    <th>ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {ofertasFiltradas.map((oferta) => (
                    <tr key={oferta.id}>
                      <td className="titulo">{oferta.titulo}</td>
                      <td>{oferta.area}</td>
                      <td>{oferta.modalidad}</td>
                      <td>
                        <span className={`estado-badge ${oferta.estado}`}>
                          {oferta.estado === 'activa' ? 'Activa' : 'Cerrada'}
                        </span>
                      </td>
                      <td className="numero">{oferta.vistas}</td>
                      <td className="numero">{oferta.postulaciones}</td>
                      <td className="fecha">{new Date(oferta.fechaPublicacion).toLocaleDateString()}</td>
                      <td>
                        <div className="tabla-acciones">
                          <button
                            className="accion-mini"
                            title="Ver postulantes"
                            onClick={() => handleVerPostulantes(oferta.id)}
                          >
                            <Users size={14} />
                          </button>
                          <button
                            className="accion-mini"
                            title="Descargar"
                            onClick={() => handleDescargarPostulantes(oferta.id)}
                          >
                            <Download size={14} />
                          </button>
                          <button
                            className="accion-mini"
                            title="Editar"
                            onClick={() => handleAbrirFormulario(oferta)}
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            className="accion-mini"
                            title={oferta.estado === 'activa' ? 'Cerrar' : 'Eliminar'}
                            onClick={() => oferta.estado === 'activa'
                              ? handleCerrarOferta(oferta.id)
                              : handleEliminarOferta(oferta.id)}
                          >
                            {oferta.estado === 'activa' ? <X size={14} /> : '🗑️'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <div className="sin-ofertas">
          <div className="sin-ofertas-content">
            <p className="sin-ofertas-titulo">No hay ofertas para mostrar</p>
            <p className="sin-ofertas-desc">
              {filtroEstado === 'todas'
                ? 'Comienza publicando tu primera vacante'
                : `No hay vacantes ${filtroEstado}`}
            </p>
            {filtroEstado === 'todas' && (
              <button className="btn-publicar-grande" onClick={() => handleAbrirFormulario()}>
                + Publicar Primera Vacante
              </button>
            )}
          </div>
        </div>
      )}

      {/* Formulario Modal */}
      <FormularioVacante
        isOpen={formularioAberto}
        onClose={handleCerrarFormulario}
        onSave={handleGuardarOferta}
        vacante={ofertaEditando}
      />
    </div>
  );
}

export default MisOfertas;