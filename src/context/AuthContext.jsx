import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const AuthContext = createContext();
import { toast } from 'react-toastify';

export const AuthProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(() => {
        // Inicializar desde session cookie
        const authCookie = Cookies.get('auth');
        return authCookie ? true : false;

    });

    const navigate = useNavigate();

    const login = () => {
        setIsLogged(true);
        // localStorage.setItem('isLogged', 'true');
    };

    const logout = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/logout`, {
                method: 'POST',
                credentials: 'include'
            });
            
            if (!response.ok) return toast.error('Error al cerrar sesión.');
            
            Cookies.remove('auth');
            setIsLogged(false);
            toast.success('Sesión cerrada correctamente.');
            navigate('/login');
        } catch (err) {
            console.error('Error during logout:', err);
        }
    };

    return (
        <AuthContext.Provider value={{ isLogged, login, logout, setIsLogged }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};
