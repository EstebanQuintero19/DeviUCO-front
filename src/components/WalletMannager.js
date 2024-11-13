// src/components/WalletManager.js
import React, { useState, useEffect } from 'react';
import { createUser, getAccount, getAccounts } from '../walletAPI';

const WalletManager = () => {
  const [userData, setUserData] = useState({
    numero_id_afiliado: '',
    nombre: '',
    correo: '',
    telefono: '',
    pin: '',
    tipo_identificacion: '',
  });
  const [accountNumber, setAccountNumber] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [accountDetails, setAccountDetails] = useState(null);

  // Handler for creating a new user
  const handleCreateUser = async () => {
    try {
      const response = await createUser(userData);
      alert('User created successfully');
      console.log(response);
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  // Handler for getting account details by account number
  const handleGetAccount = async () => {
    try {
      const response = await getAccount(accountNumber);
      setAccountDetails(response);
    } catch (error) {
      console.error('Failed to fetch account:', error);
    }
  };

  // Fetch all accounts when the component mounts
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await getAccounts();
        setAccounts(response);
      } catch (error) {
        console.error('Failed to fetch accounts:', error);
      }
    };

    fetchAccounts();
  }, []);

  return (
    <div>
      <h1>Wallet Manager</h1>
      
      <section>
        <h2>Create User</h2>
        <input
          type="text"
          placeholder="Número ID Afiliado"
          value={userData.numero_id_afiliado}
          onChange={(e) => setUserData({ ...userData, numero_id_afiliado: e.target.value })}
        />
        <input
          type="text"
          placeholder="Nombre"
          value={userData.nombre}
          onChange={(e) => setUserData({ ...userData, nombre: e.target.value })}
        />
        <input
          type="email"
          placeholder="Correo"
          value={userData.correo}
          onChange={(e) => setUserData({ ...userData, correo: e.target.value })}
        />
        <input
          type="tel"
          placeholder="Teléfono"
          value={userData.telefono}
          onChange={(e) => setUserData({ ...userData, telefono: e.target.value })}
        />
        <input
          type="text"
          placeholder="PIN"
          value={userData.pin}
          onChange={(e) => setUserData({ ...userData, pin: e.target.value })}
        />
        <input
          type="text"
          placeholder="Tipo Identificación"
          value={userData.tipo_identificacion}
          onChange={(e) => setUserData({ ...userData, tipo_identificacion: e.target.value })}
        />
        <button onClick={handleCreateUser}>Create User</button>
      </section>

      <section>
        <h2>Get Account</h2>
        <input
          type="text"
          placeholder="Account Number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
        />
        <button onClick={handleGetAccount}>Get Account</button>
        {accountDetails && (
          <div>
            <h3>Account Details</h3>
            <pre>{JSON.stringify(accountDetails, null, 2)}</pre>
          </div>
        )}
      </section>

      <section>
        <h2>All Accounts</h2>
        <ul>
          {accounts.map((account) => (
            <li key={account.id}>{account.nombre} - Balance: {account.balance}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default WalletManager;
