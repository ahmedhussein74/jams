const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "EmployerProfile",
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salary: Number,
  type: {
    type: String,
    enum: ["full-time", "part-time", "contract"],
    required: true,
  },
  experienceLevel: {
    type: String,
    enum: ["entry", "mid", "senior"],
    required: true,
  },
  applications: [{ type: Schema.Types.ObjectId, ref: "JobApplication" }],
});

module.exports = mongoose.model("Job", jobSchema);
