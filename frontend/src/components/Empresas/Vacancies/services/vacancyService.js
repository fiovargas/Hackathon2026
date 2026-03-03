import axios from 'axios';

// Base URL del API - ajustar según la configuración del proyecto
const BASE_URL = '/api';

/**
 * Crea una nueva vacante para la empresa autenticada.
 * @param {Object} data - Datos del formulario de la vacante
 * @returns {Promise} - Respuesta del servidor
 */
export const createVacancy = async (data) => {
    const response = await axios.post(`${BASE_URL}/vacancies/`, data);
    return response.data;
};

/**
 * Obtiene todas las vacantes de la empresa autenticada.
 * @returns {Promise} - Lista de vacantes
 */
export const getCompanyVacancies = async () => {
    const response = await axios.get(`${BASE_URL}/vacancies/`);
    return response.data;
};

/**
 * Actualiza los datos de una vacante existente.
 * @param {number|string} id - ID de la vacante a actualizar
 * @param {Object} data - Datos actualizados de la vacante
 * @returns {Promise} - Respuesta del servidor
 */
export const updateVacancy = async (id, data) => {
    const response = await axios.patch(`${BASE_URL}/vacancies/${id}/`, data);
    return response.data;
};
