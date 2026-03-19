const Bench = require('../models/Bench');

// @desc    Get all bench resources
// @route   GET /api/bench
const getBenchList = async (req, res) => {
  try {
    const list = await Bench.find().sort({ createdAt: -1 });
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new bench resource
// @route   POST /api/bench
const createBenchResource = async (req, res) => {
  try {
    const newResource = await Bench.create(req.body);
    res.status(201).json(newResource);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update bench resource
// @route   PUT /api/bench/:id
const updateBenchResource = async (req, res) => {
  try {
    const updated = await Bench.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Resource not found' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete bench resource
// @route   DELETE /api/bench/:id
const deleteBenchResource = async (req, res) => {
  try {
    const deleted = await Bench.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Resource not found' });
    res.status(200).json({ message: 'Resource removed from bench' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBenchList,
  createBenchResource,
  updateBenchResource,
  deleteBenchResource
};
