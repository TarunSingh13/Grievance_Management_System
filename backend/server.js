const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ Middlewares
app.use(express.json());
app.use(cors({
  origin: "*"
}));

// ✅ Routes
const authRoutes = require("./routes/authRoutes");
const grievanceRoutes = require("./routes/grievanceRoutes");

app.use("/api", authRoutes);
app.use("/api/grievances", grievanceRoutes);

// ✅ DB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ✅ Render PORT support
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API Running...");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));