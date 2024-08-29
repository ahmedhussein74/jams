const Job = require("../models/Job");
const Employer = require("../models/Employer");
const STATUS = require("../utils/responseStatus");

exports.createJob = async (req, res) => {
  try {
    const { title, description, location, salary, type, experienceLevel } =
      req.body;
    const employer = await Employer.findOne({ userId: req.body.userId });
    if (!employer)
      return res
        .status(STATUS.NOT_FOUND)
        .json({ message: "Employer profile not found" });
    const newJob = new Job({
      title,
      description,
      company: employer._id,
      location,
      salary,
      type,
      experienceLevel,
    });
    await newJob.save();
    employer.jobsPosted.push(newJob._id);
    await employer.save();
    res
      .status(STATUS.CREATED)
      .json({ message: "Job created successfully", job: newJob });
  } catch (error) {
    res.status(STATUS.SERVER_ERROR).json({ message: error.message });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("company", "companyName");
    res.status(STATUS.SUCCESS).json(jobs);
  } catch (error) {
    res.status(STATUS.SERVER_ERROR).json({ message: error.message });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "company",
      "companyName"
    );
    if (!job)
      return res.status(STATUS.NOT_FOUND).json({ message: "Job not found" });
    res.status(STATUS.CREATED).json(job);
  } catch (error) {
    res.status(STATUS.SERVER_ERROR).json({ message: error.message });
  }
};

exports.updateJobById = async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedJob)
      return res.status(STATUS.NOT_FOUND).json({ message: "Job not found" });
    res
      .status(STATUS.CREATED)
      .json({ message: "Job updated successfully", job: updatedJob });
  } catch (error) {
    res.status(STATUS.SERVER_ERROR).json({ message: error.message });
  }
};

exports.deleteJobById = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job)
      return res.status(STATUS.NOT_FOUND).json({ message: "Job not found" });
    await Employer.updateOne(
      { _id: job.company },
      { $pull: { jobsPosted: job._id } }
    );
    res.status(STATUS.SUCCESS).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(STATUS.SERVER_ERROR).json({ message: error.message });
  }
};
