📌 Task Management Dashboard

Frontend Developer Intern — Assignment Submission

A full-stack task management application built with React.js, Node.js, Express, and MongoDB, featuring secure authentication, protected routes, and a modern dashboard UI.

🚀 Live Overview

This project demonstrates:

Secure authentication (Signup + Login)

JWT-protected dashboard

User-specific task management (CRUD)

Clean UI with dark mode, search & filter

Proper frontend–backend integration

🧰 Tech Stack
Frontend

React.js

React Router

Tailwind CSS

Axios

Framer Motion

React Hot Toast

Backend

Node.js

Express.js

MongoDB + Mongoose

JWT (jsonwebtoken)

bcryptjs

dotenv

cors

✨ Features
🔐 Authentication

Signup & Login

Password hashing with bcrypt

JWT-based authentication

Protected routes (Dashboard accessible only after login)

👤 Profile

Fetch logged-in user profile

Update profile (name, email, password)

No password exposure in responses

📝 Task Management (CRUD)

Create task

View tasks (user-specific)

Edit task

Toggle task completion

Delete task

🔍 Dashboard UX

Search tasks

Filter tasks (All / Completed / Pending)

Dark / Light mode toggle

Loading & error states

Logout flow

📂 Project Structure
task-management-dashboard/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── api/
│   │   └── App.jsx
│   └── main.jsx
│
└── README.md

⚙️ Environment Variables
Backend .env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/taskflow
JWT_SECRET=your_secret_key

▶️ How to Run Locally
1️⃣ Start MongoDB
net start MongoDB


OR

mongod

2️⃣ Backend Setup
cd backend
npm install
npm run dev


Expected logs:

Connecting to MongoDB...
✅ MongoDB connected
🚀 Server running on port 5000

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev


Open:

http://localhost:5173

🔑 Demo Credentials

You can create users via Signup, or use:

Email: test@test.com
Password: 123456

🔗 API Endpoints (v1)
Auth

POST /api/v1/auth/signup

POST /api/v1/auth/login

Profile

GET /api/v1/me

PUT /api/v1/me

Tasks

POST /api/v1/tasks

GET /api/v1/tasks

PUT /api/v1/tasks/:id

DELETE /api/v1/tasks/:id

All protected routes require:

Authorization: Bearer <JWT_TOKEN>

🔐 Security Practices

Passwords hashed using bcrypt

JWT validation middleware

User-specific data isolation

Protected routes (frontend & backend)

CORS configured explicitly

📈 How I Would Scale This for Production

Use environment-based configs (dev / prod)

Add refresh tokens

Add pagination for tasks

Add rate limiting & request validation

Deploy using Docker

Use Nginx as reverse proxy

Enable database indexing

Add caching (Redis)

Add unit & integration tests

🧪 Postman Testing Steps

All backend APIs were tested using Postman.
Follow the steps below to test the APIs manually.

1️⃣ Signup (Create User)

POST /api/v1/auth/signup

Headers

Content-Type: application/json


Body

{
  "name": "Postman User",
  "email": "postman@test.com",
  "password": "123456"
}


Expected

Status: 201 Created

JWT token returned

2️⃣ Login

POST /api/v1/auth/login

Body

{
  "email": "postman@test.com",
  "password": "123456"
}


Expected

Status: 200 OK

Copy the token from response

3️⃣ Get Profile (Protected)

GET /api/v1/me

Headers

Authorization: Bearer <JWT_TOKEN>


Expected

Logged-in user profile

No password field in response

4️⃣ Create Task

POST /api/v1/tasks

Headers

Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json


Body

{
  "title": "Test task from Postman"
}

5️⃣ Get Tasks (User-specific)

GET /api/v1/tasks

Headers

Authorization: Bearer <JWT_TOKEN>


Expected

Only tasks created by the logged-in user

6️⃣ Update Task

PUT /api/v1/tasks/:id

Body

{
  "completed": true
}

7️⃣ Delete Task

DELETE /api/v1/tasks/:id

Expected

{
  "message": "Task deleted successfully"
}

🔐 Security Validation

Requests without token → 401 Unauthorized

Cross-user task access → blocked

JWT validation enforced on all protected routes

🧪 Testing

End-to-end tested via frontend UI

Auth, profile, and CRUD tested via Postman

Cross-user access validation confirmed

👨‍💻 Author

Latish Salunkhe
Frontend Developer Intern Applicant
