// import React, { useState, useContext } from 'react';
// import { Receipt, Save, ArrowLeft, Plus, Trash2, Download } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import { InvoiceContext } from '../../context/InvoiceContext';
// import { exportToPDF } from '../../utils/exportUtils';

// const GenerateInvoice = () => {
//   const navigate = useNavigate();
//   const { addInvoice } = useContext(InvoiceContext);

//   const [invoiceData, setInvoiceData] = useState({
//     invoiceId: `INV-2026-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
//     clientName: '',
//     project: '',
//     date: new Date().toISOString().split('T')[0],
//     dueDate: '',
//     items: [{ id: 1, description: 'Development Services', hours: 160, rate: 45, amount: 7200 }],
//     taxRate: 18,
//     notes: 'Payment due within 15 days.',
//   });

//   const handleAddItem = () => {
//     setInvoiceData({
//       ...invoiceData,
//       items: [...invoiceData.items, { id: Date.now(), description: '', hours: 0, rate: 0, amount: 0 }]
//     });
//   };

//   const updateItem = (id, field, value) => {
//     const newItems = invoiceData.items.map(item => {
//       if (item.id === id) {
//         const updatedItem = { ...item, [field]: value };
//         if (field === 'hours' || field === 'rate') updatedItem.amount = updatedItem.hours * updatedItem.rate;
//         return updatedItem;
//       }
//       return item;
//     });
//     setInvoiceData({ ...invoiceData, items: newItems });
//   };

//   const removeItem = (id) => {
//     setInvoiceData({ ...invoiceData, items: invoiceData.items.filter(item => item.id !== id) });
//   };

//   const subtotal = invoiceData.items.reduce((acc, item) => acc + item.amount, 0);
//   const tax = subtotal * (invoiceData.taxRate / 100);
//   const total = subtotal + tax;

//   const handleSave = (e) => {
//     e.preventDefault();
//     addInvoice({
//       id: invoiceData.invoiceId,
//       client: invoiceData.clientName,
//       project: invoiceData.project,
//       amount: `₹${total.toLocaleString()}`,
//       date: invoiceData.date,
//       dueDate: invoiceData.dueDate,
//       status: 'Pending'
//     });
//     navigate('/invoicing/list');
//   };

//   return (
//     <div className="space-y-8 p-6">
//       <header className="flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <Link to="/invoicing/list" className="p-2 hover:bg-slate-800 rounded-xl text-slate-400">
//             <ArrowLeft className="w-5 h-5" />
//           </Link>
//           <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
//             <Receipt className="w-6 h-6 text-blue-500" /> Generate Invoice
//           </h1>
//         </div>
//         <button onClick={() => exportToPDF('invoice-preview', `Invoice_${invoiceData.invoiceId}.pdf`)} className="bg-slate-900 px-4 py-2 rounded-xl text-slate-300">Preview PDF</button>
//       </header>

//       <div className="grid lg:grid-cols-3 gap-6">
//         {/* Invoice Form */}
//         <div className="lg:col-span-2 bg-slate-900 p-6 rounded-2xl space-y-6">
//           <div className="grid md:grid-cols-2 gap-4">
//             <input type="text" placeholder="Client Name" value={invoiceData.clientName} onChange={e => setInvoiceData({ ...invoiceData, clientName: e.target.value })} className="p-2 rounded-xl bg-slate-800 text-slate-200"/>
//             <input type="text" placeholder="Project" value={invoiceData.project} onChange={e => setInvoiceData({ ...invoiceData, project: e.target.value })} className="p-2 rounded-xl bg-slate-800 text-slate-200"/>
//             <input type="date" value={invoiceData.date} onChange={e => setInvoiceData({ ...invoiceData, date: e.target.value })} className="p-2 rounded-xl bg-slate-800 text-slate-200"/>
//             <input type="date" value={invoiceData.dueDate} onChange={e => setInvoiceData({ ...invoiceData, dueDate: e.target.value })} className="p-2 rounded-xl bg-slate-800 text-slate-200"/>
//           </div>

//           <div className="space-y-3">
//             <h3 className="font-bold text-slate-100">Invoice Items</h3>
//             {invoiceData.items.map(item => (
//               <div key={item.id} className="grid md:grid-cols-5 gap-2 items-end">
//                 <input type="text" value={item.description} onChange={e => updateItem(item.id, 'description', e.target.value)} className="col-span-2 p-2 rounded-xl bg-slate-800 text-slate-200"/>
//                 <input type="number" value={item.hours} onChange={e => updateItem(item.id, 'hours', Number(e.target.value))} className="p-2 rounded-xl bg-slate-800 text-slate-200"/>
//                 <input type="number" value={item.rate} onChange={e => updateItem(item.id, 'rate', Number(e.target.value))} className="p-2 rounded-xl bg-slate-800 text-slate-200"/>
//                 <div className="flex justify-between items-center">
//                   <span className="text-slate-200">₹{item.amount}</span>
//                   <button onClick={() => removeItem(item.id)} className="text-rose-500"><Trash2 className="w-4 h-4"/></button>
//                 </div>
//               </div>
//             ))}
//             <button onClick={handleAddItem} className="text-blue-400 flex items-center gap-1"><Plus className="w-3 h-3"/> Add Item</button>
//           </div>

//           <button onClick={handleSave} className="bg-blue-600 px-4 py-2 rounded-xl text-white font-bold">Generate Invoice</button>
//         </div>

