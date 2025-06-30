import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'user',
    specialization: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form };
      if (form.role !== 'doctor') delete payload.specialization;

      const res = await api.post("/auth/register", payload);
      alert(res.data.msg);
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center bg-light">
      <div className="row w-100">
        {/* Left: Form */}
        <div className="col-md-6 p-5 d-flex flex-column justify-content-center">
          <h2 className="fw-bold mb-4">Create Your Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-outline mb-4">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control rounded-pill"
                name="name"
                placeholder="Vennela"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-outline mb-4">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control rounded-pill"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-outline mb-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control rounded-pill"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-outline mb-4">
              <label className="form-label">Phone</label>
              <input
                type="text"
                className="form-control rounded-pill"
                name="phone"
                placeholder="1234567890"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="d-flex mb-3 gap-3">
              <div>
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={form.role === "admin"}
                  onChange={handleChange}
                /> Admin
              </div>
              <div>
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={form.role === "user"}
                  onChange={handleChange}
                /> User
              </div>
              <div>
                <input
                  type="radio"
                  name="role"
                  value="doctor"
                  checked={form.role === "doctor"}
                  onChange={handleChange}
                /> Doctor
              </div>
            </div>

            {/* Specialization for Doctors only */}
            {form.role === 'doctor' && (
              <div className="form-outline mb-4">
                <label className="form-label">Specialization</label>
                <select
                  className="form-select rounded-pill"
                  name="specialization"
                  value={form.specialization}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Choose Specialization --</option>
                  <option value="General">General Physician</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Gynaecology">Gynaecology</option>
                  <option value="Dermatology">Dermatology</option>
                </select>
              </div>
            )}

            <button type="submit" className="btn btn-warning rounded-pill px-4 w-100">
              Register
            </button>
          </form>

          <p className="mt-3 text-muted">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>

        {/* Right: Image */}
        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center">
          <img
            src="https://i.pinimg.com/736x/51/23/73/512373ddc5d5334b2745b3a810a25952.jpg"
            alt="Register Illustration"
            className="img-fluid"
            style={{ maxHeight: "80vh", borderRadius: "20px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
          />
        </div>
      </div>
    </div>
  );
}
