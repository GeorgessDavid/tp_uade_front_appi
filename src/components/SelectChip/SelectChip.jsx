import './SelectChip.css';

/**
 * Componente SelectChip que representa un chip con un select dentro.
 * @param {Function} onClick - Función que se ejecuta al cambiar la opción seleccionada.
 * @param {String} className - Clase CSS adicional para personalizar el estilo del chip.
 * @param {String} id - ID del chip.
 * @param {Array} options - Opciones para el select dentro del chip.
 * @returns 
 */

const SelectChip = ({ onClick, className, id, options, defaultValue }) => {
    const { label, color } = options.find(option => option?.value === defaultValue?.value) || {};

    return (
        <select className={`select-chip ${className || ''} ${color}`} onChange={onClick} id={id} defaultValue={label}>
            <option defaultValue={label}>{label}</option>
            {options.map((option, index) => (
                <option key={index} value={option.value}>{option.label}</option>
            ))}
        </select>
    )
}

export default SelectChip;