import { Section } from '../../components';
import { Divider, useMediaQuery, Chip } from '@mui/material';
import { Form } from './components/Form';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { esES } from '@mui/x-date-pickers/locales';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import 'dayjs/locale/es';
import dayjs from 'dayjs'
dayjs().locale('es');
import './AppointmentsPage.css';

const AppointmentsPage = () => {
    // TODO - SANITIZE COMPONENTS
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [selectedTime, setSelectedTime] = useState(null);
    const isMobile = useMediaQuery('(max-width:600px)');

    const horarios = [
        { value: '09:00', label: '09:00' },
        { value: '09:10', label: '09:10' },
        { value: '09:20', label: '09:20' },
        { value: '09:30', label: '09:30' },
        { value: '09:40', label: '09:40' },
        { value: '09:50', label: '09:50' },
        { value: '10:00', label: '10:00' }]

    return (
        <Section title="Sacar Turno" className="appointments-page">
            <div className='full-width'>
                <span>Para sacar un turno, por favor, complete el siguiente formulario.</span>
                <Form submitFunction={() => { }} loading={false} errors={{}} />
            </div>
            <Divider orientation="vertical" sx={{ margin: '2rem' }} variant='middle' />
            <div className='full-width'>
                <h3>Seleccione una fecha en el calendario:</h3>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es" localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText}>
                    <StaticDatePicker orientation={isMobile ? "portrait" : "landscape"} disablePast maxDate={dayjs().add(2, 'week')} value={selectedDate} onChange={setSelectedDate} />
                </LocalizationProvider>
                <Divider sx={{ margin: '2rem 0' }} variant='middle' />
                <div>
                    <h3>Horarios disponibles:</h3>
                    {horarios.map(horario => (
                        <Chip key={horario.value} clickable label={horario.label} color="primary" variant={selectedTime === horario.value ? "filled" : "outlined"} sx={{ margin: '0.5rem' }} onClick={() => setSelectedTime(horario.value)} />
                    ))}
                </div>

            </div>
        </Section>
    )
}

export default AppointmentsPage;