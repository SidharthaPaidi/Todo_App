# PrimeTrade - Full Stack Task Management Application

A modern, scalable web application with authentication and task management features built with Next.js, Express, and MongoDB.

## 🚀 Live Demo

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api

## 📋 Features

### ✅ Authentication System
- User registration with email validation
- Secure login with JWT tokens
- Password hashing using bcryptjs
- Protected routes and API endpoints
- Automatic token refresh and validation

### ✅ Task Management (CRUD Operations)
- Create, Read, Update, Delete tasks
- Task properties: title, description, status, priority, due date
- Real-time statistics dashboard
- Advanced filtering by status and priority
- Search functionality across task titles and descriptions

### ✅ User Profile
- View and update user profile
- Personalized dashboard
- Bio and user information management

### ✅ Security Features
- JWT-based authentication
- Password hashing with bcrypt (10 salt rounds)
- Protected API routes with middleware
- Input validation on client and server side
- CORS configuration
- Error handling middleware

### ✅ UI/UX
- Responsive design (mobile, tablet, desktop)
- Modern UI with TailwindCSS
- Toast notifications for user feedback
- Loading states and error handling
- Clean and intuitive interface

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14
- **Styling**: TailwindCSS
- **State Management**: React Context API
- **Form Handling**: React Hook Form
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **CORS**: cors middleware

## 📁 Project Structure

```
primetrade/
├── backend/
│   ├── models/
│   │   ├── User.js           # User schema with password hashing
│   │   └── Task.js           # Task schema with validation
│   ├── routes/
│   │   ├── auth.js           # Authentication routes
│   │   ├── user.js           # User profile routes
│   │   └── tasks.js          # Task CRUD routes
│   ├── middleware/
│   │   └── auth.js           # JWT authentication middleware
│   ├── .env                  # Environment variables
│   ├── server.js             # Express server setup
│   └── package.json
│
├── frontend/
│   ├── pages/
│   │   ├── _app.js           # App wrapper with providers
│   │   ├── index.js          # Landing page
│   │   ├── login.js          # Login page
│   │   ├── register.js       # Registration page
│   │   └── dashboard.js      # Main dashboard
│   ├── components/
│   │   └── ProtectedRoute.js # Route protection component
│   ├── contexts/
│   │   └── AuthContext.js    # Authentication context
│   ├── lib/
│   │   └── api.js            # Axios configuration
│   ├── styles/
│   │   └── globals.css       # Global styles
│   ├── .env.local            # Environment variables
│   └── package.json
│
├── postman/
│   └── PrimeTrade_API.postman_collection.json
├── SCALING.md                # Scaling strategy document
└── README.md                 # This file
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd primetrade
```

### 2. Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Update .env with your MongoDB URI
# MONGODB_URI=mongodb://localhost:27017/primetrade
# or use MongoDB Atlas connection string
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/primetrade

# Start the backend server
npm run dev
```

The backend will run on http://localhost:5000

### 3. Frontend Setup

```bash
cd frontend
npm install

# The .env.local is already configured for localhost
# Start the frontend
npm run dev
```

The frontend will run on http://localhost:3000

### 4. MongoDB Setup

**Option 1: Local MongoDB**
```bash
# Install MongoDB locally
# Start MongoDB service
mongod
```

**Option 2: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update MONGODB_URI in backend/.env

## 📝 API Documentation

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### User Endpoints

#### Get Profile
```
GET /api/user/profile
Authorization: Bearer <token>
```

#### Update Profile
```
PUT /api/user/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Updated",
  "bio": "Software Developer"
}
```

### Task Endpoints

#### Get All Tasks
```
GET /api/tasks?status=pending&priority=high&search=keyword
Authorization: Bearer <token>
```

#### Get Single Task
```
GET /api/tasks/:id
Authorization: Bearer <token>
```

#### Create Task
```
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the PrimeTrade assignment",
  "status": "pending",
  "priority": "high",
  "dueDate": "2024-12-31"
}
```

#### Update Task
```
PUT /api/tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated title",
  "status": "completed"
}
```

#### Delete Task
```
DELETE /api/tasks/:id
Authorization: Bearer <token>
```

#### Get Task Statistics
```
GET /api/tasks/stats/summary
Authorization: Bearer <token>
```

## 🧪 Testing the Application

### Using Postman
1. Import the Postman collection from `postman/PrimeTrade_API.postman_collection.json`
2. Set up environment variables:
   - `base_url`: http://localhost:5000/api
   - `token`: (will be auto-set after login)
3. Run the collection tests

### Manual Testing Flow
1. Open http://localhost:3000
2. Click "Create Account" and register
3. Login with your credentials
4. Create some tasks
5. Test filtering, searching, editing, and deleting
6. Update your profile
7. Logout and login again

## 🔐 Security Features

1. **Password Security**
   - Passwords hashed with bcrypt (10 salt rounds)
   - Never stored in plain text
   - Password validation (minimum 6 characters)

2. **JWT Authentication**
   - Tokens expire after 7 days
   - Tokens verified on every protected request
   - Automatic logout on token expiration

3. **Input Validation**
   - Server-side validation using express-validator
   - Client-side validation using react-hook-form
   - SQL injection prevention through Mongoose

4. **CORS Configuration**
   - Configured to accept requests from frontend only
   - Credentials enabled for authenticated requests

## 📊 Database Schema

### User Model
```javascript
{
  name: String (required, max 50 chars),
  email: String (required, unique, validated),
  password: String (required, hashed, min 6 chars),
  bio: String (optional, max 500 chars),
  role: String (enum: ['user', 'admin'], default: 'user'),
  createdAt: Date,
  updatedAt: Date
}
```

### Task Model
```javascript
{
  title: String (required, max 100 chars),
  description: String (required, max 1000 chars),
  status: String (enum: ['pending', 'in-progress', 'completed']),
  priority: String (enum: ['low', 'medium', 'high']),
  dueDate: Date (optional),
  user: ObjectId (reference to User),
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Deployment

### Backend Deployment (Railway/Render/Heroku)

1. Create account on Railway.app
2. Connect GitHub repository
3. Add environment variables
4. Deploy automatically

### Frontend Deployment (Vercel/Netlify)

1. Connect GitHub repository to Vercel
2. Set environment variables:
   - `NEXT_PUBLIC_API_URL=<your-backend-url>/api`
3. Deploy automatically

### Database Deployment (MongoDB Atlas)

1. Already configured for cloud usage
2. Update MONGODB_URI with Atlas connection string

## 📈 Performance Optimizations

- Database indexing on frequently queried fields
- Efficient MongoDB queries with pagination support
- React Context API for state management
- Code splitting in Next.js
- Optimized bundle size

## 🔄 Future Enhancements

- [ ] Email verification for new users
- [ ] Forgot password functionality
- [ ] Task categories/tags
- [ ] Task collaboration features
- [ ] Real-time updates with WebSockets
- [ ] File attachments for tasks
- [ ] Calendar view for tasks
- [ ] Dark mode
- [ ] Export tasks to CSV/PDF
- [ ] Task reminders/notifications

## 👤 Author

Created as part of the PrimeTrade Frontend Developer Intern assignment.

## 📄 License

MIT License - feel free to use this project for learning and development.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- TailwindCSS for the utility-first CSS framework
- MongoDB team for the robust database solution

---

For questions or issues, please contact the development team or open an issue in the repository.
#   T o d o _ A p p  
 