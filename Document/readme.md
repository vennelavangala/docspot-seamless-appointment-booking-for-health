 🏥 Doctor Appointment Booking System

A full-stack MERN application that enables patients to book appointments with doctors, doctors to manage those appointments, and admins to oversee the system and approve doctor registrations.

✨ Key Features

👥 Users (Patients)
- Register and login
- Book appointments by department/specialization
- View appointment history and statuses
- Fill out pre-consultation forms before visiting the doctor

👨‍⚕️ Doctors
- Register with specialization (requires admin approval)
- View incoming appointments
- Accept or reject appointments
- View patient-submitted forms

🛡️ Admin
- View and manage all appointments
- Approve or reject newly registered doctors
- Monitor system activity


🛠️ Technologies Used

Frontend: React.js, React Router, Bootstrap, Axios  
Backend Node.js, Express.js  
Database: MongoDB Atlas (with Mongoose ODM)  
Authentication: JWT (JSON Web Token), bcrypt.js  
Others: dotenv, nodemon

## 📁 Folder Structure
smartbridge-project/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── pages/
│   │   ├── components/
│   │   └── App.js
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── index.js
│   └── package.json
│
└── README.md



🚀 How to Run the Project Locally

🧩 Prerequisites
- Node.js installed
- MongoDB Atlas database set up
- Git

🔧 Backend Setup

```bash
cd backend
npm install
# Create a .env file with:
# MONGO_URI=your_mongo_connection_string
# JWT_SECRET=your_jwt_secret
npm start


💻 Frontend Setup

```bash
cd frontend
npm install
npm start
```

App will run at: `http://localhost:3000`
Backend runs at: `http://localhost:5000`

 📌 Notes

* Admin approval is mandatory for a doctor to appear in the appointment form.
* Only approved doctors are listed for user booking.
* JWT tokens are stored in `localStorage` for auth session handling.
* Pre-consultation form is available only after appointment booking.

📄 License

This project is for academic and internship use only.




