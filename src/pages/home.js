// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-green-900 text-white flex flex-col">
      <header className="flex justify-between items-center p-4">
        <div className="text-lg font-semibold">DEVIUCOPAY</div>
        <nav className="space-x-4">
          <Link to="/" className="hover:underline">Inicio</Link>
          <Link to="/login" className="hover:underline">Inicio de sesión</Link>
          <Link to="/signup" className="hover:underline">Registrarse</Link>
        </nav>
      </header>
      
      <div className="flex flex-1 flex-col lg:flex-row items-center justify-center p-8">
        <div className="text-center lg:text-left lg:w-1/2">
          <h1 className="text-4xl font-bold mb-4">DeviUCOpay</h1>
          <p className="mb-4">
            Tu mejor aliado a la hora de hacer pagos en la Universidad Católica de Oriente.
            Solo regístrate y con tu carnet podrás realizar tus compras en toda la universidad,
            olvidándote así de llevar efectivo o que tus transferencias no salgan.
          </p>
          <Link to="/signup" className="text-lg font-semibold hover:underline">Regístrate</Link>
        </div>
        <div className="lg:w-1/2 mt-8 lg:mt-0">
          <img src="public\assets\foto innova UCO.jpeg.jpg" alt="UCO Logo" className="w-full h-auto" />
        </div>
      </div>
    </div>
  );
}
