const mongoose = require('mongoose');

const licenseSchema = new mongoose.Schema({
    licenseNumber: {
        type: String,
        required: true,
        unique: true
    },
    holderName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    issueDate: {
        type: Date,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    issuedBy: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'expired', 'suspended'],
        default: 'active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('License', licenseSchema);