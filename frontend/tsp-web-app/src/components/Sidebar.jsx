import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Drawer, IconButton, List, ListItemButton, ListItemText, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;

const SidebarContainer = styled('div')(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
}));

const Sidebar = ({ open, toggleDrawer, data, locations, route }) => {
  const theme = useTheme();

  return (
    <SidebarContainer>
      <Drawer variant="permanent" open={open}>
        <Toolbar />
        <List>
          {locations.map((location, index) => (
            <ListItemButton key={index}>
              <ListItemText primary={location} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <IconButton
        color="inherit"
        aria-label="open sidebar"
        onClick={toggleDrawer}
        edge="start"
        sx={{
          position: 'absolute',
          top: 0,
          left: open ? drawerWidth : theme.spacing(1),
          transition: theme.transitions.create('left', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <MenuIcon />
      </IconButton>
    </SidebarContainer>
  );
};

export default Sidebar;
