import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Stack,
  Button,
  Avatar,
  Divider,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Alert,
  LinearProgress,
  Tooltip
} from '@mui/material';
import {
  Event as EventIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
  Person as PersonIcon,
  MoreVert as MoreIcon,
  CalendarToday as CalendarIcon,
  School as SchoolIcon,
  Download as DownloadIcon,
  Share as ShareIcon
} from '@mui/icons-material';

// Enhanced sample data
const enrolledEvents = [
  {
    id: 1,
    title: 'AI & Machine Learning Workshop',
    organizer: 'Dr. Sarah Johnson',
    department: 'Computer Science',
    date: 'July 20, 2024',
    time: '2:00 PM - 5:00 PM',
    venue: 'Computer Science Lab - Block A, Room 201',
    status: 'upcoming',
    attended: false,
    registrationDate: 'July 10, 2024',
    capacity: 50,
    registered: 35,
    type: 'Workshop',
    duration: '3 hours'
  },
  {
    id: 2,
    title: 'Web Development Bootcamp',
    organizer: 'Prof. Michael Chen',
    department: 'Information Technology',
    date: 'June 15, 2024',
    time: '10:00 AM - 4:00 PM',
    venue: 'IT Lab - Block B, Room 301',
    status: 'completed',
    attended: true,
    registrationDate: 'June 1, 2024',
    capacity: 40,
    registered: 40,
    type: 'Bootcamp',
    duration: '6 hours',
    certificate: true
  },
  {
    id: 3,
    title: 'Data Science Fundamentals',
    organizer: 'Dr. Priya Sharma',
    department: 'Computer Science',
    date: 'May 28, 2024',
    time: '9:00 AM - 12:00 PM',
    venue: 'Data Science Lab - Block C, Room 105',
    status: 'completed',
    attended: false,
    registrationDate: 'May 15, 2024',
    capacity: 30,
    registered: 28,
    type: 'Seminar',
    duration: '3 hours'
  },
  {
    id: 4,
    title: 'Mobile App Development Workshop',
    organizer: 'Mr. Raj Patel',
    department: 'Computer Science',
    date: 'August 5, 2024',
    time: '1:00 PM - 6:00 PM',
    venue: 'Mobile Dev Lab - Block A, Room 405',
    status: 'upcoming',
    attended: false,
    registrationDate: 'July 18, 2024',
    capacity: 25,
    registered: 18,
    type: 'Workshop',
    duration: '5 hours'
  }
];

const MyEvents = () => {
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleMenuOpen = (event, eventData) => {
    setAnchorEl(event.currentTarget);
    setSelectedEvent(eventData);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedEvent(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'primary';
      case 'completed': return 'default';
      default: return 'default';
    }
  };

  const getAttendanceColor = (attended) => {
    return attended ? 'success' : 'error';
  };

  const filteredEvents = enrolledEvents.filter(event => {
    if (tabValue === 0) return true; // All events
    if (tabValue === 1) return event.status === 'upcoming';
    if (tabValue === 2) return event.status === 'completed';
    return true;
  });

  const upcomingCount = enrolledEvents.filter(e => e.status === 'upcoming').length;
  const completedCount = enrolledEvents.filter(e => e.status === 'completed').length;
  const attendedCount = enrolledEvents.filter(e => e.status === 'completed' && e.attended).length;

  return (
    <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh',marginX: 'auto', maxWidth: '1200px'}}>
      {/* Header Section */}
      <Box sx={{ bgcolor: 'white', borderBottom: '1px solid #e0e0e0', px: 3, py: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a1a', mb: 1 }}>
          My Events
        </Typography>
        <Typography variant="body1" sx={{ color: '#666', mb: 3 }}>
          Manage your event registrations and track your learning journey
        </Typography>

        {/* Tabs */}
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          sx={{ 
            borderBottom: '1px solid #e0e0e0',
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500
            }
          }}
        >
          <Tab label={`All Events (${enrolledEvents.length})`} />
          <Tab label={`Upcoming (${upcomingCount})`} />
          <Tab label={`Completed (${completedCount})`} />
        </Tabs>
      </Box>

      {/* Events List */}
      <Box sx={{ p: 3 }}>
        {filteredEvents.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <SchoolIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No events found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {tabValue === 1 ? 'You have no upcoming events.' : 
               tabValue === 2 ? 'You have no completed events.' : 
               'You haven\'t enrolled in any events yet.'}
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {filteredEvents.map((event) => (
              <Grid item xs={12} lg={6} key={event.id}>
                <Card sx={{ 
                  height: '100%',
                  border: '1px solid #e0e0e0',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease',
                  width: '350px'
                }}>
                  <CardContent sx={{ p: 3 }}>
                    {/* Header */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, lineHeight: 1.3 }}>
                          {event.title}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Avatar sx={{ width: 24, height: 24, bgcolor: 'grey.300' }}>
                            <PersonIcon sx={{ fontSize: 14 }} />
                          </Avatar>
                          <Typography variant="body2" color="text.secondary">
                            {event.organizer}
                          </Typography>
                          <Chip label={event.department} size="small" variant="outlined" />
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip
                          label={event.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                          color={getStatusColor(event.status)}
                          size="small"
                          sx={{ fontWeight: 500 }}
                        />
                        <IconButton size="small" onClick={(e) => handleMenuOpen(e, event)}>
                          <MoreIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>

                    <Divider sx={{ mb: 2 }} />

                    {/* Event Details */}
                    <Stack spacing={1.5}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <CalendarIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {event.date}
                        </Typography>

                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <LocationIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {event.venue}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Chip label={event.type} size="small" variant="outlined" />
                        <Typography variant="body2" color="text.secondary">
                          Duration: {event.duration}
                        </Typography>
                      </Box>

                      {/* Capacity Progress */}
                      <Box>
                      </Box>

                      {/* Attendance Status for completed events */}
                      {event.status === 'completed' && (
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 1,
                          p: 1.5,
                          borderRadius: 1,
                          bgcolor: event.attended ? 'success.50' : 'error.50',
                          border: event.attended ? '1px solid #e8f5e8' : '1px solid #ffeaea'
                        }}>
                          {event.attended ? (
                            <CheckIcon sx={{ fontSize: 18, color: 'success.main' }} />
                          ) : (
                            <CancelIcon sx={{ fontSize: 18, color: 'error.main' }} />
                          )}
                          <Typography variant="body2" color={event.attended ? 'success.main' : 'error.main'} fontWeight={500}>
                            {event.attended ? 'Attended Successfully' : 'Marked as Absent'}
                          </Typography>
                        </Box>
                      )}

                      {/* Registration Date */}
                      <Typography variant="caption" color="text.secondary">
                        Registered on {event.registrationDate}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          Cancel Registration
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default MyEvents;