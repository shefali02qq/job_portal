import mongoose from "mongoose";

const inclusiveApplicationSchema = new mongoose.Schema({
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    inclusiveStatus: {
        type: String,
        enum: ['None', 'PWD', 'WomenReturnee', 'LGBTQ+', 'EWS'],
        default: 'None',
        required: true
    },
    appliedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

export const InclusiveApplication = mongoose.model('InclusiveApplication', inclusiveApplicationSchema); 