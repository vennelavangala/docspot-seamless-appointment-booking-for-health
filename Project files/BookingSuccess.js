import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './BookingSuccess.css';
import { useNavigate } from 'react-router-dom';

export default function BookingSuccess() {
  const navigate = useNavigate();

  return (
    <div className="success-page d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-5 shadow-lg text-center bg-white rounded-4" style={{ maxWidth: '500px' }}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/11438/11438052.png"
          alt="Success Doctor"
          className="img-fluid mb-4"
          style={{ maxWidth: '120px' }}
        />
        <h3 className="text-success fw-bold">Appointment Confirmed!</h3>
        <p className="text-muted">We’ll see you soon. 💙</p>

        <blockquote className="blockquote mt-3 text-secondary" style={{ fontStyle: 'italic' }}>
          “Your health is our mission. We’ll take it from here.”
        </blockquote>

        <div className="mt-4 d-flex justify-content-center gap-3">
          <button className="btn btn-outline-primary" onClick={() => navigate('/user')}>
            Go to Dashboard
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
