const Plan = require('../models/Plan');

// Create a new plan
exports.createPlan = async (req, res) => {
  try {
    const { name, price, duration, features } = req.body;

    // Input validation
    if (!name || !price || !duration || !Array.isArray(features)) {
      return res.status(400).json({
        success: false,
        message: "All fields are required: name, price, duration, and features (array)"
      });
    }

    if (typeof price !== 'number' || price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be a positive number"
      });
    }

    if (typeof duration !== 'number' || duration <= 0) {
      return res.status(400).json({
        success: false,
        message: "Duration must be a positive number (in days)"
      });
    }

    const newPlan = new Plan({ name, price, duration, features });
    await newPlan.save();

    res.status(201).json({ success: true, data: newPlan });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};


// Get all plans
exports.getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.status(200).json({ success: true, data: plans });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
