// src/walletAPI.js
import axios from 'axios';

// La URL base donde corre el servidor de la wallet
const API_URL = 'http://localhost:5000/api/wallet'; // Asegúrate de que este puerto y URL coincidan con tu configuración

//crear un nuevo usuario
export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/create-user`, userData);
    return response.data;
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    throw error;
  }
};

//obtener detalles de una cuenta específica
export const getAccount = async (accountNumber) => {
  try {
    const response = await axios.get(`${API_URL}/account/${accountNumber}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener detalles de la cuenta:', error);
    throw error;
  }
};

//listar cuentas
export const getAccounts = async () => {
  try {
    const response = await axios.get(`${API_URL}/accounts`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener la lista de cuentas:', error);
    throw error;
  }
};

