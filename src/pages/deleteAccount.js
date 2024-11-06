// src/pages/DeleteAccount.js
import React from 'react';

export default function DeleteAccount() {
  const handleDeleteAccount = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar tu cuenta?')) {
      console.log('Cuenta eliminada');
      // Aquí puedes añadir la lógica de eliminación de cuenta
    }
  };

  return (
    <div className="delete-account-page">
      <h2>Eliminar Cuenta</h2>
      <p>¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.</p>
      <button onClick={handleDeleteAccount}>Eliminar Cuenta</button>
    </div>
  );
}
