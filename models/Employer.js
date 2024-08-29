const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employerSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  website: String,
  jobsPosted: [{ type: Schema.Types.ObjectId, ref: "Job" }],
});

module.exports = mongoose.model("Employer", employerSchema);
