import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';

// Sample data - Replace with your actual data
const initialRegistrations = [
  {
    id: 1,
    studentName: 'John Doe',
    studentId: 'STU001',
    eventId: 1,
    eventName: 'AI Workshop',
    eventDate: new Date('2024-07-20T14:00:00'),
    attended: true,
    department: 'Computer Science',
    year: '3rd Year',
  },
  {
    id: 2,
    studentName: 'Jane Smith',
    studentId: 'STU002',
    eventId: 1,
    eventName: 'AI Workshop',
    eventDate: new Date('2024-07-20T14:00:00'),
    attended: false,
    department: 'Data Science',
    year: '2nd Year',
  },
  // Add more sample data as needed
];

const EventAttendance = () => {
  const [registrations, setRegistrations] = useState(initialRegistrations);
  const [selectedEvent, setSelectedEvent] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const events = [...new Set(registrations.map(reg => reg.eventName))];

  const handleAttendanceChange = (registrationId) => {
    setRegistrations(registrations.map(reg =>
      reg.id === registrationId ? { ...reg, attended: !reg.attended } : reg
    ));
  };

  const filteredRegistrations = registrations.filter(reg => {
    const matchesEvent = selectedEvent === 'all' || reg.eventName === selectedEvent;
    const matchesSearch = reg.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         reg.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesEvent && matchesSearch;
  });

  return (
    <Box sx={{ bgcolor: '#f8fafc', pl: 8, pr: 4, py: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b', mb: 1 }}>
        Event Attendance
      </Typography>
      <Typography variant="body1" sx={{ color: '#64748b', mb: 4 }}>
        Manage student attendance for club events
      </Typography>

      <Card sx={{ mb: 4, borderRadius: 2, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
              placeholder="Search by student name or ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ flexGrow: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Event</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Year</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Attendance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRegistrations.map((registration) => (
                  <TableRow 
                    key={registration.id}
                    sx={{ '&:hover': { bgcolor: '#f8fafc' } }}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <PersonIcon color="action" fontSize="small" />
                        {registration.studentId}
                      </Box>
                    </TableCell>
                    <TableCell>{registration.studentName}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <EventIcon color="action" fontSize="small" />
                        {registration.eventName}
                      </Box>
                    </TableCell>
                    <TableCell>{registration.department}</TableCell>
                    <TableCell>{registration.year}</TableCell>
                    <TableCell>
                      {registration.eventDate.toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Checkbox
                          checked={registration.attended}
                          onChange={() => handleAttendanceChange(registration.id)}
                          color="success"
                        />
                        <Chip
                          label={registration.attended ? 'Present' : 'Absent'}
                          color={registration.attended ? 'success' : 'error'}
                          size="small"
                        />
                      </Box>
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

export default EventAttendance;