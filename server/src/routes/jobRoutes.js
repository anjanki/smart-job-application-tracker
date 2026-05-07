const express = require("express");
const {
  createJob,
  getJobs,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/")
  .post(protect, createJob)
  .get(protect, getJobs);

router.route("/:id")
  .put(protect, updateJob)
  .delete(protect, deleteJob);

module.exports = router;
