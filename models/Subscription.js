const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan', required: true },
  startDate: { type: Date, default: Date.now },
  endDate: Date,
  status: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE', 'CANCELLED', 'EXPIRED'],
    default: 'ACTIVE',
  },
});

subscriptionSchema.pre('save', function(next) {
  if (!this.endDate && this.planId) {
    this.endDate = new Date(this.startDate.getTime() + 30 * 24 * 60 * 60 * 1000);
  }
  next();
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
