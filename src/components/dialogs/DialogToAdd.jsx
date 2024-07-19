import React, { useEffect, useRef } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export const DialogToAdd = ({ open, onClose, title, content, options = {} }) => {

  const mapRef = useRef(null);

  useEffect(() => {
    const getUserLocation = () => {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            position => {
              const { latitude, longitude } = position.coords;
              resolve({ lat: latitude, lng: longitude });
            },
            error => {
              reject(error);
            }
          );
        } else {
          reject(new Error('Geolocation is not supported by this browser.'));
        }
      });
    };

    if (options.option === 1 && open) {
      getUserLocation().then(location => {
        const map = new window.L.Map(mapRef.current).setView([location.lat, location.lng], 13);
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        window.L.marker([location.lat, location.lng]).addTo(map)
          .bindPopup('Current Location')
          .openPopup();
      }).catch(error => {
        console.error('Error getting location:', error);
      });
    }
  }, [open, options.option]);

  const renderForm = () => {
    if (options.option === 1) {
      return (
        <form>
          <TextField label="Nombre de la Empresa" fullWidth margin="normal" />
          <TextField label="RUC" fullWidth margin="normal" />
          <Box>
            <Box>
              <TextField label="Dirección" fullWidth margin="normal" />
            </Box>
            <Box>
              <Box id='mapAdd' ref={mapRef} style={{ height: '300px', marginTop: '16px' }}></Box>
            </Box>
          </Box>
          <TextField label="Teléfono" fullWidth margin="normal" />
        </form>
      );
    } else if (options.option === 2) {
      return (
        <form>
          <TextField label="Nombre del Establecimiento" fullWidth margin="normal" />
          <TextField label="ID del Establecimiento" fullWidth margin="normal" />
          <TextField label="Ubicación" fullWidth margin="normal" />
          <TextField label="Distrito" fullWidth margin="normal" />
        </form>
      );
    }
    return null;
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{options.title || ''}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {renderForm()}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
