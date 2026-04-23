const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Middlewares
app.use(express.json());

// 🔥 Better CORS (important for deployed frontend)
app.use(cors({
  origin: "*", // for exam ok, later restrict to frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ Routes
const authRoutes = require("./routes/authRoutes");
const grievanceRoutes = require("./routes/grievanceRoutes");

app.use("/api", authRoutes);
app.use("/api/grievances", grievanceRoutes);

// ✅ Health check (important for Render)
app.get("/", (req, res) => {
  res.send("API Running...");
});

// ✅ DB + Server start (best practice)
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch(err => {
    console.log("DB Error:", err);
  });