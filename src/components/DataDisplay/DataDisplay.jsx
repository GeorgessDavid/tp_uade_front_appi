import "./DataDisplay.css";
import PropTypes from 'prop-types';


/**
 * Componente para mostrar un valor con su etiqueta
 * @param {String} label - Etiqueta que se usara para identificar el valor.
 * @param {String|Number} value - Valor que se mostrara. 
 * @param {String} className - Clase CSS adicional para personalizar el estilo del componente.
 * @param {Object} styles - Objeto de estilos en línea para personalizar el estilo del componente.
 * @returns 
 */
const DataDisplay = ({ label, value, className, styles}) => {
    return (
        <div className={`data-display ${className}`} style={styles ? styles : {}}>
            <span className="data-display__label">{label}:</span>
            <span className="data-display__value">{value}</span>
        </div>
    )
}

DataDisplay.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    className: PropTypes.string,
    styles: PropTypes.object
}

export default DataDisplay;
