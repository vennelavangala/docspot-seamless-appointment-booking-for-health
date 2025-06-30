import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function PreConsultForm() {
  const { id } = useParams(); // appointment ID
  const navigate = useNavigate();

  const [form, setForm] = useState({
    age: '',
    gender: '',
    height: '',
    weight: '',
    allergies: '',
    medications: '',
    familyHistory: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/booking/form/${id}`, form); // ✅ Fixed endpoint
      alert("✅ Form submitted successfully!");
      navigate("/user");
    } catch (err) {
      alert("❌ Failed to submit form");
      console.error(err);
    }
  };

  return (
    <div className="container py-5">
      <h3 className="text-center mb-4">📝 Pre-Consultation Form</h3>
      <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-white mx-auto" style={{ maxWidth: "600px" }}>
        <div className="mb-3">
          <label>Age</label>
          <input type="number" name="age" className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Gender</label>
          <select name="gender" className="form-select" onChange={handleChange} required>
            <option value="">-- Select --</option>
            <option>Female</option>
            <option>Male</option>
            <option>Other</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Height (e.g., 5'4")</label>
          <input type="text" name="height" className="form-control" onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label>Weight (in kg)</label>
          <input type="text" name="weight" className="form-control" onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label>Any existing health conditions?</label>
          <textarea name="allergies" rows="2" className="form-control" onChange={handleChange}></textarea>
        </div>

        <div className="mb-3">
          <label>Current medications (if any)</label>
          <textarea name="medications" rows="2" className="form-control" onChange={handleChange}></textarea>
        </div>

        <div className="mb-3">
          <label>Family medical history</label>
          <textarea name="familyHistory" rows="2" className="form-control" onChange={handleChange}></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-100 rounded-pill">Submit to Doctor</button>
      </form>
    </div>
  );
}
