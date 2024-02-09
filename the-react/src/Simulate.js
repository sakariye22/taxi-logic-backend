import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";

const containerStyle = {
  width: '100%',
  height: '400px'
};

const carIcon = new L.Icon({
    iconUrl: 'https://github.com/sakariye22/taxi-logic-backend/blob/main/the-react/src/calendar-svgrepo-com.svg', // Specify your car icon path
    iconSize: [35, 35], // Size of the icon
  });


// Static driver data (assuming you would fetch this data in a real app)
const drivers2 = [
    {
        "name": "Driver One",
        "email": "driver1@example.com",
        "password": "hashed_password",
        "phoneNumber": "0701234567",
        "licenseNumber": "license123",
        "vehicle": "Car A",
        "isActive": true,
        "lat": 59.6143,
        "lng": 17.8452
    },
    {
        "name": "Driver Two",
        "email": "driver2@example.com",
        "password": "hashed_password",
        "phoneNumber": "0707654321",
        "licenseNumber": "license456",
        "vehicle": "Car B",
        "isActive": true,
        "lat": 59.6165,
        "lng": 17.8454
    },
    {
        "name": "Driver Three",
        "email": "driver3@example.com",
        "password": "hashed_password",
        "phoneNumber": "0712345678",
        "licenseNumber": "license789",
        "vehicle": "Car C",
        "isActive": true,
        "lat": 59.6163,
        "lng": 17.8456
    },
    {
        "name": "Driver Four",
        "email": "driver4@example.com",
        "password": "hashed_password",
        "phoneNumber": "0718765432",
        "licenseNumber": "license012",
        "vehicle": "Car D",
        "isActive": true,
        "lat": 59.6161,
        "lng": 17.8458
    }
]

function ChangeView({ center }) {
    const map = useMap();
    map.setView(center);
    return null;
  }
 
const Simulate = () => {
    const [drivers, setDrivers] = useState(drivers2);
  
    // Function to simulate driver movement
    const simulateDriverMovement = () => {
      const updatedDrivers = drivers.map(driver => ({
        ...driver,
        lat: driver.lat + (Math.random() - 0.5) * 0.001, // Adjust these values as needed
        lng: driver.lng + (Math.random() - 0.5) * 0.001,
      }));
      setDrivers(updatedDrivers);
    };
  
    useEffect(() => {
      const movementInterval = setInterval(simulateDriverMovement, 2000); // Update every 2 seconds
  
      return () => clearInterval(movementInterval); // Clear interval on component unmount
    }, [drivers]);
  
    return (
        <MapContainer center={[59.6164, 17.8451]} zoom={12} style={{ height: '300px', width: '80%', border: '1px solid #ccc' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {drivers.map((driver, index) => (
          <Marker
            key={index}
            position={[driver.lat, driver.lng]}
            icon={carIcon} // Use your custom car icon
          />
        ))}
        <ChangeView center={[59.6164, 17.8451]} />
      </MapContainer>
    );
  };
  
  export default React.memo(Simulate);
  