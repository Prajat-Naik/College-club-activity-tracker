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
  Stack,
  MenuItem,
  Grid,
  Backdrop,
  Fade,
  FormControl,
  InputLabel,
  Select,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DateTimePicker, StaticDatePicker } from '@mui/x-date-pickers';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router-dom';

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

const initialEvents = [
  {
    id: 1,
    title: 'AI Workshop',
    description: 'Introduction to Machine Learning basics',
    date: new Date('2024-07-20T14:00:00'),
    venue: 'Tech Lab 101',
    capacity: 50,
    registeredParticipants: 30,
    status: 'Upcoming',
    organizer: 'Dr. Sarah Johnson',
    type: 'Workshop',
  },
  {
    id: 2,
    title: 'React Bootcamp',
    description: 'Advanced React concepts and best practices',
    date: new Date('2024-07-20T10:00:00'),
    venue: 'Conference Room',
    capacity: 30,
    registeredParticipants: 25,
    status: 'Upcoming',
    organizer: 'John Smith',
    type: 'Training',
  },
  {
    id: 3,
    title: 'Tech Talk',
    description: 'Latest trends in web development',
    date: new Date('2024-07-22T16:00:00'),
    venue: 'Auditorium',
    capacity: 100,
    registeredParticipants: 45,
    status: 'Upcoming',
    organizer: 'Jane Doe',
    type: 'Seminar',
  },
];

const eventTypes = ['Workshop', 'Seminar', 'Competition', 'Meeting', 'Training'];
const venues = ['Tech Lab 101', 'Auditorium', 'Conference Room', 'Main Hall', 'Sports Complex'];

