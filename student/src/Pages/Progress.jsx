import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Stack,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

// Professional student progress data
const studentData = {
  name: 'John Doe',
  rollNo: 'CS2101',
  semester: '6th Semester',
  department: 'Computer Science',
  clubs: [
    {
      name: 'AI/ML Club',
      role: 'Member',
      totalEvents: 10,
      attended: 8,
      recentActivities: [
        { event: 'Machine Learning Workshop', date: '2024-07-18', status: 'Present' },
        { event: 'AI Ethics Seminar', date: '2024-07-15', status: 'Present' },
        { event: 'Deep Learning Project', date: '2024-07-12', status: 'Absent' },
        { event: 'Python for Data Science', date: '2024-07-08', status: 'Present' }
      ]
    },
    {
      name: 'Cybersecurity Club',
      role: 'Vice President',
      totalEvents: 8,
      attended: 8,
      recentActivities: [
        { event: 'Ethical Hacking Workshop', date: '2024-07-20', status: 'Present' },
        { event: 'Network Security Talk', date: '2024-07-17', status: 'Present' },
        { event: 'CTF Competition', date: '2024-07-14', status: 'Present' },
        { event: 'Cybersecurity Awareness', date: '2024-07-10', status: 'Present' }
      ]
    },
  ],
  upcomingEvents: [
    { event: 'Blockchain Workshop', club: 'AI/ML Club', date: '2024-07-25', time: '2:00 PM' },
    { event: 'Security Audit Session', club: 'Cybersecurity Club', date: '2024-07-26', time: '3:30 PM' },
    { event: 'Talent Show', club: 'Cultural Club', date: '2024-07-28', time: '6:00 PM' }
  ]
};

const Progress = () => {
  const calculateAttendanceRate = (attended, total) => {
    return Math.round((attended / total) * 100);
  };

  const totalEvents = studentData.clubs.reduce((sum, club) => sum + club.totalEvents, 0);
  const totalAttended = studentData.clubs.reduce((sum, club) => sum + club.attended, 0);
  const overallAttendance = calculateAttendanceRate(totalAttended, totalEvents);

  return (
    <Box sx={{ p: 3, bgcolor: '#fafafa', minHeight: '100vh' }}>
      {/* Header */}
      <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          justifyContent: 'space-between', 
          alignItems: { xs: 'flex-start', md: 'center' } 
        }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: '#1a1a1a' }}>
              Club Activity Progress
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {studentData.name} ({studentData.rollNo}) • {studentData.department} • {studentData.semester}
            </Typography>
          </Box>
          <Box sx={{ mt: { xs: 2, md: 0 }, textAlign: 'right' }}>
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
              {overallAttendance}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Overall Attendance
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid item xs={12} lg={8} sx={{width:'700px'}}>
          {/* Summary Statistics */}
          <Card sx={{ mb: 3, elevation: 1 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Summary
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center', py: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 600, color: '#1a1a1a', mb: 1 }}>
                      {studentData.clubs.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Active Clubs
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center', py: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 600, color: '#1a1a1a', mb: 1 }}>
                      {totalEvents}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Events
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center', py: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 600, color: '#1a1a1a', mb: 1 }}>
                      {totalAttended}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Events Attended
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Club-wise Progress */}
          <Card sx={{ elevation: 1 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Club-wise Attendance
              </Typography>
              
              <Stack spacing={3}>
                {studentData.clubs.map((club, index) => (
                  <Paper key={index} variant="outlined" sx={{ p: 3 }}>
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: { xs: 'column', md: 'row' }, 
                      justifyContent: 'space-between', 
                      alignItems: { xs: 'flex-start', md: 'center' }, 
                      mb: 2 
                    }}>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                          {club.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {club.role}
                        </Typography>
                      </Box>
                      <Typography variant="h6" sx={{ mt: { xs: 1, md: 0 }, fontWeight: 600 }}>
                        {calculateAttendanceRate(club.attended, club.totalEvents)}%
                      </Typography>
                    </Box>
                    
                    {/* Progress Bar */}
                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Attendance Progress
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {club.attended}/{club.totalEvents} events
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={calculateAttendanceRate(club.attended, club.totalEvents)}
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          bgcolor: 'grey.200',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: '#1a1a1a'
                          }
                        }}
                      />
                    </Box>

                    {/* Recent Activities */}
                    <Box>
                      <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                        Recent Activities
                      </Typography>
                      <TableContainer>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell sx={{ fontWeight: 600 }}>Event</TableCell>
                              <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {club.recentActivities.slice(0, 4).map((activity, actIndex) => (
                              <TableRow key={actIndex}>
                                <TableCell>
                                  <Typography variant="body2">
                                    {activity.event}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography variant="body2" color="text.secondary">
                                    {activity.date}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography 
                                    variant="body2" 
                                    sx={{ 
                                      color: activity.status === 'Present' ? '#2e7d32' : '#d32f2f',
                                      fontWeight: 500
                                    }}
                                  >
                                    {activity.status}
                                  </Typography>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  </Paper>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} lg={4} sx={{width:'400px'}}>
          <Stack spacing={3}>
            {/* Upcoming Events */}
            <Card sx={{ elevation: 1 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Upcoming Events
                </Typography>
                <Stack spacing={2}>
                  {studentData.upcomingEvents.map((event, index) => (
                    <Paper key={index} sx={{ p: 2, bgcolor: 'grey.50' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                        {event.event}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {event.club}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="caption" color="text.secondary">
                          {event.date}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {event.time}
                        </Typography>
                      </Box>
                    </Paper>
                  ))}
                </Stack>
              </CardContent>
            </Card>

            {/* Attendance Overview */}
            <Card sx={{ elevation: 1 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Attendance Overview
                </Typography>
                <Stack spacing={2}>
                  {studentData.clubs.map((club, index) => (
                    <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                      <Typography variant="body2">
                        {club.name}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {club.attended}/{club.totalEvents}
                      </Typography>
                    </Box>
                  ))}
                  <Divider />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Total
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {totalAttended}/{totalEvents}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Progress;