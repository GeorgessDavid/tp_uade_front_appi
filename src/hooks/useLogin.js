import { useState, useCallback, useEffect } from "react";
import { toast } from 'react-toastify';

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);


    const handleLogin = useCallback(async (data) => {
        setLoading(true);

        // Simulamos un usuario para el login
        const user = {
            username: 'testuser',
            password: 'testpassword'
        }
        
        try {
            // Simulamos el proceso de login.
            setTimeout(() => {
                if (data.password.length < 6) {
                    setError({ password: { msg: 'La contraseña debe tener al menos 6 caracteres.' } });
                    return;
                }

                if (data.username !== user.username || data.password !== user.password) {
                    setError({ message: 'Usuario o contraseña incorrectos.' });
                    return;
                }
                setSuccess(true);
                return;
            }, 5000);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (error) {
            toast.error(error.message || 'Error en el proceso de login.');
            setError(null);
        }
    }, [error]);

    useEffect(() => {
        console.log('hook loading changed', loading);
    }, [loading]);

    return {
        loading,
        error,
        success,
        handleLogin
    }

}