const ManageEvents = () => {
  const [events, setEvents] = useState(initialEvents);
  const [openModal, setOpenModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarDate, setCalendarDate] = useState(new Date());
  const navigate = useNavigate();

  const handleEventClick = (event) => {
    navigate(`/event-attendance/${event.id}`, { state: { event } });
  };
  const handleAdd = () => {
    setIsEditing(false);
    setSelectedEvent(null);
    setSelectedDate(new Date());
    setOpenModal(true);
  };

  const handleEdit = (event) => {
    setIsEditing(true);
    setSelectedEvent(event);
    setSelectedDate(event.date);
    setOpenModal(true);
  };

  const handleDelete = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const newEvent = {
      id: isEditing ? selectedEvent.id : Date.now(),
      title: formData.get('title'),
      description: formData.get('description'),
      date: selectedDate,
      venue: formData.get('venue'),
      capacity: parseInt(formData.get('capacity')),
      registeredParticipants: isEditing ? selectedEvent.registeredParticipants : 0,
      status: 'Upcoming',
      organizer: formData.get('organizer'),
      type: formData.get('type'),
    };

    if (isEditing) {
      setEvents(events.map((e) => (e.id === newEvent.id ? newEvent : e)));
    } else {
      setEvents([...events, newEvent]);
    }

    setOpenModal(false);
  };

  const getEventsForDate = (date) => {
    const selectedDateStr = date.toDateString();
    return events.filter(event => event.date.toDateString() === selectedDateStr);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const eventsForSelectedDate = getEventsForDate(calendarDate);

  return (
    <Box sx={{ bgcolor: '#f8fafc', pl: 8, pr: 4, py: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#1e293b', mb: 1 }}>
          Event Management
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748b' }}>
          Create and manage club events, workshops, and activities
        </Typography>
      </Box>

      <Card sx={{ mb: 3, borderRadius: 2, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
        <CardContent>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAdd}
            sx={{ borderRadius: 2 }}
          >
            Create New Event
          </Button>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {/* Calendar Section - Left Side */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 2, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Event Calendar
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDatePicker
                  displayStaticWrapperAs="desktop"
                  value={calendarDate}
                  onChange={(newValue) => setCalendarDate(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                  sx={{ width: '100%' }}
                />
              </LocalizationProvider>
            </CardContent>
          </Card>
        </Grid>

        {/* Events for Selected Date - Right Side */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 2, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Events on {calendarDate.toDateString()}
              </Typography>
              
              {eventsForSelectedDate.length === 0 ? (
                <Paper 
                  sx={{ 
                    p: 8, 
                    textAlign: 'center', 
                    bgcolor: '#f8fafc',
                    borderRadius: 2,
                    border: '1px dashed #cbd5e1'
                  }}
                >
                  <EventIcon sx={{ fontSize: 48, color: '#94a3b8', mb: 2 }} />
                  <Typography variant="body1" sx={{ color: '#64748b' }}>
                    No events scheduled for this date
                  </Typography>
                </Paper>
              ) : (
                <List sx={{ width: '100%' }}>
                  {eventsForSelectedDate.map((event, index) => (
                    <React.Fragment key={event.id}>
                      <ListItem
                        sx={{
                          bgcolor: '#ffffff',
                          borderRadius: 2,
                          mb: 1,
                          border: '1px solid #e2e8f0',
                          '&:hover': {
                            bgcolor: '#f8fafc',
                          },
                          width: '700px'
                        }}
                      >
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {event.title}
                              </Typography>
                              <Stack direction="row" spacing={1}>
                                <IconButton size="small" onClick={() => handleEdit(event)} color="primary">
                                  <EditIcon />
                                </IconButton>
                                <IconButton size="small" onClick={() => handleDelete(event.id)} color="error">
                                  <DeleteIcon />
                                </IconButton>
                              </Stack>
                            </Box>
                          }
                          secondary={
                            <Box sx={{ mt: 1 }}>
                              <Typography variant="body2" sx={{ color: '#64748b', mb: 1 }}>
                                {event.description}
                              </Typography>
                              
                              <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <AccessTimeIcon sx={{ fontSize: 16, color: '#64748b', mr: 0.5 }} />
                                  <Typography variant="body2" sx={{ color: '#64748b' }}>
                                    {formatTime(event.date)}
                                  </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <LocationOnIcon sx={{ fontSize: 16, color: '#64748b', mr: 0.5 }} />
                                  <Typography variant="body2" sx={{ color: '#64748b' }}>
                                    {event.venue}
                                  </Typography>
                                </Box>
                                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                                <Chip
                                  label={event.type}
                                  size="small"
                                  color="primary"
                                  variant="outlined"
                                />
                                <Chip
                                  icon={<PeopleIcon />}
                                  label={`${event.registeredParticipants}/${event.capacity}`}
                                  color={event.registeredParticipants >= event.capacity ? 'error' : 'success'}
                                  size="small"
                                />
                                <Chip
                                  label={event.status}
                                  color={event.status === 'Upcoming' ? 'success' : 'warning'}
                                  size="small"
                                />
                              </Stack>
                              <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => handleEventClick(event)}>
                                Manage attendance
                              </Button>
                              </Stack>
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < eventsForSelectedDate.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

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
          <Box sx={modalStyle}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              {isEditing ? 'Edit Event' : 'Create New Event'}
            </Typography>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  label="Event Title"
                  name="title"
                  defaultValue={selectedEvent?.title || ''}
                  required
                />
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  multiline
                  rows={3}
                  defaultValue={selectedEvent?.description || ''}
                  required
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    label="Event Date & Time"
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                    renderInput={(params) => <TextField {...params} required />}
                  />
                </LocalizationProvider>
                <FormControl fullWidth required>
                  <InputLabel>Venue</InputLabel>
                  <Select
                    name="venue"
                    defaultValue={selectedEvent?.venue || ''}
                    label="Venue"
                  >
                    {venues.map((venue) => (
                      <MenuItem key={venue} value={venue}>
                        {venue}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth required>
                  <InputLabel>Event Type</InputLabel>
                  <Select
                    name="type"
                    defaultValue={selectedEvent?.type || ''}
                    label="Event Type"
                  >
                    {eventTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label="Capacity"
                  name="capacity"
                  type="number"
                  defaultValue={selectedEvent?.capacity || ''}
                  required
                />
                <TextField
                  fullWidth
                  label="Organizer Name"
                  name="organizer"
                  defaultValue={selectedEvent?.organizer || ''}
                  required
                />
                <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                  {isEditing ? 'Update Event' : 'Create Event'}
                </Button>
              </Stack>
            </form>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default ManageEvents;
