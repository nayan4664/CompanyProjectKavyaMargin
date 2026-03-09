import React, { useState } from 'react';
import { Receipt, Save, ArrowLeft, Plus, Trash2, Download, Building2, Calendar, FileText } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { exportToPDF } from '../../utils/exportUtils';

const GenerateInvoice = () => {
  const navigate = useNavigate();
  const [invoiceData, setInvoiceData] = useState({
    invoiceId: `INV-2026-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
    clientName: '',
    project: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: '',
    items: [
      { id: 1, description: 'Development Services - Feb 2026', hours: 160, rate: 45, amount: 7200 },
    ],
    taxRate: 18,
    notes: 'Payment due within 15 days. Thank you for your business!',
  });

  const handleAddItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { id: Date.now(), description: '', hours: 0, rate: 0, amount: 0 }]
    });
  };

  const updateItem = (id, field, value) => {
    const newItems = invoiceData.items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'hours' || field === 'rate') {
          updatedItem.amount = updatedItem.hours * updatedItem.rate;
        }
        return updatedItem;
      }
      return item;
    });
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const removeItem = (id) => {
    setInvoiceData({ ...invoiceData, items: invoiceData.items.filter(item => item.id !== id) });
  };

  const subtotal = invoiceData.items.reduce((acc, item) => acc + item.amount, 0);
  const tax = subtotal * (invoiceData.taxRate / 100);
  const total = subtotal + tax;

  const handleSave = (e) => {
    e.preventDefault();
    alert('Invoice generated and saved successfully!');
    navigate('/invoicing/list');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link to="/invoicing/list" className="p-2 hover:bg-slate-800 rounded-xl border border-transparent hover:border-slate-800 transition-all text-slate-400">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-100 tracking-tight flex items-center gap-3">
              <Receipt className="w-8 h-8 text-blue-500" />
              Generate Invoice
            </h1>
            <p className="text-slate-400 mt-1 font-medium">Create a professional invoice for your clients.</p>
          </div>
        </div>
        <button 
          onClick={() => exportToPDF('invoice-preview', `Invoice_${invoiceData.invoiceId}.pdf`)}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm font-bold text-slate-300 hover:bg-slate-800 transition-all shadow-sm"
        >
          <Download className="w-4 h-4" />
          Preview PDF
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Editor */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-slate-900/50 backdrop-blur-xl p-8 rounded-3xl border border-slate-800 shadow-sm space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-300 ml-1">Client Name</label>
                <input 
                  type="text" 
                  value={invoiceData.clientName}
                  onChange={(e) => setInvoiceData({ ...invoiceData, clientName: e.target.value })}
                  placeholder="e.g. TechCorp Solutions"
                  className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-200" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-300 ml-1">Project Reference</label>
                <input 
                  type="text" 
                  value={invoiceData.project}
                  onChange={(e) => setInvoiceData({ ...invoiceData, project: e.target.value })}
                  placeholder="e.g. Project Alpha"
                  className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-200" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-300 ml-1">Invoice Date</label>
                <input 
                  type="date" 
                  value={invoiceData.date}
                  onChange={(e) => setInvoiceData({ ...invoiceData, date: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-200" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-300 ml-1">Due Date</label>
                <input 
                  type="date" 
                  value={invoiceData.dueDate}
                  onChange={(e) => setInvoiceData({ ...invoiceData, dueDate: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-200" 
                />
              </div>
            </div>

            {/* Line Items */}
            <div className="space-y-4">
              <h4 className="font-bold text-slate-100 border-b border-slate-800 pb-2">Invoice Items</h4>
              {invoiceData.items.map((item) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                  <div className="md:col-span-5 space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Description</label>
                    <input 
                      type="text" 
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-sm outline-none text-slate-200" 
                    />
                  </div>
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Hours</label>
                    <input 
                      type="number" 
                      value={item.hours}
                      onChange={(e) => updateItem(item.id, 'hours', Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-sm outline-none text-center text-slate-200" 
                    />
                  </div>
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Rate</label>
                    <input 
                      type="number" 
                      value={item.rate}
                      onChange={(e) => updateItem(item.id, 'rate', Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-sm outline-none text-center text-slate-200" 
                />
                  </div>
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Amount</label>
                    <div className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm font-bold text-slate-300 text-center">
                      ${item.amount}
                    </div>
                  </div>
                  <div className="md:col-span-1 flex justify-center pb-2">
                    <button onClick={() => removeItem(item.id)} className="text-slate-600 hover:text-rose-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              <button 
                onClick={handleAddItem}
                className="flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors pt-2"
              >
                <Plus className="w-3 h-3" />
                Add Line Item
              </button>
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t border-slate-800">
              <button 
                onClick={handleSave}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Generate & Save Invoice
              </button>
            </div>
          </div>
        </div>

        {/* Live Preview / Summary */}
        <div className="space-y-6">
          <div className="bg-slate-900/50 backdrop-blur-xl p-8 rounded-3xl border border-slate-800 shadow-xl" id="invoice-preview">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-xl font-black text-slate-100">INVOICE</h2>
                <p className="text-xs text-slate-500 font-bold mt-1">{invoiceData.invoiceId}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-100">KavyaMargin Ent.</p>
                <p className="text-[10px] text-slate-500 font-medium">123 Business Way, Silicon Valley</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500 font-bold">BILLED TO</span>
                <span className="text-slate-200 font-bold">{invoiceData.clientName || 'Client Name'}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500 font-bold">PROJECT</span>
                <span className="text-slate-200 font-bold">{invoiceData.project || 'Project Name'}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500 font-bold">DATE</span>
                <span className="text-slate-200 font-bold">{invoiceData.date}</span>
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-800">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400 font-medium">Subtotal</span>
                <span className="text-slate-200 font-bold">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400 font-medium">Tax ({invoiceData.taxRate}%)</span>
                <span className="text-slate-200 font-bold">${tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg pt-4 border-t border-slate-800">
                <span className="text-slate-100 font-black tracking-tight">TOTAL</span>
                <span className="text-blue-400 font-black">${total.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-8 p-4 bg-slate-800/50 rounded-2xl border border-slate-800">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Notes</p>
              <p className="text-xs text-slate-400 font-medium leading-relaxed italic">{invoiceData.notes}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateInvoice;
