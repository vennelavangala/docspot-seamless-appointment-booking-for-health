import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios'; // Axios instance
import 'bootstrap/dist/css/bootstrap.min.css';
import './BookAppointment.css';

export default function BookAppointment() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    department: '',
    doctor: '',
    date: '',
    symptoms: ''
  });

  const [doctors, setDoctors] = useState([]);

  // ✅ Fetch approved doctors from backend
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await api.get("/auth/approved-doctors");
        setDoctors(res.data); // data includes name + specialization
      } catch (err) {
        console.error("❌ Failed to fetch doctors", err);
      }
    };

    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const filteredDoctors = form.department
    ? doctors.filter(doc => doc.specialization === form.department)
    : [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        patientName: form.name,
        patientEmail: form.email,
        doctorType: form.department,
        doctorName: form.doctor,
        appointmentDate: form.date,
        symptoms: form.symptoms,
      };

      await api.post("/booking/book", payload);
      alert("✅ Appointment booked successfully!");
      navigate("/booking-success");
    } catch (err) {
      alert(err.response?.data?.msg || "❌ Booking failed");
      console.error("Booking Error:", err);
    }
  };

  return (
    <div className="book-appointment-page d-flex justify-content-center align-items-center min-vh-100">
      <div className="form-container shadow p-4 rounded bg-white">
        <h3 className="text-center mb-4 text-primary">Book Your Appointment</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Patient Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              required
            />
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="mb-3">
            <label>Select Department</label>
            <select
              className="form-select"
              name="department"
              value={form.department}
              onChange={handleChange}
              required
            >
              <option value="">-- Choose Department --</option>
              {/* Dynamically get unique departments from approved doctors */}
              {[...new Set(doctors.map(doc => doc.specialization))].map((spec, index) => (
                <option key={index} value={spec}>{spec}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
  <label>Select Doctor</label>
  <select
    className="form-select"
    name="doctor"
    value={form.doctor}
    onChange={handleChange}
    required
    disabled={!form.department}
  >
    <option value="">-- Choose Doctor --</option>
    {filteredDoctors.map((doc, index) => (
      <option key={index} value={`Dr. ${doc.name}`}>{`Dr. ${doc.name}`}</option>
    ))}
  </select>
</div>

          <div className="mb-3">
            <label>Date & Time</label>
            <input
              type="datetime-local"
              className="form-control"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Symptoms / Notes</label>
            <textarea
              className="form-control"
              rows="3"
              name="symptoms"
              value={form.symptoms}
              onChange={handleChange}
              placeholder="Describe your issue..."
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary w-100 rounded-pill">Book Now</button>
        </form>
      </div>
    </div>
  );
}
