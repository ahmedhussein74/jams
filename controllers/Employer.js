const Employer = require("../models/Employer");
const STATUS = require("../utils/responseStatus");

exports.createOrUpdateProfile = async (req, res) => {
  const { companyName, website, location } = req.body;
  const profileFields = {
    userId: req.body.userId,
    companyName,
    website,
    location,
  };
  try {
    let profile = await Employer.findOne({ userId: req.body.userId });
    if (profile) {
      // Update existing profile
      profile = await Employer.findOneAndUpdate(
        { userId: req.body.userId },
        { $set: profileFields },
        { new: true }
      );
      return res.status(STATUS.SUCCESS).json(profile);
    }
    // Create new profile
    profile = new Employer(profileFields);
    await profile.save();
    res.status(STATUS.CREATED).json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(STATUS.SERVER_ERROR).send("Server error");
  }
};

exports.getProfile = async (req, res) => {
  try {
    const profile = await Employer.findOne({
      userId: req.params.id,
    }).populate("userId", ["name", "email"]);
    if (!profile)
      return res
        .status(STATUS.NOT_FOUND)
        .json({ message: "Profile not found" });
    res.status(STATUS.SUCCESS).json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(STATUS.SERVER_ERROR).send("Server error");
  }
};

exports.deleteProfileAndUser = async (req, res) => {
  try {
    await Employer.findOneAndRemove({ userId: req.params.id });
    await User.findByIdAndRemove(req.params.id);
    res.status(STATUS.SUCCESS).json({ message: "User and profile deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(STATUS.SERVER_ERROR).send("Server error");
  }
};
