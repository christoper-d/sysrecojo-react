import React, { useState } from 'react';
import { Box, Select, MenuItem, Typography, Divider, List, ListItem, ListItemText, SpeedDial, SpeedDialIcon, SpeedDialAction, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { DialogToAdd } from './dialogs/DialogToAdd';

const FilterPanel = ({ drawerWidth = 200, title = '', data = [], onItemSelect }) => {

  const [selectedItem, setSelectedItem] = useState(null);
  const [showDialogAdd, setshowDialogAdd] = useState(false);

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    if (onItemSelect) {
      onItemSelect(item);
    }
  };

  const handleOpenDialog = () => {
    setshowDialogAdd(true);
  };
  const handleCloseDialog = () =>{
    setshowDialogAdd(false);
  }

  return (
    <Box sx={{ 
      width: drawerWidth,
      m:1, 
      p: 1, 
      backgroundColor: 'rgba(109, 95, 149, 0.5)', 
      height: '48vh', 
      display: 'flex', 
      flexDirection: 'column', 
      color: 'white', 
      borderRadius:'20px',
      position: 'relative'
    }}>
      <Typography variant="h6" color={'background.paper'} gutterBottom sx={{ fontStyle: 'bold' }}>
        {title}
      </Typography>
      <Divider orientation='horizontal' color='#f1f3fc' sx={{ mt: 0.5, mb: 2 }} />
      <Box sx={{ backgroundColor: 'rgba(109, 95, 149, 0.8)', borderRadius:'15px', pl: 1,pr: 1, flex: 1, overflowY: 'auto','&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(216, 216, 237, 0.5)',
          borderRadius: '10px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'transparent',
        } }}>
        <List>
          {data.map((item, index) => (
            <ListItem 
              button 
              key={index} 
              onClick={() => handleItemSelect(item)}
              sx={{
                mt:0.5,
                borderRadius:'15px',
                backgroundColor: selectedItem === item ? 'rgba(255, 255, 255, 0.3)' : 'transparent',
                color: selectedItem === item ? '#f5f5f9' : 'inherit',
              }}
            >
              <ListItemText 
                primary={item.nombre || item.ubicacion} 
                secondary={item.cliente_ruc ? `RUC: ${item.cliente_ruc}` : null} 
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ position: 'absolute', bottom: 16, right: 16, zIndex: 10 }}>
        <Button
          onClick={handleOpenDialog}  
          sx={{borderRadius:'500px', width:40, height:50, backgroundColor: 'rgba(255, 255, 255, 1)'}}
        >
          <SpeedDialIcon/>
        </Button>
      </Box>
      <DialogToAdd title={title} open={showDialogAdd} onClose={handleCloseDialog}/>
    </Box>
  );
};

export default FilterPanel;
