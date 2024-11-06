// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!username || !pin) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    const loginData = { numeroCuenta: username, pin: pin };

    try {
      const response = await fetch('http://localhost:8080/api/v1/cuenta/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Inicio de sesión exitoso');
        navigate('/cuenta');
      } else if (response.status === 400 || response.status === 404) {
        const errorData = await response.json();
        alert(errorData.mensajes[0]);
      } else {
        alert('Error del servidor. Por favor, inténtelo de nuevo más tarde.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de red. Por favor, inténtelo de nuevo más tarde.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center"
         style={{ backgroundImage: "url('/assets/foto-innova-UCO.jpeg')" }}>
      <div className="flex flex-col md:flex-row max-w-4xl w-full bg-white dark:bg-zinc-900 bg-opacity-95 dark:bg-opacity-95 rounded-lg shadow-xl overflow-hidden">
        
        {/* Branding / Information Side */}
        <div className="flex-1 p-8 bg-green-900 text-white flex flex-col items-center justify-center">
          <h1 className="text-4xl font-extrabold mb-4">DeviUCO PAY</h1>
          <p className="text-lg mb-6">¡Tu nuevo aliado en la universidad!</p>
          <img src="/assets/LogoSample.svg" alt="UCO Logo" className="w-38 h-auto mb-2" />
          <img src="/assets/foto-innova-UCO.svg" alt="Universidad" className="w-58 h-auto rounded-lg" />
        </div>

        {/* Login Form Side */}
        <div className="flex-1 p-8 bg-white dark:bg-zinc-800">
          <div className="flex justify-center mb-8">
            <img src="/assets/LogoSample.svg" alt="DeviUCO Pay Logo" className="w-24 h-auto" />
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-lg font-medium text-zinc-700 dark:text-zinc-300 mb-1">Usuario</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-zinc-300 dark:border-zinc-600 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 dark:bg-zinc-700 dark:text-white"
                placeholder="Ingresa tu usuario"
                required
              />
            </div>
            <div>
              <label htmlFor="pin" className="block text-lg font-medium text-zinc-700 dark:text-zinc-300 mb-1">Pin de seguridad</label>
              <input
                type="password"
                id="pin"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full border border-zinc-300 dark:border-zinc-600 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 dark:bg-zinc-700 dark:text-white"
                placeholder="Ingresa tu PIN"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Iniciar Sesión
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-full bg-zinc-700 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-500 mt-3"
            >
              Regresar al Inicio
            </button>
            <button
              type="button"
              onClick={() => navigate('/deleteAccount')}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 mt-3"
            >
              Eliminar Cuenta
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
