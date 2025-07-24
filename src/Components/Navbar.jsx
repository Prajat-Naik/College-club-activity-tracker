import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  useTheme, 
  alpha 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function Navbar({ onMenuClick }) {
  const theme = useTheme();

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: 1201,
        backgroundColor: theme.palette.primary.main,
        boxShadow: theme.shadows[4],
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
      }}
    >
      <Toolbar sx={{ minHeight: '68px !important' }}>
        <IconButton 
          color="inherit" 
          edge="start" 
          onClick={onMenuClick} 
          sx={{ 
            mr: 3,
            padding: '10px',
            borderRadius: 2,
            '&:hover': {
              backgroundColor: alpha(theme.palette.common.white, 0.1),
              transform: 'scale(1.05)',
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          <MenuIcon sx={{ fontSize: '1.5rem' }} />
        </IconButton>
        
        <Typography 
          variant="h5" 
          noWrap 
          sx={{ 
            fontWeight: 'bold',
            letterSpacing: '0.5px',
            color: 'white',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
          }}  
        >
          ClubManager Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;