const express = require("express");
const Grievance = require("../models/Grievance");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();


// 🔹 Create grievance
router.post("/", protect, async (req, res) => {
  try {
    const { title, description, category } = req.body;

    const grievance = await Grievance.create({
      user: req.user._id,
      title,
      description,
      category
    });

    res.status(201).json(grievance);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// 🔹 Get all
router.get("/", protect, async (req, res) => {
  const data = await Grievance.find({ user: req.user._id });
  res.json(data);
});


// 🔹 Get by ID
router.get("/:id", protect, async (req, res) => {
  const item = await Grievance.findById(req.params.id);
  res.json(item);
});


// 🔹 Update
router.put("/:id", protect, async (req, res) => {
  const updated = await Grievance.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});


// 🔹 Delete
router.delete("/:id", protect, async (req, res) => {
  await Grievance.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});


// 🔹 Search
router.get("/search/query", protect, async (req, res) => {
  const { title } = req.query;

  const result = await Grievance.find({
    title: { $regex: title, $options: "i" },
    user: req.user._id
  });

  res.json(result);
});

module.exports = router;