const router = require("express").Router();
const auth = require("../middleware/auth");
const JobSeeker = require("../controllers/JobSeeker");

router.put(
  "/:userId",
  auth,
  JobSeeker.uploadResume,
  JobSeeker.createOrUpdateProfile
);

router.get("/:userId", auth, JobSeeker.getProfile);

router.delete("/:userId", auth, JobSeeker.deleteProfileAndUser);

module.exports = router;
