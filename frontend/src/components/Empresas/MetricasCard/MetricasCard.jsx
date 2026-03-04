import React from 'react';
import './MetricasCard.css';
import { Briefcase, Users, Calendar } from 'lucide-react';

function MetricasCard({ data = {} }) {
  const defaultData = {
    ofertasActivas: {
      numero: 12,
      etiqueta: '+2 este mes',
      tipo: 'ofertas'
    },
    nuevasPostulaciones: {
      numero: 2,
      etiqueta: 'Últimas 24h',
      tipo: 'postulaciones'
    },
    entrevistasProgram: {
      numero: 5,
      etiqueta: 'Esta semana',
      tipo: 'entrevistas'
    }
  };

  const metricas = { ...defaultData, ...data };

  return (
    <div className="metricas-container">
      {/* Ofertas Activas */}
      <div className="metrica-card ofertas">
        <div className="metrica-header">
          <h3>Ofertas Activas</h3>
          <Briefcase className="metrica-icon" size={20} />
        </div>
        <div className="metrica-content">
          <p className="metrica-numero">{metricas.ofertasActivas.numero}</p>
          <p className="metrica-etiqueta">{metricas.ofertasActivas.etiqueta}</p>
        </div>
      </div>

      {/* Nuevas Postulaciones */}
      <div className="metrica-card postulaciones">
        <div className="metrica-header">
          <h3>Nuevas Postulaciones</h3>
          <Users className="metrica-icon" size={20} />
        </div>
        <div className="metrica-content">
          <p className="metrica-numero">{metricas.nuevasPostulaciones.numero}</p>
          <p className="metrica-etiqueta">{metricas.nuevasPostulaciones.etiqueta}</p>
        </div>
      </div>

      {/* Entrevistas Programadas */}
      <div className="metrica-card entrevistas">
        <div className="metrica-header">
          <h3>Entrevistas Programadas</h3>
          <Calendar className="metrica-icon" size={20} />
        </div>
        <div className="metrica-content">
          <p className="metrica-numero">{metricas.entrevistasProgram.numero}</p>
          <p className="metrica-etiqueta">{metricas.entrevistasProgram.etiqueta}</p>
        </div>
      </div>
    </div>
  );
}

export default MetricasCard;