import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(() => {
        // Inicializar desde localStorage
        const stored = localStorage.getItem('isLogged');
        return stored === 'true';
    });

    const navigate = useNavigate();

    useEffect(() => {
        // Sincronizar con localStorage cuando cambie el estado
        localStorage.setItem('isLogged', isLogged.toString());
    }, [isLogged]);

    const login = () => {
        setIsLogged(true);
        localStorage.setItem('isLogged', 'true');
    };

    const logout = () => {
        setIsLogged(false);
        localStorage.setItem('isLogged', 'false');
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ isLogged, login, logout }}>
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
