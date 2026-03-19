const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  registrationNumber: { type: String },
  taxId: { type: String },
  industry: { type: String },
  website: { type: String },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  currency: { type: String, default: 'INR' },
  fiscalYearStart: { type: String, default: 'April' }
}, { timestamps: true });

module.exports = mongoose.model('Company', CompanySchema);
