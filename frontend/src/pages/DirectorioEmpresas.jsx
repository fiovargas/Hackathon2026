import React, { useEffect, useState } from 'react';
import { empresasService } from '../services/empresas';
import './DirectorioEmpresas.css';

const DEFAULT_AVATAR = null;

function CompanyCard({ company }) {
  const initials = company.name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <div className='empresa-card'>
      <div className='empresa-avatar'>
        {company.image_url ? (
          <img src={company.image_url} alt={company.name} />
        ) : (
          <span className='empresa-initials'>{initials}</span>
        )}
      </div>
      <h3 className='empresa-name'>{company.name}</h3>
      {company.description ? (
        <p className='empresa-desc'>{company.description}</p>
      ) : (
        <p className='empresa-desc empresa-desc--empty'>
          Sin descripción disponible.
        </p>
      )}
    </div>
  );
}

export default function DirectorioEmpresas() {
  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    empresasService
      .getCategories()
      .then(setCategories)
      .catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    empresasService
      .getCompanies(selectedCategory)
      .then(setCompanies)
      .catch(() => setError('No se pudo cargar el directorio de empresas.'))
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  return (
    <div className='directorio-page'>
      {/* Sidebar */}
      <aside className='directorio-sidebar'>
        <h2 className='sidebar-title'>Sectores</h2>
        <ul className='sidebar-list'>
          <li>
            <button
              className={`sidebar-item${selectedCategory === null ? ' sidebar-item--active' : ''}`}
              onClick={() => setSelectedCategory(null)}
            >
              Todos
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                className={`sidebar-item${selectedCategory === cat.id ? ' sidebar-item--active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Content */}
      <main className='directorio-main'>
        <div className='directorio-header'>
          <h1 className='directorio-title'>Directorio de empresas</h1>
          <p className='directorio-subtitle'>
            {selectedCategory
              ? `Mostrando empresas del sector seleccionado`
              : 'Todas las empresas registradas'}
          </p>
        </div>

        {loading && (
          <div className='directorio-loading'>
            <div className='directorio-spinner' />
          </div>
        )}

        {!loading && error && <p className='directorio-error'>{error}</p>}

        {!loading && !error && companies.length === 0 && (
          <p className='directorio-empty'>No hay empresas en este sector.</p>
        )}

        {!loading && !error && companies.length > 0 && (
          <div className='empresas-grid'>
            {companies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
