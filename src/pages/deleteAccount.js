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
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        alert('Cuenta eliminada exitosamente');
        navigate('/'); // Redirige al usuario a la página de inicio
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
    navigate('/account'); // Redirige al usuario a la cuenta o a otra ruta relevante
  };

  return (
    <div className="flex flex-col md:flex-row p-4">
      <div className="flex-1 bg-green-900 p-4 text-center text-white">
        <div className="bg-green-700 p-4 rounded-lg">
          <h1 className="text-4xl font-bold">DeviUCO PAY</h1>
          <p className="mt-4">¡Lamentamos que te quieras ir!</p>
          <div className="mt-4">
            <img src="/assets/LogoSample_ByTailorBrands (3).jpg" alt="Person with card" className="mx-auto rounded-lg" />
          </div>
        </div>
      </div>
      <div className="flex-1 bg-white p-4">
        <div className="flex justify-center mb-4">
          <img src="/assets/logo.png" alt="DeviUCO Pay Logo" />
        </div>
        <form className="space-y-4" onSubmit={handleDeleteAccount}>
          <div>
            <label htmlFor="numeroCuenta" className="block text-zinc-700">Número de cuenta</label>
            <input
              type="text"
              id="numeroCuenta"
              value={numeroCuenta}
              onChange={(e) => setNumeroCuenta(e.target.value)}
              className="w-full border border-zinc-300 p-2 rounded-lg"
              placeholder="Ingrese su número de cuenta"
            />
          </div>
          <button type="submit" className="w-full bg-green-700 text-white p-2 rounded-lg">Eliminar cuenta</button>
          <button type="button" onClick={handleBackToAccount} className="w-full bg-green-700 text-white p-2 rounded-lg">Volver a mi cuenta</button>
        </form>
      </div>
    </div>
  );
}
