import { useState, useCallback, useEffect } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const { setIsLogged } = useAuth();

    const handleLogin = useCallback(async (data) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/login`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })

            const result = await response.json();
            if (!response.ok) throw new Error(result.message || 'Error en el login');
            
            setSuccess(true);
            setIsLogged(true);
            toast.success('Sesión iniciada correctamente.');
            navigate('/appointments/manage');

        } catch (err) {
            setError(err);
            console.error('Error en el proceso de login:', err);
        } finally {
            setLoading(false);
        }
    }, [navigate, setIsLogged]);

    useEffect(() => {
        if (error) {
            toast.error(error.message || 'Error en el proceso de login.');
            setError(null);
        }
    }, [error]);

    return {
        loading,
        error,
        success,
        handleLogin
    }

}