const Job = require("../models/Job");
const JobSeeker = require("../models/JobSeeker");
const JobApplication = require("../models/JobApplication");
const STATUS = require("../utils/responseStatus");

exports.applyForJob = async (req, res) => {
  try {
    const { jobId, coverLetter } = req.body;
    const job = await Job.findById(jobId);
    if (!job)
      return res.status(STATUS.NOT_FOUND).json({ message: "Job not found" });
    const jobSeeker = await JobSeeker.findOne({ userId: req.userId });
    if (!jobSeeker)
      return res
        .status(STATUS.NOT_FOUND)
        .json({ message: "Job seeker profile not found" });
    const newApplication = new JobApplication({
      jobId,
      applicantId: jobSeeker._id,
      coverLetter,
    });
    await newApplication.save();
    job.applications.push(newApplication._id);
    await job.save();
    jobSeeker.applications.push(newApplication._id);
    await jobSeeker.save();
    res.status(STATUS.CREATED).json({
      message: "Application submitted successfully",
      application: newApplication,
    });
  } catch (error) {
    res.status(STATUS.SERVER_ERROR).json({ message: error.message });
  }
};

exports.getApplicationsForJob = async (req, res) => {
  try {
    const applications = await JobApplication.find({
      jobId: req.params.jobId,
    }).populate("applicantId", "userId");
    res.status(STATUS.SUCCESS).json(applications);
  } catch (error) {
    res.status(STATUS.SERVER_ERROR).json({ message: error.message });
  }
};

exports.getApplicationsByJobSeeker = async (req, res) => {
  try {
    const jobSeeker = await JobSeeker.findOne({ userId: req.userId });
    if (!jobSeeker)
      return res
        .status(STATUS.NOT_FOUND)
        .json({ message: "Job seeker profile not found" });
    const applications = await JobApplication.find({
      applicantId: jobSeeker._id,
    }).populate("jobId");
    res.status(STATUS.SUCCESS).json(applications);
  } catch (error) {
    res.status(STATUS.SERVER_ERROR).json({ message: error.message });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const application = await JobApplication.findByIdAndUpdate(
      req.params.applicationId,
      { status },
      { new: true }
    );
    if (!application)
      return res
        .status(STATUS.NOT_FOUND)
        .json({ message: "Application not found" });
    res.status(STATUS.SUCCESS).json({
      message: "Application status updated successfully",
      application,
    });
  } catch (error) {
    res.status(STATUS.SERVER_ERROR).json({ message: error.message });
  }
};
