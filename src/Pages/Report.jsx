import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Tab,
  Tabs,
  Chip,
  TextField,
  MenuItem,
} from '@mui/material';

// Dummy data - expanded for better representation
const clubsData = [
  { name: 'AI/ML Club', totalEvents: 15, totalMembers: 45, avgAttendance: 78 },
  { name: 'Cybersecurity Club', totalEvents: 8, totalMembers: 28, avgAttendance: 85 },
  { name: 'Cultural Club', totalEvents: 12, totalMembers: 67, avgAttendance: 72 },
  { name: 'Sports Club', totalEvents: 20, totalMembers: 89, avgAttendance: 65 },
  { name: 'Debate Club', totalEvents: 10, totalMembers: 32, avgAttendance: 90 },
];

const studentsData = [
  { id: 1, name: 'John Doe', rollNo: 'CS2101', department: 'Computer Science', clubs: [
    { name: 'AI/ML Club', totalEvents: 15, attended: 12 },
    { name: 'Cybersecurity Club', totalEvents: 8, attended: 8 },
  ]},
  { id: 2, name: 'Jane Smith', rollNo: 'CS2102', department: 'Computer Science', clubs: [
    { name: 'AI/ML Club', totalEvents: 15, attended: 6 },
    { name: 'Cultural Club', totalEvents: 12, attended: 10 },
  ]},
  { id: 3, name: 'Mike Johnson', rollNo: 'EC2101', department: 'Electronics', clubs: [
    { name: 'Sports Club', totalEvents: 20, attended: 18 },
    { name: 'Debate Club', totalEvents: 10, attended: 9 },
  ]},
  { id: 4, name: 'Sarah Wilson', rollNo: 'ME2101', department: 'Mechanical', clubs: [
    { name: 'Cultural Club', totalEvents: 12, attended: 12 },
    { name: 'AI/ML Club', totalEvents: 15, attended: 5 },
  ]},
  { id: 5, name: 'Alex Brown', rollNo: 'CS2103', department: 'Computer Science', clubs: [
    { name: 'Cybersecurity Club', totalEvents: 8, attended: 7 },
    { name: 'Debate Club', totalEvents: 10, attended: 10 },
  ]},
];

const AdminReportPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const departments = ['All', ...new Set(studentsData.map(s => s.department))];

  const filteredStudents = studentsData.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'All' || student.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  const getAttendanceStatus = (attended, total) => {
    const percentage = (attended / total) * 100;
    if (percentage >= 80) return { color: 'success', label: 'Excellent' };
    if (percentage >= 60) return { color: 'warning', label: 'Good' };
    return { color: 'error', label: 'Poor' };
  };

  return (
    <Box sx={{ px: 3, py: 2 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#1976d2' }}>
        📊 Club Administration Report
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Club Overview" />
          <Tab label="Student Details" />
        </Tabs>
      </Box>

      {activeTab === 0 && (
        <TableContainer component={Paper} sx={{ mb: 3 }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f8f9fa' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem' }}>Club Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem' }} align="center">Total Events</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem' }} align="center">Total Members</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem' }} align="center">Avg Attendance %</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.95rem' }} align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clubsData.map((club, index) => (
                <TableRow key={index} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                  <TableCell sx={{ fontWeight: '500' }}>{club.name}</TableCell>
                  <TableCell align="center">{club.totalEvents}</TableCell>
                  <TableCell align="center">{club.totalMembers}</TableCell>
                  <TableCell align="center">{club.avgAttendance}%</TableCell>
                  <TableCell align="center">
                    <Chip 
                      label={club.avgAttendance >= 80 ? 'Active' : club.avgAttendance >= 70 ? 'Moderate' : 'Needs Attention'} 
                      color={club.avgAttendance >= 80 ? 'success' : club.avgAttendance >= 70 ? 'warning' : 'error'}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {activeTab === 1 && (
        <>
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
              size="small"
              placeholder="Search by name or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ minWidth: 300 }}
            />
            <TextField
              size="small"
              select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              sx={{ minWidth: 180 }}
              label="Department"
            >
              {departments.map((dept) => (
                <MenuItem key={dept} value={dept}>{dept}</MenuItem>
              ))}
            </TextField>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: '#f8f9fa' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Student Details</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.9rem' }} align="center">Department</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.9rem' }} align="center">Clubs Enrolled</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.9rem' }} align="center">Total Events</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.9rem' }} align="center">Attended</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.9rem' }} align="center">Missed</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.9rem' }} align="center">Attendance %</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.9rem' }} align="center">Performance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudents.map((student) => {
                  const totalEvents = student.clubs.reduce((sum, club) => sum + club.totalEvents, 0);
                  const totalAttended = student.clubs.reduce((sum, club) => sum + club.attended, 0);
                  const attendancePercent = totalEvents > 0 ? Math.round((totalAttended / totalEvents) * 100) : 0;
                  const status = getAttendanceStatus(totalAttended, totalEvents);

                  return (
                    <TableRow key={student.id} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                      <TableCell>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: '500' }}>{student.name}</Typography>
                          <Typography variant="caption" color="text.secondary">{student.rollNo}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2">{student.department}</Typography>
                      </TableCell>
                      <TableCell align="center">{student.clubs.length}</TableCell>
                      <TableCell align="center">{totalEvents}</TableCell>
                      <TableCell align="center" sx={{ color: 'success.main', fontWeight: '500' }}>
                        {totalAttended}
                      </TableCell>
                      <TableCell align="center" sx={{ color: 'error.main', fontWeight: '500' }}>
                        {totalEvents - totalAttended}
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: '500' }}>
                        {attendancePercent}%
                      </TableCell>
                      <TableCell align="center">
                        <Chip 
                          label={status.label} 
                          color={status.color}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ mt: 2, p: 2, backgroundColor: '#f8f9fa', borderRadius: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Showing {filteredStudents.length} of {studentsData.length} students
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
};

export default AdminReportPage;