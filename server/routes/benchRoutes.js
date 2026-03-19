const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getBenchList,
  createBenchResource,
  updateBenchResource,
  deleteBenchResource
} = require('../controllers/benchController');

router.route('/')
  .get(protect, getBenchList)
  .post(protect, createBenchResource);

router.route('/:id')
  .put(protect, updateBenchResource)
  .delete(protect, deleteBenchResource);

module.exports = router;
