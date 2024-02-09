

import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, useJsApiLoader, useLoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};


// Static driver data (assuming you would fetch this data in a real app)
const drivers = [
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
  
  // Paste your driver objects here
  const Simulate = () => {
    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      libraries: ['places'], // Specify the libraries you need.
    });
  
    const [mapCenter, setMapCenter] = useState({ lat: 59.6164, lng: 17.8451 });
    const [addresses, setAddresses] = useState([]);
  
    useEffect(() => {
      if (isLoaded) {
        const geocoder = new window.google.maps.Geocoder();
  
        drivers.forEach((driver, index) => {
          geocoder.geocode({ location: { lat: driver.lat, lng: driver.lng } }, (results, status) => {
            if (status === 'OK') {
              if (results[0]) {
                setAddresses((currentAddresses) => [
                  ...currentAddresses,
                  { ...driver, address: results[0].formatted_address },
                ]);
              } else {
                console.log('No results found');
              }
            } else {
              console.log('Geocoder failed due to: ' + status);
            }
          });
        });
      }
    }, [isLoaded]);
  
    return (
      <div className="map-container">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={14}
          >
            {addresses.map((driver, index) => (
              <Marker
                key={index}
                position={{ lat: driver.lat, lng: driver.lng }}
                label={driver.vehicle} // Now using driver's name, change as needed
              />
            ))}
          </GoogleMap>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  };
  
  export default React.memo(Simulate);
 
  