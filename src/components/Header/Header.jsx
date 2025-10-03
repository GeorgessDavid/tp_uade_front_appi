import './Header.css';
import { Link } from 'react-router-dom';
import { Tooltip, IconButton, useMediaQuery } from '@mui/material';
import { Navbar, Sidebar, Modal } from '../index';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Header = ({ logged }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width: 768px)');
    const { logout } = useAuth();

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    }

    const handleLogoutClick = (e) => {
        e.preventDefault();
        setLogoutModalOpen(true);
    }

    const handleLogoutConfirm = () => {
        setLogoutModalOpen(false);
        logout();
    }

    const handleLogoutCancel = () => {
        setLogoutModalOpen(false);
    }

    const publicOptions = [
        { label: 'Inicio', path: '/#' },
        { label: 'Nosotros', path: '/#about' },
        { label: 'Contacto', path: '/#contact' },
        { label: 'Turnos', path: '/appointments' },
    ];

    const loggedOptions = [
        { label: 'Turnos', path: '/appointments/manage' },
        { label: 'Obras Sociales', path: '/insurances' },
    ];
    return (
        <header className="header">
            <div className="first-header">
                {isMobile &&
                    <IconButton onClick={toggleSidebar} size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                }
                <Tooltip title="Página principal" arrow placement="bottom" >
                    <Link to="/"><img src="/logo_white.png" alt="Logo" /></Link>
                </Tooltip>
                {isMobile && <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar}
                    itemLists={
                        logged ? loggedOptions.map(opt => <Link to={opt.path}>{opt.label}</Link>)
                            :
                            publicOptions.map(opt => <Link to={opt.path}>{opt.label}</Link>)} position="left" title="Menú" bottom={
                                logged ? 
                                    <a href="#" onClick={handleLogoutClick} id="login-link">Cerrar Sesión</a>
                                    :
                                    <Link to="/login" id="login-link">Iniciar Sesión</Link>} />}
                {!isMobile &&
                    <>
                        {!logged && <Navbar options={publicOptions} />}
                        {logged && <Navbar options={loggedOptions} />}
                        {logged && <a href="#" onClick={handleLogoutClick} id="login-link">Cerrar Sesión</a>}
                        {!logged && <Link to="/login" id="login-link">Iniciar Sesión</Link>}
                    </>
                }
            </div>
            <Modal
                open={logoutModalOpen}
                onClose={handleLogoutCancel}
                title="Confirmar cierre de sesión"
                actions={[
                    {
                        label: "No",
                        onClick: handleLogoutCancel,
                        color: "primary"
                    },
                    {
                        label: "Sí",
                        onClick: handleLogoutConfirm,
                        color: "error"
                    }
                ]}
            >
                <p>¿Estás seguro de que deseas cerrar sesión?</p>
            </Modal>
        </header>
    )
}

export default Header;