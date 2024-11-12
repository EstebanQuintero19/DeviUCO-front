import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Account() {
  const router = useRouter();
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsuarioData = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        
        if (!token) {
          router.push('/login');
          return;
        }

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/usuario/perfil`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsuario(response.data);
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          router.push('/login');
        }
        setError(error.response?.data?.mensaje || "Error al obtener datos del usuario");
        console.error("Error al obtener datos del usuario:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsuarioData();
  }, [router]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center">{error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      {/* Encabezado */}
      <header className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6 mb-8">
        <h1 className="text-xl font-semibold text-gray-700">DEVIUCOPAY</h1>
        <p className="text-sm text-gray-500">
          Último ingreso: {usuario.ultimaConexion} - IP: {usuario.ip}
        </p>
      </header>
      
      {/* Contenido principal */}
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="mb-6">
          <h2 className="text-3xl font-semibold text-gray-700">¡Hola {usuario.nombre}!</h2>
          <p className="text-5xl font-bold text-green-500">${usuario.saldo.toLocaleString('es-CO', { minimumFractionDigits: 2 })}</p>
          <p className="text-lg text-gray-500">Saldo disponible</p>
        </div>

        {/* Información de Cuenta */}
        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <p className="text-xl font-semibold text-gray-700">{usuario.numeroCuenta}</p>
          <p className="text-gray-500">{usuario.cuenta}</p>
        </div>

        {/* Opciones */}
        <div className="grid grid-cols-3 gap-4">
          <button className="flex flex-col items-center bg-yellow-100 text-yellow-700 p-4 rounded-lg shadow-md hover:bg-yellow-200 transition">
            <span className="text-lg font-semibold">Enviar Regalo</span>
          </button>
          <button className="flex flex-col items-center bg-blue-100 text-blue-700 p-4 rounded-lg shadow-md hover:bg-blue-200 transition">
            <span className="text-lg font-semibold">Consultar Movimientos</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-3xl text-center text-gray-500 py-4">
        &copy; 2024 Universidad Católica de Oriente. Todos los derechos reservados.
      </footer>
    </div>
  );
}
