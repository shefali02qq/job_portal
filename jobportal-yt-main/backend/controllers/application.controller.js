import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";
import { InclusiveApplication } from "../models/InclusiveApplication.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required.",
                success: false
            })
        };
        // check if the user has already applied for the job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this jobs",
                success: false
            });
        }

        // check if the jobs exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }
        // create a new application
        const newApplication = await Application.create({
            job:jobId,
            applicant:userId,
        });

        job.applications.push(newApplication._id);
        await job.save();
        // --- InclusiveApplication logic ---
        const user = await User.findById(userId);
        if (user) {
            await InclusiveApplication.create({
                applicant: userId,
                job: jobId,
                inclusiveStatus: user.inclusiveStatus || 'None'
            });
        }
        // --- End InclusiveApplication logic ---
        return res.status(201).json({
            message:"Job applied successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
};
export const getAppliedJobs = async (req,res) => {
    try {
        const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
        });
        if(!application){
            return res.status(404).json({
                message:"No Applications",
                success:false
            })
        };
        return res.status(200).json({
            application,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
// admin dekhega kitna user ne apply kiya hai
export const getApplicants = async (req,res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        });
        if(!job){
            return res.status(404).json({
                message:'Job not found.',
                success:false
            })
        };
        return res.status(200).json({
            job, 
            succees:true
        });
    } catch (error) {
        console.log(error);
    }
}
export const updateStatus = async (req,res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message:'status is required',
                success:false
            })
        };

        // find the application by applicantion id
        const application = await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                message:"Application not found.",
                success:false
            })
        };

        // update the status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message:"Status updated successfully.",
            success:true
        });

    } catch (error) {
        console.log(error);
    }
}

// --- Recruiter Analytics APIs ---
// 1. Total inclusive applicants by type
export const getInclusiveApplicantsCount = async (req, res) => {
    try {
        const result = await InclusiveApplication.aggregate([
            { $group: { _id: "$inclusiveStatus", count: { $sum: 1 } } },
            { $project: { _id: 0, inclusiveStatus: "$_id", count: 1 } }
        ]);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// 2. Count of jobs posted with each inclusive tag
export const getJobsCountByInclusiveTag = async (req, res) => {
    try {
        const result = await Job.aggregate([
            { $unwind: "$inclusiveTags" },
            { $group: { _id: "$inclusiveTags", count: { $sum: 1 } } },
            { $project: { _id: 0, tag: "$_id", count: 1 } }
        ]);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// 3. Application trends over time (by month)
export const getInclusiveApplicationTrends = async (req, res) => {
    try {
        const result = await InclusiveApplication.aggregate([
            {
                $group: {
                    _id: { year: { $year: "$appliedAt" }, month: { $month: "$appliedAt" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } },
            {
                $project: {
                    _id: 0,
                    year: "$_id.year",
                    month: "$_id.month",
                    count: 1
                }
            }
        ]);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
// --- End Recruiter Analytics APIs ---