const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice
} = require('../controllers/invoiceController');

router.route('/')
  .get(protect, getInvoices)
  .post(protect, createInvoice);

router.route('/:id')
  .get(protect, getInvoiceById)
  .put(protect, updateInvoice)
  .delete(protect, deleteInvoice);

module.exports = router;
