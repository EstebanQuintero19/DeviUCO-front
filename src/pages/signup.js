// src/pages/Signup.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTiposDeCuenta, createAccount } from '../services/api';

export default function Signup() {
    const [idAfiliado, setIdAfiliado] = useState('');
    const [pin, setPin] = useState('');
    const [confPin, setConfPin] = useState('');
    const [selectTipoCuenta, setSelectTipoCuenta] = useState('');
    const [tiposDeCuenta, setTiposDeCuenta] = useState([]);
    const navigate = useNavigate();

    // Obtener los tipos de cuenta cuando se carga el componente
    useEffect(() => {
        const fetchTiposDeCuenta = async () => {
            try {
                const data = await getTiposDeCuenta();
                setTiposDeCuenta(data.datos || []);
            } catch (error) {
                console.error('Error al obtener tipos de cuenta:', error);
            }
        };
        fetchTiposDeCuenta();
    }, []);

    const handleCreateAccount = async (e) => {
        e.preventDefault();
        if (pin !== confPin) return alert("Las contraseñas no coinciden");
        if (!selectTipoCuenta) return alert("Debe seleccionar un tipo de cuenta");

        const campos = {
            id: "",
            numeroCuenta: "",
            pin,
            saldo: 0.0,
            afiliado: { numeroIdAfiliado: idAfiliado },
            tipoCuenta: { id: selectTipoCuenta },
        };

        try {
            const data = await createAccount(campos);
            if (data.mensajes[0] === 'Cuenta creada exitosamente') {
                alert("Cuenta creada exitosamente");
                navigate("/account");
            } else {
                alert("No se pudo crear la cuenta");
            }
        } catch (error) {
            console.error('Error en la creación de cuenta:', error);
            alert("Error al crear la cuenta. Intente nuevamente.");
        }
    };

    const handleCancel = () => navigate("/");

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage: "url('/assets/foto-innova-UCO.jpeg')",
            }}
        >
            <div className="max-w-3xl w-full p-8 bg-white dark:bg-zinc-900 bg-opacity-90 dark:bg-opacity-90 shadow-lg rounded-lg">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-green-700 dark:text-green-300">Crear Nueva Cuenta</h2>
                    <img src="/assets/LogoSample.svg" alt="Logo DeviUCOpay" className="w-20 h-auto" />
                </div>
                <form onSubmit={handleCreateAccount} className="grid grid-cols-1 gap-6">
                    <div>
                        <label htmlFor="idAfiliado" className="block text-lg font-medium text-zinc-700 dark:text-zinc-300">ID Afiliado</label>
                        <input
                            id="idAfiliado"
                            type="text"
                            value={idAfiliado}
                            onChange={(e) => setIdAfiliado(e.target.value)}
                            className="mt-1 w-full p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 focus:ring-2 focus:ring-green-500 dark:bg-zinc-800 dark:text-white"
                            placeholder="Ingresa tu ID de Afiliado"
                        />
                    </div>
                    <div>
                        <label htmlFor="pin" className="block text-lg font-medium text-zinc-700 dark:text-zinc-300">PIN</label>
                        <input
                            id="pin"
                            type="password"
                            maxLength="4"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            className="mt-1 w-full p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 focus:ring-2 focus:ring-green-500 dark:bg-zinc-800 dark:text-white"
                            placeholder="Escribe tu PIN (4 dígitos)"
                        />
                    </div>
                    <div>
                        <label htmlFor="confPin" className="block text-lg font-medium text-zinc-700 dark:text-zinc-300">Confirmar PIN</label>
                        <input
                            id="confPin"
                            type="password"
                            maxLength="4"
                            value={confPin}
                            onChange={(e) => setConfPin(e.target.value)}
                            className="mt-1 w-full p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 focus:ring-2 focus:ring-green-500 dark:bg-zinc-800 dark:text-white"
                            placeholder="Confirma tu PIN"
                        />
                    </div>
                    <div>
                        <label htmlFor="selectTipoCuenta" className="block text-lg font-medium text-zinc-700 dark:text-zinc-300">Tipo de Cuenta</label>
                        <select
                            id="selectTipoCuenta"
                            value={selectTipoCuenta}
                            onChange={(e) => setSelectTipoCuenta(e.target.value)}
                            className="mt-1 w-full p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 focus:ring-2 focus:ring-green-500 dark:bg-zinc-800 dark:text-white"
                        >
                            <option value="">Seleccione el tipo de cuenta</option>
                            {tiposDeCuenta.map((tipo) => (
                                <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-between mt-6">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-green-700 text-white font-semibold rounded-lg shadow-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            Crear Cuenta
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
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
