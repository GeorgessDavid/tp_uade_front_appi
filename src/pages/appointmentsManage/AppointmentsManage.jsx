import { TableRow, TableCell, Chip } from '@mui/material';
import { Table, SelectChip } from '../../components';
import { toast } from 'react-toastify';
import { useState } from 'react';
import './AppointmentsManage.css';

const AppointmentsManagePage = () => {
    const appointmentStatusOptions = [{
        label: 'En Espera',
        value: 'En Espera',
        color: 'primary'
    }, {
        label: 'Cancelado',
        value: 'Cancelado',
        color: 'error'
    }, {
        label: 'Pendiente',
        value: 'Pendiente',
        color: 'warning'
    }, {
        label: 'Atendido',
        value: 'Atendido',
        color: 'success'
    }];

    const [appointments, setAppointments] = useState([
        { id: "1", date: "15/03/2023", time: "10:00", patient: "Juan Pérez", status: appointmentStatusOptions[0] },
        { id: "2", date: "16/03/2023", time: "11:00", patient: "María Gómez", status: appointmentStatusOptions[1] },
        { id: "3", date: "17/03/2023", time: "12:00", patient: "Carlos López", status: appointmentStatusOptions[2] },
    ]);

    const handleStatusChange = (appointmentId, newStatus) => {
        setAppointments(prev => prev.map(apt => 
            apt.id === appointmentId 
                ? { ...apt, status: appointmentStatusOptions.find(opt => opt.value === newStatus) }
                : apt
        ));
        toast.success(`Estado del turno actualizado a: ${newStatus}`);
    };

    const renderStatusChip = (appointment) => {
        const isLocked = appointment.status.value === 'Cancelado' || appointment.status.value === 'Atendido';
        
        if (isLocked) {
            return (
                <Chip 
                    label={appointment.status.label} 
                    color={appointment.status.color} 
                    variant="filled"
                />
            );
        }
        
        return (
            <SelectChip 
                onClick={(e) => handleStatusChange(appointment.id, e.target.value)} 
                options={appointmentStatusOptions}  
                defaultValue={appointment.status} 
            />
        );
    };

    return (
        <div className="appointments-manage-page">
            <h1>Gestión de Turnos</h1>
            <div className="appointments-manage-content">
                <Table columns={["ID", "Fecha", "Hora", "Paciente", "Estado"]} loading={false} placeholder={[1, 2, 3]}>
                    {appointments.map((appointment, index) => (
                        <TableRow key={index}>
                            <TableCell sx={{ textAlign: 'center' }}>{appointment.id}</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>{appointment.date}</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>{appointment.time}</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>{appointment.patient}</TableCell>
                            <TableCell sx={{ textAlign: 'center' }}>{renderStatusChip(appointment)}</TableCell>
                        </TableRow>
                    ))}
                </Table>
            </div>
        </div >
    )
}

export default AppointmentsManagePage;