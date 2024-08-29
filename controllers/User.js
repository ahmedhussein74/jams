const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const STATUS = require("../utils/responseStatus");

const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRE_TIME }
  );
};

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const existingUser = await User.findOne({ email }); // Check if user already exists
    if (existingUser) {
      return res
        .status(STATUS.BAD_REQUEST)
        .json({ message: "Email already in use" });
    }
    const hashedPassword = await bcrypt.hash(password, 12); // Hash password
    const user = new User({ username, email, password: hashedPassword, role }); // Create new user
    await user.save();
    const token = generateToken(user); // Generate JWT token
    res
      .status(STATUS.CREATED)
      .json({ token, userId: user._id, role: user.role });
  } catch (error) {
    res.status(STATUS.SERVER_ERROR).json({ message: "Server error", error });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }); // Find user by email
    if (!user) {
      return res
        .status(STATUS.BAD_REQUEST)
        .json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password); // Check password
    if (!isMatch) {
      return res
        .status(STATUS.BAD_REQUEST)
        .json({ message: "Invalid email or password" });
    }
    const token = generateToken(user); // Generate JWT token
    res
      .status(STATUS.SUCCESS)
      .json({ token, userId: user._id, role: user.role });
  } catch (error) {
    res.status(STATUS.SERVER_ERROR).json({ message: "Server error", error });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(STATUS.NOT_FOUND).json({ message: "User not found" });
    }
    res.status(STATUS.SUCCESS).json(user);
  } catch (error) {
    res.status(STATUS.SERVER_ERROR).json({ message: "Server error", error });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { username, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, email },
      { new: true, runValidators: true }
    ).select("-password");
    if (!updatedUser) {
      return res.status(STATUS.NOT_FOUND).json({ message: "User not found" });
    }
    res.status(STATUS.SUCCESS).json(updatedUser);
  } catch (error) {
    res.status(STATUS.SERVER_ERROR).json({ message: "Server error", error });
  }
};
