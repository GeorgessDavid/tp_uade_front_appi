import './Header.css';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import { Navbar } from '../index';

const Header = ({logged}) => {

    const publicOptions = [
        {label: 'Inicio', path: '/'},
        {label: 'Nosotros', path: '/#about'},
        {label: 'Contacto', path: '/#contact'},
    ];

    return (
        <header className="header">
            <div className="first-header">
                <Tooltip title="Página principal" arrow placement="bottom" >
                    <Link to="/"><img src="/logo_white.png" alt="Logo" /></Link>
                </Tooltip>
                {!logged && <Navbar options={publicOptions}/>}
                {!logged && <Link to="/login" id="login-link">Iniciar Sesión</Link>}
            </div>
        </header>
    )
}

export default Header;