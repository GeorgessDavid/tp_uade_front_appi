import './WrappedButton.css';


/**
 * Botón flotante con ícono y texto.
 * @param {String} text - Texto a mostrar en el botón.
 * @param {Function} action - Función a ejecutar al hacer click en el botón.
 * @param {JSX.Element} icon - Icono a mostrar en el botón. 
 * @returns 
 */
const WrappedButton = ({ text, action, icon}) => {
    return (
        <div className="download-wrapper" onClick={action}>
            <div className="download-wrapper-button">
                <div className="download-button">
                    {icon}
                </div>
                <span>{text}</span>
            </div>
        </div>
    )
}
export default WrappedButton;
