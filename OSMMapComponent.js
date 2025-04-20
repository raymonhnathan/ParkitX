import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { TextField, Button, Box } from "@mui/material";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

// Default icon for Leaflet markers
const defaultIcon = new L.Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Predefined locations
const locations = {
  nungambakkam: { lat: 13.0645, lng: 80.2340 },
  velachery: { lat: 12.9762, lng: 80.2185 },
  kodambakkam: { lat: 13.0609, lng: 80.2285 },
  annanagar: { lat: 13.0860, lng: 80.2110 },
  tnagar: { lat: 13.0405, lng: 80.2337 },
};

// Parking data
const parkingAreas = {
  nungambakkam: [
    { name: "Nungambakkam Parking Lot", location: "Nungambakkam, Chennai", slots: 10, rate: 15, lat: 13.0655, lng: 80.2345 },
    { name: "Sterling Road Public Parking", location: "Sterling Road, Chennai", slots: 8, rate: 25, lat: 13.0667, lng: 80.2360 },
    { name: "Mahalingapuram Parking", location: "Mahalingapuram, Chennai", slots: 5, rate: 35, lat: 13.0625, lng: 80.2320 },
  ],
  velachery: [
    { name: "Velachery Public Parking", location: "Velachery, Chennai", slots: 12, rate: 20, lat: 12.9758, lng: 80.2201 },
    { name: "Phoenix Market City Parking", location: "Phoenix Market City, Chennai", slots: 30, rate: 50, lat: 12.9790, lng: 80.2180 },
    { name: "Grand Mall Parking", location: "Grand Mall, Chennai", slots: 15, rate: 45, lat: 12.9725, lng: 80.2235 },
  ],
  kodambakkam: [
    { name: "Kodambakkam Railway Parking", location: "Kodambakkam Station, Chennai", slots: 6, rate: 15, lat: 13.0615, lng: 80.2289 },
    { name: "Liberty Bridge Parking", location: "Liberty, Kodambakkam, Chennai", slots: 10, rate: 25, lat: 13.0628, lng: 80.2305 },
    { name: "Arcot Road Parking", location: "Arcot Road, Kodambakkam, Chennai", slots: 8, rate: 32, lat: 13.0598, lng: 80.2271 },
  ],
  annanagar: [
    { name: "Anna Nagar Tower Parking", location: "Anna Nagar Tower, Chennai", slots: 15, rate: 20, lat: 13.0865, lng: 80.2095 },
    { name: "Thirumangalam Metro Parking", location: "Thirumangalam, Chennai", slots: 12, rate: 27, lat: 13.0880, lng: 80.2140 },
    { name: "Anna Nagar 2nd Avenue Parking", location: "2nd Avenue, Chennai", slots: 9, rate: 38, lat: 13.0830, lng: 80.2120 },
  ],
  tnagar: [
    { name: "Pondy Bazaar Parking", location: "Pondy Bazaar, T Nagar, Chennai", slots: 20, rate: 10, lat: 13.0420, lng: 80.2350 },
    { name: "Usman Road Parking", location: "Usman Road, T Nagar, Chennai", slots: 15, rate: 25, lat: 13.0410, lng: 80.2375 },
    { name: "T Nagar Bus Stand Parking", location: "T Nagar Bus Stand, Chennai", slots: 10, rate: 35, lat: 13.0395, lng: 80.2325 },
  ],
};

// Helper to change view on map
const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (map) {
      map.flyTo(center, zoom, { duration: 2 });
    }
  }, [center, zoom, map]);
  return null;
};

const OSMMapComponent = () => {
  const [search, setSearch] = useState("");
  const [mapCenter, setMapCenter] = useState([13.0827, 80.2707]); // Default center
  const [zoomLevel, setZoomLevel] = useState(13);
  const [filteredParking, setFilteredParking] = useState([]);
  const navigate = useNavigate();

  const handleSearch = () => {
    const locationKey = search.toLowerCase().replace(/\s+/g, "");
    if (locations[locationKey]) {
      const center = [locations[locationKey].lat, locations[locationKey].lng];
      setMapCenter(center);
      setZoomLevel(15);
      const selectedParking = parkingAreas[locationKey] || [];
      setFilteredParking(selectedParking);

      // Use KDTree to find nearest parking from user center
      const allParkings = Object.values(parkingAreas).flat();
      const points = allParkings.map((p) => ({ point: [p.lat, p.lng], data: p }));
      const tree = new KDTree(points);
      const nearest = tree.nearest(center);
      console.log("Nearest Parking Spot:", nearest.node.data);
    } else {
      alert("Location not found! Try Nungambakkam, Velachery, etc.");
    }
  };

  const handleMarkerClick = (parking) => {
    navigate("/parking-detail", { state: parking });
  };

  return (
    <Box sx={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Box sx={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", zIndex: 1000 }}>
        <TextField
          variant="outlined"
          placeholder="Search for a location (e.g., Kodambakkam)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ bgcolor: "white", borderRadius: 1, width: 300 }}
        />
        <Button variant="contained" color="primary" sx={{ ml: 2 }} onClick={handleSearch}>
          Search
        </Button>
      </Box>

      <MapContainer center={mapCenter} zoom={zoomLevel} style={{ width: "100%", height: "100%" }}>
        <ChangeView center={mapCenter} zoom={zoomLevel} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {filteredParking && filteredParking.length > 0 ? (
          filteredParking.map((parking, index) => (
            <Marker key={index} position={[parking.lat, parking.lng]} icon={defaultIcon} eventHandlers={{ click: () => handleMarkerClick(parking) }}>
              <Popup>
                <strong>{parking.name}</strong>
                <br />
                {parking.slots} slots available
                <br />
                ₹{parking.rate} per hour
              </Popup>
            </Marker>
          ))
        ) : (
          <div>No parking available for this location</div>
        )}
      </MapContainer>
    </Box>
  );
};

export default OSMMapComponent;

// KDTree class for nearest point search
class KDTree {
  constructor(points) {
    this.root = this.buildTree(points, 0);
  }

  buildTree(points, depth) {
    if (!points.length) return null;
    const axis = depth % 2;
    points.sort((a, b) => a.point[axis] - b.point[axis]);
    const mid = Math.floor(points.length / 2);
    return {
      point: points[mid].point,
      data: points[mid].data,
      left: this.buildTree(points.slice(0, mid), depth + 1),
      right: this.buildTree(points.slice(mid + 1), depth + 1),
    };
  }

  nearest(point, best = { dist: Infinity, node: null }, depth = 0, node = this.root) {
    if (!node) return best;
    const axis = depth % 2;
    const dist = this.euclidean(point, node.point);
    if (dist < best.dist) best = { dist, node };
    const diff = point[axis] - node.point[axis];
    const [near, far] = diff < 0 ? [node.left, node.right] : [node.right, node.left];
    best = this.nearest(point, best, depth + 1, near);
    if (Math.abs(diff) < best.dist) best = this.nearest(point, best, depth + 1, far);
    return best;
  }

  euclidean(a, b) {
    return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2);
  }
}
