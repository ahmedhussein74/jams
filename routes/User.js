const router = require("express").Router();
const auth = require("../middleware/auth");
const User = require("../controllers/User");

router.post("/login", User.loginUser);

router.post("/register", User.registerUser);

router.get("/profile/:id", auth, User.getUserProfile);

router.put("/profile/:id", auth, User.updateUserProfile);

module.exports = router;
