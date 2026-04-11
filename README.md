# CityConnect

CityConnect is a full-stack local services discovery platform with a React/Vite frontend and an Express/MongoDB backend.

## Overview

CityConnect helps users find nearby businesses and services such as electricians, plumbers, restaurants, cafes, and tutors. The application includes search, categories, nearby listings, business detail pages, user authentication, reviews, and admin routes.

## Tech Stack

- Frontend: React, Vite, React Router, Axios, Leaflet
- Backend: Node.js, Express, MongoDB, Mongoose
- Auth: JWT, bcrypt
- Styling: Custom CSS with a dark glassmorphism theme

## Repository Structure

- `backend/`
  - `server.js`
  - `src/app.js`
  - `src/config/db.js`
  - `src/controllers/`
  - `src/routes/`
  - `src/models/`
  - `src/middleware/`
- `frontend/`
  - `src/`
  - `package.json`
  - `vite.config.js`
  - `index.html`

## Setup Instructions

### Backend

1. Open a terminal and run:
   ```bash
   cd backend
   npm install
   ```
2. Create a `.env` file with at least:
   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017/cityconnect
   PORT=5001
   NODE_ENV=development
   ```
3. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend

1. Open a terminal and run:
   ```bash
   cd frontend
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open the local URL displayed by Vite, typically `http://localhost:5174/`.

## Notes

- The frontend expects the backend API to be available on `http://localhost:5001` by default.
- Make sure MongoDB is running before starting the backend.
- If you need to change backend or frontend ports, update the corresponding URLs in the frontend API service files.

## Recommended Commands

```bash
cd backend
npm install
npm run dev
```

```bash
cd frontend
npm install
npm run dev
```

## Future Improvements

- Add database seed scripts
- Add unified root-level tests
- Improve deployment documentation
- Add a health check endpoint for the backend
