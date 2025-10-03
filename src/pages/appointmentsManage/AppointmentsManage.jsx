import { Chip, TableRow, TableCell } from '@mui/material';
import { Table } from '../../components';
import './AppointmentsManage.css';

const AppointmentsManagePage = () => {
    const rows = [
        ["1", "2023-03-15", "10:00", "Juan Pérez", <Chip label="Activo" color="success" variant="filled" />],
        ["2", "2023-03-16", "11:00", "María Gómez", <Chip label="Cancelado" color="error" variant="filled" />],
        ["3", "2023-03-17", "12:00", "Carlos López", <Chip label="Pendiente" color="warning" variant="filled" />],
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