import React, { useState } from 'react';
import { IndianRupee, Plus, Trash2, Edit2, Download, Info, Search } from 'lucide-react';
import { exportToCSV } from '../../utils/exportUtils';

const BillingRateConfig = () => {
  const [rates, setRates] = useState([
    { id: 1, role: 'Senior Architect', offshore: 3500, onshore: 9500, currency: 'INR', status: 'Active' },
    { id: 2, role: 'Full Stack Developer', offshore: 2200, onshore: 7500, currency: 'INR', status: 'Active' },
    { id: 3, role: 'UI/UX Lead', offshore: 2800, onshore: 8200, currency: 'INR', status: 'Active' },
    { id: 4, role: 'Project Manager', offshore: 3200, onshore: 8800, currency: 'INR', status: 'Active' },
    { id: 5, role: 'QA Engineer', offshore: 1800, onshore: 6500, currency: 'INR', status: 'Active' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredRates = rates.filter(r => r.role.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 tracking-tight flex items-center gap-3">
            <IndianRupee className="w-8 h-8 text-primary-600" />
            Billing Rate Configuration
          </h1>
          <p className="text-slate-400 mt-2 font-medium">Standardize and manage hourly billing rates across different roles and regions.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => exportToCSV(rates, 'Standard_Billing_Rates.csv')}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm font-bold text-slate-300 hover:bg-slate-800 transition-all shadow-sm"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20">
            <Plus className="w-4 h-4" />
            Add New Rate
          </button>
        </div>
      </header>

      {/* Search and Quick Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-sm transition-colors">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search roles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-transparent rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-slate-800 transition-all outline-none text-slate-200"
            />
          </div>
        </div>
        <div className="bg-amber-900/10 p-4 rounded-2xl border border-amber-900/20 flex items-center gap-3">
          <Info className="w-5 h-5 text-amber-500 shrink-0" />
          <p className="text-[11px] text-amber-400 font-bold leading-tight">
            Rates are updated quarterly. Last update: Jan 1st, 2026.
          </p>
        </div>
      </div>

      {/* Rates Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm overflow-hidden transition-colors">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/50 border-b border-slate-800">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Role / Designation</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">Offshore Rate (/hr)</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-center">Onshore Rate (/hr)</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Currency</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredRates.map((rate) => (
                <tr key={rate.id} className="hover:bg-slate-800/50 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-200">{rate.role}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm font-black text-primary-400">₹{rate.offshore}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm font-black text-indigo-400">₹{rate.onshore}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-slate-400 bg-slate-800 px-2 py-1 rounded-md">{rate.currency}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-slate-500 hover:text-primary-400 hover:bg-slate-800 rounded-lg transition-all">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-all">
                        <Trash2 className="w-4 h-4" />
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

export default BillingRateConfig;
