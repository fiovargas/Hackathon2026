import React from 'react';
import { Search, MapPin, Building2, ArrowRight, Star, TrendingUp, Users, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { companies, jobs } from "../../data/mockData";
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="hero-badge"
          >
            Plataforma Profesional La Lima
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="hero-title"
          >
            Conectamos talento de alta calidad con <span className="highlight">empresas de alto nivel</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="hero-subtitle"
          >
            Nuestro enfoque permite a los estudiantes y profesionales ganar experiencia
            mientras las empresas operando en La Lima acceden al mejor talento del mercado.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="hero-actions"
          >
            <Link to="/register" className="btn-primary">
              Comienza Ahora <ArrowRight size={20} />
            </Link>
            <Link to="/empresas" className="btn-secondary">
              Para Empresas
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          {[
            { label: 'estudiantes u operarios', value: '+2000' },
            { label: 'empresas de alto nivel', value: '+30' },
            { label: 'contrataciones exitosas', value: '+800' },
            { label: 'horas de aprendizaje', value: '+15000' },
          ].map((stat, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={i}
              className="stat-card"
            >
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="services-container">
          <div className="section-header">
            <h2>Buscamos que tu empresa y la educación crezcan</h2>
            <p>¿Quieres acceder a los mejores candidatos para tu empresa? Te mostramos nuestros servicios</p>
          </div>
          <div className="services-grid">
            <motion.div
              whileHover={{ y: -5 }}
              className="service-card"
            >
              <div className="service-icon">
                <Users size={24} />
              </div>
              <h3>Pasantías Profesionales</h3>
              <ul>
                <li><CheckCircle size={18} /> Conecta con estudiantes validados por entidades.</li>
                <li><CheckCircle size={18} /> Respaldamos: propiedad intelectual, confidencialidad.</li>
                <li><CheckCircle size={18} /> Impulsa tus proyectos con talento calificado.</li>
              </ul>
              <Link to="/Pasantias" className="btn-secondary" style={{ display: 'inline-flex', padding: '0.5rem 1.5rem', marginTop: '1rem' }}>
                Ver Pasantías
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="service-card"
            >
              <div className="service-icon">
                <TrendingUp size={24} />
              </div>
              <h3>Talento Operativo y Profesional</h3>
              <ul>
                <li><CheckCircle size={18} /> Ideal para empresas operando en el parque.</li>
                <li><CheckCircle size={18} /> Procesos de reclutamiento dirigidos a la zona.</li>
                <li><CheckCircle size={18} /> Accede al mejor talento y crece tu equipo.</li>
              </ul>
              <Link to="/Ofertas" className="btn-secondary" style={{ display: 'inline-flex', padding: '0.5rem 1.5rem', marginTop: '1rem' }}>
                Ver Ofertas
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Companies */}
      <section className="featured-companies">
        <div className="section-header">
          <h2>Empresas que promueven el crecimiento en La Lima</h2>
          <p>Estamos orgullosos de las empresas que conforman nuestro centro.</p>
        </div>
        <div className="companies-grid">
          {companies.map((company) => (
            <motion.div key={company.id} whileHover={{ y: -5 }} className="company-card">
              <img src={company.logo} alt={company.name} referrerPolicy="no-referrer" />
              <h3>{company.name}</h3>
              <p className="company-sector">{company.sector}</p>
              <p className="company-desc">{company.description}</p>
              <Link to={`/empresas/${company.id}`} className="company-link">
                Ver perfil completo
              </Link>
            </motion.div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/empresas" className="btn-primary" style={{ display: 'inline-flex' }}>
            Explorar todas las empresas <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>¿Listo para dar el siguiente paso?</h2>
          <p>Únete a miles de profesionales que ya han encontrado su carrera ideal en Zona Franca La Lima.</p>
          <div className="cta-buttons">
            <Link to="/register" className="cta-primary">
              Crear mi Perfil
            </Link>
            <Link to="/Ofertas" className="cta-secondary">
              Explorar Empleos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;