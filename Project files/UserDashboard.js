import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserDashboard.css';
import axios from 'axios';

export default function UserDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleBook = () => {
    navigate('/book-appointment');
  };

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/booking/all");
      const userAppointments = res.data.filter(
        appt => appt.patientEmail === user.email
      );
      setAppointments(userAppointments);
    } catch (err) {
      console.error("❌ Failed to fetch appointments", err.message);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="user-dashboard d-flex">
      {/* Sidebar */}
      <div className="sidebar p-4 text-white">
        <h4 className="mb-5">MediCareBook</h4>
        <ul className="list-unstyled">
          <li className="mb-3" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
            <i className="bi bi-house-door-fill me-2"></i> Home
          </li>
          <li className="mb-3" style={{ cursor: "pointer" }} onClick={handleBook}>
            <i className="bi bi-calendar-plus-fill me-2"></i> Book Doctor
          </li>
          <li style={{ cursor: "pointer" }} onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-2"></i> Logout
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content flex-grow-1 p-4">
        <h5 className="mb-4">
          <i className="bi bi-person-circle me-2"></i>Hi, {user?.name}
        </h5>
        <h4 className="mb-4">Your Appointments</h4>

        <div className="table-responsive">
          <table className="table table-bordered table-striped text-center">
            <thead className="table-info">
              <tr>
                <th>Doctor</th>
                <th>Date & Time</th>
                <th>Symptoms</th>
                <th>Status</th>
                <th>Form</th> {/* ✅ Added column */}
              </tr>
            </thead>
            <tbody>
              {appointments.length ? (
                appointments.map((appt, index) => (
                  <tr key={index}>
                    <td>{appt.doctorName} ({appt.doctorType})</td>
                    <td>{new Date(appt.appointmentDate).toLocaleString()}</td>
                    <td>{appt.symptoms || 'N/A'}</td>
                    <td className={
                      appt.status === 'approved' ? 'text-success fw-bold' :
                      appt.status === 'rejected' ? 'text-danger fw-bold' :
                      'text-warning fw-bold'
                    }>
                      {appt.status}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => navigate(`/pre-consult/${appt._id}`)}
                      >
                        Fill Form
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-muted">No appointments found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="text-center text-muted mt-5">
          © 2025 MediCareBook | User Panel
        </div>
      </div>
    </div>
  );
}
