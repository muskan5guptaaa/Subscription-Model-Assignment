const express = require('express');
const router = express.Router();
const planController = require('../controllers/planController');

// Create a plan
router.post('/create', planController.createPlan);

// Get all plans
router.get('/getPlan', planController.getAllPlans);

module.exports = router;
