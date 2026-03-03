import React, { useState, useEffect } from 'react';
import './VacanciesList.css';
// import { getCompanyVacancies } from '../../services/vacancyService'; // Conectar cuando estén los endpoints

const VacanciesList = ({ onViewApplicants }) => {
    const [vacancies, setVacancies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVacancies = async () => {
            setLoading(true);
            setError(null);
            try {
                // TODO: Conectar con endpoint real
                // const data = await getCompanyVacancies();
                // setVacancies(data);

                // Datos de ejemplo mientras no hay endpoint
                setVacancies([
                    {
                        id: 1,
                        name: 'Desarrollador Frontend',
                        type: 'full_time',
                        modality: 'remoto',
                        is_active: true,
                    },
                    {
                        id: 2,
                        name: 'Analista de Datos',
                        type: 'contract',
                        modality: 'presencial',
                        is_active: false,
                    },
                ]);
            } catch (err) {
                setError('No se pudieron cargar las vacantes.');
            } finally {
                setLoading(false);
            }
        };

        fetchVacancies();
    }, []);

    const getTypeLabel = (type) => {
        const types = {
            full_time: 'Tiempo Completo',
            part_time: 'Medio Tiempo',
            internship: 'Pasantía',
            contract: 'Contrato',
        };
        return types[type] || type;
    };

    const getModalityLabel = (modality) => {
        const modalities = {
            presencial: 'Presencial',
            remoto: 'Remoto',
            hibrido: 'Híbrido',
        };
        return modalities[modality] || modality;
    };

    if (loading) return <p className="vacancies-loading">Cargando vacantes...</p>;
    if (error) return <p className="vacancies-error">{error}</p>;

    return (
        <div className="vacancies-list-container">
            <h2 className="vacancies-list-title">Mis Vacantes</h2>

            {vacancies.length === 0 ? (
                <p className="vacancies-empty">No hay vacantes registradas aún.</p>
            ) : (
                <ul className="vacancies-list">
                    {vacancies.map((vacancy) => (
                        <li key={vacancy.id} className="vacancy-item">
                            <div className="vacancy-info">
                                <h3 className="vacancy-name">{vacancy.name}</h3>
                                <div className="vacancy-meta">
                                    <span className="vacancy-tag">{getTypeLabel(vacancy.type)}</span>
                                    <span className="vacancy-tag">{getModalityLabel(vacancy.modality)}</span>
                                    <span
                                        className={`vacancy-status ${vacancy.is_active ? 'status-active' : 'status-inactive'
                                            }`}
                                    >
                                        {vacancy.is_active ? 'Activa' : 'Inactiva'}
                                    </span>
                                </div>
                            </div>
                            <button
                                className="btn-view-applicants"
                                onClick={() => onViewApplicants && onViewApplicants(vacancy.id)}
                            >
                                Ver Postulados
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default VacanciesList;
