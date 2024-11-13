import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Account() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsuarioData = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('token');

        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/usuario/perfil`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsuario(response.data);
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
        setError(error.response?.data?.mensaje || "Error al obtener datos del usuario");
        console.error("Error al obtener datos del usuario:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsuarioData();
  }, [navigate]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center">{error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <header className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6 mb-8">
        <h1 className="text-xl font-semibold text-gray-700">DEVIUCOPAY</h1>
        <p className="text-sm text-gray-500">
          Último ingreso: {usuario.ultimaConexion} - IP: {usuario.ip}
        </p>
      </header>
      {/* Resto del contenido */}
    </div>
  );
}
