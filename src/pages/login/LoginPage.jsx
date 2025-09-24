import './LoginPage.css';
import { Tooltip, Button, TextField, IconButton, InputAdornment } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useLogin } from '../../hooks';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors: formErrors } } = useForm();
    const [errors, setErrors] = useState({});
    const { loading, handleLogin, errors: loginErrors } = useLogin();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const resetErrors = () => {
        setErrors({});
    }

    useEffect(() => {
        if (formErrors?.username) setErrors({ username: {msg: formErrors.username.message } });
        else if (formErrors?.password || loginErrors?.password) setErrors({ password: {msg: formErrors.password.message || loginErrors.password.msg } });
    }, [formErrors, errors, loginErrors]);

    useEffect(() => {
        console.log('component loading changed', loading);
    },[loading]);

    return (
        <div className="login-page">
            <form className="login-box" onSubmit={handleSubmit(data => handleLogin(data))}>
                <h2>Iniciar Sesión</h2>
                <TextField label="Usuario" variant="outlined"
                    {...register("username", { required: "Debe introducir un nombre de usuario."})}
                    error={!!errors.username}
                    helperText={errors.username ? errors.username.msg : ''}
                    onInput={resetErrors}
                />
                <TextField label="Contraseña" type={showPassword ? "text" : "password"} variant="outlined"
                    {...register("password", { required: "Debe introducir una contraseña."})}
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.msg : ''}
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