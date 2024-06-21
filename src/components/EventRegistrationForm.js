import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Container,
} from '@mui/material';
import { motion } from 'framer-motion';

const EventRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    attendingWithGuest: 'No',
    guestName: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = 'Name is required';
    if (!formData.email) {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email is invalid';
    }
    if (!formData.age) {
      formErrors.age = 'Age is required';
    } else if (isNaN(formData.age) || formData.age <= 0) {
      formErrors.age = 'Age must be a number greater than 0';
    }
    if (formData.attendingWithGuest === 'Yes' && !formData.guestName) {
      formErrors.guestName = 'Guest Name is required';
    }
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      setSubmitted(true);
    } else {
      setErrors(formErrors);
    }
  };

  if (submitted) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ p: 4, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>
              Registration Summary
            </Typography>
            <Typography variant="body1"><strong>Name:</strong> {formData.name}</Typography>
            <Typography variant="body1"><strong>Email:</strong> {formData.email}</Typography>
            <Typography variant="body1"><strong>Age:</strong> {formData.age}</Typography>
            <Typography variant="body1"><strong>Attending with Guest:</strong> {formData.attendingWithGuest}</Typography>
            {formData.attendingWithGuest === 'Yes' && (
              <Typography variant="body1"><strong>Guest Name:</strong> {formData.guestName}</Typography>
            )}
          </Box>
        </motion.div>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 4, boxShadow: 3, borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom>
            Event Registration Form
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            error={!!errors.age}
            helperText={errors.age}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Are you attending with a guest?"
            name="attendingWithGuest"
            select
            value={formData.attendingWithGuest}
            onChange={handleChange}
          >
            <MenuItem value="No">No</MenuItem>
            <MenuItem value="Yes">Yes</MenuItem>
          </TextField>
          {formData.attendingWithGuest === 'Yes' && (
            <TextField
              fullWidth
              margin="normal"
              label="Guest Name"
              name="guestName"
              value={formData.guestName}
              onChange={handleChange}
              error={!!errors.guestName}
              helperText={errors.guestName}
            />
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </Box>
      </motion.div>
    </Container>
  );
};

export default EventRegistrationForm;
