import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Switch,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import Map from './Map';

export const ListRegistros = ({ registros }) => {
  const [items, setItems] = useState(registros);
  const [viewAsCards, setViewAsCards] = useState(true);

  const moveUp = (index) => {
    if (index === 0) return;
    const newItems = [...items];
    [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
    setItems(newItems);
  };

  const moveDown = (index) => {
    if (index === items.length - 1) return;
    const newItems = [...items];
    [newItems[index + 1], newItems[index]] = [newItems[index], newItems[index + 1]];
    setItems(newItems);
  };

  return (
    <Box sx={{ display: 'flex', flex: 1, padding: 2, height: '100vh' }}>
      <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
        <Box sx={{ height: { xs: 0, sm: 50, md: 50 }, m: { xs: 3, sm: 0 } }}>
        </Box>
        <Box sx={{
          overflowY: 'auto', '&::-webkit-scrollbar': {
            width: '8px'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(216, 216, 237, 0.5)',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
            m: '8px'
          }
        }}>
          <Box>
            <Grid container spacing={2}>
              {items.map((registro, index) => (
                <Grid item xs={12} sm={12} md={6} lg={6} key={registro.registro_id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">
                        Establecimiento: {registro.Establecimiento.ubicacion}
                      </Typography>
                      <Typography variant="body2">
                        Distrito: {registro.Establecimiento.Distrito.nombre}
                      </Typography>
                      <Typography variant="body2">
                        Teléfono: {registro.Establecimiento.telefono}
                      </Typography>
                      <Typography variant="body2">
                        Estado: {registro.estado_id}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => moveUp(index)}
                          disabled={index === 0}
                        >
                          Subir
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => moveDown(index)}
                          disabled={index === items.length - 1}
                        >
                          Bajar
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
