const License = require('../models/License');

// Function to apply for a new driving license
exports.applyForLicense = async (req, res) => {
    try {
        const { userId, licenseType, documents } = req.body;
        const newLicense = new License({
            userId,
            licenseType,
            documents,
            status: 'Pending',
            createdAt: new Date(),
        });
        await newLicense.save();
        res.status(201).json({ message: 'License application submitted successfully', license: newLicense });
    } catch (error) {
        res.status(500).json({ message: 'Error applying for license', error: error.message });
    }
};

// Function to renew an existing driving license
exports.renewLicense = async (req, res) => {
    try {
        const { licenseId } = req.params;
        const updatedLicense = await License.findByIdAndUpdate(licenseId, { status: 'Renewed', updatedAt: new Date() }, { new: true });
        if (!updatedLicense) {
            return res.status(404).json({ message: 'License not found' });
        }
        res.status(200).json({ message: 'License renewed successfully', license: updatedLicense });
    } catch (error) {
        res.status(500).json({ message: 'Error renewing license', error: error.message });
    }
};

// Function to track the status of a driving license application
exports.trackLicenseStatus = async (req, res) => {
    try {
        const { licenseId } = req.params;
        const license = await License.findById(licenseId);
        if (!license) {
            return res.status(404).json({ message: 'License not found' });
        }
        res.status(200).json({ message: 'License status retrieved successfully', status: license.status });
    } catch (error) {
        res.status(500).json({ message: 'Error tracking license status', error: error.message });
    }
};


exports.getLicense = async (req, res) => {
    
        try {
            const licenses = await License.find();
            res.json(licenses);
          } catch (error) {
            console.error("Error fetching licenses:", error);
            res.status(500).json({ error: "Server error" });
          }
};



