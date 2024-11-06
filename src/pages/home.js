// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center relative"
      style={{
        backgroundImage: "url('/assets/foto-innova-UCO.jpeg.svg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-green-900 bg-opacity-80"></div>

      {/* Header */}
      <header className="w-full absolute top-0 left-0 bg-transparent py-4 px-6">
        <div className="container mx-auto flex justify-between items-center text-white">
          <div className="text-2xl font-semibold tracking-wider">DEVIUCOPAY</div>
          <nav className="space-x-6">
            <Link to="/" className="hover:text-green-300 transition duration-300 ease-in-out">Inicio</Link>
            <Link to="/login" className="hover:text-green-300 transition duration-300 ease-in-out">Inicio de sesión</Link>
            <Link to="/signup" className="hover:text-green-300 transition duration-300 ease-in-out">Registrarse</Link>
          </nav>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex flex-1 flex-col lg:flex-row items-center justify-center w-full p-8 z-10 relative text-white">
        <div className="text-center lg:text-left lg:w-1/2 px-4">
          <h1 className="text-5xl font-bold mb-6 animate-fade-in-up">DeviUCOpay</h1>
          <p className="text-lg mb-8 leading-relaxed animate-fade-in delay-150">
            Tu mejor aliado a la hora de hacer pagos en la Universidad Católica de Oriente.
            Solo regístrate y con tu carnet podrás realizar tus compras en toda la universidad,
            olvidándote así de llevar efectivo o que tus transferencias no salgan.
          </p>
          <Link 
            to="/signup"
            className="inline-block bg-green-600 hover:bg-green-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Regístrate
          </Link>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="w-full bg-transparent text-white py-4 absolute bottom-0 left-0 text-center z-10">
        <p className="text-sm">&copy; 2023 Universidad Católica de Oriente. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
