import { Modal } from '../index';
import './DataBox.css';

const DataBox = ({ title, description,children, open, onClose }) => {
    return (
        <div className="data-box">
            <h2>{title}</h2>
            <h3>{description}</h3>
            <Modal open={open} onClose={onClose} title={title} actions={[]}>
                {children}
            </Modal>
        </div>
    )
}

export default DataBox;