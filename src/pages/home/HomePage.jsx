import { Section, Title, DataDisplay, DataBox, InformationBox, WrappedButton } from '../../components';
import { obrasSociales } from '../../data/obrasSociales';
import { Servicios } from '../../data/servicios';
import { useMediaQuery } from '@mui/material';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import PlaceIcon from '@mui/icons-material/Place';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import './HomePage.css';

const HomePage = () => {
    const isMobile = useMediaQuery('(max-width:600px)');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Detectar si hay un hash en la URL y hacer scroll al elemento
        if (location.hash) {
            const element = document.querySelector(location.hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

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
            <Section title="Información" id="information">
                <Title text="Servicios Ofrecidos" size='l' />
                <div className="home-information">
                    <div className="information-services">
                        {Servicios.map((service, index) => (
                            <InformationBox
                                key={index}
                                title={service.title}
                                content={service.content}
                                icon={service.icon}
                            />
                        ))}
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                    <WrappedButton 
                        text="Sacar Turno" 
                        action={() => navigate('/appointments')}
                        icon={<CalendarMonthIcon />}
                    />
                </div>
                <Title text="Obras Sociales Aceptadas" size='l' />
                <div className="home-information">
                    <div className="information-insurances">
                        {obrasSociales.map((obra, index) => (
                            <DataBox
                                key={index}
                                title={obra.siglas}
                                description={obra.nombre}
                                logo={obra.logo}
                                noTooltip={true}
                            />
                        ))}
                    </div>

                </div>
            </Section>
            <Section title="Contacto" id="contact" className="home-contact">
                <div className="contact-item">
                    <Title text="Información de Contacto" size='l' />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <PhoneIcon color="primary" />
                        <DataDisplay label="Teléfono" value=" +54 11 4321-5678" />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <EmailIcon color="primary" />
                        <DataDisplay label="Email" value="contacto@cardiologosuarez.com.ar" />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <LanguageIcon color="primary" />
                        <DataDisplay label="Sitio web" value="www.cardiologosuarez.com.ar" />
                    </div>
                </div>
                <div className="contact-item">
                    <Title text="Horarios de Atención" size='l' />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <AccessTimeIcon color="primary" />
                        <DataDisplay label="Lun. a Vie." value="9:00 - 18:00" />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <AccessTimeIcon color="primary" />
                        <DataDisplay label="Sábados" value="9:00 AM - 1:00 PM" />
                    </div>
                </div>
                <div>
                    <Title text="Ubicación" size='l' />
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.610048997043!2d-58.41338698771951!3d-34.58873227284682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca83cddf370b%3A0x3cbc32e757bd551a!2sAv.%20Sta.%20Fe%203250%2C%20C1425%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1759526299824!5m2!1ses-419!2sar"
                        width={isMobile ? "100%" : "500"} height="400" style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div className="contact-item">
                    <br />
                    <br />
                    <span>Consultorio privado en <strong>Palermo</strong>.</span>
                    <span>A metros de la estación <strong>Bulnes</strong> de la <strong>Línea D</strong>.</span>
                    <span> <PlaceIcon fontSize="small" /> Av. Santa Fe 3250, 2° Piso, Oficina 5. CABA, Argentina</span>
                    <span> <LocalParkingIcon fontSize="small" /> Estacionamiento disponible en el lugar</span>
                </div>
            </Section>
        </div>
    )
}

export default HomePage;