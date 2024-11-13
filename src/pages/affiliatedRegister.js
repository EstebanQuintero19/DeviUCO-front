import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AffiliatedRegister() {
  const [tiposIdentificacion, setTiposIdentificacion] = useState([]);
  const [afiliado, setAfiliado] = useState({
    tipoIdentificacion: '',
    numeroIdentificacion: '',
    nombre: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false); 

  //obtiene los tipos de identificación del backend
  useEffect(() => {
    const fetchTiposIdentificacion = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/tipos-identificacion`);
        if (response.status === 200) {
          setTiposIdentificacion(response.data); // Guarda identificación estado
        } else {
          console.error("Error al obtener tipos de identificación");
        }
      } catch (error) {
        console.error("Error al cargar tipos de identificación:", error);
      }
    };

    fetchTiposIdentificacion();
  }, []);

  //cambio valores del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAfiliado((prev) => ({ ...prev, [name]: value }));
  };

  //envío formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación
    if (!afiliado.tipoIdentificacion || !afiliado.numeroIdentificacion || !afiliado.nombre) {
      alert("Por favor completa todos los campos requeridos.");
      return;
    }

    setIsSubmitting(true); //indicador de carga
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/afiliados`, afiliado);

      if (response.status === 201) { //Verifica registro fue exitoso
        alert("Afiliado registrado con éxito");
        setAfiliado({ 
          tipoIdentificacion: '',
          numeroIdentificacion: '',
          nombre: '',
        });
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
    <form onSubmit={handleSubmit} className="registro-form">
      {/* Campo de Tipo de Identificación */}
      <label htmlFor="tipoIdentificacion">Tipo de Identificación:</label>
      <select
        name="tipoIdentificacion"
        value={afiliado.tipoIdentificacion}
        onChange={handleChange}
        required
      >
        <option value="">Selecciona un tipo</option>
        {tiposIdentificacion.map((tipo) => (
          <option key={tipo.id} value={tipo.tipo}>
            {tipo.tipo}
          </option>
        ))}
      </select>

      {/* Campo de Número de Identificación */}
      <label htmlFor="numeroIdentificacion">Número de Identificación:</label>
      <input
        type="text"
        name="numeroIdentificacion"
        value={afiliado.numeroIdentificacion}
        onChange={handleChange}
        required
      />

      {/* Campo de Nombre */}
      <label htmlFor="nombre">Nombre:</label>
      <input
        type="text"
        name="nombre"
        value={afiliado.nombre}
        onChange={handleChange}
        required
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Registrando..." : "Registrar Afiliado"}
      </button>
    </form>
  );
}

export default AffiliatedRegister;
