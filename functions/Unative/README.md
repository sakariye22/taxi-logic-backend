# Project API Endpoints

This document outlines the backend API endpoints available for our web and mobile applications. The endpoints are categorized under React and React Native specific routes. Two base URLs are provided, one for local development and one for production hosted on Firebase.

## Base URLs

For local development:
- **Local URL**: `http://localhost:3000/user`

For production:
- **Firebase Function URL**: `https://api-g36q5boh2q-uc.a.run.app/user`

## React Specific Routes

### User Details
- **GET `/details`**  
  Retrieves user details including username, email, and phone number. Requires authentication.

### Profile Picture
- **GET `/profile-image`**  
  Serves the user's profile picture optimized for web clients. Requires authentication.

### Update User Details
- **PATCH `/patch`**  
  Updates user's name, email, or phone number. Requires authentication.

### Update Profile Picture
- **POST `/update-image`**  
  Uploads and updates the user's profile picture. Uses `multer` and `GridFS` for file handling. Requires authentication.

### Request a Ride
- **POST `/request-ride`**  
  Initiates a ride request with specified pickup and dropoff coordinates. Requires authentication.

### Check Awaiting Rides
- **GET `/waiting/rides`**  
  Retrieves list of rides that are waiting for driver proposals. Requires authentication.

## React Native Specific Routes

### User Details
- Same as the React-specific route but optimized for mobile use.

### Profile Picture
- **GET `/profile-image2`**  
  Serves the user's profile picture optimized for mobile clients. Requires authentication.

### Update User Details
- Same as the React-specific route but optimized for mobile use.

### Update Profile Picture
- Same as the React-specific route but optimized for mobile use.

### Request a Ride
- Same as the React-specific route but optimized for mobile use.

### Check Awaiting Rides
- Same as the React-specific route but optimized for mobile use.

## Technologies Used

- **Node.js and Express**: The server-side application framework.
- **MongoDB and GridFS**: Used for storing and managing user uploaded images and ride data.
- **React/React Native**: Utilized for frontend development.
- **JWT for Authentication**: Ensures secure access to the API endpoints.

## Setup Instructions

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Create a `.env` file in the root directory and provide values for `MONGODB_URL` and `JWT_SECRET`.
4. Start the server with `npm start` for local development or deploy to Firebase for production.
5.
