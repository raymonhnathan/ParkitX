import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import ProofUpload from "./components/ProofUpload";
import OSMMapComponent from "./components/OSMMapComponent";
import ParkingDetail from "./components/ParkingDetail";
import OrderDetails from "./components/OrderDetails"; // Add this import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/register" />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/proof-upload" element={<ProofUpload />} />
        <Route path="/map" element={<OSMMapComponent />} />
        <Route path="/parking-detail" element={<ParkingDetail />} />
        <Route path="/order-details" element={<OrderDetails />} /> {/* New route */}
      </Routes>
    </Router>
  );
}

export default App;
