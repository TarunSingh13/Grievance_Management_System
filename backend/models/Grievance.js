const mongoose = require("mongoose");

const grievanceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ["Academic", "Hostel", "Transport", "Other"],
    default: "Other"
  },
  status: {
    type: String,
    enum: ["Pending", "Resolved"],
    default: "Pending"
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model("Grievance", grievanceSchema);