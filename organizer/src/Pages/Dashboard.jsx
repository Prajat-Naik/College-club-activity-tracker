import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Divider,
  LinearProgress,
} from '@mui/material';
import {
  Event as EventIcon,
  People as PeopleIcon,
  CheckCircle as CheckCircleIcon,
  Assessment as AssessmentIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';

const organizerStats = {
  totalEvents: 12,
  totalParticipants: 320,
  upcomingEvents: 4,
  completedEvents: 8,
  attendanceRate: 87.5,
};

function Dashboard() {
  const completionRate = (organizerStats.completedEvents / organizerStats.totalEvents) * 100;
  const avgParticipantsPerEvent = organizerStats.totalParticipants / organizerStats.totalEvents;

  return (
    <Box sx={{
      p: { xs: 2, md: 4 },
      bgcolor: '#f8fafc',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      maxWidth: 1100,
      mx: 'auto'
    }}>
      {/* Header Section */}
      <Box sx={{ mb: 5 }}>
        <Typography
          variant="h3"
          sx={{
            mb: 1,
            fontWeight: 700,
            color: '#1e293b',
            fontSize: { xs: '2rem', md: '3rem' }
          }}
        >
          Organizer Dashboard
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: '#64748b',
            fontWeight: 400,
            fontSize: '1.1rem'
          }}
        >
          Overview of your club events and participation
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Stat Cards */}
        {[
          {
            label: 'Total Events',
            value: organizerStats.totalEvents,
            icon: <EventIcon sx={{ fontSize: 32 }} />,
            color: '#6366f1',
            bgColor: 'rgba(99, 102, 241, 0.1)',
            change: '+10%'
          },
          {
            label: 'Total Participants',
            value: organizerStats.totalParticipants,
            icon: <PeopleIcon sx={{ fontSize: 32 }} />,
            color: '#10b981',
            bgColor: 'rgba(16, 185, 129, 0.1)',
            change: '+7%'
          },
          {
            label: 'Upcoming Events',
            value: organizerStats.upcomingEvents,
            icon: <EventIcon sx={{ fontSize: 32 }} />,
            color: '#f59e0b',
            bgColor: 'rgba(245, 158, 11, 0.1)',
            change: '+3%'
          },
          {
            label: 'Completed Events',
            value: organizerStats.completedEvents,
            icon: <CheckCircleIcon sx={{ fontSize: 32 }} />,
            color: '#06b6d4',
            bgColor: 'rgba(6, 182, 212, 0.1)',
            change: '+12%'
          },
        ].map((stat, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.8)',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        color: '#1e293b',
                        mb: 0.5,
                        fontSize: '2.2rem'
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#64748b',
                        fontWeight: 500,
                        mb: 1
                      }}
                    >
                      {stat.label}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TrendingUpIcon sx={{ fontSize: 16, color: stat.color, mr: 0.5 }} />
                      <Typography
                        variant="caption"
                        sx={{
                          color: stat.color,
                          fontWeight: 600
                        }}
                      >
                        {stat.change} from last month
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      bgcolor: stat.bgColor,
                      borderRadius: 2,
                      p: 1.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Box sx={{ color: stat.color }}>
                      {stat.icon}
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Participants Overview */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.8)',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              minHeight: 220
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Box
                  sx={{
                    bgcolor: 'rgba(99, 102, 241, 0.1)',
                    borderRadius: 2,
                    p: 1,
                    mr: 2,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <PeopleIcon sx={{ color: '#6366f1', fontSize: 24 }} />
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: '#1e293b'
                  }}
                >
                  Participants Overview
                </Typography>
              </Box>

              <Stack spacing={3}>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1" sx={{ color: '#64748b', fontWeight: 500 }}>
                      Total Participants
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>
                      {organizerStats.totalParticipants}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={80}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: '#e2e8f0',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: '#6366f1',
                        borderRadius: 4,
                      }
                    }}
                  />
                </Box>

                <Divider sx={{ bgcolor: '#e2e8f0' }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body1" sx={{ color: '#64748b', fontWeight: 500 }}>
                    Average per Event
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>
                    {avgParticipantsPerEvent.toFixed(0)}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Attendance Rate */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.8)',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              minHeight: 220
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Box
                  sx={{
                    bgcolor: 'rgba(6, 182, 212, 0.1)',
                    borderRadius: 2,
                    p: 1,
                    mr: 2,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <AssessmentIcon sx={{ color: '#06b6d4', fontSize: 24 }} />
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: '#1e293b'
                  }}
                >
                  Attendance Rate
                </Typography>
              </Box>

              <Stack spacing={3}>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1" sx={{ color: '#64748b', fontWeight: 500 }}>
                      Attendance Rate
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>
                      {organizerStats.attendanceRate}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={organizerStats.attendanceRate}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: '#e2e8f0',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: '#06b6d4',
                        borderRadius: 4,
                      }
                    }}
                  />
                </Box>

                <Divider sx={{ bgcolor: '#e2e8f0' }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body1" sx={{ color: '#64748b', fontWeight: 500 }}>
                    Completed Events
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>
                    {organizerStats.completedEvents} / {organizerStats.totalEvents}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;