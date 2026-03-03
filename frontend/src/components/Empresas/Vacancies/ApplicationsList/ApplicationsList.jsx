import React, { useState, useEffect } from 'react';
import ApplicationCard from '../ApplicationCard/ApplicationCard';
import './ApplicationsList.css';
// import { getApplicationsByVacancy } from '../../services/applicationService'; // Conectar cuando estén los endpoints

const ApplicationsList = ({ vacancyId }) => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!vacancyId) return;

        const fetchApplications = async () => {
            setLoading(true);
            setError(null);
            try {
                // TODO: Conectar con endpoint real
                // const data = await getApplicationsByVacancy(vacancyId);
                // setApplications(data);

                // Datos de ejemplo mientras no hay endpoint
                setApplications([
                    {
                        id: 1,
                        user_name: 'Carlos Rodríguez',
                        status: 'Pendiente',
                    },
                    {
                        id: 2,
                        user_name: 'María López',
                        status: 'Revisado',
                    },
                ]);
            } catch (err) {
                setError('No se pudieron cargar los postulados.');
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [vacancyId]);

    const handleView = (applicationId) => {
        console.log('Ver postulación:', applicationId);
        // TODO: Implementar navegación o modal de detalle
    };

    const handleAccept = (applicationId) => {
        console.log('Aceptar postulación:', applicationId);
        // TODO: Conectar con endpoint de actualización de estado
    };

    const handleReject = (applicationId) => {
        console.log('Rechazar postulación:', applicationId);
        // TODO: Abrir ConfirmActionModal
    };

    const handleHire = (applicationId) => {
        console.log('Contratar postulación:', applicationId);
        // TODO: Abrir ConfirmActionModal
    };

    if (!vacancyId) {
        return (
            <div className="applications-list-container">
                <p className="applications-empty">Seleccione una vacante para ver los postulados.</p>
            </div>
        );
    }

    if (loading) return <p className="applications-loading">Cargando postulados...</p>;
    if (error) return <p className="applications-error">{error}</p>;

    return (
        <div className="applications-list-container">
            <h2 className="applications-list-title">Postulados a la Vacante</h2>

            {applications.length === 0 ? (
                <p className="applications-empty">No hay postulados para esta vacante aún.</p>
            ) : (
                <div className="applications-list">
                    {applications.map((application) => (
                        <ApplicationCard
                            key={application.id}
                            application={application}
                            onView={() => handleView(application.id)}
                            onAccept={() => handleAccept(application.id)}
                            onReject={() => handleReject(application.id)}
                            onHire={() => handleHire(application.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ApplicationsList;
