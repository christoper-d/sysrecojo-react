import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

const DialogToDelete = ({ open, onClose,selectedItem }) => {
  console.log(selectedItem);

  const [nombre, setNombre] = useState('');

  useEffect(() => {
    if (selectedItem) {
      setNombre(selectedItem.nombre || '');
    }
  }, [selectedItem]);

  return (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Eliminar: {nombre}</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estas seguro de eliminar esta empresa?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={onClose} color="secondary">
            Close
          </Button>
          <Button variant='contained' onClick={onClose} color="warning">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default DialogToDelete