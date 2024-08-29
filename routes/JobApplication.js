const router = require("express").Router();
const auth = require("../middleware/auth");
const JobApplication = require("../controllers/JobApplication");

router.post("/", auth, JobApplication.applyForJob);

router.get("/job/:jobId", auth, JobApplication.getApplicationsForJob);

router.get("/seeker", auth, JobApplication.getApplicationsByJobSeeker);

router.put("/:applicationId", auth, JobApplication.updateApplicationStatus);

module.exports = router;
