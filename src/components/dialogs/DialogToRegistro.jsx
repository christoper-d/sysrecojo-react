import React from 'react';
import { Box, Tabs, Tab, FormControl, InputLabel, MenuItem, Select, Typography, List, ListItem, ListItemText, Button, Dialog, DialogContent, DialogActions, SpeedDialIcon } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const TabPanel = ({ children, value, index }) => {
  return (
    <Box role="tabpanel" hidden={value !== index} sx={{ backgroundColor: 'rgba(216, 204, 252, 0.5)', borderBottomRightRadius: '20px', borderBottomLeftRadius: '20px', borderTopRightRadius: '20px' }}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </Box>
  );
};

export const DialogToRegistro = ({ open, onClose, establecimiento }) => {
  const [value, setValue] = React.useState(0);
  const [estado, setEstado] = React.useState('Todos');
  const [dia, setDia] = React.useState('');
  const data = Array.from({ length: 20 }, (_, i) => `Registro ${i + 1}`);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleEstadoChange = (event) => {
    setEstado(event.target.value);
  };

  const handleDiaChange = (event) => {
    setDia(event.target.value);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: 'transparent', // Fondo del diálogo
          borderRadius: '16px'
        }
      }}
    >
      <DialogContent sx={{
        // backgroundColor: 'rgba(216, 216, 237, 1)',
        backgroundColor: '#6D5F95',
        borderRadius: '16px',
        padding: '16px', // 16px
        minHeight: '400px',
        maxHeight: '400px'
      }}>
        <Tabs value={value} onChange={handleChange}
          sx={{

            '& .MuiTabs-indicator': {
              backgroundColor: 'rgba(216, 204, 252, 0.5)',
            },
            '& .MuiTab-root': {
              textTransform: 'none',
              '&.Mui-selected': {
                borderTopLeftRadius: '20px',
                borderTopRightRadius: '20px',
                backgroundColor: 'rgba(216, 204, 252, 0.5)',
                color: 'white',
              },
              '&:not(.Mui-selected)': {
                backgroundColor: '#ff',
                color: 'black',
              },
            }
          }}
        >
          <Tab label="Registros" />
        </Tabs>

        <TabPanel value={value} index={0}>
          <Box sx={{ position: 'relative' }}>
            <Box>
              {establecimiento || ''}
            </Box>

            <Box sx={{ display: 'flex', flex: 1, alignItems: 'center', gap: 1, marginBottom: 2 }}>
              <Box sx={{ display: 'flex', flex: 1, border: '2px solid black', borderRadius: '20px', }}>
                <Box sx={{ my: 'auto', mx: 'auto', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                  <Typography>Estado:</Typography>
                </Box>
                <FormControl
                  variant="outlined"
                  sx={{ minWidth: 100, display: 'flex', alignItems: 'center', borderRadius: '8px', padding: '5px' }}
                >
                  <Select
                    value={estado}
                    onChange={handleEstadoChange}
                    sx={{
                      borderRadius: '8px',
                      border: '2px solid #333',
                      p: '1px 0px',
                      height: '30px',
                      width: '100px'
                    }}>
                    <MenuItem value="Todos"><em>Todos</em></MenuItem>
                    <MenuItem value="activo">Activo</MenuItem>
                    <MenuItem value="inactivo">Inactivo</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ display: 'flex', flex: 1, border: '2px solid black', borderRadius: '20px', }}>
                <Box sx={{ my: 'auto', mx: 'auto', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                  <Typography>Día:</Typography>
                </Box>
                <FormControl
                  variant="outlined"
                  sx={{ minWidth: 100, display: 'flex', alignItems: 'center', borderRadius: '8px', padding: '5px' }}
                >
                  <Select
                    value={dia}
                    onChange={handleDiaChange}
                    sx={{
                      borderRadius: '8px',
                      border: '2px solid #333',
                      p: '1px 0px',
                      height: '30px',
                      width: '100px'
                    }}>
                    <MenuItem value="hoy"><em>Hoy</em></MenuItem>
                    <MenuItem value="ayer">Ayer</MenuItem>
                    <MenuItem value="semana">Esta Semana</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flex: 1, gap: 1 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <Box sx={{
                  maxHeight: 200, overflow: 'auto', backgroundColor: 'rgba(216, 204, 252, 0.5)', borderRadius: '8px', padding: '8px', position: 'relative', '&::-webkit-scrollbar': { width: '8px', }, '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(216, 216, 237, 0.5)', borderRadius: '10px', }, '&::-webkit-scrollbar-track': { backgroundColor: 'transparent', },
                }}>
                  <List>
                    {data.map((item, index) => (
                      <ListItem key={index} sx={{ borderBottom: '1px solid #ddd' }}>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                  <Box>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <Box sx={{
                  maxHeight: 200, overflow: 'auto', backgroundColor: 'rgba(216, 204, 252, 0.5)', borderRadius: '8px', padding: '8px', position: 'relative', '&::-webkit-scrollbar': { width: '8px', }, '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(216, 216, 237, 0.5)', borderRadius: '10px', }, '&::-webkit-scrollbar-track': { backgroundColor: 'transparent', },
                }}>

                </Box>
              </Box>
            </Box>

            <Box sx={{ position: 'absolute', bottom:-40, right: -30, zIndex: 101 }}>
              <Button
                onClick={() => handleOpenDialog(title, option)}
                sx={{ borderRadius: '500px', width: 0, height: 50, backgroundColor: 'rgba(255, 255, 255, 1)' }}
              >
                <SpeedDialIcon />
              </Button>
            </Box>
          </Box>
        </TabPanel>

        <TabPanel value={value} index={1}>
          {/* Contenido para otra pestaña */}
        </TabPanel>
      </DialogContent>
      {/* <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions> */}
    </Dialog>
  );
};
