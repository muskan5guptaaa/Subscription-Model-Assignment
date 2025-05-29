const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  createSubscription,
  getSubscription,
  updateSubscription,
  cancelSubscription,
  getPlans
} = require('../controllers/subscriptionController');

router.post('/subscriptions', auth, createSubscription);
router.get('/subscriptions/:userId', auth, getSubscription);
router.put('/subscriptions/:userId', auth, updateSubscription);
router.delete('/subscriptions/:userId', auth, cancelSubscription);
router.get('/plans', getPlans);

module.exports = router;
