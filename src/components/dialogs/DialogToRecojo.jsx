import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

const DialogToRecojo = ({ open, onClose, selectedItem }) => {
  console.log(selectedItem);

  const [collectionItem, setCollectionItem] = useState('');
  const [note, setNote] = useState('');

  const [nombre, setNombre] = useState('');
  const [ruc, setRuc] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');

  const handleCollectionItemChange = (event) => {
    setCollectionItem(event.target.value);
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleSubmit = () => {
    // Aquí puedes manejar el envío del formulario, por ejemplo, hacer una llamada a la API
    console.log({
      establishmentId,
      collectionItem,
      note,
    });
    // Cerrar el diálogo después de enviar
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Recojo para {selectedItem?.nombre}</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 2 }}>
          <Typography variant="body1" gutterBottom>
            Seleccionar qué recoger:
          </Typography>
          <Select
            value={collectionItem}
            onChange={handleCollectionItemChange}
            fullWidth
            sx={{ mb: 2 }}
          >
            <MenuItem value="documentos">Documentos</MenuItem>
            <MenuItem value="paquetes">Paquetes</MenuItem>
            <MenuItem value="materiales">Materiales</MenuItem>
          </Select>
          <TextField
            label="Añadir una nota"
            value={note}
            onChange={handleNoteChange}
            multiline
            rows={4}
            fullWidth
            variant="outlined"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Enviar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogToRecojo;
