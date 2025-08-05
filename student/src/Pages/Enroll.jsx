import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Chip,
  Divider,
  Paper,
  Stack
} from '@mui/material';
import {
  Event as EventIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  People as PeopleIcon,
  School as SchoolIcon,
  CheckCircle as CheckIcon
} from '@mui/icons-material';

// Sample data - Replace with actual data from your backend
const eventData = {
  title: 'AI & Machine Learning Workshop',
  description: 'Hands-on workshop covering fundamentals of AI and ML with practical coding sessions and project work.',
  date: 'July 20, 2024',
  time: '2:00 PM - 5:00 PM',
  venue: 'Computer Science Lab - Block A, Room 201',
  capacity: 50,
  registered: 32,
  organizer: 'Dr. Sarah Johnson',
  department: 'Computer Science Department',
  instructions: [
    'Bring your laptop with minimum 8GB RAM',
    'Install Python 3.8 or higher before the workshop',
    'Download workshop materials (link will be sent after registration)',
    'Arrive 15 minutes before the start time',
    'Bring your student ID card'
  ]
};

// Sample user data - Replace with actual user data from your auth system
const userData = {
  fullName: 'John Doe',
  studentId: '2024CS001',
  email: 'john.doe@college.edu',
  department: 'Computer Science & Engineering',
  year: '2nd Year',
  semester: '4th Semester'
};

const Enroll = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const [enrolled, setEnrolled] = useState(false);

  const steps = ['Event Details', 'Confirm Registration'];
  const availableSeats = eventData.capacity - eventData.registered;

  const handleNext = () => setActiveStep(1);
  const handleBack = () => setActiveStep(0);
  const handleSubmit = () => setShowDialog(true);
  const confirmEnrollment = () => {
    setEnrolled(true);
    setShowDialog(false);
  };

  if (enrolled) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', py: 4, px: 2 }}>
        <Box sx={{ maxWidth: 600, mx: 'auto' }}>
          <Card sx={{ textAlign: 'center', p: 4 }}>
            <CheckIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
            <Typography variant="h4" gutterBottom color="success.main" fontWeight="bold">
              Enrollment Successful!
            </Typography>
            <Typography variant="h6" gutterBottom>
              {eventData.title}
            </Typography>
            <Divider sx={{ my: 3 }} />
            <Alert severity="success" sx={{ mb: 3 }}>
              <Typography variant="body2">
                You have successfully registered for the event.
              </Typography>
            </Alert>
            <Button variant="contained" size="large" sx={{ mt: 2 }}>
              View My Events
            </Button>
          </Card>
        </Box>
      </Box>
    );
  }

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Stack spacing={3} >
            <Box>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {eventData.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                {eventData.description}
              </Typography>
            </Box>

            <Paper sx={{ p: 3, bgcolor: 'grey.50' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <EventIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">Date & Time</Typography>
                      <Typography variant="body2">{eventData.date}</Typography>
                      <Typography variant="body2">{eventData.time}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">Venue</Typography>
                      <Typography variant="body2">{eventData.venue}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PeopleIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">Capacity</Typography>
                      <Typography variant="body2">
                        {eventData.registered}/{eventData.capacity} registered
                      </Typography>
                      <Chip 
                        label={`${availableSeats} seats left`} 
                        size="small" 
                        color={availableSeats > 10 ? 'success' : 'warning'}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <SchoolIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">Organizer</Typography>
                      <Typography variant="body2">{eventData.organizer}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {eventData.department}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>

            <Alert severity="info" sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>Important Instructions:</Typography>
              {eventData.instructions.map((instruction, index) => (
                <Typography key={index} variant="body2">• {instruction}</Typography>
              ))}
            </Alert>
          </Stack>
        );

      case 1:
        return (
          <Stack spacing={3}>
            <Typography variant="h5" gutterBottom>Registration Details</Typography>
            <Alert severity="info" sx={{ mb: 3 }}>
              Please verify your information before confirming enrollment.
            </Alert>
            
            <Paper sx={{ p: 3, bgcolor: 'grey.50' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">Full Name</Typography>
                  <Typography variant="body1">{userData.fullName}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">Student ID</Typography>
                  <Typography variant="body1">{userData.studentId}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">Email</Typography>
                  <Typography variant="body1">{userData.email}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">Department</Typography>
                  <Typography variant="body1">{userData.department}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary">Year & Semester</Typography>
                  <Typography variant="body1">{userData.year}, {userData.semester}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Stack>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', py: 4, px: 2 }}>
      <Box sx={{ maxWidth: 1200 }}>
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {renderStepContent()}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
              <Button
                onClick={handleBack}
                disabled={activeStep === 0}
                variant="outlined"
              >
                Back
              </Button>
              
              <Box>
                {activeStep === steps.length - 1 ? (
                  <Button
                    onClick={handleSubmit}
                    variant="contained"
                    size="large"
                  >
                    Confirm Enrollment
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    variant="contained"
                    size="large"
                  >
                    Next
                  </Button>
                )}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Dialog open={showDialog} onClose={() => setShowDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Confirm Enrollment</DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            Are you sure you want to enroll in <strong>{eventData.title}</strong>?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            By confirming, you agree to attend the event and follow all provided instructions.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDialog(false)}>Cancel</Button>
          <Button onClick={confirmEnrollment} variant="contained">Confirm</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Enroll;