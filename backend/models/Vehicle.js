const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    registrationNumber: {
        type: String,
        required: true,
        unique: true
    },
    ownerName: {
        type: String,
        required: true
    },
    vehicleType: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    yearOfManufacture: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    registrationDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['registered', 'renewed', 'pending'],
        default: 'pending'
    }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);