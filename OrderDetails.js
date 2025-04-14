import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from "@mui/material";

const OrderDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;
  const [open, setOpen] = useState(false);

  const paymentOptions = ["Google Pay", "Apple Pay", "Paytm", "PhonePe"];

  const handleGatewaySelect = (gateway) => {
    setOpen(false);
    alert(`Payment of ₹${data.total} successful via ${gateway}!`);
    // Future: Redirect to receipt or dashboard
  };

  if (!data) return <Typography sx={{ color: "white" }}>No booking data available.</Typography>;

  return (
    <Box
      sx={{
        bgcolor: "#121212",
        minHeight: "100vh",
        color: "white",
        p: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Card sx={{ maxWidth: 500, width: "100%", bgcolor: "#1e1e1e", p: 3, borderRadius: 3, boxShadow: 4 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
            Booking Confirmed!
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ color: "white" }}><strong>Name:</strong> {data.name}</Typography>
          <Typography variant="body1" gutterBottom sx={{ color: "white" }}><strong>Car:</strong> {data.carName}</Typography>
          <Typography variant="body1" gutterBottom sx={{ color: "white" }}><strong>Parking Lot:</strong> {data.parkingLot}</Typography>
          <Typography variant="body1" gutterBottom sx={{ color: "white" }}><strong>Duration:</strong> {data.duration} hour(s)</Typography>
          <Typography variant="body1" gutterBottom sx={{ color: "white" }}><strong>Rate:</strong> ₹{data.rate} / hour</Typography>
          <Typography variant="body1" gutterBottom sx={{ color: "white" }}><strong>Total:</strong> ₹{data.total}</Typography>

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 3, bgcolor: "#1976d2", color: "white", '&:hover': { bgcolor: "#1565c0" } }}
            onClick={() => navigate("/map")}
          >
            Go Back to Map
          </Button>
        </CardContent>
      </Card>

      {/* Payment Gateway Modal */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Select Payment Gateway</DialogTitle>
        <DialogContent>
          <List>
            {paymentOptions.map((gateway, index) => (
              <ListItem disablePadding key={index}>
                <ListItemButton onClick={() => handleGatewaySelect(gateway)}>
                  <ListItemText primary={gateway} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OrderDetails;