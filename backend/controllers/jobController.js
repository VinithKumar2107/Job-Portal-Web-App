const Job = require("../models/Job");


// CREATE JOB
const createJob = async (req, res) => {
    try {
        const { title, company, location, description, salary, jobType, requirements } = req.body;

        const job = await Job.create({
            title,
            company,
            location,
            description,
            salary,
            jobType,
            requirements,
            // postedBy only set if auth middleware is used
            ...(req.user && { postedBy: req.user._id }),
        });

        res.status(201).json({
            message: "Job posted successfully",
            job,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// GET ALL JOBS
const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// GET SINGLE JOB BY ID
const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// UPDATE JOB
const updateJob = async (req, res) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedJob) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.status(200).json(updatedJob);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// DELETE JOB
const deleteJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { createJob, getAllJobs, getJobById, updateJob, deleteJob };
