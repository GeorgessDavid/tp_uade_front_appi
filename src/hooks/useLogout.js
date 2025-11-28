import { useCallback } from 'react';
import { toast } from 'react-toastify';

export const useLogout = () => {
    const logout = useCallback(async() => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/logout`, {
                method: 'POST',
                credentials: 'include'
            });

            if (!response.ok) return toast.error('Error al cerrar sesión.');

            toast.success('Sesión cerrada correctamente.');
        }catch (err) {
            console.error('Error during logout:', err);
        }
    }, []);
    return { logout };
}