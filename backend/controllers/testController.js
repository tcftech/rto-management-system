const Test = require('../models/Test');

// Create a new driving test
exports.createTest = async (req, res) => {
    try {
        const testData = req.body;
        const newTest = new Test(testData);
        await newTest.save();
        res.status(201).json({ message: 'Test created successfully', test: newTest });
    } catch (error) {
        res.status(500).json({ message: 'Error creating test', error: error.message });
    }
};

// Get all driving tests
exports.getAllTests = async (req, res) => {
    try {
        const tests = await Test.find();
        res.status(200).json(tests);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tests', error: error.message });
    }
};

// Get a specific driving test by ID
exports.getTestById = async (req, res) => {
    try {
        const test = await Test.findById(req.params.id);
        if (!test) {
            return res.status(404).json({ message: 'Test not found' });
        }
        res.status(200).json(test);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching test', error: error.message });
    }
};

// Update a driving test
exports.updateTest = async (req, res) => {
    try {
        const updatedTest = await Test.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTest) {
            return res.status(404).json({ message: 'Test not found' });
        }
        res.status(200).json({ message: 'Test updated successfully', test: updatedTest });
    } catch (error) {
        res.status(500).json({ message: 'Error updating test', error: error.message });
    }
};

// Delete a driving test
exports.deleteTest = async (req, res) => {
    try {
        const deletedTest = await Test.findByIdAndDelete(req.params.id);
        if (!deletedTest) {
            return res.status(404).json({ message: 'Test not found' });
        }
        res.status(200).json({ message: 'Test deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting test', error: error.message });
    }
};