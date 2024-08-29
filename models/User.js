const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["JobSeeker", "Employer"],
  },
  profile: { type: Schema.Types.ObjectId, refPath: "role" },
});

module.exports = mongoose.model("User", userSchema);
