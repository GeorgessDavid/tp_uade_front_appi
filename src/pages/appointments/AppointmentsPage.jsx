import { Section, Title } from '../../components';
import { Divider, useMediaQuery, Chip, Button, Alert } from '@mui/material';
import { Form } from './components/Form';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { esES } from '@mui/x-date-pickers/locales';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import 'dayjs/locale/es';
import dayjs from 'dayjs'
dayjs().locale('es');
import './AppointmentsPage.css';

const AppointmentsPage = () => {
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [selectedTime, setSelectedTime] = useState(null);
    const [loading, setLoading] = useState(false);
    const [occupiedSlots, setOccupiedSlots] = useState({});
    const formRef = useRef(null);
    const isMobile = useMediaQuery('(max-width:600px)');

    useEffect(() => {
        setSelectedTime(null);
    }, [selectedDate])

    // Simular horarios ocupados (esto vendría del backend en producción)
    useEffect(() => {
        // Ejemplo de horarios ocupados por fecha
        const mockOccupiedSlots = {
            [dayjs().format('YYYY-MM-DD')]: ['09:00', '09:30', '10:00'],
            [dayjs().add(1, 'day').format('YYYY-MM-DD')]: ['09:10', '09:40'],
            [dayjs().add(2, 'day').format('YYYY-MM-DD')]: ['09:20', '09:50'],
        };
        setOccupiedSlots(mockOccupiedSlots);
    }, [])

    const horarios = [
        { value: '09:00', label: '09:00' },
        { value: '09:10', label: '09:10' },
        { value: '09:20', label: '09:20' },
        { value: '09:30', label: '09:30' },
        { value: '09:40', label: '09:40' },
        { value: '09:50', label: '09:50' },
        { value: '10:00', label: '10:00' }
    ]

    // Función para enviar el turno
    const handleSubmitAppointment = async (data) => {
        if (!selectedTime) {
            toast.error('Por favor, seleccione un horario');
            return;
        }

        setLoading(true);

        try {
            // Preparar los datos del turno
            const appointmentData = {
                ...data,
                email: `${data.email}${data.emailDomain}`,
                appointmentDate: selectedDate.format('YYYY-MM-DD'),
                appointmentTime: selectedTime,
                status: 'Solicitada'
            };

            // Simular llamada a API (aquí se haría la llamada al backend)
            await new Promise(resolve => setTimeout(resolve, 1500));

            console.log('Datos del turno:', appointmentData);

            // Agregar el horario a los ocupados
            const dateKey = selectedDate.format('YYYY-MM-DD');
            setOccupiedSlots(prev => ({
                ...prev,
                [dateKey]: [...(prev[dateKey] || []), selectedTime]
            }));

            // Resetear el formulario
            if (formRef.current) {
                formRef.current.reset();
            }

            // Resetear estados
            setSelectedTime(null);
            setSelectedDate(dayjs());

            // Mostrar mensaje de éxito
            toast.success('Turno agendado con éxito');

        } catch (error) {
            console.error('Error al agendar turno:', error);
            toast.error('Error al agendar el turno. Por favor, intente nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    // Verificar si un horario está ocupado
    const isTimeSlotOccupied = (timeValue) => {
        const dateKey = selectedDate.format('YYYY-MM-DD');
        return occupiedSlots[dateKey]?.includes(timeValue) || false;
    };

    return (
        <Section title="Reservar Turno" className="appointments-page">
            <div className='full-width'>
                <Alert severity="info" sx={{ marginBottom: '1rem' }}>
                    Por favor, complete el formulario, seleccione una fecha y un horario para agendar su turno.
                </Alert>
                <Form
                    ref={formRef}
                    submitFunction={handleSubmitAppointment}
                    loading={loading}
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
                            {horarios.map(horario => {
                                const isOccupied = isTimeSlotOccupied(horario.value);
                                return (
                                    <Chip
                                        key={horario.value}
                                        clickable={!isOccupied}
                                        disabled={isOccupied}
                                        label={isOccupied ? `${horario.label} (Ocupado)` : horario.label}
                                        color="primary"
                                        variant={selectedTime === horario.value ? "filled" : "outlined"}
                                        sx={{
                                            margin: '0.5rem',
                                            opacity: isOccupied ? 0.5 : 1,
                                            cursor: isOccupied ? 'not-allowed' : 'pointer'
                                        }}
                                        onClick={() => !isOccupied && setSelectedTime(horario.value)}
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>

                {isMobile && <Button variant="contained" color="primary" onClick={handleSubmitAppointment} disabled={loading || !selectedTime} sx={{ marginTop: '2rem' }} type='submit'>
                    {loading ? 'Confirmando...' : 'Confirmar Turno'}
                </Button>}
            </div>
        </Section>
    )
}

export default AppointmentsPage;