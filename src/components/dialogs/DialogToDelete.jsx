import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
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
        {/*  */}
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
  )
}

export default DialogToDelete