const jwt = require("jsonwebtoken");
const STATUS = require("../utils/responseStatus");

const auth = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token)
    return res
      .status(STATUS.NO_CONTENT)
      .json({ message: "Access denied. No token provided." });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (error) {
    res.status(STATUS.BAD_REQUEST).json({ message: "Invalid token." });
  }
};

module.exports = auth;
