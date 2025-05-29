const Plan = require('../models/Plan');

// Create a new plan
exports.createPlan = async (req, res) => {
  try {
    const { name, price, duration, features } = req.body;

    const newPlan = new Plan({
      name,
      price,
      duration,
      features
    });

    await newPlan.save();
    res.status(201).json({ success: true, data: newPlan });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
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
