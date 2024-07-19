import React from 'react';
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { PeopleOutline, ViewListOutlined } from '@mui/icons-material';

const Sidebar = ({ onButtonClick }) => {
  const location = useLocation();

  const menuItems = [
    { text: 'Empresas', icon: <PeopleOutline />, link: '/dashboard/empresas' },
    { text: 'Registros', icon: <ViewListOutlined />, link: '/dashboard/registros' },
  ];

  return (
    <Box>
      <Box
        component='nav'
        sx={{
          display:{xs:'none',sm:'block'},
          width: { xs: 0, sm: 80, md: 180 },
          p: 0.01,
          backgroundColor: 'rgba(189, 175, 228, 0.1)',
          height: '100vh',
          color: 'white',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'rgba(109, 95, 149, 0.5)',
            borderRadius: '15px',
            p: { xs: 0, sm: 0, md: 2 },
          }}
        >
          <Typography variant="h6" sx={{ display: { xs: 'none', sm: 'none', md: 'block' }, marginBottom: 2 }}>
            Sys/recojo
          </Typography>
        </Box>
        <Divider orientation='horizontal' color='#f1f3fc' variant='middle' sx={{ mt: 2, mb: 2 }} />
        <Box sx={{ backgroundColor: 'rgba(109, 95, 149, 0.5)', borderRadius: '10px', p: {display:{xs:0,md:1}} }}>
          <List sx={{p:0.5}}>
            {
              menuItems.map(item => (
                <ListItem key={item.text} disablePadding
                  sx={{
                    borderRadius: 2,
                    color: location.pathname === item.link ? '#f5f5f9' : 'inherit',
                    mt: 0.5,
                    backgroundColor: location.pathname === item.link ? 'rgba(255, 255, 255, 0.3)' : 'transparent'
                  }}>
                  <ListItemButton component={RouterLink} to={item.link}>
                    <ListItemIcon sx={{ minWidth: 40, color: location.pathname === item.link ? '#f1f3fc' : 'text.primary' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} sx={{ display: { xs: 'none', sm: 'none', md: 'block' }, color: location.pathname === item.link ? '#f1f3fc' : 'text.primary' }} />
                  </ListItemButton>
                </ListItem>
              ))
            }
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
