import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DeleteAccount() {
  const [numeroCuenta, setNumeroCuenta] = useState('');
  const navigate = useNavigate();

  const handleDeleteAccount = async (event) => {
    event.preventDefault();

    if (!numeroCuenta) {
      alert('Por favor, ingrese el número de cuenta.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/v1/cuenta/${numeroCuenta}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        alert('Cuenta eliminada exitosamente');
        navigate('/');
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

  const handleBackToAccount = () => {
    navigate('/account');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/foto-innova-UCO.jpeg')" }}
    >
      <div className="flex flex-col md:flex-row max-w-4xl w-full bg-white dark:bg-zinc-900 bg-opacity-95 dark:bg-opacity-95 rounded-lg shadow-xl overflow-hidden">
        
        {/* Information Section */}
        <div className="flex-1 p-8 bg-green-900 text-white flex flex-col items-center justify-center">
          <h1 className="text-4xl font-extrabold mb-4">DeviUCO PAY</h1>
          <p className="text-lg mb-6">Lamentamos que te quieras ir</p>
          <img src="/assets/LogoSample.svg" alt="UCO Logo" className="w-32 h-auto mb-6" />
          <img src="/assets/foto-innova-UCO.svg" alt="Universidad" className="w-52 h-auto rounded-lg" />
        </div>

        {/* Delete Account Form */}
        <div className="flex-1 p-8 bg-white dark:bg-zinc-800">
          <div className="flex justify-center mb-8">
            <img src="/assets/LogoSample.svg" alt="DeviUCO Pay Logo" className="w-24 h-auto" />
          </div>

          <form className="space-y-6" onSubmit={handleDeleteAccount}>
            <div>
              <label htmlFor="numeroCuenta" className="block text-lg font-medium text-zinc-700 dark:text-zinc-300 mb-1">Número de cuenta</label>
              <input
                type="text"
                id="numeroCuenta"
                value={numeroCuenta}
                onChange={(e) => setNumeroCuenta(e.target.value)}
                className="w-full border border-zinc-300 dark:border-zinc-600 p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 dark:bg-zinc-700 dark:text-white"
                placeholder="Ingrese su número de cuenta"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Eliminar cuenta
            </button>
            <button
              type="button"
              onClick={handleBackToAccount}
              className="w-full bg-zinc-700 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-500 mt-3"
            >
              Volver a mi cuenta
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
