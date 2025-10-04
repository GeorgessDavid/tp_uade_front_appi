import './InsurancePage.css';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { WrappedButton, Modal, SearchInput, Title, Dropzone, DataBox } from '../../components';
import { TextField, Avatar, FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import { obrasSociales } from '../../data/obrasSociales';
import { toast } from 'react-toastify';

const InsurancePage = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [logoFile, setLogoFile] = useState(null);
    const [openModals, setOpenModals] = useState({});
    const [editMode, setEditMode] = useState({});
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [selectedInsurance, setSelectedInsurance] = useState(null);
    const [editData, setEditData] = useState({});

    const handleModal = () => {
        setModalOpen(!modalOpen);
    }

    const handleInsuranceModalToggle = (index, obra) => {
        if (!openModals[index]) {
            // Al abrir el modal, inicializar los datos de edición
            setEditData({
                [index]: {
                    siglas: obra.siglas,
                    nombre: obra.nombre,
                    tipo: obra.tipo
                }
            });
            setEditMode({ [index]: false });
        }
        setOpenModals(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    }

    const handleEditMode = (index) => {
        setEditMode(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    }

    const handleDeleteClick = (index, obra) => {
        setSelectedInsurance({ index, obra });
        setDeleteConfirmOpen(true);
    }

    const handleDeleteConfirm = () => {
        // Aquí puedes manejar la eliminación de la obra social
        console.log('Eliminando obra social:', selectedInsurance);
        toast.success(`Cobertura médica "${selectedInsurance.obra.siglas}" eliminada exitosamente`);
        setDeleteConfirmOpen(false);
        setOpenModals(prev => ({
            ...prev,
            [selectedInsurance.index]: false
        }));
        setSelectedInsurance(null);
    }

    const handleDeleteCancel = () => {
        setDeleteConfirmOpen(false);
        setSelectedInsurance(null);
    }

    const handleEditChange = (index, field, value) => {
        setEditData(prev => ({
            ...prev,
            [index]: {
                ...prev[index],
                [field]: value
            }
        }));
    }

    const handleSaveEdit = (index) => {
        // Aquí puedes manejar el guardado de la edición
        console.log('Guardando cambios:', editData[index]);
        toast.success(`Cobertura médica "${editData[index].siglas}" actualizada exitosamente`);
        setEditMode(prev => ({
            ...prev,
            [index]: false
        }));
    }

    const handleLogoChange = (file) => {
        setLogoFile(file);
    }

    const handleSave = () => {
        // Aquí puedes manejar el guardado de los datos junto con el archivo de logo
        console.log('Logo file:', logoFile);
        toast.success('Cobertura médica agregada exitosamente');
        // Cerrar el modal después de guardar
        handleModal();
    }

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
                            onClose={() => handleInsuranceModalToggle(index, obra)}
                            onClick={() => handleInsuranceModalToggle(index, obra)}
                            onEdit={() => handleEditMode(index)}
                            onDelete={() => handleDeleteClick(index, obra)}
                            editMode={editMode[index]}
                            onSave={() => handleSaveEdit(index)}
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                                <Avatar
                                    alt={obra.siglas}
                                    src={`/${obra.logo}`}
                                    sx={{ width: 100, height: 100 }}
                                />
                                <div style={{ width: '100%' }}>
                                    {editMode[index] ? (
                                        <>
                                            <TextField
                                                fullWidth
                                                label="Siglas"
                                                variant="outlined"
                                                margin="normal"
                                                value={editData[index]?.siglas || ''}
                                                onChange={(e) => handleEditChange(index, 'siglas', e.target.value)}
                                            />
                                            <TextField
                                                fullWidth
                                                label="Nombre Completo"
                                                variant="outlined"
                                                margin="normal"
                                                value={editData[index]?.nombre || ''}
                                                onChange={(e) => handleEditChange(index, 'nombre', e.target.value)}
                                            />
                                            <FormControl fullWidth margin="normal">
                                                <InputLabel id={`tipo-label-${index}`}>Tipo</InputLabel>
                                                <Select
                                                    labelId={`tipo-label-${index}`}
                                                    label="Tipo"
                                                    value={editData[index]?.tipo || ''}
                                                    onChange={(e) => handleEditChange(index, 'tipo', e.target.value)}
                                                >
                                                    <MenuItem value="Prepaga">Prepaga</MenuItem>
                                                    <MenuItem value="Obra Social">Obra Social</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </>
                                    ) : (
                                        <>
                                            <p><strong>Siglas:</strong> {obra.siglas}</p>
                                            <p><strong>Nombre Completo:</strong> {obra.nombre}</p>
                                            <p><strong>Tipo:</strong> {obra.tipo}</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </DataBox>
                    ))}
                </div>
            </div>
            
            {/* Modal de confirmación de eliminación */}
            <Modal 
                open={deleteConfirmOpen} 
                onClose={handleDeleteCancel} 
                title="Confirmar Eliminación" 
                actions={[
                    { label: 'Cancelar', onClick: handleDeleteCancel, color: 'primary' }, 
                    { label: 'Eliminar', onClick: handleDeleteConfirm, color: 'error' }
                ]}
            >
                <p>¿Está seguro que desea eliminar esta cobertura médica?</p>
                {selectedInsurance && (
                    <p><strong>{selectedInsurance.obra.siglas}</strong> - {selectedInsurance.obra.nombre}</p>
                )}
            </Modal>
        </div>
    )
}

export default InsurancePage;