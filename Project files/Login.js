import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      const { token, user } = res.data;

      // Store token in localStorage (for future protected routes)
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      alert("✅ Login successful");

      // Redirect based on role
      if (user.role === 'admin') navigate('/admin');
      else if (user.role === 'doctor') navigate('/doctor');
      else navigate('/user');
    } catch (err) {
      alert(err.response?.data?.msg || "❌ Login failed");
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center bg-light">
      <div className="row w-100">
        {/* Form Section */}
        <div className="col-md-6 p-5 d-flex flex-column justify-content-center">
          <h2 className="fw-bold mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-outline mb-4">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control rounded-pill"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="form-outline mb-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control rounded-pill"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 rounded-pill">Login</button>
          </form>
        </div>

        {/* Image Section */}
        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center">
          <img
            src="https://i.pinimg.com/736x/15/47/c1/1547c11ae29089c573614ed932e8cf4a.jpg"
            alt="Login Illustration"
            className="img-fluid"
            style={{ maxHeight: "80vh", borderRadius: "20px", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
          />
        </div>
      </div>
    </div>
  );
}

