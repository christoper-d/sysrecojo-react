// src/components/StatusBar.js
import React from 'react';
import { Box, Button, Divider } from '@mui/material';

const StatusBar = ({ open, onClose}) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-around', padding: 1, backgroundColor: '#483D8B', color: 'white' }}>
      <Button variant="contained" sx={{ backgroundColor: '#6A5ACD' }}>
        Por recoger
      </Button>
      <Divider/>
      <Button variant="contained" sx={{ backgroundColor: '#6A5ACD' }}>
        Recogido
      </Button>
      <Button variant="contained" sx={{ backgroundColor: '#6A5ACD' }}>
        Por contabilizar
      </Button>
      <Button variant="contained" sx={{ backgroundColor: '#6A5ACD' }}>
        Por entregar
      </Button>
      <Button variant="contained" sx={{ backgroundColor: '#6A5ACD' }}>
        Completo
      </Button>
    </Box>
  );
};

export default StatusBar;
