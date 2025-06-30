import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminDashboard.css';
import axios from 'axios';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [appointments, setAppointments] = useState([]);
  const [pendingDoctors, setPendingDoctors] = useState([]);

  useEffect(() => {
    fetchAppointments();
    fetchPendingDoctors();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/booking/all");
      setAppointments(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch appointments", err.message);
    }
  };

  const fetchPendingDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/pending-doctors");
      setPendingDoctors(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch pending doctors", err.message);
    }
  };

  const handleApprove = async (doctorId) => {
    try {
      await axios.put(`http://localhost:5000/api/auth/approve/${doctorId}`);
      alert("✅ Doctor approved");
      fetchPendingDoctors(); // refresh the list
    } catch (err) {
      alert("❌ Failed to approve");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="dashboard d-flex">
      {/* Sidebar */}
      <div className="sidebar p-4 text-white">
        <h4 className="mb-5">MediCareBook</h4>
        <ul className="list-unstyled">
          <li className="mb-3" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
            <i className="bi bi-house-fill me-2"></i> Home
          </li>
          <li style={{ cursor: 'pointer' }} onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-2"></i> Logout
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content flex-grow-1 p-4">
        <h5 className="mb-4">
          <i className="bi bi-person-circle me-2"></i>Hi, {user?.name}
        </h5>

        {/* Doctor Approval Section */}
        <h4 className="mb-3">Pending Doctor Approvals</h4>
        <div className="table-responsive mb-5">
          <table className="table table-bordered text-center">
            <thead className="table-warning">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Specialization</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingDoctors.length ? (
                pendingDoctors.map((doc, index) => (
                  <tr key={index}>
                    <td>{doc.name}</td>
                    <td>{doc.email}</td>
                    <td>{doc.specialization || 'N/A'}</td>
                    <td>
                      <button className="btn btn-success btn-sm" onClick={() => handleApprove(doc._id)}>
                        Approve
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-muted">No pending doctors</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Appointments Section */}
        <h4 className="mb-3">All Appointments (Admin View)</h4>
        <div className="table-responsive">
          <table className="table table-bordered table-striped text-center">
            <thead className="table-secondary">
              <tr>
                <th>Appointment ID</th>
                <th>Patient Name</th>
                <th>Doctor Type</th>
                <th>Doctor Name</th>
                <th>Date</th>
                <th>Symptoms</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length > 0 ? (
                appointments.map((appt, index) => (
                  <tr key={index}>
                    <td>{appt._id}</td>
                    <td>{appt.patientName}</td>
                    <td>{appt.doctorType}</td>
                    <td>{appt.doctorName}</td>
                    <td>{new Date(appt.appointmentDate).toLocaleString()}</td>
                    <td>{appt.symptoms}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-muted">No appointments found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="text-center text-muted mt-5">
          © 2025 MediCareBook | Admin Panel
        </div>
      </div>
    </div>
  );
}
