import React, { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const drawerWidth = 240;

function Layout({ children }) {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => setOpen(!open);

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar with fixed width */}
      <Box
        sx={{
          width: open ? drawerWidth : 0,
          transition: 'width 0.3s',
          overflow: 'hidden',
        }}
      >
        <Sidebar open={open} onClose={toggleDrawer} />
      </Box>

      {/* Main content */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Navbar onMenuClick={toggleDrawer} />
        <Box component="main" sx={{ p: 3 }}>
          <Toolbar />
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default Layout;