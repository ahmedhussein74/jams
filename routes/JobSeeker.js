const router = require("express").Router();
const auth = require("../middleware/auth");
const JobSeeker = require("../controllers/JobSeeker");

router.get("/:userId", auth, JobSeeker.getProfile);

router.put("/:userId", auth, JobSeeker.createOrUpdateProfile);

router.delete("/:userId", auth, JobSeeker.deleteProfileAndUser);

module.exports = router;
