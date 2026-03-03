import React, { useState } from 'react';
import './InterviewModal.css';

const InterviewModal = ({ isOpen, onClose, onConfirm, applicantName }) => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    if (!isOpen) return null;

    const handleConfirm = () => {
        if (!date || !time) return;
        onConfirm && onConfirm({ date, time });
        setDate('');
        setTime('');
    };

    const handleCancel = () => {
        setDate('');
        setTime('');
        onClose && onClose();
    };

    return (
        <div className="modal-overlay" onClick={handleCancel}>
            <div
                className="interview-modal"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="interview-modal-title"
            >
                <h3 id="interview-modal-title" className="interview-modal-title">
                    Programar Entrevista
                </h3>
                {applicantName && (
                    <p className="interview-applicant-name">
                        Postulante: <strong>{applicantName}</strong>
                    </p>
                )}

                <div className="interview-form">
                    <div className="form-group">
                        <label htmlFor="interview-date">Fecha *</label>
                        <input
                            type="date"
                            id="interview-date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="interview-time">Hora *</label>
                        <input
                            type="time"
                            id="interview-time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="interview-modal-actions">
                    <button
                        className="btn-modal-cancel"
                        onClick={handleCancel}
                    >
                        Cancelar
                    </button>
                    <button
                        className="btn-modal-confirm"
                        onClick={handleConfirm}
                        disabled={!date || !time}
                    >
                        Confirmar Entrevista
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InterviewModal;
