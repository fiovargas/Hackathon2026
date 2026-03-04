import React, { useEffect, useState } from 'react';
import { vacantesService, VACANCY_TYPES } from '../services/vacantes';
import './DirectorioVacantes.css';

const MODALITY_LABELS = {
  presential: 'Presencial',
  remote: 'Remoto',
  hybrid: 'Híbrido',
};

const MODALITY_CLASS = {
  presential: 'badge--presential',
  remote: 'badge--remote',
  hybrid: 'badge--hybrid',
};

const TYPE_CLASS = {
  full_time: 'badge--full-time',
  part_time: 'badge--part-time',
  internship: 'badge--internship',
  contract: 'badge--contract',
};

function VacancyCard({ vacancy }) {
  const typeLabel =
    VACANCY_TYPES.find((t) => t.value === vacancy.type)?.label ?? vacancy.type;
  const modalityLabel = MODALITY_LABELS[vacancy.modality] ?? vacancy.modality;

  const hasSalary = vacancy.salary_min != null || vacancy.salary_max != null;

  return (
    <div className='vacante-card'>
      <div className='vacante-card__header'>
        <span className={`vacante-badge ${TYPE_CLASS[vacancy.type] ?? ''}`}>
          {typeLabel}
        </span>
        <span
          className={`vacante-badge ${MODALITY_CLASS[vacancy.modality] ?? ''}`}
        >
          {modalityLabel}
        </span>
      </div>

      <h3 className='vacante-name'>{vacancy.name}</h3>
      <p className='vacante-company'>{vacancy.company_name}</p>

      {(vacancy.province_name || vacancy.canton_name) && (
        <p className='vacante-location'>
          {[vacancy.canton_name, vacancy.province_name]
            .filter(Boolean)
            .join(', ')}
        </p>
      )}

      {vacancy.categories?.length > 0 && (
        <div className='vacante-categories'>
          {vacancy.categories.map((cat) => (
            <span key={cat} className='vacante-category-tag'>
              {cat}
            </span>
          ))}
        </div>
      )}

      {vacancy.description && (
        <p className='vacante-desc'>{vacancy.description}</p>
      )}

      {hasSalary && (
        <p className='vacante-salary'>
          {vacancy.currency_symbol ?? ''}
          {vacancy.salary_min != null
            ? Number(vacancy.salary_min).toLocaleString()
            : '?'}
          {vacancy.salary_max != null
            ? ` – ${vacancy.currency_symbol ?? ''}${Number(vacancy.salary_max).toLocaleString()}`
            : '+'}
        </p>
      )}

      {vacancy.external_url && (
        <a
          href={vacancy.external_url}
          target='_blank'
          rel='noopener noreferrer'
          className='vacante-link'
        >
          Ver oferta
        </a>
      )}
    </div>
  );
}

export default function DirectorioVacantes() {
  const [vacancies, setVacancies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    vacantesService
      .getCategories()
      .then(setCategories)
      .catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    vacantesService
      .getVacancies({ type: selectedType, categoryId: selectedCategory })
      .then(setVacancies)
      .catch(() => setError('No se pudo cargar las vacantes.'))
      .finally(() => setLoading(false));
  }, [selectedType, selectedCategory]);

  const clearFilters = () => {
    setSelectedType(null);
    setSelectedCategory(null);
  };

  const hasFilters = selectedType !== null || selectedCategory !== null;

  return (
    <div className='vacantes-page'>
      {/* Sidebar */}
      <aside className='vacantes-sidebar'>
        <div className='sidebar-section'>
          <h2 className='sidebar-title'>Tipo de vacante</h2>
          <ul className='sidebar-list'>
            {VACANCY_TYPES.map((t) => (
              <li key={t.value}>
                <button
                  className={`sidebar-item${selectedType === t.value ? ' sidebar-item--active' : ''}`}
                  onClick={() =>
                    setSelectedType(selectedType === t.value ? null : t.value)
                  }
                >
                  {t.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className='sidebar-section'>
          <h2 className='sidebar-title'>Categoría</h2>
          <ul className='sidebar-list'>
            {categories.map((cat) => (
              <li key={cat.id}>
                <button
                  className={`sidebar-item${selectedCategory === cat.id ? ' sidebar-item--active' : ''}`}
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === cat.id ? null : cat.id,
                    )
                  }
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {hasFilters && (
          <button className='sidebar-clear-btn' onClick={clearFilters}>
            Limpiar filtros
          </button>
        )}
      </aside>

      {/* Contenido */}
      <main className='vacantes-main'>
        <div className='vacantes-header'>
          <h1 className='vacantes-title'>Vacantes disponibles</h1>
          <p className='vacantes-subtitle'>
            {hasFilters
              ? 'Mostrando resultados filtrados'
              : 'Todas las vacantes activas'}
          </p>
        </div>

        {loading && (
          <div className='vacantes-loading'>
            <div className='vacantes-spinner' />
          </div>
        )}

        {!loading && error && <p className='vacantes-error'>{error}</p>}

        {!loading && !error && vacancies.length === 0 && (
          <p className='vacantes-empty'>
            No hay vacantes disponibles con los filtros seleccionados.
          </p>
        )}

        {!loading && !error && vacancies.length > 0 && (
          <div className='vacantes-grid'>
            {vacancies.map((v) => (
              <VacancyCard key={v.id} vacancy={v} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
