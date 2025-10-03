import { Avatar, Tooltip } from '@mui/material';
import { Modal } from '../index';
import './DataBox.css';

const DataBox = ({ title, description, children, open, onClose, logo, onClick }) => {
    return (
        <>
            <Tooltip title="Click para más detalles" arrow>
                <div className="data-box" onClick={onClick} style={{ cursor: 'pointer' }}>
                    <Avatar alt={title} src={`/${logo}`} />
                    <div className="col">
                        <h2>{title}</h2>
                        <h3>{description}</h3>
                    </div>
                </div>
            </Tooltip>
            <Modal open={open} onClose={onClose} title={title} actions={[{ label: 'Cerrar', onClick: onClose, color: 'primary' }]}>
                {children}
            </Modal>
        </>
    )
}

export default DataBox;