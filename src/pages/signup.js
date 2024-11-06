import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [idAfiliado, setIdAfiliado] = useState('');
  const [pin, setPin] = useState('');
  const [confPin, setConfPin] = useState('');
  const [selectTipoCuenta, setSelectTipoCuenta] = useState('');
  const [tiposDeCuenta, setTiposDeCuenta] = useState([]);
  const navigate = useNavigate();

  // Función para obtener tipos de cuenta al cargar el componente
  useEffect(() => {
    const obtenerTiposDeCuenta = async () => {
      try {
        const response = await fetch("http://localhost:8080/tipoCuenta", {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          console.error('Error al obtener los tipos de cuenta:', response.statusText);
          return;
        }

        const data = await response.json();
        const tiposDeCuenta = data.datos;

        if (!Array.isArray(tiposDeCuenta)) {
          console.error('La propiedad "datos" de la respuesta no es un arreglo:', tiposDeCuenta);
          return;
        }

        setTiposDeCuenta(tiposDeCuenta); // Guarda los tipos de cuenta en el estado
      } catch (error) {
        console.error('Error de red al obtener los tipos de cuenta:', error);
      }
    };

    obtenerTiposDeCuenta();
  }, []);

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    if (pin !== confPin) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if (!selectTipoCuenta) {
      alert("Debe seleccionar un tipo de cuenta");
      return;
    }

    const campos = {
      id: "",
      numeroCuenta: "",
      pin: pin,
      saldo: 0.0,
      afiliado: {
        numeroIdAfiliado: idAfiliado
      },
      tipoCuenta: {
        id: selectTipoCuenta
      }
    };

    console.log("Datos a enviar:", campos);

    try {
      const response = await fetch("http://localhost:8080/api/v1/cuenta/registro", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(campos)
      });

      if (!response.ok) {
        console.error('Error en la solicitud:', response.statusText);
        return;
      }

      const data = await response.json();
      console.log('Respuesta de la API:', data);

      if (data.mensajes[0] === 'Cuenta creada exitosamente') {
        alert("Cuenta creada exitosamente");
        navigate("/account"); // Redirige a la página de cuenta
      } else {
        alert("No se pudo crear la cuenta");
      }
    } catch (error) {
      console.error('Error de red:', error);
      alert("Error al crear la cuenta. Por favor, inténtelo de nuevo.");
    }
  };

  const handleCancel = () => {
    navigate("/"); // Redirige a la página de inicio
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-zinc-800 shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-green-700 dark:text-green-300">CREACIÓN DE CUENTA</h2>
        <img src="/assets/LogoSample_ByTailorBrands (3).jpg" alt="Deviuco Pay Logo" className="h-15 w-32" />
      </div>
      <form onSubmit={handleCreateAccount} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="idAfiliado" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">ID Afiliado</label>
          <input
            id="idAfiliado"
            type="text"
            value={idAfiliado}
            onChange={(e) => setIdAfiliado(e.target.value)}
            className="mt-1 block w-full p-2 border border-zinc-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="pin" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Escriba su pin</label>
          <input
            id="pin"
            type="password"
            maxLength="4"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="mt-1 block w-full p-2 border border-zinc-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="confPin" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Confirme su pin</label>
          <input
            id="confPin"
            type="password"
            maxLength="4"
            value={confPin}
            onChange={(e) => setConfPin(e.target.value)}
            className="mt-1 block w-full p-2 border border-zinc-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="selectTipoCuenta" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Seleccione el tipo de cuenta</label>
          <select
            id="selectTipoCuenta"
            value={selectTipoCuenta}
            onChange={(e) => setSelectTipoCuenta(e.target.value)}
            className="mt-1 block w-full p-2 border border-zinc-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 dark:bg-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white"
          >
            <option value="">Seleccione una opción</option>
            {tiposDeCuenta.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-1 md:col-12 flex justify-between">
          <button type="submit" className="bg-green-700 text-white px-2 py-1 rounded-md shadow-sm hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">CREAR CUENTA</button>
          <button type="button" onClick={handleCancel} className="bg-zinc-700 text-white px-2 py-1 rounded-md shadow-sm hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500">CANCELAR CREACIÓN DE CUENTA</button>
        </div>
      </form>
    </div>
  );
}
