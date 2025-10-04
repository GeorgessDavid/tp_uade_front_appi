import { Avatar, Tooltip } from '@mui/material';
import { Modal } from '../index';
import './DataBox.css';

const DataBox = ({ title, description, children, open, onClose, logo, onClick, noTooltip, onEdit, onDelete, editMode, onSave}) => {
    const handleEditClick = () => {
        if (editMode) {
            // Si está en modo edición, guardar los cambios
            onSave?.();
        } else {
            // Si no está en modo edición, activar modo edición
            onEdit?.();
        }
    };

    const handleDeleteClick = () => {
        onDelete?.();
    };

    const actions = [
        { 
            label: editMode ? 'Guardar' : 'Editar', 
            onClick: handleEditClick, 
            color: 'primary'
        }, 
        { 
            label: 'Eliminar', 
            onClick: handleDeleteClick, 
            color: 'error' 
        }
    ];

    return (
        <>
            <Tooltip title="Click para más detalles" arrow disableHoverListener={noTooltip}>
                <div className="data-box" onClick={onClick} style={{ cursor: 'pointer' }}>
                    <Avatar alt={title} src={`/${logo}`} />
                    <div className="col">
                        <h2>{title}</h2>
                        <h3>{description}</h3>
                    </div>
                </div>
            </Tooltip>
            <Modal open={open} onClose={onClose} title={title} actions={actions}>
                {children}
            </Modal>
        </>
    )
}

export default DataBox;