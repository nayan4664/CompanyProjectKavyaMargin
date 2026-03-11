// // import React, { useContext, useState } from 'react';
// // import { InvoiceContext } from '../../context/InvoiceContext';
// // import { Receipt, Search, Download, ExternalLink, MoreVertical } from 'lucide-react';
// // import { Link } from 'react-router-dom';
// // import { exportToCSV } from '../../utils/exportUtils';

// // const InvoiceList = () => {
// //   const { invoices } = useContext(InvoiceContext);
// //   const [searchTerm, setSearchTerm] = useState('');

// //   const filteredInvoices = invoices.filter(inv =>
// //     inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //     inv.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //     inv.project.toLowerCase().includes(searchTerm.toLowerCase())
// //   );

// //   return (
// //     <div className="p-6 space-y-6">
// //       <header className="flex justify-between items-center">
// //         <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
// //           <Receipt className="w-6 h-6 text-blue-500"/> Invoices
// //         </h1>
// //         <div className="flex gap-2">
// //           <button onClick={() => exportToCSV(invoices, 'Invoices.csv')} className="bg-slate-900 px-3 py-2 rounded-xl text-slate-300">Export CSV</button>
// //           <Link to="/invoicing/generate" className="bg-blue-600 px-3 py-2 rounded-xl text-white">Create Invoice</Link>
// //         </div>
// //       </header>

// //       <div className="bg-slate-900 p-4 rounded-2xl overflow-x-auto">
// //         <input type="text" placeholder="Search invoice..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="mb-4 p-2 rounded-xl bg-slate-800 text-slate-200 w-full"/>
// //         <table className="w-full text-left">
// //           <thead className="text-slate-500 text-xs uppercase font-bold">
// //             <tr>
// //               <th>Invoice ID</th>
// //               <th>Client / Project</th>
// //               <th>Amount</th>
// //               <th>Date</th>
// //               <th>Due</th>
// //               <th>Status</th>
// //               <th className="text-right">Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody className="divide-y divide-slate-800">
// //             {filteredInvoices.map(inv => (
// //               <tr key={inv.id} className="hover:bg-slate-800/50 transition">
// //                 <td className="px-2 py-2">{inv.id}</td>
// //                 <td className="px-2 py-2">{inv.client} / {inv.project}</td>
// //                 <td className="px-2 py-2">{inv.amount}</td>
// //                 <td className="px-2 py-2">{inv.date}</td>
// //                 <td className="px-2 py-2">{inv.dueDate}</td>
// //                 <td className="px-2 py-2">{inv.status}</td>
// //                 <td className="px-2 py-2 text-right flex justify-end gap-2">
// //                   <button><ExternalLink className="w-4 h-4"/></button>
// //                   <button><MoreVertical className="w-4 h-4"/></button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // };

// // export default InvoiceList;



// import React, { useState } from 'react';
// import { Receipt, Search, Download, Filter, MoreVertical, ExternalLink, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
// import { exportToCSV, exportToPDF } from '../../utils/exportUtils';
// import { Link } from 'react-router-dom';

// const InvoiceList = () => {
//   const [invoices, setInvoices] = useState([
//     { id: 'INV-2026-001', client: 'TechCorp', project: 'Project Alpha', amount: '₹4,50,000', date: '2026-03-01', dueDate: '2026-03-15', status: 'Paid' },
//     { id: 'INV-2026-002', client: 'GlobalSoft', project: 'Project Beta', amount: '₹2,10,000', date: '2026-03-02', dueDate: '2026-03-16', status: 'Pending' },
//     { id: 'INV-2026-003', client: 'SkyHigh', project: 'Cloud Migration', amount: '₹8,40,000', date: '2026-03-05', dueDate: '2026-03-20', status: 'Overdue' },
//     { id: 'INV-2026-004', client: 'FitTrack', project: 'Mobile App', amount: '₹3,20,000', date: '2026-03-07', dueDate: '2026-03-21', status: 'Pending' },
//   ]);

//   const [searchTerm, setSearchTerm] = useState('');

//   const filteredInvoices = invoices.filter(inv => 
//     inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     inv.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     inv.project.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="space-y-8 animate-in fade-in duration-500" id="invoice-list-content">
//       <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-slate-100 tracking-tight flex items-center gap-3">
//             <Receipt className="w-8 h-8 text-blue-500" />
//             Invoices
//           </h1>
//           <p className="text-slate-400 mt-2 font-medium">Manage client billing, track payments, and generate new invoices.</p>
//         </div>
//         <div className="flex items-center gap-3">
//           <button 
//             onClick={() => exportToCSV(invoices, 'Invoices.csv')}
//             className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm font-bold text-slate-300 hover:bg-slate-800 transition-all shadow-sm"
//           >
//             <Download className="w-4 h-4" />
//             Export CSV
//           </button>
//           <Link 
//             to="/invoicing/generate"
//             className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
//           >
//             Create Invoice
//           </Link>
//         </div>
//       </header>

