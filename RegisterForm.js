import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    navigate("/proof-upload"); // Navigate to ProofUpload page
  };

  return (
    <Box sx={{ bgcolor: "black", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Container maxWidth="sm" sx={{ bgcolor: "#1e1e1e", p: 4, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" color="white" align="center" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField 
            fullWidth 
            label="Username" 
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
            margin="normal" 
            required 
            InputProps={{ style: { backgroundColor: "white" } }} 
          />
          <TextField 
            fullWidth 
            label="Email" 
            name="email" 
            type="email" 
            value={formData.email} 
            onChange={handleChange} 
            margin="normal" 
            required 
            InputProps={{ style: { backgroundColor: "white" } }} 
          />
          <TextField 
            fullWidth 
            label="Password" 
            name="password" 
            type="password" 
            value={formData.password} 
            onChange={handleChange} 
            margin="normal" 
            required 
            InputProps={{ style: { backgroundColor: "white" } }} 
          />
          <TextField 
            fullWidth 
            label="Confirm Password" 
            name="confirmPassword" 
            type="password" 
            value={formData.confirmPassword} 
            onChange={handleChange} 
            margin="normal" 
            required 
            InputProps={{ style: { backgroundColor: "white" } }} 
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Next
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default RegisterForm;
