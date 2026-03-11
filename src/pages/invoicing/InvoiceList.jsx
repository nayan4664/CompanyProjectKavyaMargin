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
  Trash2,
  Plus
} from 'lucide-react';
import { exportToCSV, exportToXML } from '../../utils/exportUtils';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, color, icon }) => {
  return (
    <div className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 shadow-sm hover:border-blue-500/30 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-xl bg-slate-800/50 ${
          color === 'emerald' ? 'text-emerald-400' :
          color === 'amber' ? 'text-amber-400' :
          color === 'rose' ? 'text-rose-400' :
          'text-blue-400'
        }`}>
          {icon || <Receipt className="w-5 h-5" />}
        </div>
      </div>
      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{title}</p>
      <h3 className="text-2xl font-black text-white mt-2 tracking-tight">{value}</h3>
    </div>
  );
};

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
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500" id="invoice-list-content">
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

        <div className="flex gap-2">
          <button
            onClick={() => exportToCSV(invoices, 'Invoice_Report.csv')}
            className="p-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors"
            title="Export CSV"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={() => exportToXML(invoices, 'Invoice_Report.xml', 'Invoices')}
            className="p-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors"
            title="Export XML"
          >
            <Download className="w-4 h-4" />
          </button>

          {currentUser?.role !== 'Viewers' && (
            <Link
              to="/invoicing/generate"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
            >
              <Plus className="w-4 h-4" />
              Create Invoice
            </Link>
          )}
        </div>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Invoiced (MTD)" value="₹18.2L" />
        <StatCard title="Received" value="₹4.5L" color="emerald" icon={<CheckCircle2 className="w-5 h-5" />} />
        <StatCard title="Pending" value="₹5.3L" color="amber" icon={<Clock className="w-5 h-5" />} />
        <StatCard title="Overdue" value="₹8.4L" color="rose" icon={<AlertCircle className="w-5 h-5" />} />
      </div>

      {/* Table */}
      <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800 overflow-hidden shadow-sm transition-colors">
        {/* Search + Filter */}
        <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search invoice or client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Filter className="w-4 h-4 text-slate-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
            >
              <option value="All">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/50">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Invoice ID</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Client / Project</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Amount</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">Date</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">Due Date</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Status</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {currentInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-800/50 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-200">{inv.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-200">{inv.client}</span>
                      <span className="text-xs text-slate-500">{inv.project}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-black text-white">{inv.amount}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-xs text-slate-400 font-medium">{inv.date}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-xs text-slate-400 font-medium">{inv.dueDate}</span>
                  </td>
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
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-500 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-all" title="View PDF">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      {currentUser?.role !== 'Viewers' && (
                        <button
                          onClick={() => deleteInvoice(inv.id)}
                          className="p-2 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-all"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-slate-800 flex items-center justify-between">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Previous
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceList;
