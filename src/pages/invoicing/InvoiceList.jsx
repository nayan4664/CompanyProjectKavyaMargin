import React, { useState } from 'react';
import { Receipt, Search, Download, Filter, MoreVertical, ExternalLink, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { exportToCSV, exportToPDF } from '../../utils/exportUtils';
import { Link } from 'react-router-dom';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([
    { id: 'INV-2026-001', client: 'TechCorp', project: 'Project Alpha', amount: '₹4,50,000', date: '2026-03-01', dueDate: '2026-03-15', status: 'Paid' },
    { id: 'INV-2026-002', client: 'GlobalSoft', project: 'Project Beta', amount: '₹2,10,000', date: '2026-03-02', dueDate: '2026-03-16', status: 'Pending' },
    { id: 'INV-2026-003', client: 'SkyHigh', project: 'Cloud Migration', amount: '₹8,40,000', date: '2026-03-05', dueDate: '2026-03-20', status: 'Overdue' },
    { id: 'INV-2026-004', client: 'FitTrack', project: 'Mobile App', amount: '₹3,20,000', date: '2026-03-07', dueDate: '2026-03-21', status: 'Pending' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredInvoices = invoices.filter(inv => 
    inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.project.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500" id="invoice-list-content">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 tracking-tight flex items-center gap-3">
            <Receipt className="w-8 h-8 text-blue-500" />
            Invoices
          </h1>
          <p className="text-slate-400 mt-2 font-medium">Manage client billing, track payments, and generate new invoices.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => exportToCSV(invoices, 'Invoices.csv')}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm font-bold text-slate-300 hover:bg-slate-800 transition-all shadow-sm"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <Link 
            to="/invoicing/generate"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
          >
            Create Invoice
          </Link>
        </div>
      </header>

      {/* Invoice Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 shadow-sm">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Total Invoiced (MTD)</p>
          <h3 className="text-2xl font-black text-slate-100">₹18.2L</h3>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Received</p>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <h3 className="text-2xl font-black text-emerald-400">₹4.5L</h3>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pending</p>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <h3 className="text-2xl font-black text-amber-400">₹5.3L</h3>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Overdue</p>
            <AlertCircle className="w-4 h-4 text-rose-500" />
          </div>
          <h3 className="text-2xl font-black text-rose-400">₹8.4L</h3>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search invoice or client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none text-slate-200 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:bg-slate-800 rounded-xl text-sm font-bold transition-all border border-slate-800">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/50">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Invoice ID</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Client / Project</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Amount</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Due Date</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Status</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-800/50 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-100">{inv.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-bold text-slate-100">{inv.client}</p>
                      <p className="text-xs text-slate-500 font-medium">{inv.project}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-black text-slate-100">{inv.amount}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-slate-500">{inv.dueDate}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                      inv.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400' : 
                      inv.status === 'Overdue' ? 'bg-rose-500/10 text-rose-400' : 
                      'bg-amber-500/10 text-amber-400'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all" title="View PDF">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-500 hover:text-slate-300 hover:bg-slate-800 rounded-lg transition-all">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InvoiceList;
