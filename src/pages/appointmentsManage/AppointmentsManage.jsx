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
        label: 'Ausente',
        value: 'Ausente',
        color: 'error'
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

    const getAvailableStatusOptions = (currentStatus) => {
        // Estados bloqueados que no pueden cambiar
        if (currentStatus === 'Cancelado' || currentStatus === 'Atendido' || currentStatus === 'Ausente') {
            return [];
        }

        const currentOption = appointmentStatusOptions.find(opt => opt.value === currentStatus);

        // Si está Confirmado, no puede volver a Solicitado
        if (currentStatus === 'Confirmado') {
            const availableOptions = appointmentStatusOptions.filter(option => 
                option.value !== 'Solicitado'
            );
            // Asegurar que la opción actual esté primera
            return currentOption ? [currentOption, ...availableOptions.filter(opt => opt.value !== currentStatus)] : availableOptions;
        }

        // Si está En Espera, no puede volver a Confirmado ni a Solicitado
        if (currentStatus === 'En_Espera') {
            const availableOptions = appointmentStatusOptions.filter(option => 
                option.value === 'Cancelado' || option.value === 'Ausente' || option.value === 'Atendido'
            );
            // Incluir el estado actual primero
            return currentOption ? [currentOption, ...availableOptions] : availableOptions;
        }

        // Para Solicitado, puede ir a cualquier estado
        return appointmentStatusOptions;
    };

    const renderStatusChip = (appointment) => {
        const statusOption = appointmentStatusOptions.find(estado => appointment.estado === estado.value);
        const availableOptions = getAvailableStatusOptions(appointment.estado);
        const isLocked = availableOptions.length === 0;

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
                options={availableOptions}
                allOptions={appointmentStatusOptions}
                defaultValue={statusOption ? appointment.estado : appointmentStatusOptions[0].value}
            />
        );
    };

    return (
        <div className="appointments-manage-page">
            <h1>Gestión de Turnos</h1>
            <div className="appointments-manage-content">
                <Table columns={["Fecha", "Hora", "Paciente", "Documento", "Obra Social", "Estado"]} loading={loading} placeholder={[1, 2, 3]}>
                    {appointments.map((appointment, index) => (
                        <TableRow key={index}>
                            <TableCell sx={{ textAlign: 'center' }}>{dayjs(appointment.fecha).format('DD/MM/YYYY')}</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>{appointment.hora}</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>{appointment.paciente.nombre + ' ' + appointment.paciente.apellido}</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>{appointment.paciente.tipoDocumento + ' ' + appointment.paciente.documento}</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>{appointment.paciente.obraSocial.siglas}</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>{renderStatusChip(appointment)}</TableCell>
                        </TableRow>
                    ))}
                </Table>
            </div>
        </div >
    )
}

export default AppointmentsManagePage;