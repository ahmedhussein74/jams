const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSeekerSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
  jobTittle: {
    type: String,
    required: true,
  },
  education: [
    {
      degree: String,
      institution: String,
      yearOfGraduation: Number,
    },
  ],
  experience: [
    {
      jobTitle: String,
      company: String,
      years: Number,
    },
  ],
  skills: [String],
  applications: [{ type: Schema.Types.ObjectId, ref: "JobApplication" }],
});

module.exports = mongoose.model("JobSeeker", jobSeekerSchema);
