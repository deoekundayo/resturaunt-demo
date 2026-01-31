# Backend Setup Instructions

## Quick Start

To enable database storage for user data, you need to start the backend server.

### Step 1: Install Backend Dependencies

Navigate to the backend directory and install Node.js dependencies:

```bash
cd backend
npm install
```

### Step 2: Start the Backend Server

Start the server:

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

The server will start on `http://localhost:3001`

### Step 3: Use the Application

Once the backend is running:

1. Open `form_user.html` in your browser
2. Fill out the form with:
   - Name
   - Email
   - Contact Number
   - Password
3. Click "Save"
4. The data will be saved to the SQLite database

## What's Included

- **Backend API Server** (`backend/server.js`)
  - RESTful API endpoints for user management
  - SQLite database for data persistence
  - Password hashing for security

- **Updated Form Handler** (`JS/form-handlers.js`)
  - Sends user data to backend API
  - Includes password field
  - Falls back to localStorage if backend is unavailable

- **Database**
  - Automatically created as `backend/database.sqlite`
  - Stores: name, email, contact_number, password (hashed), timestamps

## API Endpoints

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/health` - Health check

## Notes

- The database file is created automatically on first run
- Passwords are hashed using bcrypt before storage
- Email addresses must be unique
- If the backend is not running, the form will fall back to localStorage storage

## Troubleshooting

**Backend won't start:**
- Make sure Node.js is installed: `node --version`
- Install dependencies: `npm install`
- Check if port 3001 is already in use

**Form doesn't save:**
- Make sure backend server is running
- Check browser console for errors
- Verify API URL in form handler matches your backend URL

**Database issues:**
- Delete `backend/database.sqlite` to reset the database
- Check file permissions in the backend directory

