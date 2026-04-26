const mongoose = require("mongoose");
const Job = require("../models/Job");

const createJob = async (req, res, next) => {
  try {
    const { company, role, status, link } = req.body;

    if (!company || !role) {
      res.status(400);
      throw new Error("Company and role are required");
    }

    const job = await Job.create({
      company,
      role,
      status,
      link,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

const getJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Jobs fetched successfully",
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
};

const updateJob = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error("Invalid job ID");
    }

    const job = await Job.findOne({ _id: id, user: req.user._id });

    if (!job) {
      res.status(404);
      throw new Error("Job not found or unauthorized");
    }

    const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: updatedJob,
    });
  } catch (error) {
    next(error);
  }
};

const deleteJob = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error("Invalid job ID");
    }

    const job = await Job.findOne({ _id: id, user: req.user._id });

    if (!job) {
      res.status(404);
      throw new Error("Job not found or unauthorized");
    }

    await Job.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createJob,
  getJobs,
  updateJob,
  deleteJob,
};
