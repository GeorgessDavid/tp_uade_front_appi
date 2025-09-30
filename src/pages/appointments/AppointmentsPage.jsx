import { Section, Title } from '../../components';
import { Divider, useMediaQuery, Chip, Button } from '@mui/material';
import { Form } from './components/Form';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { esES } from '@mui/x-date-pickers/locales';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState, useEffect } from 'react';
import 'dayjs/locale/es';
import dayjs from 'dayjs'
dayjs().locale('es');
import './AppointmentsPage.css';

const AppointmentsPage = () => {
    // TODO - SANITIZE COMPONENTS
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [selectedTime, setSelectedTime] = useState(null);
    const isMobile = useMediaQuery('(max-width:600px)');

    useEffect(() => {
        setSelectedTime(null);
    }, [selectedDate])

    const horarios = [
        { value: '09:00', label: '09:00' },
        { value: '09:10', label: '09:10' },
        { value: '09:20', label: '09:20' },
        { value: '09:30', label: '09:30' },
        { value: '09:40', label: '09:40' },
        { value: '09:50', label: '09:50' },
        { value: '10:00', label: '10:00' }
    ]

    return (
        <Section title="Reservar Turno" className="appointments-page">
            <div className='full-width'>
                <span>Para sacar un turno, por favor, complete el siguiente formulario.</span>
                <Form submitFunction={() => { }} loading={false} errors={{}} selectedDate={selectedDate} selectedTime={selectedTime} />
            </div>
            <Divider orientation="vertical" sx={{ margin: '2rem' }} variant='middle' />
            <div className='full-width'>
                <Title text="2. Seleccione una fecha" size="l" color="primary" />
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es" localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText}>
                    <StaticDatePicker orientation={isMobile ? "portrait" : "landscape"} disablePast maxDate={dayjs().add(2, 'week')} value={selectedDate} onChange={setSelectedDate}
                        slotProps={{
                            actionBar: { actions: ['today'] },
                            toolbar: { toolbarFormat: 'dddd, D [de] MMMM' }
                        }}
                    />
                </LocalizationProvider>
                <Divider sx={{ margin: '2rem 0' }} variant='middle' />
                <div>
                    <Title text="3. Seleccione un horario" size="l" color="primary" />

                    {selectedDate.format('dddd') === 'domingo' ? <span>Los domingos no hay atención.</span> :

                        horarios.map(horario => (
                            <Chip key={horario.value} clickable label={horario.label} color="primary" variant={selectedTime === horario.value ? "filled" : "outlined"} sx={{ margin: '0.5rem' }} onClick={() => setSelectedTime(horario.value)} />
                        ))

                    }
                </div>
            </div>
        </Section>
    )
}

export default AppointmentsPage;