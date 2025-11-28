import { Button, Alert } from '@mui/material';
import { Title, DataDisplay } from '../../../components';
import dayjs from 'dayjs';
dayjs.locale('es');

export const AppointmentInfo = ({ data, confirm, loading, isMobile, isFormComplete }) => {

    return (
        <div>
            {data.patientFirstName && !isMobile &&
                <>
                    <Title text="Resumen del Turno" size="l" color="primary" />
                    <div className="appointment-summary">
                        {data.patientFirstName && <DataDisplay label="Nombre" value={`${data.patientFirstName} ${data.patientLastName || ''}`} />}
                        {data.email && <DataDisplay label="Email" value={`${data.email}${data.emailDomain}`} />}
                        {data.phone && <DataDisplay label="Teléfono" value={data.phone} />}
                        {data.patientDNI && <DataDisplay label="Documento" value={`${data.documentType || 'DNI'} ${data.patientDNI}`} />}
                        {data.patientDOB && <DataDisplay label="Fecha de Nacimiento" value={dayjs(data.patientDOB).format('DD [de] MMMM [de] YYYY')} />}
                        {data.patientInsurance && data.patientInsuranceNumber && <DataDisplay label="Obra Social" value={`${data.patientInsurance} - ${data.patientInsuranceNumber}`} />}
                        {data.appointmentDate && <DataDisplay label="Fecha del Turno" value={data.appointmentDate} />}
                        {data.appointmentTime && <DataDisplay label="Horario del Turno" value={data.appointmentTime} />}
                        {data.biologicalSex && <DataDisplay label="Sexo Biológico" value={data.biologicalSex} />}
                    </div>
                    {!isFormComplete && <Alert severity="warning" sx={{ marginTop: '1rem' }}>
                        Debes rellenar todos los campos del formulario y seleccionar una fecha y un horario para poder confirmar el turno.
                    </Alert>
                    }
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={confirm}
                        disabled={loading || !isFormComplete}
                        sx={{ marginTop: '2rem' }}
                        type='button'
                    >
                        {loading ? 'Confirmando...' : 'Confirmar Turno'}
                    </Button>
                </>
            }
        </div>
    )
}