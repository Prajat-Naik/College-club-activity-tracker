import React, { useState, useMemo } from 'react';
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  IconButton,
  Chip,
  Avatar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TablePagination,
  Card,
  CardContent,
  Grid,
  InputAdornment,
  Fade,
  Backdrop,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
  p: 4,
  maxHeight: '90vh',
  overflow: 'auto',
};

const availableClubs = ['AI/ML Club', 'Cybersecurity Club', 'Cultural Club', 'Robotics Club', 'Sports Club', 'Music Club', 'Photography Club', 'Literature Club'];
const departments = ['Computer Science', 'Electronics', 'Mechanical', 'MCA', 'Information Technology', 'Electrical'];
const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

// Generate sample data for testing large datasets
const generateSampleData = (count) => {
  const names = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Wilson', 'Charlie Brown', 'Diana Prince', 'Eve Adams', 'Frank Miller', 'Grace Lee', 'Henry Ford'];
  const sampleData = [];
  
  for (let i = 1; i <= count; i++) {
    sampleData.push({
      id: i,
      name: names[i % names.length] + ` ${i}`,
      rollNo: `CS${2000 + i}`,
      email: `student${i}@example.com`,
      department: departments[i % departments.length],
      year: years[i % years.length],
      clubs: availableClubs.slice(0, Math.floor(Math.random() * 3) + 1),
      avatar: `https://mui.com/static/images/avatar/${(i % 8) + 1}.jpg`,
    });
  }
  
  return sampleData;
};

const initialStudents = generateSampleData(50); // Generate 50 sample students

