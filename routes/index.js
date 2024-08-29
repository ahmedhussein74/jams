const router = require("express").Router();

const JobRoute = require("./Job");
const UserRoute = require("./User");
const EmployerRoute = require("./Employer");
const JobSeekerRoute = require("./JobSeeker");
const JobApplicationRoute = require("./JobApplication");

router.use("/jobs", JobRoute);
router.use("/user", UserRoute);
router.use("/employer", EmployerRoute);
router.use("/jobseeker", JobSeekerRoute);
router.use("/applications", JobApplicationRoute);

module.exports = router;
