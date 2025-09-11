import './LoginPage.css';
import { Tooltip, Button, TextField } from '@mui/material';

const LoginPage = () => {
    return (
        <div className="login-page">
            <div className="login-box">
                <h2>Iniciar Sesión</h2>
                <TextField label="Usuario" variant="outlined" />
                <TextField label="Contraseña" type="password" variant="outlined" />
                <Button variant="contained" color="primary">Iniciar Sesión</Button>
            </div>
        </div>
    )
}

export default LoginPage;