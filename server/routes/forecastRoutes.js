const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getForecastProjections } = require('../controllers/forecastController');

router.get('/projections', protect, getForecastProjections);

module.exports = router;
