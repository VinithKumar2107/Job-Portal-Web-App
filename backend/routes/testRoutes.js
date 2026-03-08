const express = require("express");
const { protect, recruiterOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// Any logged-in user
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Access granted",
    user: req.user,
  });
});

// Recruiter only
router.get("/recruiter", protect, recruiterOnly, (req, res) => {
  res.json({ message: "Recruiter access granted" });
});

module.exports = router;