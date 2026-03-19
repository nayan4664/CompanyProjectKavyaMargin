const Invoice = require('../models/Invoice');

// @desc    Get all invoices
// @route   GET /api/invoices
const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ date: -1 });
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single invoice
// @route   GET /api/invoices/:id
const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new invoice
// @route   POST /api/invoices
const createInvoice = async (req, res) => {
  try {
    const { client, project, amount, dueDate, status, items, notes } = req.body;
    
    // Generate Invoice ID
    const invoiceId = `INV-${Date.now()}`;

    const newInvoice = await Invoice.create({
      invoiceId,
      client,
      project,
      amount,
      dueDate,
      status: status || 'Pending',
      items,
      notes
    });

    res.status(201).json(newInvoice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update invoice status/details
// @route   PUT /api/invoices/:id
const updateInvoice = async (req, res) => {
  try {
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedInvoice) return res.status(404).json({ message: 'Invoice not found' });
    res.status(200).json(updatedInvoice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete invoice
// @route   DELETE /api/invoices/:id
const deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
    res.status(200).json({ message: 'Invoice deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice
};
