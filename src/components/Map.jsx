import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ locations, selectedEstablecimiento }) => {
  console.log('Locations:', locations);
  console.log('Selected Establecimiento:', selectedEstablecimiento);
  const mapRef = useRef(null);
  const userMarkerRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleClickOpen = (location) => {
    setSelectedLocation(location);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedLocation(null);
  };

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

    const initializeMap = async () => {
      let userLocation;
      try {
        userLocation = await getUserLocation();
      } catch (error) {
        console.error('Error getting user location:', error);
      }

      if (!userLocation || !userLocation.lat || !userLocation.lng) {
        console.error('User location coordinates are undefined.');
        return null;
      }

      const mapInstance = L.map('map').setView([userLocation.lat, userLocation.lng], 14);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstance);

      const userIcon = L.icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
      });

      userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon }).addTo(mapInstance)
        .bindPopup('Tu ubicación')
        .bindTooltip('Tú estás aquí', { permanent: true, className: 'custom-tooltip' })
        .openPopup();

      return mapInstance;
    };

    const setupMap = async () => {
      if (!mapRef.current) {
        mapRef.current = await initializeMap();
      }

      const map = mapRef.current;

      // Clear existing markers except user marker
      map.eachLayer(layer => {
        if (layer !== userMarkerRef.current && !layer._url) {
          map.removeLayer(layer);
        }
      });

      locations.forEach(loc => {
        const marker = L.marker([loc.lat, loc.lng]).addTo(map);

        marker.bindTooltip(loc.name, { permanent: true, className: 'custom-tooltip' });

        // Add click event to show Material UI popup with establishment details
        marker.on('click', () => {
          handleClickOpen(loc);
        });
      });

      // Center on selected establishment if exists
      if (selectedEstablecimiento && selectedEstablecimiento.latitud && selectedEstablecimiento.longitud) {
        map.setView([selectedEstablecimiento.latitud, selectedEstablecimiento.longitud], 18); // Aumentar el zoom a 18 para acercarse mucho
        L.marker([selectedEstablecimiento.latitud, selectedEstablecimiento.longitud]).addTo(map);
      }
    };

    setupMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [locations, selectedEstablecimiento]);

  return (
    <Box sx={{ flex: 1 ,backgroundColor: '#423D51', }}>
      <Box id="map" sx={{ borderBottomLeftRadius:{sx:'0px',md:'20px'} ,borderTopLeftRadius:{sx:'0px',md:'20px'}, width: '100%', height: '100vh' }}></Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedLocation?.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <strong>Dirección:</strong> {selectedLocation?.address}<br/>
            <strong>Teléfono:</strong> {selectedLocation?.telefono}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Map;