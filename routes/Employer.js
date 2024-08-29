const router = require("express").Router();
const auth = require("../middleware/auth");
const Employer = require("../controllers/Employer");

router.get("/:userId", auth, Employer.getProfile);

router.put("/:userId", auth, Employer.createOrUpdateProfile);

router.delete("/:userId", auth, Employer.deleteProfileAndUser);

module.exports = router;
