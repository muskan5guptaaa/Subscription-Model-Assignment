const Subscription = require('../models/Subscription');
const Plan = require('../models/Plan');

// Create Subscription
exports.createSubscription = async (req, res) => {
  try {
    const { planId } = req.body;
    const plan = await Plan.findById(planId);
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + plan.duration * 24 * 60 * 60 * 1000);

    const subscription = await Subscription.create({
      userId: req.user.id,
      planId,
      startDate,
      endDate,
      status: 'ACTIVE',
    });

    res.status(201).json(subscription);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Subscription
exports.getSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ userId: req.params.userId }).populate('planId');
    if (!subscription) return res.status(404).json({ message: "No subscription found" });

    // Auto-expire if endDate is passed
    if (new Date() > subscription.endDate && subscription.status === 'ACTIVE') {
      subscription.status = 'EXPIRED';
      await subscription.save();
    }

    res.json(subscription);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Subscription
exports.updateSubscription = async (req, res) => {
  try {
    const { planId } = req.body;
    const plan = await Plan.findById(planId);
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    const subscription = await Subscription.findOneAndUpdate(
      { userId: req.params.userId },
      {
        planId,
        startDate: new Date(),
        endDate: new Date(Date.now() + plan.duration * 24 * 60 * 60 * 1000),
        status: 'ACTIVE',
      },
      { new: true }
    );

    res.json(subscription);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Cancel Subscription
exports.cancelSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOneAndUpdate(
      { userId: req.params.userId },
      { status: 'CANCELLED' },
      { new: true }
    );
    res.json(subscription);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all Plans
exports.getPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
