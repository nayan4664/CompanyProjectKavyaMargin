import React, { useState } from 'react';
import { DollarSign, Search, Download, Filter, CheckCircle2, Clock, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  Cell
} from 'recharts';
import { exportToCSV } from '../../utils/exportUtils';

const paymentHistory = [
  { id: 1, client: 'TechCorp', amount: '₹4,50,000', date: '2026-03-01', method: 'Wire Transfer', status: 'Completed' },
  { id: 2, client: 'GlobalSoft', amount: '₹2,10,000', date: '2026-02-25', method: 'Credit Card', status: 'Completed' },
  { id: 3, client: 'SkyHigh', amount: '₹8,40,000', date: '2026-03-10', method: 'Wire Transfer', status: 'Processing' },
  { id: 4, client: 'FitTrack', amount: '₹3,20,000', date: '2026-02-20', method: 'ACH', status: 'Completed' },
];

const collectionData = [
  { month: 'Jan', collected: 1200000, pending: 200000 },
  { month: 'Feb', collected: 1450000, pending: 350000 },
  { month: 'Mar', collected: 900000, pending: 800000 },
];

const PaymentTracking = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 tracking-tight flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-blue-500" />
            Payment Tracking
          </h1>
          <p className="text-slate-400 mt-2 font-medium">Monitor incoming revenue, aging receivables, and collection performance.</p>
        </div>
        <button 
          onClick={() => exportToCSV(paymentHistory, 'Payment_History.csv')}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm font-bold text-slate-300 hover:bg-slate-800 transition-all shadow-sm"
        >
          <Download className="w-4 h-4" />
          Export History
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Collection Performance */}
        <div className="lg:col-span-2 bg-slate-900/50 backdrop-blur-xl p-8 rounded-2xl border border-slate-800 shadow-sm">
          <h3 className="text-lg font-bold text-slate-100 mb-8">Collection Performance</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={collectionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(val) => `₹${val/100000}L`} />
                <Tooltip 
                  cursor={{fill: '#1e293b'}}
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    border: '1px solid #1e293b',
                    borderRadius: '12px',
                    color: '#f1f5f9'
                  }}
                  itemStyle={{ color: '#f1f5f9' }}
                />
                <Legend />
                <Bar dataKey="collected" fill="#10b981" radius={[4, 4, 0, 0]} name="Collected" />
                <Bar dataKey="pending" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Aging Receivables */}
        <div className="bg-slate-900/50 backdrop-blur-xl p-8 rounded-2xl border border-slate-800 shadow-sm">
          <h3 className="text-lg font-bold text-slate-100 mb-6">Aging Receivables</h3>
          <div className="space-y-6">
            <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-800">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">0-30 Days</span>
                <span className="text-xs font-black text-slate-100">₹5.3L</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[60%]" />
              </div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-800">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">31-60 Days</span>
                <span className="text-xs font-black text-slate-100">₹8.4L</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 w-[85%]" />
              </div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-800">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">61-90 Days</span>
                <span className="text-xs font-black text-slate-100">₹1.2L</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 w-[20%]" />
              </div>
            </div>
          </div>
          <button className="w-full mt-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 text-sm flex items-center justify-center gap-2">
            Send Reminders
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-800">
          <h4 className="font-bold text-slate-100">Recent Transactions</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/50">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Client</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Amount</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Date</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Method</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {paymentHistory.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-100">{p.client}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-black text-slate-100">{p.amount}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-slate-500">{p.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-slate-400">{p.method}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                      p.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {p.status}
                    </span>
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

export default PaymentTracking;
