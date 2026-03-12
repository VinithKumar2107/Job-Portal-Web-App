const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

// Set DNS servers early (before any network calls)
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Allow requests from React frontend (both local and potentially production)
app.use(cors({
  origin: ["http://localhost:3000", "https://job-portal-api.onrender.com"], // Add your frontend URL here later
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.json()); // Parse incoming JSON

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

app.use("/api/test", require("./routes/testRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));

// MongoDB Connection
console.log("MONGO_URI =", process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
