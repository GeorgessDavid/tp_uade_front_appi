import './Section.css';

/**
 * @param {string} title - El título de la sección.
 * @param {React.ReactNode} children - El contenido de la sección (que son elementos hijos).
 * @param {string} [id] - El ID opcional para la sección.
 * @param {string} [className] - Clases CSS adicionales para la sección.
 * @returns Un componente de sección reutilizable con título y contenido.
 */
const Section = ({ title, children, id, className }) => {
    return (
        <section id={id} className={`section ${className}`}>
            <h2>{title}</h2>
            {children}
        </section>
    )
}

export default Section;