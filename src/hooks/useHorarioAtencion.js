import { useState, useCallback } from 'react';

export const useHorarioAtencion = () => {
    const [horasDisponibles, setHorasDisponibles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchHorasDisponibles = useCallback(async (fecha, dia) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/horarios-atencion/${dia}/slots-disponibles?fecha=${fecha}`);
            const data = await response.json();

            if (!response.ok) return setHorasDisponibles('No hay turnos disponibles');
            setHorasDisponibles(data.slots);
            
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }

    }, []);

    return { horasDisponibles, loading, error, fetchHorasDisponibles };

    }