const mongoose = require('mongoose');

const schema = mongoose.Schema;

module.exports = Profile = mongoose.model('profile', new schema({

    user: {
        type: schema.Types.ObjectId,
        ref: 'user'
    },
    handle: {
        type: String,
        required: true,
        max: 40
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
    },
    github: {
        type: String   
    },
    experience: [
        {
            title: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            location: {
                type: String
            },
            from: {
                type: Date,
                required: true
            },
            to:{
                type: Date
            },
            current:{
                type: Boolean,
                default: false
            },
            description: {
                type: String
            },
            active: {
                type: Boolean,
                default: true,
                required: true
            }
        }
    ],
    education: [
        {
            school: {
                type: String,
                required: true
            },
            degree: {
                type: String,
                required: true
            },
            field: {
                type: String,
                required: true
            },
            from: {
                type: Date,
                required: true
            },
            to:{
                type: Date
            },
            current:{
                type: Boolean,
                default: false
            },
            description: {
                type: String
            },
            active: {
                type: Boolean,
                default: true,
                required: true
            }
        }
    ],
    social: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        instagram: {
            type: String
        },
        linkedin: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
}));