import { TableRow, TableCell } from '@mui/material';
import { Table, SelectChip } from '../../components';
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
    }];
    const rows = [
        ["1", "15/03/2023", "10:00", "Juan Pérez", <SelectChip onClick={() => { }} options={appointmentStatusOptions}  defaultValue={appointmentStatusOptions[0]} />],
        ["2", "16/03/2023", "11:00", "María Gómez", <SelectChip onClick={() => { }} options={appointmentStatusOptions} defaultValue={appointmentStatusOptions[1]} />],
        ["3", "17/03/2023", "12:00", "Carlos López", <SelectChip onClick={() => { }} options={appointmentStatusOptions}  defaultValue={appointmentStatusOptions[2]} />],
    ]

    return (
        <div className="appointments-manage-page">
            <h1>Gestión de Turnos</h1>
            <div className="appointments-manage-content">
                <Table columns={["ID", "Fecha", "Hora", "Paciente", "Estado"]} loading={false} placeholder={[1, 2, 3]}>
                    {rows.map((row, index) => (
                        <TableRow key={index}>
                            {row.map((cell, cellIndex) => (
                                <TableCell sx={{ textAlign: 'center' }} key={cellIndex}>{cell}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </Table>
            </div>
        </div >
    )
}

export default AppointmentsManagePage;