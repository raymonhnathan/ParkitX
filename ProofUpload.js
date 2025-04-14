import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Input, Container } from "@mui/material";

const ProofUpload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];

    if (uploadedFile) {
      const fileName = uploadedFile.name.toLowerCase();
      
      if (fileName.includes("license") || fileName.includes("driving")) {
        setFile(uploadedFile);
        setError(""); // Clear error if correct file is uploaded
      } else {
        setFile(null);
        setError("Please upload a valid Driving License.");
      }
    }
  };

  const handleSubmit = () => {
    if (!file) {
      alert("Please upload a valid Driving License before proceeding.");
      return;
    }
    navigate("/map"); // Navigate to Map Page
  };

  return (
    <Box sx={{ bgcolor: "black", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "white" }}>
      <Container maxWidth="sm" sx={{ bgcolor: "#1e1e1e", p: 4, borderRadius: 2, boxShadow: 3, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>Attach a Proof</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>Upload your Driving License</Typography>
        
        <Input type="file" onChange={handleFileUpload} sx={{ mb: 2, color: "white" }} />
        
        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
        
        <Button variant="contained" color="primary" disabled={!file} onClick={handleSubmit}>
          Submit
        </Button>
      </Container>
    </Box>
  );
};

export default ProofUpload;
