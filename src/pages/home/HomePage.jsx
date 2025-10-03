import { Section, Title } from '../../components';
import './HomePage.css';

const HomePage = () => {
    return (
        <div>
            <div className="home">
                <div className="name">
                    <span>Dr.</span>
                    <h1>Martín Alejandro</h1>
                    <h2>Suarez</h2>
                </div>
                <img src="/medico.png" alt="Medico" />
            </div>
            <Section title="Sobre Mí" id="about">
                <p>
                    Soy médico egresado de la Universidad de Buenos Aires (UBA), con residencia en Clínica Médica en el Hospital Italiano de Buenos Aires. Posteriormente, realicé una especialización en Cardiología en la Sociedad Argentina de Cardiología.<br /><br />
                    Cuento con más de 15 años de experiencia en el diagnóstico, prevención y tratamiento de enfermedades cardiovasculares, enfocándome en un abordaje humano y cercano al paciente. A lo largo de mi carrera, he participado en numerosos congresos nacionales e internacionales, manteniéndome actualizado en los últimos avances de la cardiología. Mi compromiso es brindar atención personalizada, acompañando a cada paciente en su proceso de recuperación y promoviendo hábitos de vida saludables.
                </p>
            </Section>
            <Section title="Información" id="information" className="home-information">
                <div className="contact-item">
                    <Title text="Servicios Ofrecidos" size='l' />
                    <ul>
                        <li>Consultas de Cardiología General</li>
                        <li>Control y prevención de factores de riesgo cardiovascular (hipertensión, colesterol, diabetes).</li>
                        <li>Estudios de chequeo cardiológico (Electrocardiogramas, prueba de esfuerzo, ecocardiograma).</li>
                        <li>Planes personalizados de prevención.</li>
                        <li>Seguimiento de pacientes con patologías crónicas.</li>
                    </ul>
                </div>
                <div className="contact-item">
                    <Title text="Obras Sociales Aceptadas" size='l' />
                    <ul>
                        <li>OSDE</li>
                        <li>Swiss Medical</li>
                        <li>Galeno</li>
                        <li>Medifé</li>
                        <li>PAMI</li>
                        <li>Obra Social de la Ciudad de Buenos Aires (OBSBA)</li>
                    </ul>
                </div>
            </Section>
            <Section title="Contacto" id="contact" className="home-contact">
                <div className="contact-item">
                    <Title text="Información de Contacto" size='l' />
                    <span>📞 Teléfono: +54 11 4321-5678</span>
                    <span>📧 Email: contacto@cardiologosuarez.com.ar</span>
                    <span>🌐 Sitio web: www.cardiologosuarez.com.ar</span>
                </div>
                <div className="contact-item">
                    <Title text="Horarios de Atención" size='l' />
                    <span>🕒 Lunes a Viernes: 9:00 AM - 6:00 PM</span>
                    <span>🕒 Sábados: 9:00 AM - 1:00 PM</span>
                </div>
                <div>
                    <Title text="Ubicación" size='l' />
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.610048997043!2d-58.41338698771951!3d-34.58873227284682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca83cddf370b%3A0x3cbc32e757bd551a!2sAv.%20Sta.%20Fe%203250%2C%20C1425%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1759526299824!5m2!1ses-419!2sar" 
                    width="500" height="450" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div className="contact-item">
                    <br/>
                    <br/>
                    <span>Consultorio privado en <strong>Palermo</strong>.</span>
                    <span>A metros de la estación <strong>Bulnes</strong> de la <strong>Línea D</strong>.</span>
                    <span>📍 Av. Santa Fe 3250, 2° Piso, Oficina 5. CABA, Argentina</span>
                    <span>🅿️ Estacionamiento disponible en el lugar</span>
                </div>
            </Section>
        </div>
    )
}

export default HomePage;