const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");
const authMiddleware = require("../middleware/authMiddleware");

// POST   /api/jobs       → Create Job (Auth Required)
router.post("/", authMiddleware, jobController.createJob);

// GET    /api/jobs       → Get All Jobs (Auth Required)
router.get("/", authMiddleware, jobController.getAllJobs);

// GET    /api/jobs/:id   → Get Single Job (Auth Required)
router.get("/:id", authMiddleware, jobController.getJobById);

// PUT    /api/jobs/:id   → Update Job (Auth Required)
router.put("/:id", authMiddleware, jobController.updateJob);

// DELETE /api/jobs/:id   → Delete Job (Auth Required)
router.delete("/:id", authMiddleware, jobController.deleteJob);

module.exports = router;
