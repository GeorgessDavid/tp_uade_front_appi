import { Table as MUITable, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Skeleton } from '@mui/material';


/**
 * Este componente renderiza la tabla armada de MUI Material con las columnas y filas pasadas por props.
 * También puede mostrar un placeholder de carga si la prop loading es true. 
 * @param {Array[String]} columns - Columnas de la tabla.
 * @param {Boolean} loading - Indica si la tabla está en estado de carga.
 * @param {Array} placeholder - Array que define la cantidad de celdas de carga a mostrar.
 * @param {Array} children - Filas de la tabla.
 * @param {String} size - Opcional. Tamaño de la tabla (small, medium).
 * @returns 
 */
const Table = ({ columns, loading, placeholder, children, size }) => {
    return (
        <TableContainer component={Paper}>
            <MUITable size={size || "small"}>
                <TableHead>
                    <TableRow>
                        {columns.map((column, index) => (
                            <TableCell key={index} sx={{ fontWeight: 'bold', textAlign: 'center' }}>{column}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ?
                        placeholder.map((_, index) => (
                            <TableRow key={index}>
                                <TableCell><Skeleton variant="text" size="small" /></TableCell>
                            </TableRow>
                        ))
                        :
                        children
                    }
                </TableBody>
            </MUITable>
        </TableContainer>
    )
}

export default Table;