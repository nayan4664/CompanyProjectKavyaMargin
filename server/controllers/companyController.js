const Company = require('../models/Company');

// @desc    Get company details
// @route   GET /api/company
const getCompany = async (req, res) => {
  try {
    let company = await Company.findOne();
    if (!company) {
      // Return default empty structure instead of creating dummy data in DB
      return res.status(200).json({
        companyName: '',
        registrationNumber: '',
        taxId: '',
        industry: '',
        website: '',
        email: '',
        phone: '',
        address: '',
        currency: 'INR',
        fiscalYearStart: 'April'
      });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update company details
// @route   PUT /api/company
const updateCompany = async (req, res) => {
  try {
    let company = await Company.findOne();
    if (company) {
      company = await Company.findByIdAndUpdate(company._id, req.body, { new: true });
    } else {
      company = await Company.create(req.body);
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getCompany,
  updateCompany
};
