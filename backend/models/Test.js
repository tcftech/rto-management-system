const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    applicantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    vehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true
    },
    testDate: {
        type: Date,
        required: true
    },
    result: {
        type: String,
        enum: ['Pass', 'Fail'],
        required: true
    },
    remarks: {
        type: String,
        default: ''
    }
}, { timestamps: true });

module.exports = mongoose.model('Test', testSchema);