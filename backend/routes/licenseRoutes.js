const express = require('express');
const router = express.Router();
const licenseController = require('../controllers/licenseController');

// Route to apply for a new driving license
router.post('/apply', licenseController.applyForLicense);

// Route to renew an existing driving license
router.post('/renew', licenseController.renewLicense);

// Route to get the status of a driving license application
router.get('/status/:id', licenseController.trackLicenseStatus);

// Route to get details of a specific driving license
// router.get('/:id', licenseController.getLicenseDetails);

// // Route to get all licenses for a user
// router.get('/user/:userId', licenseController.getUserLicenses);

router.get('/', licenseController.getLicense);

module.exports = router;