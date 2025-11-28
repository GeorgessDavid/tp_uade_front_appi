import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

export const useTurnos = () => {
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createTurno = useCallback(async (turnoData) => {
        setLoading(true);
        setError(null);

        try {
            console.log(turnoData);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/turnos/create`, {
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
    },[])

    useEffect(() => {
        if (error !== null && error) toast.error(error.message);
    }, [error])

    return { status, loading, error, createTurno };
}
