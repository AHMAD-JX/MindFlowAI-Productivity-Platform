# MindFlow AI - Backend API

Backend server for MindFlow AI productivity platform built with Node.js, Express, TypeScript, and MongoDB.

## 🚀 Features

- ✅ **User Authentication** - Secure JWT-based authentication
- ✅ **Password Hashing** - bcrypt with salt rounds
- ✅ **Input Validation** - express-validator
- ✅ **HTTP-Only Cookies** - Secure token storage
- ✅ **Refresh Tokens** - Long-lived sessions
- ✅ **TypeScript** - Full type safety
- ✅ **MongoDB** - NoSQL database with Mongoose
- ✅ **CORS** - Cross-origin resource sharing
- ✅ **Error Handling** - Comprehensive error management

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn

## 🛠️ Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
# .env file is already created with default values
# Update JWT_SECRET for production
```

3. Start MongoDB:
```bash
# Make sure MongoDB is running on localhost:27017
mongod
```

4. Run the server:
```bash
# Development mode
npm run dev

# Production mode
npm run build
npm start
```

## 🔑 Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/MindFlowAI
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_2024
JWT_EXPIRE=7d
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

## 📡 API Endpoints

### Authentication

#### Register New User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "isEmailVerified": false,
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "accessToken": "..."
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "isEmailVerified": false,
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "accessToken": "..."
  }
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "isEmailVerified": false,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

#### Logout
```http
POST /api/auth/logout
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

#### Refresh Token
```http
POST /api/auth/refresh
```

**Response:**
```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "accessToken": "..."
  }
}
```

## 🔒 Security Features

- **Password Hashing**: bcrypt with 12 salt rounds
- **JWT Tokens**: Access tokens (7 days) and Refresh tokens (30 days)
- **HTTP-Only Cookies**: Prevents XSS attacks
- **Input Validation**: express-validator for all inputs
- **CORS Protection**: Configured for specific origins
- **Security Headers**: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts       # MongoDB connection
│   ├── controllers/
│   │   └── authController.ts # Authentication logic
│   ├── middleware/
│   │   ├── auth.ts           # JWT authentication
│   │   └── validator.ts      # Input validation
│   ├── models/
│   │   └── User.ts           # User model
│   ├── routes/
│   │   └── authRoutes.ts     # Auth routes
│   ├── utils/
│   │   └── jwt.ts            # JWT utilities
│   └── server.ts             # Express server
├── .env                      # Environment variables
├── package.json
├── tsconfig.json
└── README.md
```

## 🧪 Testing

You can test the API using tools like:
- Postman
- Thunder Client
- cURL
- Frontend application

## 🐛 Error Handling

All errors return in this format:
```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

## 📝 License

ISC

## 👨‍💻 Author

MindFlow AI Team

