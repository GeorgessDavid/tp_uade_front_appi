import './Section.css';

const Section = ({ title, children, id, className }) => {
    return (
        <section id={id} className={`section ${className}`}>
            <h2>{title}</h2>
            {children}
        </section>
    )
}

export default Section;