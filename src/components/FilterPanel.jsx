import React, { useState } from 'react';
import { Box, Typography, Divider, List, ListItem, ListItemText, Button, Menu, MenuItem, SpeedDialIcon, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { DialogToAdd } from './dialogs/DialogToAdd';
import DialogToRecojo from './dialogs/DialogToRecojo';
import DialogToDelete from './dialogs/DialogToDelete';
import { CarCrashRounded, PendingActionsOutlined } from '@mui/icons-material';

const FilterPanel = ({ drawerWidth = 200, title = '', data = [], onItemSelect}) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const [showDialogAdd, setShowDialogAdd] = useState(false);
  const [showDialogAddEstablecimiento, setshowDialogAddEstablecimiento] = useState(false);
  const [showDialogDelete, setShowDialogDelete] = useState(false);
  const [showDialogRecojo, setShowDialogRecojo] = useState(false);

  const [contextMenu, setContextMenu] = useState(null);
  const [contextMenuItem, setContextMenuItem] = useState(null);

  const opt = {
    title: '',
    opt: 1,
  };

  const [optionsDialog, setOptionsDialog] = useState(opt);

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    if (onItemSelect) {
      onItemSelect(item);
    }
  };

  const handleOpenDialog = (title, option) => {
    setContextMenuItem(null);
    setOptionsDialog({
      title,
      opt: option,
    });
    setShowDialogAdd(true);
  };

  
  
  const handleContextMenu = (event, item) => {
    event.preventDefault();
    setContextMenuItem(item);
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
          }
        : null
    );
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };
  //To Edit

  const handleEdit = () => {
    setOptionsDialog({
      title:'Editar Empresa',
      opt: 1,
    });
    setShowDialogAdd(true);
  };

  const handleCloseDialog = () => {
    setShowDialogAdd(false);
    setOptionsDialog(opt);
    handleCloseContextMenu();
  };
  //------------------
  //To Eliminar
  const handleDelete = () => {
    setShowDialogDelete(true);
    // handleCloseContextMenu();
  };

  const handleCloseDialogDelete = () => {
    setShowDialogDelete(false);
  };
  //-------------------

  //To recojo
  const handleRecojo = () => {
    setShowDialogRecojo(true);
  };

  const handleCloseDialogRecojo = () => {
    setShowDialogRecojo(false);
  };
  //--------------------
  // To add establecimiento
  const handleAddEstablecimiento = () =>{
    setOptionsDialog({
      title:'Añadir establecimiento',
      opt:2,
    });
    setShowDialogAdd(true);
  }
  //--------------------

  return (
    <Box
      sx={{
        width: drawerWidth,
        m: 1,
        p: 1,
        backgroundColor: 'rgba(109, 95, 149, 0.5)',
        height: '97.5vh',
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
        borderRadius: '20px',
        position: 'relative',
      }}
    >
      <Typography variant="h6" color={'background.paper'} gutterBottom sx={{ fontStyle: 'bold' }}>
        {title}
      </Typography>
      <Divider orientation="horizontal" color="#f1f3fc" sx={{ mt: 0.5, mb: 2 }} />
      <Box
        sx={{
          backgroundColor: 'rgba(109, 95, 149, 0.8)',
          borderRadius: '15px',
          pl: 1,
          pr: 1,
          flex: 1,
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(216, 216, 237, 0.5)',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
        }}
      >
        <List>
          {data.map((item, index) => (
            <ListItem
              button
              key={index}
              onClick={() => handleItemSelect(item)}
              onContextMenu={(event) => handleContextMenu(event, item)}
              sx={{
                mt: 0.5,
                borderRadius: '15px',
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
      
      <DialogToAdd open={showDialogAdd} onClose={handleCloseDialog} options={optionsDialog} selectedItem={contextMenuItem} />
      <DialogToDelete open={showDialogDelete} onClose={handleCloseDialogDelete} selectedItem={contextMenuItem} />
      <DialogToRecojo open={showDialogRecojo} onClose={handleCloseDialogRecojo} selectedItem={contextMenuItem} />
      <Menu
        open={contextMenu !== null}
        onClose={handleCloseContextMenu}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleEdit} > <PendingActionsOutlined/> Editar</MenuItem>
        <MenuItem onClick={handleDelete}>Eliminar</MenuItem>
        <MenuItem onClick={handleRecojo}>Solicitar recojo</MenuItem>
        <MenuItem onClick={handleAddEstablecimiento}>Añadir Establecimiento</MenuItem>
      </Menu>


      <Box sx={{ position: 'absolute', bottom: 16, right: 16, zIndex: 10 }}>
        <Button
          onClick={() => handleOpenDialog('Añadir empresa', 1)}
          sx={{ borderRadius: '500px', width: 40, height: 50, backgroundColor: 'rgba(255, 255, 255, 1)' }}
        >
          <SpeedDialIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default FilterPanel;
