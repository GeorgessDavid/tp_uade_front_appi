import './Header.css';
import { Link } from 'react-router-dom';
import { Tooltip, IconButton, useMediaQuery } from '@mui/material';
import { Navbar, Sidebar } from '../index';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

const Header = ({ logged }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width: 768px)');

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    }

    const publicOptions = [
        { label: 'Inicio', path: '/' },
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

                                <Link to="/login" id="login-link">Iniciar Sesión</Link>} />}
                {!isMobile &&
                    <>
                        {!logged && <Navbar options={publicOptions} />}
                        {logged && <Navbar options={loggedOptions} />}
                        {logged && <Link to="/login" id="login-link">Cerrar Sesión</Link>}
                        {!logged && <Link to="/login" id="login-link">Iniciar Sesión</Link>}
                    </>
                }
            </div>
        </header>
    )
}

export default Header;