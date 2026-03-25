const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  companyName: { type: String, default: '' },
  registrationNumber: { type: String, default: '' },
  taxId: { type: String, default: '' },
  industry: { type: String, default: '' },
  website: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  address: { type: String, default: '' },
  currency: { type: String, default: 'INR' },
  fiscalYearStart: { type: String, default: 'April' },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Company', companySchema);