//       {/* Invoice Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <div className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 shadow-sm">
//           <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Total Invoiced (MTD)</p>
//           <h3 className="text-2xl font-black text-slate-100">₹18.2L</h3>
//         </div>
//         <div className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 shadow-sm">
//           <div className="flex items-center justify-between mb-2">
//             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Received</p>
//             <CheckCircle2 className="w-4 h-4 text-emerald-500" />
//           </div>
//           <h3 className="text-2xl font-black text-emerald-400">₹4.5L</h3>
//         </div>
//         <div className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 shadow-sm">
//           <div className="flex items-center justify-between mb-2">
//             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pending</p>
//             <Clock className="w-4 h-4 text-amber-500" />
//           </div>
//           <h3 className="text-2xl font-black text-amber-400">₹5.3L</h3>
//         </div>
//         <div className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 shadow-sm">
//           <div className="flex items-center justify-between mb-2">
//             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Overdue</p>
//             <AlertCircle className="w-4 h-4 text-rose-500" />
//           </div>
//           <h3 className="text-2xl font-black text-rose-400">₹8.4L</h3>
//         </div>
//       </div>

//       {/* Table Section */}
//       <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800 shadow-sm overflow-hidden">
//         <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row gap-4 justify-between items-center">
//           <div className="relative w-full md:w-96">
//             <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
//             <input 
//               type="text" 
//               placeholder="Search invoice or client..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none text-slate-200 transition-all"
//             />
//           </div>
//           <button className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-xl text-sm font-bold transition-all border border-slate-800">
//             <Filter className="w-4 h-4" />
//             Filters
//           </button>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="bg-slate-800/50">
//                 <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Invoice ID</th>
//                 <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Client / Project</th>
//                 <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Amount</th>
//                 <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Due Date</th>
//                 <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Status</th>
//                 <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-800">
//               {filteredInvoices.map((inv) => (
//                 <tr key={inv.id} className="hover:bg-slate-800/50 transition-colors group">
//                   <td className="px-6 py-4">
//                     <span className="text-sm font-bold text-slate-100">{inv.id}</span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div>
//                       <p className="text-sm font-bold text-slate-100">{inv.client}</p>
//                       <p className="text-xs text-slate-500 font-medium">{inv.project}</p>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className="text-sm font-black text-slate-100">{inv.amount}</span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className="text-xs font-bold text-slate-500">{inv.dueDate}</span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
//                       inv.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400' : 
//                       inv.status === 'Overdue' ? 'bg-rose-500/10 text-rose-400' : 
//                       'bg-amber-500/10 text-amber-400'
//                     }`}>
//                       {inv.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-right">
//                     <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                       <button className="p-2 text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all" title="View PDF">
//                         <ExternalLink className="w-4 h-4" />
//                       </button>
//                       <button className="p-2 text-slate-500 hover:text-slate-300 hover:bg-slate-800 rounded-lg transition-all">
//                         <MoreVertical className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InvoiceList;




import React, { useState, useEffect } from 'react';
import {
  Receipt,
  Search,
  Download,
  Filter,
  MoreVertical,
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertCircle,
  Trash2
} from 'lucide-react';

import { exportToCSV, exportToPDF } from '../../utils/exportUtils';
import { Link } from 'react-router-dom';

