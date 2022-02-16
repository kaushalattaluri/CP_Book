const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
    },
    college: {
        type: String,
        required: true
    },
    dept: {
        type: String,
        required: true
    },
    handles: {
        type: Object,
        codechef: {
            type: Object,
            name: {
                type: String,
                default: ""
            },
            pc: {
                type: String,
                default: ""
            }
        },
        codeforces: {
            type: Object,
            name: {
                type: String,
                default: ""
            },
            pc: {
                type: String,
                default: ""
            }
        },
        spoj: {
            type: Object,
            name: {
                type: String,
                default: ""
            },
            pc: {
                type: String,
                default: ""
            }
        },
        interview_bit: {
            type: Object,
            name: {
                type: String,
                default: ""
            },
            pc: {
                type: String,
                default: ""
            }
        },
        leetcode: {
            type: Object,
            name: {
                type: String,
                default: ""
            },
            pc: {
                type: String,
                default: ""
            }
        },
        atcoder: {
            type: Object,
            name: {
                type: String,
                default: ""
            },
            pc: {
                type: String,
                default: ""
            }
        }
    }
});

module.exports = mongoose.model('User', userSchema);
