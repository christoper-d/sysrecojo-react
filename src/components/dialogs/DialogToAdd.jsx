import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export const DialogToAdd = ({ open, onClose, title, content, options = {}, selectedItem }) => {
  console.log(selectedItem);

  const lat = `${selectedItem?.Establecimientos[0].latitud || ''}`;
  const lng = `${selectedItem?.Establecimientos[0].longitud || ''}`;

  var cord = '';

  if(lat !== '' && lng !== ''){
    cord = `${lat}, ${lng}`;
    console.log(cord);
  }else{
    cord = '';
  };
   
  const mapRef = useRef(null);
  const [nombre, setNombre] = useState('');
  const [ruc, setRuc] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [coordinates, setCoordinates] = useState('');
  const [mapInstance, setMapInstance] = useState(null);

  useEffect(() => {

    if (selectedItem) {
      setNombre(selectedItem.nombre || '');
      setRuc(selectedItem.cliente_ruc || '');
      setDireccion(selectedItem.Establecimientos[0].ubicacion || '');
      setTelefono(selectedItem.Establecimientos[0].telefono || '');
      setCoordinates('');
    } else {
      setNombre('');
      setRuc('');
      setDireccion('');
      setTelefono('');
      setCoordinates('');
    }
  }, [selectedItem]);

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

    const initializeMap = (lat, lng, popupText) => {
      if (mapInstance) {
        mapInstance.remove();
      }
      const map = new L.Map(mapRef.current).setView([lat, lng], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      L.marker([lat, lng]).addTo(map)
        .bindPopup(popupText)
        .openPopup();
      setMapInstance(map);
    };

    if (open) {
      if (coordinates) {
        const [lat, lng] = coordinates.split(',').map(coord => parseFloat(coord.trim()));
        initializeMap(lat, lng, nombre || '');
      } else {
        getUserLocation().then(location => {
          initializeMap(location.lat, location.lng, nombre);
        }).catch(error => {
          console.error('Error getting location:', error);
        });
      }
    }
  }, [open, options.opt, coordinates, nombre]);

  const handleCoordinatesChange = (e) => {
    setCoordinates(e.target.value);
    console.log(e.target.value);
    if (e.target.value) {
      const [lat, lng] = e.target.value.split(',').map(coord => parseFloat(coord.trim()));
      if (!isNaN(lat) && !isNaN(lng)) {
        const popupText = nombre || '';
        initializeMap(lat, lng, popupText);
      }
    }
  };

  const renderForm = () => {
    if (options.opt === 1) {
      return (
        <form>
          <TextField label="Nombre de la Empresa" fullWidth margin="normal" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          <TextField label="RUC" fullWidth margin="normal" value={ruc} onChange={(e) => setRuc(e.target.value)} />
          <TextField label="Teléfono" fullWidth margin="normal" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
          <TextField label="Dirección" fullWidth margin="normal" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
          <TextField label="Coordenadas" fullWidth margin="normal" value={coordinates} onChange={handleCoordinatesChange} />
          <Box id='mapAdd' ref={mapRef} style={{ height: '300px', marginTop: '16px' }}></Box>
        </form>
      );
    } else if (options.opt === 2) {
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
