import axios from 'axios';

// Base URL del API - ajustar según la configuración del proyecto
const BASE_URL = '/api';

/**
 * Obtiene todas las postulaciones para una vacante específica.
 * @param {number|string} vacancyId - ID de la vacante
 * @returns {Promise} - Lista de postulaciones
 */
export const getApplicationsByVacancy = async (vacancyId) => {
    const response = await axios.get(`${BASE_URL}/applications/?vacancy=${vacancyId}`);
    return response.data;
};

/**
 * Actualiza el estado de una postulación específica.
 * @param {number|string} applicationId - ID de la postulación
 * @param {number|string} statusId - ID del nuevo estado
 * @returns {Promise} - Respuesta del servidor
 */
export const updateApplicationStatus = async (applicationId, statusId) => {
    const response = await axios.patch(`${BASE_URL}/applications/${applicationId}/`, {
        status: statusId,
    });
    return response.data;
};
