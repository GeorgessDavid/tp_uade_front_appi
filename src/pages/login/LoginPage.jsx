import './LoginPage.css';
import { Tooltip, Button, TextField, IconButton, InputAdornment } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useLogin } from '../../hooks';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors: formErrors } } = useForm();
    const [errors, setErrors] = useState({});
    const { loading, handleLogin, errors: loginErrors } = useLogin();
    const { isLogged } = useAuth();
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const resetErrors = () => {
        setErrors({});
    }

    useEffect(() => {
        if (isLogged) navigate('/appointments/manage');
    }, [isLogged, navigate]);

    const onSubmit = async (data) => {
        await handleLogin(data);
    };

    useEffect(() => {
        if (formErrors?.usuario) setErrors({ usuario: {msg: formErrors.usuario.message } });
        else if (formErrors?.contrasena || loginErrors?.contrasena) setErrors({ contrasena: {msg: formErrors.contrasena.message || loginErrors.contrasena.msg } });
    }, [formErrors, errors, loginErrors]);

    return (
        <div className="login-page">
            <form className="login-box" onSubmit={handleSubmit(onSubmit)}>
                <h2>Iniciar Sesión</h2>
                <TextField label="Usuario" variant="outlined"
                    {...register("usuario", { required: "Debe introducir un nombre de usuario."})}
                    error={!!errors.usuario}
                    helperText={errors.usuario ? errors.usuario.msg : ''}
                    onInput={resetErrors}
                />
                <TextField label="Contraseña" type={showPassword ? "text" : "password"} variant="outlined"
                    {...register("contrasena", { required: "Debe introducir una contraseña."})}
                    error={!!errors.contrasena}
                    helperText={errors.contrasena ? errors.contrasena.msg : ''}
                    onInput={resetErrors}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <Tooltip title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"} arrow>
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={togglePasswordVisibility}
                                            color="primary"
                                            className="mr-5"
                                            edge="end"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                </Tooltip>
                            ),
                        }
                    }} />
                <Button type="submit" variant="contained" color="primary" sx={{ width: '40%', margin: '0 auto', display: 'block' }} loading={loading}>Iniciar Sesión</Button>
            </form>
        </div>
    )
}

export default LoginPage;