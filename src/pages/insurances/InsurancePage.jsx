import './InsurancePage.css';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { WrappedButton, Modal, SearchInput, Title, Dropzone, DataBox } from '../../components';
import { TextField, Avatar, FormControl, Select, InputLabel, MenuItem } from '@mui/material';

const InsurancePage = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [logoFile, setLogoFile] = useState(null);
    const [openModals, setOpenModals] = useState({});

    const handleModal = () => {
        setModalOpen(!modalOpen);
    }

    const handleInsuranceModalToggle = (index) => {
        setOpenModals(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    }

    const handleLogoChange = (file) => {
        setLogoFile(file);
    }

    const handleSave = () => {
        // Aquí puedes manejar el guardado de los datos junto con el archivo de logo
        console.log('Logo file:', logoFile);
        // Cerrar el modal después de guardar
        handleModal();
    }

    const obrasSociales = [
        {
            siglas: 'OSDE',
            nombre: 'Organización de Servicios Directos Empresarios',
            logo: 'Osde_medicina_logo.png',
            tipo: 'Prepaga'
        }, {
            siglas: 'Swiss Medical',
            nombre: 'Swiss Medical Group',
            logo: 'swiss_medical.png',
            tipo: 'Prepaga'
        },
        {
            siglas: 'Galeno',
            nombre: 'Galeno Argentina',
            logo: 'galeno-logo.jpg',
            tipo: 'Prepaga'
        }, {
            siglas: 'PAMI',
            nombre: 'Programa de Atención Médica Integral',
            logo: 'pami_logo.png',
            tipo: 'Obra Social'
        },
        {
            siglas: 'OBsBA',
            nombre: 'Obra Social de la Ciudad de Buenos Aires',
            logo: 'obsba_logo.png',
            tipo: 'Obra Social'
        }

    ]
    return (
        <div className="insurance-page">
            <h1>Obras Sociales</h1>
            <WrappedButton text="Agregar" action={handleModal} icon={<AddIcon />} />
            <Modal open={modalOpen} onClose={handleModal} title="Agregar Obra Social" actions={[{ label: 'Cancelar', onClick: handleModal, color: 'error' }, { label: 'Guardar', onClick: handleSave, color: 'primary' }]}>
                <TextField fullWidth label="Siglas" variant="outlined" margin="normal" required />
                <TextField fullWidth label="Nombre" variant="outlined" margin="normal" required />
                <FormControl fullWidth margin="normal" required>
                    <InputLabel id="tipo-label">Tipo</InputLabel>
                    <Select labelId="tipo-label" label="Tipo" defaultValue="">
                        <MenuItem value="Prepaga">Prepaga</MenuItem>
                        <MenuItem value="Obra Social">Obra Social</MenuItem>
                    </Select>
                </FormControl>
                <div>
                    <Title text="Logo" size='l' />
                    <Dropzone onFileChange={handleLogoChange} />
                </div>
            </Modal>
            <div className="insurance-page-content">
                <SearchInput placeholder="Buscar obra social..." onChange={() => { }} />
                <div className="insurance-list">
                    {obrasSociales.map((obra, index) => (
                        <DataBox
                            key={index}
                            title={obra.siglas}
                            description={obra.nombre}
                            logo={obra.logo}
                            open={openModals[index] || false}
                            onClose={() => handleInsuranceModalToggle(index)}
                            onClick={() => handleInsuranceModalToggle(index)}
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                                <Avatar
                                    alt={obra.siglas}
                                    src={`/${obra.logo}`}
                                    sx={{ width: 100, height: 100 }}
                                />
                                <div style={{ width: '100%' }}>
                                    <p><strong>Siglas:</strong> {obra.siglas}</p>
                                    <p><strong>Nombre Completo:</strong> {obra.nombre}</p>
                                    <p><strong>Tipo:</strong> {obra.tipo}</p>
                                </div>
                            </div>
                        </DataBox>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default InsurancePage;