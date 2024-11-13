import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AffiliatedRegister() {
  const [tiposIdentificacion, setTiposIdentificacion] = useState([]);
  const [afiliado, setAfiliado] = useState({
    tipoIdentificacionId: '',
    numeroIdAfiliado: '',
    nombre: '',
    correo: '',
    telefono: '',
    pin: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Obtiene los tipos de identificación del backend
  useEffect(() => {
    const fetchTiposIdentificacion = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/general/api/v1/identificacion/tipos-identificacion`);
        if (response.status === 200) {
          setTiposIdentificacion(response.data);
        } else {
          console.error("Error al obtener tipos de identificación");
        }
      } catch (error) {
        console.error("Error al cargar tipos de identificación:", error);
      }
    };

    fetchTiposIdentificacion();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAfiliado((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!afiliado.tipoIdentificacionId || !afiliado.numeroIdAfiliado || !afiliado.nombre || !afiliado.correo || !afiliado.telefono || !afiliado.pin) {
      alert("Por favor completa todos los campos requeridos.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        tipoIdentificacionId: afiliado.tipoIdentificacionId,
        numeroIdAfiliado: afiliado.numeroIdAfiliado,
        nombre: afiliado.nombre,
        correo: afiliado.correo,
        telefono: afiliado.telefono,
        pin: afiliado.pin
      };

      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/general/api/v1/usuarios`, payload);

      if (response.status === 201) {
        alert("Afiliado registrado con éxito");
        setAfiliado({
          tipoIdentificacionId: '',
          numeroIdAfiliado: '',
          nombre: '',
          correo: '',
          telefono: '',
          pin: ''
        });
        navigate("/ruta-confirmacion");
      } else {
        alert("Hubo un problema al registrar el afiliado. Intenta de nuevo.");
      }
    } catch (error) {
      console.error("Error al registrar afiliado:", error);
      alert(error.response?.data?.mensaje || "Error en el servidor al intentar registrar el afiliado.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/foto-innova-UCO.jpeg')" }}
    >
      <div className="max-w-3xl w-full p-8 bg-white dark:bg-zinc-900 bg-opacity-90 dark:bg-opacity-90 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-green-700 dark:text-green-300 mb-8">Registrar Nuevo Afiliado</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <div>
            <label htmlFor="tipoIdentificacionId" className="block text-lg font-medium text-zinc-700 dark:text-zinc-300">Tipo de Identificación:</label>
            <select
              name="tipoIdentificacionId"
              value={afiliado.tipoIdentificacionId}
              onChange={handleChange}
              required
              className="mt-1 w-full p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 focus:ring-2 focus:ring-green-500 dark:bg-zinc-800 dark:text-white"
            >
              <option value="">Selecciona un tipo</option>
              {tiposIdentificacion.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="numeroIdAfiliado" className="block text-lg font-medium text-zinc-700 dark:text-zinc-300">Número de Identificación:</label>
            <input
              type="text"
              name="numeroIdAfiliado"
              value={afiliado.numeroIdAfiliado}
              onChange={handleChange}
              required
              placeholder="Ingresa tu número de identificación"
              className="mt-1 w-full p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 focus:ring-2 focus:ring-green-500 dark:bg-zinc-800 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="nombre" className="block text-lg font-medium text-zinc-700 dark:text-zinc-300">Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={afiliado.nombre}
              onChange={handleChange}
              required
              placeholder="Ingresa tu nombre completo"
              className="mt-1 w-full p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 focus:ring-2 focus:ring-green-500 dark:bg-zinc-800 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="correo" className="block text-lg font-medium text-zinc-700 dark:text-zinc-300">Correo Electrónico:</label>
            <input
              type="email"
              name="correo"
              value={afiliado.correo}
              onChange={handleChange}
              required
              placeholder="ejemplo@correo.com"
              className="mt-1 w-full p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 focus:ring-2 focus:ring-green-500 dark:bg-zinc-800 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="telefono" className="block text-lg font-medium text-zinc-700 dark:text-zinc-300">Teléfono:</label>
            <input
              type="tel"
              name="telefono"
              value={afiliado.telefono}
              onChange={handleChange}
              required
              placeholder="Número de teléfono"
              pattern="[0-9]{10}"
              className="mt-1 w-full p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 focus:ring-2 focus:ring-green-500 dark:bg-zinc-800 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="pin" className="block text-lg font-medium text-zinc-700 dark:text-zinc-300">PIN:</label>
            <input
              type="password"
              name="pin"
              value={afiliado.pin}
              onChange={handleChange}
              required
              placeholder="4 dígitos para el PIN"
              pattern="[0-9]{4}"
              className="mt-1 w-full p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 focus:ring-2 focus:ring-green-500 dark:bg-zinc-800 dark:text-white"
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="submit"
              disabled={isSubmitting || !afiliado.tipoIdentificacionId || !afiliado.numeroIdAfiliado || !afiliado.nombre || !afiliado.correo || !afiliado.telefono || !afiliado.pin}
              className="px-6 py-3 bg-green-700 text-white font-semibold rounded-lg shadow-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {isSubmitting ? "Registrando..." : "Registrar Afiliado"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-zinc-700 text-white font-semibold rounded-lg shadow-md hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-500"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AffiliatedRegister;
