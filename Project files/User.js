const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["user", "doctor", "admin"],
    default: "user",
  },
specialization: {
  type: String,
  required: function () {
    return this.role === 'doctor';
  },
},
  isApproved: {
  type: Boolean,
  default: function () {
    return this.role !== 'doctor'; // only doctors need approval
  },
},

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
