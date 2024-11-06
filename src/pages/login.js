// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    // Verifica que los campos no estén vacíos
    if (!username || !pin) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    const loginData = {
      numeroCuenta: username,
      pin: pin,
    };

    try {
      const response = await fetch('http://localhost:8080/api/v1/cuenta/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Inicio de sesión exitoso');
        navigate('/cuenta'); // Redirige a la página de cuenta (asegúrate de tener una ruta configurada)
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
    <div className="flex flex-col md:flex-row border-4 border-purple-500 p-4">
      <div className="flex-1 bg-green-900 p-4 text-center text-white">
        <div className="bg-green-700 p-4 rounded-lg">
          <h1 className="text-4xl font-bold">DeviUCO PAY</h1>
          <p className="mt-4">¡Tu nuevo aliado en la universidad!</p>
          <div className="mt-4">
            <img src="https://placehold.co/150x50" alt="UCO Logo" className="mx-auto" />
          </div>
          <div className="mt-4">
            <img src="public\assets\LogoSample_ByTailorBrands (3).jpg" alt="Person with card" className="mx-auto rounded-lg" />
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white p-4">
        <div className="flex justify-center mb-4">
          <img src="/images/logo.png" alt="DeviUCO Pay Logo" />
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-zinc-700">Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-zinc-300 p-2 rounded-lg"
              required
            />
          </div>
          <div>
            <label htmlFor="pin" className="block text-zinc-700">Pin de seguridad</label>
            <input
              type="password"
              id="pin"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full border border-zinc-300 p-2 rounded-lg"
              required
            />
          </div>
          <button type="submit" className="w-full bg-green-700 text-white p-2 rounded-lg">INICIAR SESIÓN</button>
          <button type="button" onClick={() => navigate('/')} className="w-full bg-green-700 text-white p-2 rounded-lg">INICIO</button>
        </form>
      </div>
    </div>
  );
}
