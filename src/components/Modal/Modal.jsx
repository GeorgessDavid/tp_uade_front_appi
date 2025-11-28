import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

/**
 * 
 * @param {boolean} open - Indica si el modal está abierto.
 * @param {Function} onClose - Función que se ejecuta al cerrar el modal.
 * @param {String} title - Título del modal.
 * @param {JSX.Element} children - Contenido del modal.
 * @param {Array} actions - Array de acciones (botones) a mostrar en el modal. Cada acción debe tener las propiedades: label (texto del botón), onClick (función a ejecutar al hacer click) y color (color del botón). 
 * @returns 
 */

const Modal = ({ open, onClose, title, children, actions, maxWidth = "sm" }) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth={maxWidth}>
            <DialogTitle sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>{title}
                <Tooltip title="Cerrar" arrow>
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </Tooltip>
            </DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                {actions.map((action, index) => (
                    <Button key={index} onClick={action.onClick} color={action.color}>
                        {action.label}
                    </Button>
                ))}
            </DialogActions>
        </Dialog>
    )
}

export default Modal;