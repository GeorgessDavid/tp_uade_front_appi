import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

export const useObraSocial = () => {
    const [obrasSociales, setObrasSociales] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [createStatus, setCreateStatus] = useState(null);

    const fetchObrasSociales = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
             const response = await fetch(`${import.meta.env.VITE_API_URL}/api/obras-sociales`);
             const data = await response.json();
             setObrasSociales(data.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchObrasSociales();
    }, [fetchObrasSociales]);

    const createObraSocial = useCallback(async (newObraSocial) => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/obras-sociales/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newObraSocial),
                credentials: 'include',
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Error al crear la obra social');
            setCreateStatus(response.status);
            toast.success('Obra social creada con éxito');
            fetchObrasSociales();
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [fetchObrasSociales]);

    return { obrasSociales, loading, error, fetchObrasSociales, createObraSocial, createStatus };
}