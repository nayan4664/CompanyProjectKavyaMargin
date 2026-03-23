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
  const [invoices, setInvoices] = useState([
    { id: 'INV-2026-001', client: 'TechCorp', project: 'Project Alpha', amount: '₹4,50,000', date: '2026-03-01', dueDate: '2026-03-15', status: 'Paid' },
    { id: 'INV-2026-002', client: 'GlobalSoft', project: 'Project Beta', amount: '₹2,10,000', date: '2026-03-02', dueDate: '2026-03-16', status: 'Pending' },
    { id: 'INV-2026-003', client: 'SkyHigh', project: 'Cloud Migration', amount: '₹8,40,000', date: '2026-03-05', dueDate: '2026-03-20', status: 'Overdue' },
    { id: 'INV-2026-004', client: 'FitTrack', project: 'Mobile App', amount: '₹3,20,000', date: '2026-03-07', dueDate: '2026-03-21', status: 'Pending' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) setCurrentUser(user);
  }, []);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const response = await invoiceAPI.getAll();
      setInvoices(response.data);
    } catch (err) {
      console.error("Error fetching invoices:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteInvoice = async (id) => {
    if (currentUser?.role === 'Project Manager' || currentUser?.role === 'Team Lead' || currentUser?.role === 'Viewers') {
      alert(`Unauthorized: ${currentUser.role}s cannot delete invoices.`);
      return;
    }
    if (window.confirm("Delete this invoice?")) {
      try {
        await invoiceAPI.delete(id);
        fetchInvoices();
      } catch (err) {
        alert("Error deleting invoice");
      }
    }
  };

  const filteredInvoices = invoices.filter(inv => {
    const matchSearch = 
      inv.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      inv.client.toLowerCase().includes(searchTerm.toLowerCase()) || 
      inv.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = 
      statusFilter === "All" || inv.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleExport = (type) => {
    if (currentUser?.role === 'Team Lead') {
      alert('Unauthorized: Team Leads cannot download reports.');
      return;
    }
    if (type === 'CSV') exportToCSV(invoices, 'Invoice_Report.csv');
    else exportToXML(invoices, 'Invoice_Report.xml', 'Invoices');
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight flex items-center gap-3">
            <Receipt className="w-8 h-8 md:w-10 md:h-10 text-blue-500" />
            Invoice List
          </h1>
          <p className="text-slate-400 mt-2 font-bold tracking-wide">Manage and track client billing cycles</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            onClick={() => handleExport('CSV')}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-sm font-black text-slate-300 hover:bg-slate-800 hover:text-white transition-all shadow-xl group w-full sm:w-auto"
          >
            <Download className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
            EXPORT CSV
          </button>
          {currentUser?.role === 'Super Admin' && (
            <Link 
              to="/invoicing/generate"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-2xl text-sm font-black text-white transition-all shadow-xl shadow-blue-500/20 group w-full sm:w-auto"
            >
              <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
              CREATE INVOICE
            </Link>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard title="Total Invoiced" value="₹18.2M" color="blue" icon={<Receipt className="w-5 h-5" />} />
        <StatCard title="Paid Amount" value="₹14.5M" color="emerald" icon={<CheckCircle2 className="w-5 h-5" />} />
        <StatCard title="Pending" value="₹2.8M" color="amber" icon={<Clock className="w-5 h-5" />} />
        <StatCard title="Overdue" value="₹0.9M" color="rose" icon={<AlertCircle className="w-5 h-5" />} />
      </div>

      {/* Filters & Table */}
      <div className="bg-slate-900/40 border border-slate-800/50 rounded-[2rem] overflow-hidden backdrop-blur-xl">
        <div className="p-4 md:p-8 border-b border-slate-800/50 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between md:gap-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search by ID, client or project..."
              className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-sm font-bold text-white focus:outline-none focus:border-blue-500/50 transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <Filter className="w-4 h-4 text-slate-500 hidden sm:block" />
            <select
              className="bg-slate-950/50 border border-slate-800 rounded-xl py-3 px-4 text-sm font-bold text-white focus:outline-none focus:border-blue-500/50 transition-colors flex-1 md:flex-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/30">
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-800">Invoice ID</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-800">Client / Project</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-800">Amount</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-800">Due Date</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-800">Status</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-800 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="group hover:bg-slate-800/20 transition-colors">
                  <td className="px-6 py-5">
                    <span className="text-sm font-black text-blue-500">#{invoice.id}</span>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm font-black text-white">{invoice.client}</p>
                    <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-tighter">{invoice.project}</p>
                  </td>
                  <td className="px-6 py-5 text-sm font-black text-white">{invoice.amount}</td>
                  <td className="px-6 py-5 text-sm font-bold text-slate-400">{invoice.dueDate}</td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      invoice.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      invoice.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {currentUser?.role === 'Super Admin' && (
                        <button 
                          onClick={() => deleteInvoice(invoice.id)}
                          className="p-2 rounded-lg bg-slate-800/50 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
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