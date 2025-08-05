import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
  Box,
  Grid,
  Chip,
  Avatar,
  Divider
} from '@mui/material';
import {
  CalendarToday,
  LocationOn,
  AccessTime,
  People,
  Person,
  ChevronRight
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Sample data - Replace with your actual data
const events = [
  {
    id: 1,
    title: 'AI Workshop',
    description: 'Introduction to Machine Learning basics',
    date: new Date('2025-08-20T14:00:00'),
    venue: 'Tech Lab 101',
    capacity: 50,
    registeredParticipants: 30,
    status: 'Upcoming',
    organizer: 'Dr. Ragesh',
    type: 'Workshop',
  },
  {
    id: 2,
    title: 'React Bootcamp',
    description: 'Advanced React concepts and best practices',
    date: new Date('2025-08-12T10:00:00'),
    venue: 'Conference Room',
    capacity: 30,
    registeredParticipants: 25,
    status: 'Upcoming',
    organizer: 'Dr Anushree Raj',
    type: 'Training',
  },
];


const Events = () => {
  const [hoveredEvent, setHoveredEvent] = useState(null);
const navigate=useNavigate();

  const handleEnrollClick = (eventId) => {
    navigate(`/enroll/${eventId}`);
  };


  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getProgressPercentage = (registered, capacity) => {
    return (registered / capacity) * 100;
  };

  const getDaysUntil = (date) => {
    const today = new Date();
    const eventDate = new Date(date);
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'error';
    if (percentage >= 60) return 'warning';
    return 'success';
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', p: 3 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ mr: 2, bgcolor: 'grey.800' }}>
            <CalendarToday />
          </Avatar>
          <Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
              Upcoming Events
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
              Discover and enroll in exciting club events
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Events Grid */}
      <Grid container spacing={3}>
        {events.map((event) => {
          const progressPercentage = getProgressPercentage(event.registeredParticipants, event.capacity);
          const daysUntil = getDaysUntil(event.date);
          const isFull = event.registeredParticipants >= event.capacity;
          
          return (
            <Grid item xs={12} lg={6} key={event.id}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 3
                  }
                }}
                onMouseEnter={() => setHoveredEvent(event.id)}
                onMouseLeave={() => setHoveredEvent(null)}
              >
                <CardContent sx={{ p: 3 }}>
                  {/* Header */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                        <Typography variant="h6" component="h2" sx={{ fontWeight: 'semibold' }}>
                          {event.title}
                        </Typography>
                        <Chip 
                          label={event.type} 
                          size="small" 
                          variant="outlined"
                          sx={{ fontSize: '0.75rem' }}
                        />
                      </Box>
                      {daysUntil >= 0 && (
                        <Chip
                          label={daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `In ${daysUntil} days`}
                          size="small"
                          color={daysUntil <= 1 ? 'warning' : 'default'}
                          sx={{ fontSize: '0.75rem' }}
                        />
                      )}
                    </Box>
                  </Box>

                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.6 }}>
                    {event.description}
                  </Typography>

                  {/* Event Details */}
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', gap: 4, mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CalendarToday sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {event.date.toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AccessTime sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {formatTime(event.date)}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                      <LocationOn sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {event.venue}
                      </Typography>
                    </Box>

                    {/* Registration Progress */}
                    <Box sx={{ bgcolor: 'grey.100', borderRadius: 1, p: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <People sx={{ fontSize: '1rem' }} />
                          <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                            Registration
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                          {event.registeredParticipants} / {event.capacity}
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={progressPercentage} 
                        color={getProgressColor(progressPercentage)}
                        sx={{ height: 6, borderRadius: 1, mb: 1 }}
                      />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {Math.round(progressPercentage)}% filled
                        </Typography>
                        {isFull && (
                          <Typography variant="caption" sx={{ color: 'error.main', fontWeight: 'medium' }}>
                            Event Full
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Box>

                  <Divider sx={{ mb: 2 }} />

                  {/* Footer */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: 'grey.300' }}>
                        <Person sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                      </Avatar>
                      <Box>
                        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                          Organized by
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                          {event.organizer}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Button
                      variant={isFull ? "outlined" : "contained"}
                      color={isFull ? "inherit" : "primary"}
                      onClick={() => handleEnrollClick(event.id)}
                      disabled={isFull}
                      endIcon={!isFull ? <ChevronRight /> : null}
                      sx={{
                        bgcolor: isFull ? 'transparent' : 'grey.800',
                        '&:hover': {
                          bgcolor: isFull ? 'transparent' : 'grey.900'
                        }
                      }}
                    >
                      {isFull ? 'Event Full' : 'Enroll Now'}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Events;