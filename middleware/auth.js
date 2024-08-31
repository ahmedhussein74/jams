const jwt = require("jsonwebtoken");
const STATUS = require("../utils/responseStatus");

const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(STATUS.UNAUTHORIZED)
      .json({ message: "Access denied. No token provided." });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = {
      id: decoded.userId,
      role: decoded.role,
    };
    next();
  } catch (error) {
    res.status(STATUS.FORBIDDEN).json({ message: "Invalid or expired token." });
  }
};

module.exports = auth;
