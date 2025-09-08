import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = ({options}) => {
    return (
        <nav className="navbar">
            <ul>
                {options.map((option, index) => (
                    <li key={index}>
                        <Link to={option.path}>{option.label}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
export default Navbar;