//         {/* Live Preview */}
//         <div className="bg-slate-900 p-6 rounded-2xl" id="invoice-preview">
//           <h2 className="font-bold text-slate-100 mb-2">INVOICE</h2>
//           <p className="text-slate-200 mb-2">{invoiceData.invoiceId}</p>
//           <p className="text-slate-100 font-bold">Billed To: {invoiceData.clientName || 'Client Name'}</p>
//           <p className="text-slate-100 font-bold">Project: {invoiceData.project || 'Project'}</p>
//           <div className="mt-4 space-y-1">
//             {invoiceData.items.map(i => (
//               <div key={i.id} className="flex justify-between text-slate-200 text-sm">
//                 <span>{i.description}</span>
//                 <span>₹{i.amount}</span>
//               </div>
//             ))}
//           </div>
//           <div className="mt-4 border-t border-slate-800 pt-2 text-slate-100 font-bold flex justify-between">
//             <span>Total:</span>
//             <span>₹{total.toLocaleString()}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GenerateInvoice;


import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Receipt, ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import { invoiceAPI } from "../../services/api";

const GenerateInvoice = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    client: "",
    project: "",
    amount: "",
    dueDate: "",
    status: "Pending",
    items: [{ id: 1, description: 'Development Services', hours: 160, rate: 45, amount: 7200 }],
    notes: 'Payment due within 15 days.'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { id: Date.now(), description: '', hours: 0, rate: 0, amount: 0 }]
    });
  };

  const updateItem = (id, field, value) => {
    const newItems = formData.items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'hours' || field === 'rate') updatedItem.amount = updatedItem.hours * updatedItem.rate;
        return updatedItem;
      }
      return item;
    });
    setFormData({ ...formData, items: newItems });
  };

  const removeItem = (id) => {
    setFormData({ ...formData, items: formData.items.filter(item => item.id !== id) });
  };

  const subtotal = formData.items.reduce((acc, item) => acc + item.amount, 0);
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + tax;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newInvoice = {
        client: formData.client,
        project: formData.project,
        amount: total,
        dueDate: formData.dueDate,
        status: formData.status,
        items: formData.items,
        notes: formData.notes
      };

      await invoiceAPI.create(newInvoice);
      alert("Invoice created successfully!");
      navigate("/invoicing/list");
    } catch (error) {
      console.error('Failed to create invoice:', error);
      alert('Failed to create invoice');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/invoicing/list" className="p-2 hover:bg-slate-900 rounded-xl border border-transparent hover:border-slate-800 transition-all text-slate-500">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-100 tracking-tight flex items-center gap-3">
              <Receipt className="w-8 h-8 text-primary-600" />
              Generate Invoice
            </h1>
            <p className="text-slate-400 mt-1 font-medium">Create and send professional invoices to clients.</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-sm transition-all">
          <form onSubmit={handleSubmit} className="space-y-10">
            <section className="space-y-6">
              <h3 className="font-bold text-slate-100 uppercase tracking-widest text-xs border-b border-slate-800 pb-4">Client & Project Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-300 ml-1">Client Name</label>
                  <input 
                    type="text" 
                    name="client"
                    required
                    value={formData.client}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500/20 text-slate-200" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-300 ml-1">Project Name</label>
                  <input 
                    type="text" 
                    name="project"
                    required
                    value={formData.project}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500/20 text-slate-200" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-300 ml-1">Due Date</label>
                  <input 
                    type="date" 
                    name="dueDate"
                    required
                    value={formData.dueDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500/20 text-slate-200" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-300 ml-1">Status</label>
                  <select 
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500/20 text-slate-200 appearance-none"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <h3 className="font-bold text-slate-100 uppercase tracking-widest text-xs">Invoice Items</h3>
                <button type="button" onClick={handleAddItem} className="text-primary-500 text-xs font-bold hover:text-primary-400 transition-colors flex items-center gap-1">
                  <Plus className="w-3 h-3" /> Add Item
                </button>
              </div>
              <div className="space-y-4">
                {formData.items.map(item => (
                  <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end bg-slate-950/50 p-4 rounded-2xl border border-slate-800/50">
                    <div className="md:col-span-5 space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Description</label>
                      <input 
                        type="text" 
                        value={item.description}
                        onChange={e => updateItem(item.id, 'description', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200" 
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Hours</label>
                      <input 
                        type="number" 
                        value={item.hours}
                        onChange={e => updateItem(item.id, 'hours', Number(e.target.value))}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200" 
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Rate ($)</label>
                      <input 
                        type="number" 
                        value={item.rate}
                        onChange={e => updateItem(item.id, 'rate', Number(e.target.value))}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-200" 
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Amount</label>
                      <div className="px-3 py-2 text-sm font-bold text-slate-100 bg-slate-900 rounded-lg border border-slate-800">
                        ₹{item.amount.toLocaleString()}
                      </div>
                    </div>
                    <div className="md:col-span-1 flex justify-center pb-2">
                      <button type="button" onClick={() => removeItem(item.id)} className="text-rose-500 hover:text-rose-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="flex justify-end pt-6 border-t border-slate-800">
              <button 
                type="submit" 
                disabled={loading}
                className={`px-10 py-4 bg-primary-600 text-white rounded-2xl text-sm font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20 flex items-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                <Save className="w-4 h-4" />
                {loading ? 'Generating...' : 'Generate & Save Invoice'}
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-sm sticky top-24">
            <h3 className="font-bold text-slate-100 uppercase tracking-widest text-xs mb-6 border-b border-slate-800 pb-4">Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400 font-medium">Subtotal</span>
                <span className="text-slate-100 font-bold">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400 font-medium">Tax (18% GST)</span>
                <span className="text-slate-100 font-bold">₹{tax.toLocaleString()}</span>
              </div>
              <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                <span className="text-slate-100 font-black uppercase tracking-wider">Total Amount</span>
                <span className="text-2xl font-black text-primary-500">₹{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateInvoice;