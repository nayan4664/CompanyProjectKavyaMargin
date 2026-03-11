


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const GenerateInvoice = () => {

//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     client: "",
//     project: "",
//     amount: "",
//     dueDate: "",
//     status: "Pending"
//   });

//   const handleChange = (e) => {

//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });

//   };

//   const handleSubmit = (e) => {

//     e.preventDefault();

//     const newInvoice = {
//       id: "INV-" + Date.now(),
//       client: formData.client,
//       project: formData.project,
//       amount: `₹${Number(formData.amount).toLocaleString()}`,
//       date: new Date().toISOString().split("T")[0],
//       dueDate: formData.dueDate,
//       status: formData.status
//     };

//     // Get existing invoices
//     const storedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];

//     // Add new invoice
//     const updatedInvoices = [...storedInvoices, newInvoice];

//     // Save again
//     localStorage.setItem("invoices", JSON.stringify(updatedInvoices));

//     alert("Invoice created successfully!");

//     // Redirect to invoice list
//     navigate("/invoicing/list");

//   };

//   return (

//     <div className="max-w-xl mx-auto p-6">

//       <h2 className="text-2xl font-bold mb-6 text-slate-200">
//         Create Invoice
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-4">

//         <input
//           type="text"
//           name="client"
//           placeholder="Client Name"
//           required
//           onChange={handleChange}
//           className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-slate-200"
//         />

//         <input
//           type="text"
//           name="project"
//           placeholder="Project Name"
//           required
//           onChange={handleChange}
//           className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-slate-200"
//         />

//         <input
//           type="number"
//           name="amount"
//           placeholder="Amount"
//           required
//           onChange={handleChange}
//           className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-slate-200"
//         />

//         <input
//           type="date"
//           name="dueDate"
//           required
//           onChange={handleChange}
//           className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-slate-200"
//         />

//         <select
//           name="status"
//           onChange={handleChange}
//           className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-slate-200"
//         >
//           <option value="Pending">Pending</option>
//           <option value="Paid">Paid</option>
//           <option value="Overdue">Overdue</option>
//         </select>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-bold"
//         >
//           Save Invoice
//         </button>

//       </form>

//     </div>

//   );

// };

// export default GenerateInvoice;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Receipt, IndianRupee } from "lucide-react";


const GenerateInvoice = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    client: "",
    project: "",
    amount: "",
    gstRate: 18,
    dueDate: "",
    status: "Pending",
    recurring: "No"
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const amount = Number(formData.amount);
    const gst = amount * (formData.gstRate / 100);
    const total = amount + gst;

    const newInvoice = {
      id: "INV-" + Date.now(),
      client: formData.client,
      project: formData.project,
      amount: `₹${total.toLocaleString()}`,
      baseAmount: amount,
      gstRate: formData.gstRate,
      gstAmount: gst,
      recurring: formData.recurring,
      date: new Date().toISOString().split("T")[0],
      dueDate: formData.dueDate,
      status: formData.status
    };

    const storedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];

    const updatedInvoices = [...storedInvoices, newInvoice];

    localStorage.setItem("invoices", JSON.stringify(updatedInvoices));

    alert("Invoice created successfully!");

    navigate("/invoicing/list");

  };

  const amount = Number(formData.amount || 0);
  const gst = amount * (formData.gstRate / 100);
  const total = amount + gst;

  return (

    <div className="max-w-xl mx-auto p-6">

      <h2 className="text-2xl font-bold mb-6 text-slate-200 flex items-center gap-2">
        <Receipt className="w-6 h-6 text-blue-500" />
        Create Invoice
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* CLIENT */}

        <input
          type="text"
          name="client"
          placeholder="Client Name"
          required
          onChange={handleChange}
          className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-slate-200"
        />

        {/* PROJECT */}

        <input
          type="text"
          name="project"
          placeholder="Project Name"
          required
          onChange={handleChange}
          className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-slate-200"
        />

        {/* AMOUNT */}

        <div className="relative flex items-center">
  <IndianRupee className="absolute left-3 text-slate-400 w-4 h-4" />

  <input
    type="number"
    name="amount"
    placeholder="Amount"
    required
    onChange={handleChange}
    className="w-full pl-10 p-2 rounded bg-slate-800 border border-slate-700 text-slate-200"
  />
</div>

        {/* GST */}

        <input
          type="number"
          name="gstRate"
          placeholder="GST %"
          value={formData.gstRate}
          onChange={handleChange}
          className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-slate-200"
        />

        {/* DUE DATE */}

        <input
          type="date"
          name="dueDate"
          required
          onChange={handleChange}
          className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-slate-200"
        />

        {/* RECURRING OPTION */}

        <select
          name="recurring"
          value={formData.recurring}
          onChange={handleChange}
          className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-slate-200"
        >
          <option value="No">One-time Invoice</option>
          <option value="Monthly">Monthly Recurring</option>
          <option value="Quarterly">Quarterly Recurring</option>
          <option value="Yearly">Yearly Recurring</option>
        </select>

        {/* STATUS */}

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-slate-200"
        >
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
          <option value="Overdue">Overdue</option>
        </select>

        {/* CALCULATION PREVIEW */}

        <div className="bg-slate-900 p-4 rounded border border-slate-800 text-sm">

          <div className="flex justify-between text-slate-400">
            <span>Base Amount</span>
            <span>₹{amount.toLocaleString()}</span>
          </div>

          <div className="flex justify-between text-slate-400">
            <span>GST ({formData.gstRate}%)</span>
            <span>₹{gst.toLocaleString()}</span>
          </div>

          <div className="flex justify-between text-slate-100 font-bold mt-2 border-t border-slate-700 pt-2">
            <span>Total</span>
            <span>₹{total.toLocaleString()}</span>
          </div>

        </div>

        {/* BUTTON */}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-bold"
        >
          Generate Invoice
        </button>

      </form>

    </div>

  );

};

export default GenerateInvoice;