import React, { useState } from 'react';
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  IconButton,
  Card,
  CardContent,
  Chip,
  Avatar,
  Stack,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Backdrop,
  Fade,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupsIcon from '@mui/icons-material/Groups';
import EventIcon from '@mui/icons-material/Event';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
  p: 4,
  maxHeight: '90vh',
  overflowY: 'auto',
};

const initialClubs = [
  {
    id: 1,
    name: 'AI/ML Club',
    description: 'Exploring AI and ML concepts',
    category: 'Technical',
    organizer: 'Dr. Sarah Johnson',
    organizerEmail: 'sarah.j@example.com',
    meetingSchedule: 'Every Monday, 4:00 PM',
    location: 'Tech Lab 101',
    memberCount: 45,
    establishedDate: '2022-01-15',
    upcomingEvents: 3,
    logo: 'https://mui.com/static/images/avatar/2.jpg',
    status: 'Active',
  },
];

const ManageClubs = () => {
  const [clubs, setClubs] = useState(initialClubs);
  const [openModal, setOpenModal] = useState(false);
  const [selectedClub, setSelectedClub] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleAdd = () => {
    setIsEditing(false);
    setSelectedClub(null);
    setOpenModal(true);
  };

  const handleEdit = (club) => {
    setIsEditing(true);
    setSelectedClub(club);
    setOpenModal(true);
  };

  const handleDelete = (id) => {
    setClubs(clubs.filter((club) => club.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const newClub = {
      id: isEditing ? selectedClub.id : Date.now(),
      name: formData.get('name'),
      category: formData.get('category'),
      organizer: formData.get('organizer'),
      organizerEmail: formData.get('organizerEmail'),
      description: formData.get('description'),
      memberCount: 0,
      upcomingEvents: 0,
      logo: selectedClub?.logo || 'https://mui.com/static/images/avatar/1.jpg',
      status: 'Active',
    };

    if (isEditing) {
      setClubs(clubs.map((c) => (c.id === newClub.id ? newClub : c)));
    } else {
      setClubs([...clubs, newClub]);
    }

    setOpenModal(false);
  };

  return (
    <Box sx={{ bgcolor: '#f8fafc', pl: 8 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b', mb: 1 }}>
          Club Management
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748b' }}>
          Manage club details, organizers, categories and events.
        </Typography>
      </Box>

      {/* Add Button */}
      <Card sx={{ mb: 3, borderRadius: 2, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={3}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAdd}
                sx={{ borderRadius: 2, height: '56px' }}
                fullWidth
              >
                Add Club
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Clubs Table */}
      <Card sx={{ borderRadius: 2, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Logo</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Club Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Organizer</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Members</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Events</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clubs.map((club) => (
                <TableRow key={club.id} hover>
                  <TableCell>
                    <Avatar src={club.logo} sx={{ width: 40, height: 40 }} />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{club.name}</TableCell>
                  <TableCell>{club.category}</TableCell>
                  <TableCell>{club.organizer}</TableCell>
                  <TableCell>
                    <Chip
                      label={club.status}
                      color={club.status === 'Active' ? 'success' : 'warning'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <GroupsIcon fontSize="small" />
                      {club.memberCount}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <EventIcon fontSize="small" />
                      {club.upcomingEvents}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(club)} sx={{ color: '#3b82f6' }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(club.id)} sx={{ color: '#ef4444' }}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Modal */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={openModal}>
          <Box sx={modalStyle} component="form" onSubmit={handleSubmit}>
            <Typography variant="h6" mb={3} sx={{ fontWeight: 600 }}>
              {isEditing ? 'Edit Club' : 'Add New Club'}
            </Typography>
            <Stack spacing={3}>
              <TextField
                name="name"
                label="Club Name"
                defaultValue={selectedClub?.name || ''}
                required
                fullWidth
              />
              <TextField
                name="category"
                label="Category"
                select
                fullWidth
                defaultValue={selectedClub?.category || 'Technical'}
              >
                <MenuItem value="Technical">Technical</MenuItem>
                <MenuItem value="Cultural">Cultural</MenuItem>
                <MenuItem value="Sports">Sports</MenuItem>
                <MenuItem value="Academic">Academic</MenuItem>
              </TextField>
              <TextField
                name="organizer"
                label="Organizer"
                defaultValue={selectedClub?.organizer || ''}
                required
                fullWidth
              />
              <TextField
                name="organizerEmail"
                label="Organizer Email"
                defaultValue={selectedClub?.organizerEmail || ''}
                type="email"
                required
                fullWidth
              />
              <TextField
                name="description"
                label="Description"
                defaultValue={selectedClub?.description || ''}
                multiline
                rows={3}
                fullWidth
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button onClick={() => setOpenModal(false)}>Cancel</Button>
                <Button type="submit" variant="contained">
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

export default ManageClubs;