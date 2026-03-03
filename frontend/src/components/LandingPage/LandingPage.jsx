import React from 'react';
import { Search, MapPin, Building2, ArrowRight, Star, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { companies, jobs } from "../../data/mockData"; 
import './LandingPage.css'; // Importamos el CSS

const LandingPage = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-gradient" />
        <div className="hero-content">
          <div className="hero-text">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="hero-title"
            >
              Bolsa de Empleo <br />
              <span className="highlight">Zona Franca La Lima</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="hero-subtitle"
            >
              Conectamos el mejor talento de Cartago con las empresas multinacionales más innovadoras del país.
            </motion.p>

            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="search-bar"
            >
              <div className="search-input">
                <Search className="icon" />
                <input type="text" placeholder="Puesto, empresa o palabra clave" />
              </div>
              <div className="search-location">
                <MapPin className="icon" />
                <select>
                  <option>La Lima, Cartago</option>
                  <option>Remoto</option>
                  <option>Híbrido</option>
                </select>
              </div>
              <button className="search-button">Buscar Empleo</button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          {[ 
            { label: 'Ofertas Activas', value: '150+', icon: TrendingUp },
            { label: 'Empresas', value: '30+', icon: Building2 },
            { label: 'Candidatos', value: '5k+', icon: Users },
            { label: 'Contrataciones', value: '800+', icon: Star },
          ].map((stat, i) => (
            <div key={i} className="stat-card">
              <div className="stat-icon">
                <stat.icon />
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Companies */}
      <section className="featured-companies">
        <div className="section-header">
          <div>
            <h2>Empresas Destacadas</h2>
            <p>Líderes mundiales operando en La Lima</p>
          </div>
          <Link to="/empresas" className="see-all">
            Ver todas <ArrowRight />
          </Link>
        </div>
        <div className="companies-grid">
          {companies.map((company) => (
            <motion.div key={company.id} whileHover={{ y: -5 }} className="company-card">
              <img src={company.logo} alt={company.name} referrerPolicy="no-referrer" />
              <h3>{company.name}</h3>
              <p className="company-sector">{company.sector}</p>
              <p className="company-desc">{company.description}</p>
              <Link to={`/empresas/${company.id}`} className="company-link">
                Ver empleos
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Latest Jobs */}
      <section className="latest-jobs">
        <div className="section-header">
          <div>
            <h2>Últimas Ofertas</h2>
            <p>Encuentra tu próximo desafío profesional</p>
          </div>
          <Link to="/empleos" className="see-all">
            Ver todas <ArrowRight />
          </Link>
        </div>
        <div className="jobs-list">
          {jobs.slice(0, 4).map((job) => (
            <div key={job.id} className="job-card">
              <div className="job-info">
                <div className="job-icon">
                  <Building2 />
                </div>
                <div>
                  <h3>{job.title}</h3>
                  <div className="job-details">
                    <span><Building2 /> {job.companyName}</span>
                    <span><MapPin /> {job.location}</span>
                    <span className="job-type">{job.type}</span>
                  </div>
                </div>
              </div>
              <div className="job-action">
                <span>{job.postedAt}</span>
                <button>Aplicar</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>¿Listo para dar el siguiente paso?</h2>
        <p>Únete a miles de profesionales que ya han encontrado su carrera ideal en Zona Franca La Lima.</p>
        <div className="cta-buttons">
          <Link to="/registro" className="cta-primary">Crear mi Perfil</Link>
          <Link to="/empleos" className="cta-secondary">Explorar Empleos</Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;