const InvoiceList = () => {

  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const invoicesPerPage = 5;

  // Load user and invoices
  useEffect(() => {

    try {

      setLoading(true);

      const user = JSON.parse(localStorage.getItem("currentUser"));
      if (user) setCurrentUser(user);

      const stored = JSON.parse(localStorage.getItem("invoices"));

      if (stored && stored.length > 0) {

        setInvoices(stored);

      } else {

        // default demo invoices
        const demo = [
          { id: 'INV-2026-001', client: 'TechCorp', project: 'Project Alpha', amount: '₹4,50,000', date: '2026-03-01', dueDate: '2026-03-15', status: 'Paid' },
          { id: 'INV-2026-002', client: 'GlobalSoft', project: 'Project Beta', amount: '₹2,10,000', date: '2026-03-02', dueDate: '2026-03-16', status: 'Pending' },
          { id: 'INV-2026-003', client: 'SkyHigh', project: 'Cloud Migration', amount: '₹8,40,000', date: '2026-03-05', dueDate: '2026-03-20', status: 'Overdue' },
          { id: 'INV-2026-004', client: 'FitTrack', project: 'Mobile App', amount: '₹3,20,000', date: '2026-03-07', dueDate: '2026-03-21', status: 'Pending' },
        ];

        setInvoices(demo);

      }

    } catch (err) {

      setError("Failed to load invoices");

    } finally {

      setLoading(false);

    }

  }, []);

  // Delete invoice
  const deleteInvoice = (id) => {

    if (!window.confirm("Delete this invoice?")) return;

    const updated = invoices.filter(inv => inv.id !== id);

    setInvoices(updated);

    localStorage.setItem("invoices", JSON.stringify(updated));

  };

  // Filtering
  const filteredInvoices = invoices.filter(inv => {

    const matchSearch =
      inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.project.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus =
      statusFilter === "All" || inv.status === statusFilter;

    return matchSearch && matchStatus;

  });

  // Pagination
  const indexOfLast = currentPage * invoicesPerPage;
  const indexOfFirst = indexOfLast - invoicesPerPage;
  const currentInvoices = filteredInvoices.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredInvoices.length / invoicesPerPage);

  if (loading) {

    return (
      <div className="text-center text-slate-400 p-10">
        Loading invoices...
      </div>
    );

  }

  if (error) {

    return (
      <div className="text-center text-red-500 p-10">
        {error}
      </div>
    );

  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">

      {/* Header */}

      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold text-slate-100 tracking-tight flex items-center gap-3">
            <Receipt className="w-8 h-8 text-blue-500" />
            Invoices
          </h1>
          <p className="text-slate-400 mt-2 font-medium">
            Manage client billing, track payments, and generate invoices.
          </p>
        </div>

        <div className="flex items-center gap-3">

          <button
            onClick={() => exportToCSV(invoices, 'Invoices.csv')}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm font-bold text-slate-300 hover:bg-slate-800"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>

          {currentUser?.role !== 'Viewers' && (
            <Link
              to="/invoicing/generate"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700"
            >
              Create Invoice
            </Link>
          )}

        </div>

      </header>


      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <StatCard title="Total Invoiced (MTD)" value="₹18.2L" />

        <StatCard title="Received" value="₹4.5L" color="emerald" icon={<CheckCircle2 />} />

        <StatCard title="Pending" value="₹5.3L" color="amber" icon={<Clock />} />

        <StatCard title="Overdue" value="₹8.4L" color="rose" icon={<AlertCircle />} />

      </div>


      {/* Table */}

      <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800 overflow-hidden">

        {/* Search + Filter */}

        <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row gap-4 justify-between items-center">

          <div className="relative w-full md:w-96">

            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />

            <input
              type="text"
              placeholder="Search invoice or client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-200"
            />

          </div>

          {/* Status Filter */}

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-200"
          >

            <option>All</option>
            <option>Paid</option>
            <option>Pending</option>
            <option>Overdue</option>

          </select>

        </div>


        {/* Table */}

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead>

              <tr className="bg-slate-800/50 text-slate-500 text-xs uppercase">

                <th className="px-6 py-4">Invoice ID</th>
                <th className="px-6 py-4">Client / Project</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-800">

              {currentInvoices.map(inv => (

                <tr key={inv.id} className="hover:bg-slate-800/50">

                  <td className="px-6 py-4 font-bold">{inv.id}</td>

                  <td className="px-6 py-4">

                    <p className="font-bold">{inv.client}</p>
                    <p className="text-xs text-slate-500">{inv.project}</p>

                  </td>

                  <td className="px-6 py-4 font-black">{inv.amount}</td>

                  <td className="px-6 py-4 text-xs">{inv.dueDate}</td>

                  <td className="px-6 py-4">

                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      inv.status === 'Paid'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : inv.status === 'Overdue'
                        ? 'bg-rose-500/10 text-rose-400'
                        : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {inv.status}
                    </span>

                  </td>

                  <td className="px-6 py-4 text-right flex justify-end gap-2">

                    {/* View PDF */}

                    <button
                      onClick={() => exportToPDF(inv)}
                      className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>

                    {/* Delete */}

                    {currentUser?.role !== 'Viewers' && (
                      <button
                        onClick={() => deleteInvoice(inv.id)}
                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}

                    <button className="p-2 text-slate-400 hover:bg-slate-800 rounded-lg">
                      <MoreVertical className="w-4 h-4" />
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>


        {/* Pagination */}

        <div className="flex justify-between items-center p-4 text-sm text-slate-400">

          <p>
            Page {currentPage} of {totalPages}
          </p>

          <div className="flex gap-2">

            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="px-3 py-1 bg-slate-800 rounded"
            >
              Prev
            </button>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="px-3 py-1 bg-slate-800 rounded"
            >
              Next
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default InvoiceList;



// Stats Component

const StatCard = ({ title, value, color, icon }) => {

  return (

    <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">

      <div className="flex justify-between items-center mb-2">

        <p className="text-[10px] uppercase text-slate-500">{title}</p>

        {icon && <span className={`text-${color}-500`}>{icon}</span>}

      </div>

      <h3 className={`text-2xl font-black text-${color || 'slate'}-400`}>
        {value}
      </h3>

    </div>

  );

};