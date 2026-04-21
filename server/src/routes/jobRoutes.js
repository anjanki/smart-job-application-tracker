const express = require("express");
const {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
  getJobStats,
} = require("../controllers/jobcontroller");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/stats", protect, getJobStats);

router.route("/")
  .post(protect, createJob)
  .get(protect, getJobs);

router.route("/:id")
  .get(protect, getJobById)
  .put(protect, updateJob)
  .delete(protect, deleteJob);

module.exports = router;
