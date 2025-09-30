import propTypes from 'prop-types';
import './Title.css';

/**
 * Componente que muestra un título con un tamaño y color específicos.
 * @param {string} text - El texto del título.
 * @param {string} size - El tamaño del título. Puede ser 'xs - 0.25rem', 's - 0.5rem', 'm - 1rem' [Default], 'l - 1.5rem', 'xl - 2rem', 'xxl - 3rem'.
 * @param {string} color - El color del título. Puede ser 'primary' [Default], 'secondary', 'success', 'danger'.
 * @param {JSX.Element} icon - Un ícono opcional para mostrar junto al título.
 * @returns {JSX.Element} El componente de título.
 */


const Title = ({ text, size, color, icon }) => {
  return (
    <h1 className={`title ${size ? size : 'm'} ${color ? color : 'primary'}`}>
      {icon && <span className="icon">{icon}</span>}
      {text}
    </h1>
  );
};

Title.propTypes = {
  text: propTypes.string.isRequired,
  size: propTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'xxl']),
  color: propTypes.oneOf(['primary', 'secondary', 'success', 'danger']),
  icon: propTypes.element,
};

export default Title; 