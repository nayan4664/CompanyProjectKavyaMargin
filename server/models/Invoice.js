const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  invoiceId: { type: String, required: true, unique: true },
  client: { type: String, required: true },
  project: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Paid', 'Overdue', 'Cancelled'],
    default: 'Pending' 
  },
  items: [{
    description: String,
    hours: Number,
    rate: Number,
    amount: Number
  }],
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('Invoice', InvoiceSchema);
