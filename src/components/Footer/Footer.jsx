import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="powered-by">
                    <span>Powered By</span>
                    <a href="https://github.com/GeorgessDavid/tp_uade_front_appi" target="_blank" rel="noopener noreferrer">
                        Se7enGroup
                    </a>
                </div>
                <div className="devs">
                    <span>Desarrolladores:</span>
                    <a href="https://www.linkedin.com/in/ramirocarranza/" target="_blank" rel="noopener noreferrer"> Ramiro Carranza <OpenInNewIcon fontSize="small" /></a>
                    <a href="https://www.linkedin.com/in/lconde85/" target="_blank" rel="noopener noreferrer"> Luciano Conde <OpenInNewIcon fontSize="small" /></a>
                    <a href="https://www.georgesdavid.dev/" target="_blank" rel="noopener noreferrer"> Georges David <OpenInNewIcon fontSize="small" /></a>
                </div>
            </div>
            <span>© 2024 Dr. Martín Alejandro Suarez - Todos los derechos reservados.</span>
        </footer >
    )
}

export default Footer;