const mongoose = require('mongoose');

const BenchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  dept: { type: String, required: true },
  benchTime: { type: String, required: true },
  cost: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Available', 'Interviewing', 'Allocated'],
    default: 'Available' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Bench', BenchSchema);
