import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <div className="first-header">
                <Link to="/"><img src="/logo_white.png" alt="Logo" /></Link>
                <Link to="/login" id="login-link">Iniciar Sesión</Link>
            </div>
        </header>
    )
}

export default Header;