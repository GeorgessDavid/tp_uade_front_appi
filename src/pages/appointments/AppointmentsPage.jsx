import { Section, Title } from '../../components';
import { Divider, useMediaQuery, Chip, Button, Alert } from '@mui/material';
import { Form } from './components/Form';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { esES } from '@mui/x-date-pickers/locales';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useHorarioAtencion, useTurnos } from '../../hooks';
import { useState, useEffect, useRef } from 'react';
// import { toast } from 'react-toastify';
import 'dayjs/locale/es';
import dayjs from 'dayjs'
dayjs().locale('es');
import './AppointmentsPage.css';

const AppointmentsPage = () => {
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [selectedTime, setSelectedTime] = useState(null);
    // const [loading, setLoading] = useState(false);
    
    const formRef = useRef(null);
    const isMobile = useMediaQuery('(max-width:600px)');

    const { horasDisponibles: horarios, fetchHorasDisponibles } = useHorarioAtencion();
    const { createTurno, loading: creatingTurno } = useTurnos();
    
    useEffect(() => {
        setSelectedTime(null);
    }, [selectedDate])

    useEffect(() => {
        const dia = selectedDate.format('d')
        fetchHorasDisponibles(selectedDate.format('YYYY-MM-DD'), dia);
    }, [selectedDate, fetchHorasDisponibles])

    const handleSubmitForm = (formData) => {
        const turnoData = {
            fecha: selectedDate.format('YYYY-MM-DD'),
            hora: selectedTime,
            Profesional_id: 2,
            paciente:{
                nombre: formData.patientFirstName,
                apellido: formData.patientLastName,
                email: formData.email + formData.emailDomain,
                tipoDocumento: formData.documentType,
                documento: formData.patientDNI,
                fechaNacimiento: formData.patientDOB,
                ObraSocial_id: formData.patientInsurance,
                numeroAfiliado: formData.patientInsuranceNumber,
                telefono: formData.phone,
                sexo_biologico: formData.biologicalSex
            }
        };
        createTurno(turnoData);
    };


    return (
        <Section title="Reservar Turno" className="appointments-page">
            <div className='full-width'>
                <Alert severity="info" sx={{ marginBottom: '1rem' }}>
                    Por favor, complete el formulario, seleccione una fecha y un horario para agendar su turno.
                </Alert>
                <Form
                    ref={formRef}
                    submitFunction={handleSubmitForm}
                    loading={creatingTurno}
                    errors={{}}
                    selectedDate={selectedDate}
                    selectedTime={selectedTime}
                    isMobile={isMobile}
                />
            </div>
            <Divider orientation={isMobile ? "horizontal" : "vertical"} sx={{ margin: '2rem' }} variant='middle' />
            <div className='full-width'>
                <Title text="2. Seleccione una fecha" size="l" color="primary" />
                <LocalizationProvider sx={{ margin: '2rem 0' }} dateAdapter={AdapterDayjs} adapterLocale="es" localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText}>
                    <StaticDatePicker orientation={isMobile ? "portrait" : "landscape"} disablePast maxDate={dayjs().add(2, 'week')} value={selectedDate} onChange={setSelectedDate}
                        slotProps={{
                            actionBar: { actions: ['today'] },
                            toolbar: {
                                toolbarFormat: 'dddd, D [de] MMMM',
                                toolbarPlaceholder: 'Seleccione una fecha'
                            }
                        }}
                    />
                </LocalizationProvider>
                <Divider sx={{ margin: '2rem 0' }} variant='middle' />
                <div>
                    <Title text="3. Seleccione un horario" size="l" color="primary" />

                    {selectedDate.format('dddd') === 'domingo' ? (
                        <span>Los domingos no hay atención.</span>
                    ) : (
                        <div>
                            {Array.isArray(horarios) && horarios.map((horario, index) => {
                                return (
                                    <Chip
                                        key={index}
                                        clickable
                                        label={horario}
                                        color="primary"
                                        variant={selectedTime === horario ? "filled" : "outlined"}
                                        sx={{
                                            margin: '0.5rem',
                                            opacity: 1,
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => setSelectedTime(horario)}
                                    />
                                );
                            })}
                            {!Array.isArray(horarios) && (<div style={{ marginTop: '1rem' }}>{horarios}</div>)}
                        </div>
                    )}
                </div>

                {isMobile && <Button variant="contained" color="primary" onClick={() => {
                    if (formRef.current) {
                        formRef.current.submitForm();
                    }
                }} disabled={creatingTurno || !selectedTime} sx={{ marginTop: '2rem' }} type='button'>
                    {creatingTurno ? 'Confirmando...' : 'Confirmar Turno'}
                </Button>}
            </div>
        </Section>
    )
}

export default AppointmentsPage;