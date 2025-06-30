const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// ✅ Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role, specialization } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "User already exists!" });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashed,
      role,
      specialization: role === 'doctor' ? specialization : undefined,
      isApproved: role === 'doctor' ? false : true, // only doctors need approval
    });

    await user.save();
    res.status(201).json({ msg: "Registered successfully!" });
  } catch (err) {
    res.status(500).json({ msg: "Registration failed", error: err.message });
  }
});

// ✅ Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid password!" });

    // Check approval if doctor
    if (user.role === 'doctor' && !user.isApproved) {
      return res.status(403).json({ msg: "Doctor account not yet approved by admin." });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      msg: "Login successful",
      token,
      user: { name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ msg: "Login failed", error: err.message });
  }
});


// ✅ GET: All pending doctors
router.get("/pending-doctors", async (req, res) => {
  try {
    const pendingDoctors = await User.find({ role: "doctor", isApproved: false });
    res.status(200).json(pendingDoctors);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch pending doctors", error: err.message });
  }
});

// ✅ PUT: Approve a doctor by ID
router.put("/approve/:id", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { isApproved: true });
    res.status(200).json({ msg: "Doctor approved successfully!" });
  } catch (err) {
    res.status(500).json({ msg: "Approval failed", error: err.message });
  }
});

// Get approved doctors
router.get("/approved-doctors", async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor", isApproved: true });
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch doctors", error: err.message });
  }
});



module.exports = router;
