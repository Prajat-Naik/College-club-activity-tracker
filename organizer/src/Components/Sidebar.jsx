import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  Divider,
  Avatar,
  IconButton,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Groups as GroupsIcon,
  Assessment as ReportIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  ChevronLeft as ChevronLeftIcon,
  School as SchoolIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 280;

function Sidebar({ open, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Manage Events', icon: <GroupsIcon />, path: '/manage-events' },
    { text: 'Reports', icon: <ReportIcon />, path: '/Report' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    // Optional: Close drawer on mobile after navigation
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...');
    // navigate('/login');
  };

  return (
    <Drawer
      variant="persistent"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: theme.palette.background.paper,
          borderRight: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
          boxShadow: theme.shadows[1],
        },
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: theme.spacing(2),
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SchoolIcon sx={{ fontSize: 28 }} />
          <Typography variant="h6" noWrap component="div" fontWeight="bold">
            ClubManager
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          sx={{
            color: theme.palette.primary.contrastText,
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.contrastText, 0.1),
            },
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
      </Box>

      {/* User Profile Section */}
      <Box
        sx={{
          padding: theme.spacing(2),
          backgroundColor: alpha(theme.palette.primary.main, 0.05),
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{
              backgroundColor: theme.palette.primary.main,
              width: 40,
              height: 40,
            }}
          >
            A
          </Avatar>
          <Box>
            <Typography variant="subtitle2" fontWeight="medium">
              Admin User
            </Typography>
            <Typography variant="caption" color="text.secondary">
              admin@edumanage.com
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Navigation Menu */}
      <List sx={{ padding: theme.spacing(1, 0), flex: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <ListItem
              key={item.text}
              onClick={() => handleNavigation(item.path)}
              sx={{
                margin: theme.spacing(0.5, 1),
                borderRadius: 2,
                cursor: 'pointer',
                backgroundColor: isActive 
                  ? alpha(theme.palette.primary.main, 0.1)
                  : 'transparent',
                borderLeft: isActive 
                  ? `4px solid ${theme.palette.primary.main}`
                  : '4px solid transparent',
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  transform: 'translateX(4px)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive 
                    ? theme.palette.primary.main 
                    : theme.palette.text.secondary,
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: isActive ? 'medium' : 'regular',
                  color: isActive 
                    ? theme.palette.primary.main 
                    : theme.palette.text.primary,
                }}
              />
            </ListItem>
          );
        })}
      </List>

      {/* Bottom Section */}
      <Box sx={{ marginTop: 'auto' }}>
        <Divider />
        <List sx={{ padding: theme.spacing(1, 0) }}>
          <ListItem
            onClick={handleLogout}
            sx={{
              margin: theme.spacing(0.5, 1),
              borderRadius: 2,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: alpha(theme.palette.error.main, 0.08),
                transform: 'translateX(4px)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            <ListItemIcon
              sx={{
                color: theme.palette.error.main,
                minWidth: 40,
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              primaryTypographyProps={{
                color: theme.palette.error.main,
              }}
            />
          </ListItem>
        </List>
        
        {/* Footer */}
        <Box sx={{ padding: theme.spacing(2), textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            © 2025 ClubManager
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
}

export default Sidebar;