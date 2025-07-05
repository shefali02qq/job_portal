import express from "express";
import { applyJob, getAppliedJobs, getApplicants, updateStatus, getInclusiveApplicantsCount, getJobsCountByInclusiveTag, getInclusiveApplicationTrends } from "../controllers/application.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/apply/:id", isAuthenticated, applyJob);
router.get("/applied", isAuthenticated, getAppliedJobs);
router.get("/applicants/:id", isAuthenticated, getApplicants);
router.put("/status/:id", isAuthenticated, updateStatus);

// --- Recruiter Analytics APIs ---
router.get("/analytics/inclusive-applicants", isAuthenticated, getInclusiveApplicantsCount);
router.get("/analytics/jobs-by-inclusive-tag", isAuthenticated, getJobsCountByInclusiveTag);
router.get("/analytics/inclusive-application-trends", isAuthenticated, getInclusiveApplicationTrends);
// --- End Recruiter Analytics APIs ---

export default router;

