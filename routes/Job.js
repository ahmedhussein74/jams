const router = require("express").Router();
const auth = require("../middleware/auth");
const Job = require("../controllers/Job");

router.post("/", auth, Job.createJob);

router.get("/", Job.getAllJobs);

router.get("/:id", Job.getJobById);

router.put("/:id", auth, Job.updateJobById);

router.delete("/:id", auth, Job.deleteJobById);

module.exports = router;
