const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Job title is required'],
        trim: true
    },
    company: {
        type: String,
        required: [true, 'Company name is required'],
        trim: true
    },
    location: {
        type: String,
        trim: true,
        default: ''
    },
    salary: {
        type: String,
        default: ''
    },
    jobType: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
        default: 'Full-time',
    },
    description: {
        type: String,
        default: ''
    },
    requirements: {
        type: [String],
        default: []
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,   // optional — not all routes use auth
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Job', JobSchema);
