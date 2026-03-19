const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  department: { type: String, required: true },
  CTC: { type: Number, required: true },
  monthlyCost: { type: Number, required: true },
  status: { type: String, default: 'Active' },
  email: { type: String },
  joiningDate: { type: Date },
  variablePay: { type: Number },
  location: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Employee', EmployeeSchema);
