const JobSeeker = require("../models/JobSeeker");
const STATUS = require("../utils/responseStatus");
const multerPDF = require("../utils/multerPDF");

exports.uploadResume = multerPDF(
  "public/resumes", // Directory to save the uploaded resume files
  "resume", // Field name in the form
  (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.originalname.split(".")[0]}-${req.userId}.${ext}`);
  },
  (req, file) => file.mimetype === "application/pdf"
);

exports.createOrUpdateProfile = async (req, res) => {
  const { jobTittle, education, experience, skills } = req.body;
  const resumePath = req.file ? req.file.path : null;
  const profileFields = {
    userId: req.user.id,
    jobTittle,
    resume: resumePath || req.body.resume,
    education,
    experience,
    skills,
  };
  try {
    let profile = await JobSeeker.findOne({ userId: req.user.id });
    if (profile) {
      profile = await JobSeeker.findOneAndUpdate(
        { userId: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.status(STATUS.SUCCESS).json(profile);
    }
    profile = new JobSeeker(profileFields);
    await profile.save();
    res.status(STATUS.SUCCESS).json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(STATUS.SERVER_ERROR).send("Server error");
  }
};

exports.getProfile = async (req, res) => {
  try {
    const profile = await JobSeeker.findOne({
      userId: req.params.id,
    }).populate("userId", ["name", "email"]);
    if (!profile)
      return res
        .status(STATUS.NOT_FOUND)
        .json({ message: "Profile not found" });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(STATUS.SERVER_ERROR).send("Server error");
  }
};

exports.deleteProfileAndUser = async (req, res) => {
  try {
    await JobSeeker.findOneAndRemove({ userId: req.params.id });
    await User.findByIdAndRemove(req.params.id);
    res.status(STATUS.SUCCESS).json({ message: "User and profile deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(STATUS.SERVER_ERROR).send("Server error");
  }
};
