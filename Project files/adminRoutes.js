const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Get all pending doctors
router.get("/pending-doctors", async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor", isApproved: false });
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching doctors" });
  }
});

// Approve a doctor
router.put("/approve-doctor/:id", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { isApproved: true });
    res.status(200).json({ msg: "Doctor approved successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Error approving doctor" });
  }
});

module.exports = router;
