import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Divider,
  Paper,
  LinearProgress,
} from '@mui/material';
import {
  Event as EventIcon,
  People as PeopleIcon,
  CheckCircle as CheckCircleIcon,
  Upcoming as UpcomingIcon,
  TrendingUp as TrendingUpIcon,
  Group as GroupIcon,
} from '@mui/icons-material';

const adminStats = {
  totalEvents: 25,
  totalStudents: 1500,
  upcomingEvents: 8,
  completedEvents: 17,
  totalRegistrations: 3200,
  activeClubs: 12,
};

function Dashboard() {
  const completionRate = (adminStats.completedEvents / adminStats.totalEvents) * 100;
  const avgRegistrationsPerEvent = adminStats.totalRegistrations / adminStats.totalEvents;
  const eventsPerClub = adminStats.totalEvents / adminStats.activeClubs;

  return (
    <Box sx={{ 
      p: { xs: 2, md: 4 }, 
      bgcolor: '#f8fafc', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      maxWidth:1100
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
          Admin Dashboard
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#64748b',
            fontWeight: 400,
            fontSize: '1.1rem'
          }}
        >
          Comprehensive overview of your club management system
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Enhanced Stat Cards */}
        {[
          { 
            label: 'Total Events', 
            value: adminStats.totalEvents, 
            icon: <EventIcon sx={{ fontSize: 32 }} />,
            color: '#6366f1',
            bgColor: 'rgba(99, 102, 241, 0.1)',
            change: '+12%'
          },
          { 
            label: 'Total Students', 
            value: adminStats.totalStudents.toLocaleString(), 
            icon: <PeopleIcon sx={{ fontSize: 32 }} />,
            color: '#10b981',
            bgColor: 'rgba(16, 185, 129, 0.1)',
            change: '+8%'
          },
          { 
            label: 'Upcoming Events', 
            value: adminStats.upcomingEvents, 
            icon: <UpcomingIcon sx={{ fontSize: 32 }} />,
            color: '#f59e0b',
            bgColor: 'rgba(245, 158, 11, 0.1)',
            change: '+5%'
          },
          { 
            label: 'Completed Events', 
            value: adminStats.completedEvents, 
            icon: <CheckCircleIcon sx={{ fontSize: 32 }} />,
            color: '#06b6d4',
            bgColor: 'rgba(6, 182, 212, 0.1)',
            change: '+15%'
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

        {/* Enhanced Registration Overview */}
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
                  Registration Overview
                </Typography>
              </Box>
              
              <Stack spacing={3}>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1" sx={{ color: '#64748b', fontWeight: 500 }}>
                      Total Registrations
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>
                      {adminStats.totalRegistrations.toLocaleString()}
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={75} 
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
                    {avgRegistrationsPerEvent.toFixed(0)}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Enhanced Club Activity */}
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
                    bgcolor: 'rgba(16, 185, 129, 0.1)',
                    borderRadius: 2,
                    p: 1,
                    mr: 2,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <GroupIcon sx={{ color: '#10b981', fontSize: 24 }} />
                </Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600,
                    color: '#1e293b'
                  }}
                >
                  Club Activity
                </Typography>
              </Box>
              
              <Stack spacing={3}>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1" sx={{ color: '#64748b', fontWeight: 500 }}>
                      Active Clubs
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>
                      {adminStats.activeClubs}
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={85} 
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: '#e2e8f0',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: '#10b981',
                        borderRadius: 4,
                      }
                    }}
                  />
                </Box>
                
                <Divider sx={{ bgcolor: '#e2e8f0' }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body1" sx={{ color: '#64748b', fontWeight: 500 }}>
                    Events per Club
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>
                    {eventsPerClub.toFixed(1)}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Event Completion Rate */}
        <Grid item xs={12}>
          <Card 
            sx={{ 
              borderRadius: 3,
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.8)',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                    <CheckCircleIcon sx={{ color: '#06b6d4', fontSize: 24 }} />
                  </Box>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600,
                      color: '#1e293b'
                    }}
                  >
                    Event Completion Progress
                  </Typography>
                </Box>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 700,
                    color: '#06b6d4'
                  }}
                >
                  {completionRate.toFixed(0)}%
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <LinearProgress 
                  variant="determinate" 
                  value={completionRate} 
                  sx={{
                    height: 12,
                    borderRadius: 6,
                    bgcolor: '#e2e8f0',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: 'linear-gradient(90deg, #06b6d4 0%, #0891b2 100%)',
                      borderRadius: 6,
                    }
                  }}
                />
              </Box>
              
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                {adminStats.completedEvents} of {adminStats.totalEvents} events completed this semester
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;