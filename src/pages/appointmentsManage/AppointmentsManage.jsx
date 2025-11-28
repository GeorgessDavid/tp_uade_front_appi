import { TableRow, TableCell, Chip } from '@mui/material';
import { Table, SelectChip } from '../../components';
import { useTurnos } from '../../hooks';
import dayjs from 'dayjs';

import './AppointmentsManage.css';

const AppointmentsManagePage = () => {
    const appointmentStatusOptions = [{
        label: 'Solicitado',
        value: 'Solicitado',
        color: 'secondary'
    }, {
        label: 'Cancelado',
        value: 'Cancelado',
        color: 'error'
    }, {
        label: 'Confirmado',
        value: 'Confirmado',
        color: 'info'
    }, {
        label: 'Atendido',
        value: 'Atendido',
        color: 'success'
    }, {
        label: 'En Espera',
        value: 'En_Espera',
        color: 'warning'
    }
    ];

    const { turnos: appointments, loading, updateTurno } = useTurnos();

    const handleStatusChange = (appointmentId, newStatus) => {
        // Lógica para actualizar el estado del turno en el backend
        updateTurno(appointmentId, { estado: newStatus });
    };

    const renderStatusChip = (appointment) => {
        const statusOption = appointmentStatusOptions.find(estado => appointment.estado === estado.value);
        const isLocked = appointment.estado === 'Cancelado' || appointment.estado === 'Atendido';

        if (isLocked && statusOption) {
            return (
                <Chip
                    label={statusOption.label}
                    color={statusOption.color}
                    variant="filled"
                />
            );
        }

        return (
            <SelectChip
                onClick={(e) => handleStatusChange(appointment.id, e.target.value)}
                options={appointmentStatusOptions}
                defaultValue={statusOption ? appointment.estado : appointmentStatusOptions[0].value}
            />
        );
    };

    return (
        <div className="appointments-manage-page">
            <h1>Gestión de Turnos</h1>
            <div className="appointments-manage-content">
                <Table columns={["Fecha", "Hora", "Paciente", "Documento", "Estado"]} loading={loading} placeholder={[1, 2, 3]}>
                    {appointments.map((appointment, index) => (
                        <TableRow key={index}>
                            <TableCell sx={{ textAlign: 'center' }}>{dayjs(appointment.fecha).format('DD/MM/YYYY')}</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>{appointment.hora}</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>{appointment.paciente.nombre + ' ' + appointment.paciente.apellido}</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>{appointment.paciente.tipoDocumento + ' ' + appointment.paciente.documento}</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>{renderStatusChip(appointment)}</TableCell>
                        </TableRow>
                    ))}
                </Table>
            </div>
        </div >
    )
}

export default AppointmentsManagePage;