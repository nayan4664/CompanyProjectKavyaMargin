const Company = require('../models/company');

exports.getCompany = async (req, res) => {
  try {
    let company = await Company.findOne();
    if (!company) {
      company = await Company.create({});
    }
    res.json(company);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCompany = async (req, res) => {
  try {
    const company = await Company.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(company);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
