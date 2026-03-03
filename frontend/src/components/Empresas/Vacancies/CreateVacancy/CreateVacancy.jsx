import React, { useState } from 'react';
import './CreateVacancy.css';
// import { createVacancy } from '../../services/vacancyService'; // Conectar cuando estén los endpoints

const initialState = {
    name: '',
    description: '',
    type: '',
    modality: '',
    salary_min: '',
    salary_max: '',
    currency: '',
    province: '',
    canton: '',
};

const CreateVacancy = () => {
    const [formData, setFormData] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            // TODO: Conectar con endpoint real
            // await createVacancy(formData);
            console.log('Vacante a crear:', formData);
            setSuccess(true);
            setFormData(initialState);
        } catch (err) {
            setError('Error al crear la vacante. Intente nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-vacancy-container">
            <h2 className="create-vacancy-title">Crear Nueva Vacante</h2>

            {error && <p className="create-vacancy-error">{error}</p>}
            {success && <p className="create-vacancy-success">¡Vacante creada exitosamente!</p>}

            <form className="create-vacancy-form" onSubmit={handleSubmit}>
                {/* Nombre */}
                <div className="form-group">
                    <label htmlFor="name">Nombre de la Vacante *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Ej: Desarrollador Frontend"
                    />
                </div>

                {/* Descripción */}
                <div className="form-group">
                    <label htmlFor="description">Descripción *</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        placeholder="Describe las responsabilidades y requisitos del puesto"
                        rows={4}
                    />
                </div>

                {/* Tipo */}
                <div className="form-group">
                    <label htmlFor="type">Tipo de Empleo *</label>
                    <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccionar tipo</option>
                        <option value="full_time">Tiempo Completo</option>
                        <option value="part_time">Medio Tiempo</option>
                        <option value="internship">Pasantía</option>
                        <option value="contract">Contrato</option>
                    </select>
                </div>

                {/* Modalidad */}
                <div className="form-group">
                    <label htmlFor="modality">Modalidad *</label>
                    <select
                        id="modality"
                        name="modality"
                        value={formData.modality}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccionar modalidad</option>
                        <option value="presencial">Presencial</option>
                        <option value="remoto">Remoto</option>
                        <option value="hibrido">Híbrido</option>
                    </select>
                </div>

                {/* Salario (opcional) */}
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="salary_min">Salario Mínimo (opcional)</label>
                        <input
                            type="number"
                            id="salary_min"
                            name="salary_min"
                            value={formData.salary_min}
                            onChange={handleChange}
                            placeholder="Ej: 500000"
                            min="0"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="salary_max">Salario Máximo (opcional)</label>
                        <input
                            type="number"
                            id="salary_max"
                            name="salary_max"
                            value={formData.salary_max}
                            onChange={handleChange}
                            placeholder="Ej: 800000"
                            min="0"
                        />
                    </div>
                </div>

                {/* Moneda (opcional) */}
                <div className="form-group">
                    <label htmlFor="currency">Moneda (opcional)</label>
                    <select
                        id="currency"
                        name="currency"
                        value={formData.currency}
                        onChange={handleChange}
                    >
                        <option value="">Seleccionar moneda</option>
                        <option value="CRC">Colón (CRC)</option>
                        <option value="USD">Dólar (USD)</option>
                    </select>
                </div>

                {/* Provincia (opcional) */}
                <div className="form-group">
                    <label htmlFor="province">Provincia (opcional)</label>
                    <input
                        type="text"
                        id="province"
                        name="province"
                        value={formData.province}
                        onChange={handleChange}
                        placeholder="Ej: Cartago"
                    />
                </div>

                {/* Cantón (opcional) */}
                <div className="form-group">
                    <label htmlFor="canton">Cantón (opcional)</label>
                    <input
                        type="text"
                        id="canton"
                        name="canton"
                        value={formData.canton}
                        onChange={handleChange}
                        placeholder="Ej: La Lima"
                    />
                </div>

                <button
                    type="submit"
                    className="create-vacancy-btn"
                    disabled={loading}
                >
                    {loading ? 'Creando...' : 'Crear Vacante'}
                </button>
            </form>
        </div>
    );
};

export default CreateVacancy;
