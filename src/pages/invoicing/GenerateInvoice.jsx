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
import { useNavigate } from "react-router-dom";

const GenerateInvoice = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    client: "",
    project: "",
    amount: "",
    dueDate: "",
    status: "Pending"
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const newInvoice = {
      id: "INV-" + Date.now(),
      client: formData.client,
      project: formData.project,
      amount: `₹${Number(formData.amount).toLocaleString()}`,
      date: new Date().toISOString().split("T")[0],
      dueDate: formData.dueDate,
      status: formData.status
    };

    // Get existing invoices
    const storedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];

    // Add new invoice
    const updatedInvoices = [...storedInvoices, newInvoice];

    // Save again
    localStorage.setItem("invoices", JSON.stringify(updatedInvoices));

    alert("Invoice created successfully!");

    // Redirect to invoice list
    navigate("/invoicing/list");

  };

  return (

    <div className="max-w-xl mx-auto p-6">

      <h2 className="text-2xl font-bold mb-6 text-slate-200">
        Create Invoice
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="client"
          placeholder="Client Name"
          required
          onChange={handleChange}
          className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-slate-200"
        />

        <input
          type="text"
          name="project"
          placeholder="Project Name"
          required
          onChange={handleChange}
          className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-slate-200"
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          required
          onChange={handleChange}
          className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-slate-200"
        />

        <input
          type="date"
          name="dueDate"
          required
          onChange={handleChange}
          className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-slate-200"
        />

        <select
          name="status"
          onChange={handleChange}
          className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-slate-200"
        >
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
          <option value="Overdue">Overdue</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-bold"
        >
          Save Invoice
        </button>

      </form>

    </div>

  );

};

export default GenerateInvoice;