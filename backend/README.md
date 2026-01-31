# Restaurant Demo Backend API

Backend API server for the restaurant demo project. Handles user data storage in SQLite database.

## Features

- RESTful API for user management
- SQLite database for data persistence
- Password hashing with bcrypt
- CORS enabled for frontend integration
- Full CRUD operations for users

## Setup

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will start on `http://localhost:3001`

## API Endpoints

### Health Check
- **GET** `/api/health` - Check if server is running

### Users

- **GET** `/api/users` - Get all users
- **GET** `/api/users/:id` - Get user by ID
- **POST** `/api/users` - Create new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "contact_number": "704-654-3210",
    "password": "SecurePass123"
  }
  ```
- **PUT** `/api/users/:id` - Update user
- **DELETE** `/api/users/:id` - Delete user

## Database

The database is automatically created as `database.sqlite` in the backend directory on first run.

### Users Table Schema

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  contact_number TEXT NOT NULL,
  password TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## Security

- Passwords are hashed using bcrypt before storage
- Email validation on create/update
- Email uniqueness enforced
- SQL injection protection via parameterized queries

## Environment Variables

You can set the following environment variable:

- `PORT` - Server port (default: 3001)

Example:
```bash
PORT=3001 npm start
```

## Notes

- The database file (`database.sqlite`) is created automatically
- Passwords are never returned in API responses
- Email addresses must be unique
- All timestamps are in UTC

