import UserDashboard from './pages/UserDashboard';
import BookAppointment from './pages/BookAppointment';
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import BookingSuccess from './pages/BookingSuccess';
import PreConsultForm from "./pages/PreConsultForm";


// ✅ Pages
import Register from './pages/Register';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import DoctorDashboard from './pages/DoctorDashboard'; // ✅ Doctor Dashboard

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });

    // Redirect if already logged in
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.role === "admin") navigate("/admin");
      else if (user.role === "doctor") navigate("/doctor");
      else navigate("/user");
    }
  }, []);

  return (
    <div className="container-fluid bg-light vh-100 d-flex align-items-center">
      <div className="row w-100">
        {/* Left Section */}
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-start p-5" data-aos="fade-right">
          <h1 className="display-5 fw-bold mb-3 text-primary">Welcome to Doctor Booking</h1>
          <p className="mb-4">Book appointments easily and get the care you deserve.</p>
          <div>
            <button className="btn btn-primary me-3" onClick={() => navigate('/login')}>Login</button>
            <button className="btn btn-outline-primary" onClick={() => navigate('/register')}>Register</button>
          </div>
        </div>

        {/* Right Section */}
        <div className="col-md-6 d-flex justify-content-center align-items-center" data-aos="fade-left">
          <img
            src="https://i.pinimg.com/736x/e4/6d/d2/e46dd2290a2f2c8c791272db65358bec.jpg"
            alt="Doctor Illustration"
            className="img-fluid"
            style={{ maxHeight: "75vh", borderRadius: "20px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
          />
        </div>
      </div>
    </div>
  );
}


// ✅ Main App Router
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/user" element={<UserDashboard />} />
       <Route path="/booking-success" element={<BookingSuccess />} />
       <Route path="/pre-consult/:id" element={<PreConsultForm />} />
<Route path="/booking-success" element={<BookingSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
