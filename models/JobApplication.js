const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobApplicationSchema = new Schema({
  jobId: {
    type: Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  applicantId: {
    type: Schema.Types.ObjectId,
    ref: "JobSeekerProfile",
    required: true,
  },
  coverLetter: String,
  status: {
    type: String,
    enum: ["applied", "under review", "accepted", "rejected"],
    default: "applied",
  },
});

module.exports = mongoose.model("JobApplication", jobApplicationSchema);
