const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  patientEmail: { type: String, required: true },
  doctorType: {
    type: String,
    enum: ['General', 'Pediatrics', 'Gynaecology', 'Dermatology'],
    required: true,
  },
  doctorName: { type: String, required: true },
  appointmentDate: { type: Date, required: true },
  symptoms: { type: String },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  preConsultForm: {
    age: Number,
    gender: String,
    height: String,
    weight: Number,
    allergies: String,
    medications: String,
    familyHistory: String
  }
}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);
