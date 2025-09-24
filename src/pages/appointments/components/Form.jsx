import { FormControl, TextField, InputLabel, Select, MenuItem } from '@mui/material'
import { useState } from 'react';


export const Form = ({ submitFunction, loading, errors }) => {

    const [mailDomain, setMailDomain] = useState('@gmail.com');
    const [selectedObraSocial, setSelectedObraSocial] = useState('');
    const validDomains = [
        "gmail.com", "hotmail.com", "outlook.com", "yahoo.com",
        "live.com", "icloud.com", "live.com.ar", "speedy.com.ar",
        "arnet.com.ar", "hotmail.com.ar", "yahoo.com.ar", "outlook.es", "icloud.com.ar"
    ]

    const obrasSociales = ["OSDE", "Swiss Medical", "Galeno", "Medifé", "IOMA"]
    const handleDomainChange = (event) => {
        setMailDomain(event.target.value);
    };

    return (
        <FormControl className="appointment-form gap-1rem" onSubmit={submitFunction} disabled={loading} error={!!errors} fullWidth>
            <div className="d-flex gap-1rem space-between">
                <TextField fullWidth margin="normal" label="Nombre" name="firstName" required error={!!errors?.firstName} helperText={errors?.firstName} color="primary" variant="standard" />
                <TextField fullWidth margin="normal" label="Apellido" name="lastName" required error={!!errors?.lastName} helperText={errors?.lastName} color="primary" variant="standard" />
            </div>
            <div className="d-flex gap-1rem space-between">
                <div className="d-flex gap-1rem full-width">
                    <TextField fullWidth margin="normal" label="Email" name="email" type="email" required error={!!errors?.email} helperText={errors?.email} color="primary" variant="standard" />
                    <span style={{ marginTop: '2rem' }}>@</span>
                    <FormControl fullWidth margin="normal" variant="standard" sx={{ marginTop: '2rem' }}>
                        <Select fullWidth margin="normal" label="Dominio" name="emailDomain" defaultValue={mailDomain} required error={!!errors?.emailDomain} onChange={handleDomainChange} color="primary" variant="standard">
                            {validDomains.map(domain => <MenuItem key={domain} value={`@${domain}`}>{domain}</MenuItem>)}
                        </Select>
                    </FormControl>
                </div>
                <TextField fullWidth margin="normal" label="Teléfono" name="phone" required error={!!errors?.phone} helperText={errors?.phone} color="primary" variant="standard" />
            </div>
            <h2>Datos del Paciente</h2>
            <div className="d-flex gap-1rem space-between">
                <TextField fullWidth margin="normal" label="Nombre" name="patientFirstName" required error={!!errors?.patientFirstName} helperText={errors?.patientFirstName} color="primary" variant="standard" />
                <TextField fullWidth margin="normal" label="Apellido" name="patientLastName" required error={!!errors?.patientLastName} helperText={errors?.patientLastName} color="primary" variant="standard" />
            </div>
            <div className="d-flex gap-1rem space-between">
                <TextField fullWidth margin="normal" label="DNI" name="patientDNI" required error={!!errors?.patientDNI} helperText={errors?.patientDNI} color="primary" variant="standard" />
                <TextField fullWidth margin="normal" label="Fecha de Nacimiento" name="patientDOB" type="date" InputLabelProps={{ shrink: true }} required error={!!errors?.patientDOB} helperText={errors?.patientDOB} color="primary" variant="standard" />
            </div>
            <div className="d-flex gap-1rem space-between">
                <FormControl fullWidth margin="normal" variant="standard">
                    <InputLabel id="obra-social-label">Obra Social</InputLabel>
                    <Select fullWidth margin="normal" labelId="obra-social-label" label="Obra Social" name="patientInsurance" value={selectedObraSocial} onChange={(e) => setSelectedObraSocial(e.target.value)} required error={!!errors?.patientInsurance} color="primary" variant="standard">
                        {obrasSociales.map(obra => <MenuItem key={obra} value={obra}>{obra}</MenuItem>)}
                    </Select>    
                </FormControl>
                <TextField fullWidth margin="normal" label="Número de Afiliado" name="patientInsuranceNumber" required error={!!errors?.patientInsuranceNumber} helperText={errors?.patientInsuranceNumber} color="primary" variant="standard" />
            </div>

        </FormControl>
    )
}