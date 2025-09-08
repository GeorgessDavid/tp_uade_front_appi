import { Section } from '../../components';
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
        </div>
    )
}

export default HomePage;