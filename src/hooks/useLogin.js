import { useState, useCallback, useEffect } from "react";
import { toast } from 'react-toastify';

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);


    const handleLogin = useCallback(async (data) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        // Simulamos un usuario para el login
        const user = {
            username: 'testuser',
            password: 'testpassword'
        }
        
        // Simulamos el proceso de login con un delay
        return new Promise((resolve) => {
            setTimeout(() => {
                try {
                    if (data.password.length < 6) {
                        setError({ password: { msg: 'La contraseña debe tener al menos 6 caracteres.' } });
                        setLoading(false);
                        resolve(false);
                        return;
                    }

                    if (data.username !== user.username || data.password !== user.password) {
                        setError({ message: 'Usuario o contraseña incorrectos.' });
                        setLoading(false);
                        resolve(false);
                        return;
                    }
                    
                    setSuccess(true);
                    setLoading(false);
                    resolve(true);
                } catch (error) {
                    setError(error);
                    setLoading(false);
                    resolve(false);
                }
            }, 2000);
        });
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