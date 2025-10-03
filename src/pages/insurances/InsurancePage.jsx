import './InsurancePage.css';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { WrappedButton, Modal, SearchInput } from '../../components';
import { TextField } from '@mui/material';

const InsurancePage = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleModal = () => {
        setModalOpen(!modalOpen);
    }
    return (
        <div className="insurance-page">
            <h1>Obras Sociales</h1>
            <WrappedButton text="Agregar" action={handleModal} icon={<AddIcon />} />
            <Modal open={modalOpen} onClose={handleModal} title="Agregar Obra Social" actions={[{ label: 'Cancelar', onClick: handleModal, color: 'error' }, { label: 'Guardar', onClick: () => { }, color: 'primary' }]}>
                <TextField fullWidth label="Siglas" variant="outlined" margin="normal" required/>
                <TextField fullWidth label="Nombre" variant="outlined" margin="normal" required />
                <TextField fullWidth label="Planes" variant="outlined" margin="normal" />
            </Modal>
            <div className="insurance-page-content">
                <SearchInput placeholder="Buscar obra social..." onChange={() => { }} />
                <div className="insurance-list">
                    
                </div>
            </div>
        </div>
    )
}

export default InsurancePage;