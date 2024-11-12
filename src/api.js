// src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL, // Usa la URL base desde el .env
});

// Función para obtener los tipos de cuenta
export const getTiposDeCuenta = async () => {
    const response = await api.get('/tipoCuenta');
    return response.data;
};

// Función para registrar una nueva cuenta
export const createAccount = async (accountData) => {
    const response = await api.post('/api/v1/cuenta/registro', accountData);
    return response.data;
};

export default api;
