import React from 'react';
import './ApplicationCard.css';

const ApplicationCard = ({ application, onView, onAccept, onReject, onHire }) => {
    const { user_name, status } = application;

    return (
        <div className="application-card">
            <div className="application-card-info">
                <p className="application-user-name">{user_name}</p>
                <span className={`application-status status-${status?.toLowerCase().replace(' ', '-')}`}>
                    {status}
                </span>
            </div>

            <div className="application-card-actions">
                <button
                    className="btn-action btn-view"
                    onClick={onView}
                    title="Ver detalles del postulante"
                >
                    Ver
                </button>
                <button
                    className="btn-action btn-accept"
                    onClick={onAccept}
                    title="Aceptar postulación"
                >
                    Aceptar
                </button>
                <button
                    className="btn-action btn-reject"
                    onClick={onReject}
                    title="Rechazar postulación"
                >
                    Rechazar
                </button>
                <button
                    className="btn-action btn-hire"
                    onClick={onHire}
                    title="Contratar postulante"
                >
                    Contratar
                </button>
            </div>
        </div>
    );
};

export default ApplicationCard;
