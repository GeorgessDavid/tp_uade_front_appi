import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

export const useTurnos = () => {
    const url  = import.meta.env.VITE_API_URL;
    const [turnos, setTurnos] = useState([]);
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createTurno = useCallback(async (turnoData) => {
        setLoading(true);
        setError(null);

        try {
            console.log(turnoData);
            const response = await fetch(`${url}/api/turnos/create`, {
                method: 'POST',
                body: JSON.stringify(turnoData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Respuesta al crear turno:', response);

            const data = await response.json();
            console.log('Datos recibidos al crear turno:', data);
            if (!response.ok) throw new Error(data.message || 'Error al crear el turno');
            setStatus(response.status);
            if (response.status === 201) toast.success('Turno creado con éxito');
        }catch (err) {
            setError(err);
            console.error('Error al crear el turno:', err);
        } finally {
            setLoading(false);
        }
    },[url])

    useEffect(() => {
        if (error !== null && error) toast.error(error.message);
    }, [error])


    const getTurnos = useCallback(async() => {
        setLoading(true);
        try {
            const response = await fetch(`${url}/api/turnos`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) toast.error('Error al obtener los turnos');
            const data = await response.json();
            setTurnos(data.data);
        } catch (err) {
            setError(err);
            console.error('Error al obtener los turnos:', err);
        } finally {
            setLoading(false);
        }
    },[url])

    useEffect(() => {
        getTurnos();
    }, [getTurnos])

    const updateTurno = useCallback(async (turnoId, updatedData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${url}/api/turnos/${turnoId}`, {
                method: 'PUT',
                body: JSON.stringify(updatedData),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Error al actualizar el turno');

            toast.success('Turno actualizado con éxito');

            // Refrescar la lista de turnos después de la actualización
            getTurnos();
        } catch (err) {
            setError(err);
            console.error('Error al actualizar el turno:', err);
        } finally {
            setLoading(false);
        }
    }, [url, getTurnos]);
    return { status, loading, error, createTurno, turnos, updateTurno };
}
