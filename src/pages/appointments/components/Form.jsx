import { FormControl, TextField, InputLabel, Select, MenuItem } from '@mui/material'
import { Title } from '../../../components';
import { useState } from 'react';
import { AppointmentInfo } from './AppointmentInfo';
import { useForm } from 'react-hook-form';


export const Form = ({ submitFunction, loading, errors, ...rest }) => {

    const { selectedDate, selectedTime } = rest;
    const { register, handleSubmit, watch, setValue } = useForm();
    const [mailDomain, setMailDomain] = useState('@gmail.com');
    const [selectedObraSocial, setSelectedObraSocial] = useState('');

    // Observar todos los valores del formulario en tiempo real
    const watchedValues = watch();

    const validDomains = [
        "gmail.com", "hotmail.com", "outlook.com", "yahoo.com",
        "live.com", "icloud.com", "live.com.ar", "speedy.com.ar",
        "arnet.com.ar", "hotmail.com.ar", "yahoo.com.ar", "outlook.es", "icloud.com.ar"
    ]

    const obrasSociales = ["OSDE", "Swiss Medical", "Galeno", "Medifé", "IOMA"]

    const handleDomainChange = (event) => {
        setMailDomain(event.target.value);
    };

    const handleObraSocialChange = (event) => {
        const value = event.target.value;
        setSelectedObraSocial(value);
        setValue('patientInsurance', value); // Sincronizar con react-hook-form
    };

    return (
        <FormControl className="appointment-form gap-1rem" onSubmit={
            handleSubmit(submitFunction)
        } disabled={loading} error={!!errors} fullWidth>
            <Title text="1. Datos Personales" size="l" color="primary" />
            <div className="d-flex gap-1rem space-between">
                <TextField fullWidth margin="normal"
                    label="Nombre" name="patientFirstName" required
                    error={!!errors?.patientFirstName} helperText={errors?.patientFirstName}
                    color="primary" variant="standard"
                    {...register("patientFirstName", {
                        required: "El nombre es obligatorio",
                        minLength: { value: 2, message: "El nombre debe tener al menos 2 caracteres" },
                        maxLength: { value: 50, message: "El nombre no debe exceder los 50 caracteres" },
                        pattern: { value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, message: "El nombre solo debe contener letras y espacios" }
                    })}
                />
                <TextField fullWidth margin="normal"
                    label="Apellido" name="patientLastName" required
                    error={!!errors?.patientLastName} helperText={errors?.patientLastName}
                    color="primary" variant="standard"
                    {...register("patientLastName", {
                        required: "El apellido es obligatorio",
                        minLength: { value: 2, message: "El apellido debe tener al menos 2 caracteres" },
                        maxLength: { value: 50, message: "El apellido no debe exceder los 50 caracteres" },
                        pattern: { value: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, message: "El apellido solo debe contener letras y espacios" }
                    })}
                />
            </div>
            <div className="d-flex gap-1rem space-between">
                <div className="d-flex gap-1rem full-width">
                    <TextField fullWidth margin="normal"
                        label="Email" name="email" type="email" required
                        error={!!errors?.email} helperText={errors?.email}
                        color="primary" variant="standard"
                        {...register("email", {
                            required: "El email es obligatorio",
                            pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "El email no es válido" },
                            maxLength: { value: 100, message: "El email no debe exceder los 100 caracteres" }
                        })}
                    />
                    <span style={{ marginTop: '2rem' }}>@</span>
                    <FormControl fullWidth margin="normal" variant="standard" sx={{ marginTop: '2rem' }}>
                        <Select fullWidth margin="normal" label="Dominio" name="emailDomain" defaultValue={mailDomain} required error={!!errors?.emailDomain} onChange={handleDomainChange} color="primary" variant="standard">
                            {validDomains.map(domain => <MenuItem key={domain} value={`@${domain}`}>{domain}</MenuItem>)}
                        </Select>
                    </FormControl>
                </div>
                <TextField fullWidth margin="normal"
                    label="Teléfono" name="phone" required
                    error={!!errors?.phone} helperText={errors?.phone}
                    color="primary" variant="standard"
                    {...register("phone", {
                        required: "El teléfono es obligatorio",
                        pattern: { value: /^[0-9]+$/, message: "El teléfono solo debe contener números" },
                    })}
                />
            </div>
            <div className="d-flex gap-1rem space-between">
                <TextField fullWidth margin="normal"
                    label="DNI" name="patientDNI" required
                    error={!!errors?.patientDNI} helperText={errors?.patientDNI}
                    color="primary" variant="standard"
                    {...register("patientDNI", {
                        required: "El DNI es obligatorio",
                        pattern: { value: /^[0-9]+$/, message: "El DNI solo debe contener números" },
                        minLength: { value: 7, message: "El DNI debe tener al menos 7 caracteres" },
                        maxLength: { value: 8, message: "El DNI no debe exceder los 8 caracteres" }
                    })}
                />
                <TextField fullWidth margin="normal"
                    label="Fecha de Nacimiento" name="patientDOB" type="date"
                    slotProps={{
                        inputLabel: {
                            shrink: true
                        },
                        htmlInput: {
                            max: new Date().toISOString().split("T")[0] // Fecha máxima es hoy
                        }
                    }} required
                    error={!!errors?.patientDOB} helperText={errors?.patientDOB}
                    color="primary" variant="standard"
                    {...register("patientDOB", {
                        required: "La fecha de nacimiento es obligatoria",
                        validate: value => {
                            const today = new Date();
                            const dob = new Date(value);
                            return dob < today || "La fecha de nacimiento debe ser anterior a la fecha actual";
                        }
                    })}
                />
            </div>
            <div className="d-flex gap-1rem space-between">
                <FormControl fullWidth margin="normal" variant="standard">
                    <InputLabel id="obra-social-label">Obra Social</InputLabel>
                    <Select fullWidth margin="normal" labelId="obra-social-label" label="Obra Social" name="patientInsurance" value={selectedObraSocial} onChange={handleObraSocialChange} required error={!!errors?.patientInsurance} color="primary" variant="standard">
                        {obrasSociales.map(obra => <MenuItem key={obra} value={obra}>{obra}</MenuItem>)}
                    </Select>
                </FormControl>
                <TextField fullWidth margin="normal"
                    label="Número de Afiliado" name="patientInsuranceNumber" required
                    error={!!errors?.patientInsuranceNumber} helperText={errors?.patientInsuranceNumber}
                    color="primary" variant="standard"
                    {...register("patientInsuranceNumber", {
                        required: "El número de afiliado es obligatorio",
                        pattern: { value: /^[0-9]+$/, message: "El número de afiliado solo debe contener números" }
                    })}
                />
            </div>
            <AppointmentInfo
                data={{
                    patientFirstName: watchedValues.patientFirstName || undefined,
                    patientLastName: watchedValues.patientLastName || undefined,
                    email: watchedValues.email || undefined,
                    emailDomain: mailDomain,
                    phone: watchedValues.phone || undefined,
                    patientDNI: watchedValues.patientDNI || undefined,
                    patientDOB: watchedValues.patientDOB || undefined,
                    patientInsurance: selectedObraSocial,
                    patientInsuranceNumber: watchedValues.patientInsuranceNumber || undefined,
                    appointmentDate: selectedDate.format('DD/MM/YYYY'),
                    appointmentTime: selectedTime || undefined
                }}
                confirm={() => { console.log('Confirmar Turno') }}
                loading={false}
                isMobile={rest.isMobile}
            />
        </FormControl>
    )
}