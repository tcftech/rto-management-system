const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

// Route for vehicle registration
router.post('/register', vehicleController.registerVehicle);

// Route for vehicle registration renewal
router.post('/renew', vehicleController.renewVehicleRegistration);

// Route for tracking vehicle registration status
router.get('/status/:id', vehicleController.trackVehicleStatus);

router.get('/all', vehicleController.getVehicleRegistrations);

module.exports = router;