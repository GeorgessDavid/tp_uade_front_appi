import { useState, useEffect, useCallback } from 'react';

export const useObraSocial = () => {
    const [obrasSociales, setObrasSociales] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

    return { obrasSociales, loading, error, fetchObrasSociales };
}