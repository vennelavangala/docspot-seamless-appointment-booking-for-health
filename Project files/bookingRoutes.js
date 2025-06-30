const express = require("express");
const Appointment = require("../models/Appointment");
const router = express.Router();

// Book Appointment
router.post("/book", async (req, res) => {
  try {
    const { patientName, patientEmail, doctorType, doctorName, appointmentDate, symptoms } = req.body;

    const appointment = new Appointment({
      patientName,
      patientEmail,
      doctorType,
      doctorName,
      appointmentDate,
      symptoms,
      status: "pending"
    });

    await appointment.save();
    res.status(201).json({ msg: "Appointment booked successfully!" });
  } catch (err) {
    res.status(500).json({ msg: "Booking failed", error: err.message });
  }
});

// Get all Appointments
router.get("/all", async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ appointmentDate: 1 });
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ msg: "Fetching failed", error: err.message });
  }
});

// Doctor updates appointment status
router.put("/status/:id", async (req, res) => {
  const { status } = req.body;

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ msg: "Invalid status" });
  }

  try {
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) return res.status(404).json({ msg: "Appointment not found" });
    res.status(200).json({ msg: `Appointment ${status} successfully`, updated });
  } catch (err) {
    res.status(500).json({ msg: "Status update failed", error: err.message });
  }
});

// Submit Pre-Consultation Form
router.put('/form/:id', async (req, res) => {
  try {
    const {
      age,
      gender,
      height,
      weight,
      allergies,
      medications,
      familyHistory
    } = req.body;

    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        preConsultForm: {
          age,
          gender,
          height,
          weight,
          allergies,
          medications,
          familyHistory
        }
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ msg: "Appointment not found" });

    res.status(200).json({ msg: "Form submitted successfully", updated });
  } catch (err) {
    console.error("❌ Form submission error:", err.message);
    res.status(500).json({ msg: "Failed to submit form", error: err.message });
  }
});


module.exports = router;
