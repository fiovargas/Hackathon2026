import React from 'react';
import './ConfirmActionModal.css';

/**
 * ConfirmActionModal - Modal reutilizable para confirmar acciones como Rechazar o Contratar.
 *
 * Props:
 * - isOpen: boolean - controla visibilidad del modal
 * - onClose: función - se llama al cancelar o cerrar
 * - onConfirm: función - se llama al confirmar la acción
 * - message: string - mensaje dinámico a mostrar (ej: "¿Desea rechazar esta postulación?")
 * - actionLabel: string - texto del botón de confirmación (ej: "Rechazar", "Contratar")
 * - actionType: string - 'danger' | 'success' para cambiar el color del botón confirmar
 */
const ConfirmActionModal = ({
    isOpen,
    onClose,
    onConfirm,
    message,
    actionLabel = 'Confirmar',
    actionType = 'danger',
}) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="confirm-action-modal"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="confirm-modal-title"
            >
                <h3 id="confirm-modal-title" className="confirm-modal-title">
                    Confirmar Acción
                </h3>

                <p className="confirm-modal-message">
                    {message || '¿Está seguro de que desea continuar con esta acción?'}
                </p>

                <div className="confirm-modal-actions">
                    <button className="btn-modal-cancel" onClick={onClose}>
                        Cancelar
                    </button>
                    <button
                        className={`btn-modal-confirm btn-confirm-${actionType}`}
                        onClick={onConfirm}
                    >
                        {actionLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmActionModal;
