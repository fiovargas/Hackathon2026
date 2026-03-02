import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

// Creamos una instancia de axios para centralizar la configuración
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

/**
 * Nota: Django requiere el slash final (/) al final de cada endpoint.
 * Axios facilita esto.
 */

async function postData(obj, endpoint) {
    try {
        // Con Axios ya no necesitas JSON.stringify, lo hace solo
        const response = await api.post(`${endpoint}/`, obj);
        console.log(`POST a ${endpoint}:`, response.data);
        return response.data;
    } catch (error) {
        console.error("Error en postData:", error.response?.data || error.message);
        throw error;
    }
}

async function getData(endpoint) {
    try {
        const response = await api.get(`${endpoint}/`);
        console.log(`GET de ${endpoint}:`, response.data);
        return response.data;
    } catch (error) {
        console.error("Error en getData:", error.response?.data || error.message);
        return [];
    }
}

async function patchData(obj, endpoint, id) {
    try {
        const response = await api.patch(`${endpoint}/${id}/`, obj);
        console.log(`PATCH a ${endpoint}/${id}:`, response.data);
        return response.data;
    } catch (error) {
        console.error("Error en patchData:", error.response?.data || error.message);
        throw error;
    }
}

async function deleteData(endpoint, id) {
    try {
        const response = await api.delete(`${endpoint}/${id}/`);
        console.log(`DELETE en ${endpoint}/${id}:`, response.status);
        
        // Django devuelve 204 si todo salió bien
        return response.status === 204 ? { success: true } : response.data;
    } catch (error) {
        console.error("Error en deleteData:", error.response?.data || error.message);
        throw error;
    }
}

export { postData, getData, patchData, deleteData };