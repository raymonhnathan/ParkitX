import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Typography, Card, CardContent, TextField, MenuItem } from "@mui/material";

const ParkingDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const parkingData = location.state || {}; // Parking details

  const [name, setName] = useState("");
  const [carName, setCarName] = useState("");
  const [duration, setDuration] = useState(1);

  const handleBookParking = () => {
    if (!name || !carName) {
      alert("Please enter your name and car name.");
      return;
    }

    navigate("/order-details", {
        state: {
          name,
          carName,
          duration,
          parkingLot: parkingData.name,
          rate: parkingData.rate,
          total: parkingData.rate * duration,
        },
      });      
  };

  return (
    <Box sx={{ bgcolor: "black", height: "100vh", color: "white", p: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
      
      <Button onClick={() => navigate(-1)} sx={{ alignSelf: "flex-start", color: "white", mb: 2 }}>
        ← Back
      </Button>

      <Card sx={{ width: "90%", bgcolor: "#1e1e1e", borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" color="white">{parkingData.name}</Typography>
          <Typography variant="body2" color="white">{parkingData.location}</Typography>

          {/* User Inputs */}
          <TextField fullWidth variant="outlined" label="Your Name" value={name} onChange={(e) => setName(e.target.value)}
            sx={{ mt: 2, bgcolor: "white", borderRadius: 2 }} />
          
          <TextField fullWidth variant="outlined" label="Car Name" value={carName} onChange={(e) => setCarName(e.target.value)}
            sx={{ mt: 2, bgcolor: "white", borderRadius: 1 }} />

          <TextField fullWidth select label="Duration (hrs)" value={duration} onChange={(e) => setDuration(e.target.value)}
            sx={{ mt: 2, bgcolor: "white", borderRadius: 1 }}>
            {[1, 2, 3, 4, 5].map((hour) => (
              <MenuItem key={hour} value={hour}>{hour} hour(s)</MenuItem>
            ))}
          </TextField>

          {/* Price Details */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button variant="contained" sx={{ bgcolor: "#303f9f" }}>{parkingData.slots} slots available</Button>
            <Button variant="contained" sx={{ bgcolor: "#303f9f" }}>₹{parkingData.rate} per hour</Button>
          </Box>

          {/* Book Button */}
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 3, borderRadius: "20px" }} onClick={handleBookParking}>
            Book Parking
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ParkingDetail;
