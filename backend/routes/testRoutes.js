const express = require("express");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Any logged-in user
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Access granted",
    user: req.user,
  });
});

module.exports = router;