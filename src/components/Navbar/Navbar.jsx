import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = ({options}) => {
    return (
        <nav className="navbar">
            <ul>
                {options.map((option, index) => {
                    // Si el path contiene un hash, usar <a> para scroll suave
                    const isHashLink = option.path.includes('#');
                    
                    return (
                        <li key={index}>
                            {isHashLink ? (
                                <a href={option.path}>{option.label}</a>
                            ) : (
                                <Link to={option.path}>{option.label}</Link>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
export default Navbar;