import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DoctorDashboard.css';
import axios from 'axios';

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [appointments, setAppointments] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/booking/all");
      const doctorAppointments = res.data.filter(
        appt => appt.doctorName === `Dr. ${user.name}`
      );
      setAppointments(doctorAppointments);
    } catch (err) {
      console.error("❌ Failed to fetch appointments", err.message);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleViewForm = (form) => {
    setSelectedForm(form);
    const modal = new window.bootstrap.Modal(document.getElementById("formModal"));
    modal.show();
  };

  return (
    <div className="doctor-dashboard d-flex">
      {/* Sidebar */}
      <div className="sidebar p-4 text-white">
        <h4 className="mb-5">MediCareBook</h4>
        <ul className="list-unstyled">
          <li className="mb-3" style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
            <i className="bi bi-house-door-fill me-2"></i> Home
          </li>
          <li className="mb-3">
            <i className="bi bi-calendar-check-fill me-2"></i> Appointments
          </li>
          <li style={{ cursor: "pointer" }} onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-2"></i> Logout
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content flex-grow-1 p-4">
        <h5 className="mb-4">
          <i className="bi bi-person-circle me-2"></i>Hi, Dr. {user?.name}
        </h5>
        <h4 className="mb-4">Your Appointments</h4>

        <div className="table-responsive">
          <table className="table table-bordered table-striped text-center">
            <thead className="table-info">
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Symptoms</th>
                <th>Form</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length ? (
                appointments.map((appt, index) => (
                  <tr key={index}>
                    <td>{appt.patientName}</td>
                    <td>{new Date(appt.appointmentDate).toLocaleString()}</td>
                    <td>{appt.symptoms || '—'}</td>
                    <td>
                      {appt.preConsultForm ? (
                        <button
                          className="btn btn-sm btn-outline-info"
                          onClick={() => handleViewForm(appt.preConsultForm)}
                        >
                          View Form
                        </button>
                      ) : (
                        <span className="text-muted">Not Filled</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-muted">No appointments found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="text-center text-muted mt-5">
          © 2025 MediCareBook | Doctor Panel
        </div>
      </div>

      {/* Modal to Show Form */}
      <div className="modal fade" id="formModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Pre-Consultation Form</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              {selectedForm ? (
                <ul className="list-group">
                  <li className="list-group-item"><strong>Age:</strong> {selectedForm.age}</li>
                  <li className="list-group-item"><strong>Gender:</strong> {selectedForm.gender}</li>
                  <li className="list-group-item"><strong>Height:</strong> {selectedForm.height} cm</li>
                  <li className="list-group-item"><strong>Weight:</strong> {selectedForm.weight} kg</li>
                  <li className="list-group-item"><strong>Allergies:</strong> {selectedForm.allergies}</li>
                  <li className="list-group-item"><strong>Medications:</strong> {selectedForm.medications}</li>
                </ul>
              ) : (
                <p>No form submitted.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