const ManageStudents = () => {
  const [students, setStudents] = useState(initialStudents);
  const [openModal, setOpenModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedClubs, setSelectedClubs] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');

  // Memoized filtered and searched students for performance
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = !departmentFilter || student.department === departmentFilter;
      const matchesYear = !yearFilter || student.year === yearFilter;
      
      return matchesSearch && matchesDepartment && matchesYear;
    });
  }, [students, searchTerm, departmentFilter, yearFilter]);

  // Paginated students
  const paginatedStudents = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return filteredStudents.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredStudents, page, rowsPerPage]);

  // Statistics
  const stats = useMemo(() => {
    const totalStudents = students.length;
    const totalDepartments = new Set(students.map(s => s.department)).size;
    const totalClubs = new Set(students.flatMap(s => s.clubs)).size;
    
    return { totalStudents, totalDepartments, totalClubs };
  }, [students]);

  const handleAdd = () => {
    setIsEditing(false);
    setSelectedStudent(null);
    setSelectedClubs([]);
    setOpenModal(true);
  };

  const handleEdit = (student) => {
    setIsEditing(true);
    setSelectedStudent(student);
    setSelectedClubs(student.clubs || []);
    setOpenModal(true);
  };

  const handleDelete = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const newStudent = {
      id: isEditing ? selectedStudent.id : Date.now(),
      name: formData.get('name'),
      rollNo: formData.get('rollNo'),
      email: formData.get('email'),
      department: formData.get('department'),
      year: formData.get('year'),
      avatar: selectedStudent?.avatar || `https://mui.com/static/images/avatar/${Math.floor(Math.random() * 8) + 1}.jpg`,
      clubs: selectedClubs,
    };

    if (isEditing) {
      setStudents(students.map((s) => (s.id === newStudent.id ? newStudent : s)));
    } else {
      setStudents([...students, newStudent]);
    }

    setOpenModal(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
<Box sx={{ bgcolor: '#f8fafc', pl: 8, }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b', mb: 1 }}>
          Student Management System
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748b' }}>
          Manage student records, clubs, and academic information
        </Typography>
      </Box>

      {/* Search and Filter Section */}
      <Card sx={{ mb: 3, borderRadius: 2, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAdd}
                sx={{ borderRadius: 2, height: '56px' }}
                fullWidth
              >
                Add Student
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card sx={{ borderRadius: 2, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ bgcolor: '#f8fafc', fontWeight: 600 }}>Avatar</TableCell>
                <TableCell sx={{ bgcolor: '#f8fafc', fontWeight: 600 }}>Name</TableCell>
                <TableCell sx={{ bgcolor: '#f8fafc', fontWeight: 600 }}>Roll No</TableCell>
                <TableCell sx={{ bgcolor: '#f8fafc', fontWeight: 600 }}>Email</TableCell>
                <TableCell sx={{ bgcolor: '#f8fafc', fontWeight: 600 }}>Department</TableCell>
                <TableCell sx={{ bgcolor: '#f8fafc', fontWeight: 600 }}>Year</TableCell>
                <TableCell sx={{ bgcolor: '#f8fafc', fontWeight: 600 }}>Clubs</TableCell>
                <TableCell sx={{ bgcolor: '#f8fafc', fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedStudents.map((student) => (
                <TableRow key={student.id} hover>
                  <TableCell>
                    <Avatar src={student.avatar} sx={{ width: 40, height: 40 }} />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{student.name}</TableCell>
                  <TableCell sx={{ fontFamily: 'monospace' }}>{student.rollNo}</TableCell>
                  <TableCell sx={{ color: '#6b7280' }}>{student.email}</TableCell>
                  <TableCell>{student.department}</TableCell>
                  <TableCell>{student.year}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={0.5} flexWrap="wrap">
                      {student.clubs.map((club) => (
                        <Chip
                          key={club}
                          label={club}
                          size="small"
                          sx={{
                            borderRadius: 1,
                            fontSize: '0.75rem',
                            bgcolor: '#e0f2fe',
                            color: '#0277bd',
                          }}
                        />
                      ))}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <IconButton 
                      onClick={() => handleEdit(student)}
                      sx={{ color: '#3b82f6' }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      onClick={() => handleDelete(student.id)}
                      sx={{ color: '#ef4444' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={filteredStudents.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      {/* Modal */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box sx={modalStyle} component="form" onSubmit={handleSubmit}>
            <Typography variant="h6" mb={3} sx={{ fontWeight: 600 }}>
              {isEditing ? 'Edit Student' : 'Add New Student'}
            </Typography>
            <Stack spacing={3}>
              <TextField
                name="name"
                label="Full Name"
                defaultValue={selectedStudent?.name || ''}
                fullWidth
                required
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
              <TextField
                name="rollNo"
                label="Roll Number"
                defaultValue={selectedStudent?.rollNo || ''}
                fullWidth
                required
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
              <TextField
                name="email"
                label="Email"
                type="email"
                defaultValue={selectedStudent?.email || ''}
                fullWidth
                required
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
              <FormControl fullWidth>
                <InputLabel>Department</InputLabel>
                <Select
                  name="department"
                  defaultValue={selectedStudent?.department || ''}
                  label="Department"
                  required
                  sx={{ borderRadius: 2 }}
                >
                  {departments.map((dept) => (
                    <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Year</InputLabel>
                <Select
                  name="year"
                  defaultValue={selectedStudent?.year || ''}
                  label="Year"
                  required
                  sx={{ borderRadius: 2 }}
                >
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>{year}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Clubs</InputLabel>
                <Select
                  multiple
                  value={selectedClubs}
                  onChange={(e) => setSelectedClubs(e.target.value)}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                  label="Clubs"
                  sx={{ borderRadius: 2 }}
                >
                  {availableClubs.map((club) => (
                    <MenuItem key={club} value={club}>
                      {club}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
                <Button 
                  onClick={() => setOpenModal(false)}
                  sx={{ borderRadius: 2, px: 3 }}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="contained"
                  sx={{ borderRadius: 2, px: 3 }}
                >
                  {isEditing ? 'Update' : 'Add'}
                </Button>
              </Box>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default ManageStudents;