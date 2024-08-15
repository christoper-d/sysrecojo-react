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
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale';

// Registra la localización en español
registerLocale('es', es);

const DialogToRecojo = ({ open, onClose, selectedItem }) => {
  console.log(selectedItem);

  const [collectionItem, setCollectionItem] = useState('');
  const [note, setNote] = useState('');

  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

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
    console.log({
      establishmentId: selectedItem?.id,
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
        <Box>
          <Typography variant="body1">Seleccione la fecha para el recojo:</Typography>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy/MM/dd"
            minDate={new Date()} // Bloquea las fechas anteriores al día actual
            locale="es" // Configura la localización en español
            customInput={<TextField fullWidth />}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button variant='contained' onClick={handleSubmit} color="primary">
          Crear
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogToRecojo;
