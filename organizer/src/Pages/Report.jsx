import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AssessmentIcon from '@mui/icons-material/Assessment';

// Sample data - Replace with your actual data
const eventData = [
  {
    id: 1,
    name: 'AI Workshop',
    totalRegistrations: 30,
    attended: 25,
    date: '2024-07-20',
    type: 'Workshop',
  },
  {
    id: 2,
    name: 'React Bootcamp',
    totalRegistrations: 25,
    attended: 20,
    date: '2024-07-22',
    type: 'Training',
  },
  {
    id: 3,
    name: 'Tech Talk',
    totalRegistrations: 45,
    attended: 35,
    date: '2024-07-25',
    type: 'Seminar',
  },
];

const Report = () => {
  const [timeFrame, setTimeFrame] = useState('all');

  // Calculate statistics
  const totalEvents = eventData.length;
  const totalParticipants = eventData.reduce((sum, event) => sum + event.totalRegistrations, 0);
  const totalAttendance = eventData.reduce((sum, event) => sum + event.attended, 0);
  const averageAttendanceRate = ((totalAttendance / totalParticipants) * 100).toFixed(1);

  // Calculate event type statistics
  const eventTypes = eventData.reduce((acc, event) => {
    acc[event.type] = (acc[event.type] || 0) + 1;
    return acc;
  }, {});

  return (
    <Box sx={{ bgcolor: '#f8fafc', pl: 8, pr: 4, py: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b', mb: 1 }}>
        Club Reports & Analytics
      </Typography>
      <Typography variant="body1" sx={{ color: '#64748b', mb: 4 }}>
        Overview of club events and participation statistics
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 2, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <EventIcon sx={{ fontSize: 40, color: '#3b82f6' }} />
                <Box>
                  <Typography variant="h6" color="text.secondary">Total Events</Typography>
                  <Typography variant="h3" sx={{ mt: 1, fontWeight: 600 }}>{totalEvents}</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 2, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <PeopleIcon sx={{ fontSize: 40, color: '#10b981' }} />
                <Box>
                  <Typography variant="h6" color="text.secondary">Total Participants</Typography>
                  <Typography variant="h3" sx={{ mt: 1, fontWeight: 600 }}>{totalParticipants}</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 2, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <CheckCircleIcon sx={{ fontSize: 40, color: '#6366f1' }} />
                <Box>
                  <Typography variant="h6" color="text.secondary">Total Attendance</Typography>
                  <Typography variant="h3" sx={{ mt: 1, fontWeight: 600 }}>{totalAttendance}</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 2, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <AssessmentIcon sx={{ fontSize: 40, color: '#f59e0b' }} />
                <Box>
                  <Typography variant="h6" color="text.secondary">Attendance Rate</Typography>
                  <Typography variant="h3" sx={{ mt: 1, fontWeight: 600 }}>{averageAttendanceRate}%</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Detailed Event Report Table */}
      <Card sx={{ borderRadius: 2, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">Event Details</Typography>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Time Frame</InputLabel>
              <Select
                value={timeFrame}
                label="Time Frame"
                onChange={(e) => setTimeFrame(e.target.value)}
              >
                <MenuItem value="all">All Time</MenuItem>
                <MenuItem value="month">This Month</MenuItem>
                <MenuItem value="quarter">This Quarter</MenuItem>
                <MenuItem value="year">This Year</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Event Name</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell align="right">Registrations</TableCell>
                  <TableCell align="right">Attendance</TableCell>
                  <TableCell align="right">Attendance Rate</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {eventData.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>{event.name}</TableCell>
                    <TableCell>{event.date}</TableCell>
                    <TableCell>{event.type}</TableCell>
                    <TableCell align="right">{event.totalRegistrations}</TableCell>
                    <TableCell align="right">{event.attended}</TableCell>
                    <TableCell align="right">
                      {((event.attended / event.totalRegistrations) * 100).toFixed(1)}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Report;