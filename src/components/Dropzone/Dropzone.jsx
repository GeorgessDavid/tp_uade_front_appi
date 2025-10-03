import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import './Dropzone.css';

const Dropzone = ({ onFileChange, acceptedFileTypes = { 'image/*': [] }, maxSize = 5242880 }) => {
    const [previewImage, setPreviewImage] = useState(null);
    const [file, setFile] = useState(null);

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        if (rejectedFiles.length > 0) {
            toast.error('Por favor, selecciona solo archivos de imagen válidos (máximo 5MB)');
            return;
        }

        if (acceptedFiles.length > 0) {
            const selectedFile = acceptedFiles[0];
            setFile(selectedFile);
            
            // Crear preview de la imagen
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(selectedFile);
            
            // Llamar al callback del padre
            if (onFileChange) {
                onFileChange(selectedFile);
            }
        }
    }, [onFileChange]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: acceptedFileTypes,
        maxSize,
        multiple: false
    });

    const removeImage = () => {
        setPreviewImage(null);
        setFile(null);
        if (onFileChange) {
            onFileChange(null);
        }
    };

    return (
        <Box className="dropzone-container">
            {!previewImage ? (
                <Box
                    {...getRootProps()}
                    className={`dropzone ${isDragActive ? 'dropzone-active' : ''}`}
                >
                    <input {...getInputProps()} />
                    <CloudUploadIcon className="upload-icon" />
                    <Typography variant="body1" className="dropzone-text">
                        {isDragActive
                            ? 'Suelta la imagen aquí...'
                            : 'Arrastra una imagen aquí o haz clic para seleccionar'}
                    </Typography>
                    <Typography variant="body2" className="dropzone-subtext">
                        Solo archivos de imagen (máximo 5MB)
                    </Typography>
                </Box>
            ) : (
                <Box className="preview-container">
                    <Box className="preview-image-wrapper">
                        <img 
                            src={previewImage} 
                            alt="Vista previa del logo" 
                            className="preview-image"
                        />
                        <IconButton 
                            className="delete-button"
                            onClick={removeImage}
                            color="error"
                            size="small"
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                    <Typography variant="body2" className="file-info">
                        {file?.name} ({(file?.size / 1024 / 1024).toFixed(2)} MB)
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default Dropzone;