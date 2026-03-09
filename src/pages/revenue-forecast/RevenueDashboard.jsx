import React from 'react';
import { TrendingUp, Download, Calendar, ArrowUpRight, BarChart3, Target, PieChart as PieChartIcon } from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  Legend
} from 'recharts';
import { exportToPDF } from '../../utils/exportUtils';

const revenueData = [
  { month: 'Jul', confirmed: 450000, weighted: 480000, target: 500000 },
  { month: 'Aug', confirmed: 420000, weighted: 510000, target: 500000 },
  { month: 'Sep', confirmed: 380000, weighted: 550000, target: 550000 },
  { month: 'Oct', confirmed: 310000, weighted: 580000, target: 550000 },
  { month: 'Nov', confirmed: 250000, weighted: 620000, target: 600000 },
  { month: 'Dec', confirmed: 180000, weighted: 650000, target: 600000 },
];

const RevenueDashboard = () => {
  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="space-y-8 animate-in fade-in duration-500" id="revenue-dashboard-content">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 tracking-tight flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-blue-500" />
            Revenue Forecast Dashboard
          </h1>
          <p className="text-slate-400 mt-2 font-medium">Predictive revenue analysis based on active contracts and sales pipeline.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm font-bold text-slate-300 hover:bg-slate-800 transition-all shadow-sm">
            <Calendar className="w-4 h-4" />
            FY 2026-27
          </button>
          <button 
            onClick={() => exportToPDF('revenue-dashboard-content', 'Revenue_Forecast.pdf')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
          >
            <Download className="w-4 h-4" />
            Export Forecast
          </button>
        </div>
      </header>

      {/* Forecast KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 shadow-sm">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Total Backlog</p>
          <h3 className="text-2xl font-black text-slate-100">₹4.2Cr</h3>
          <p className="text-xs text-slate-500 mt-1">Confirmed contracted value</p>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 shadow-sm">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Weighted Pipeline</p>
          <h3 className="text-2xl font-black text-blue-400">₹1.8Cr</h3>
          <p className="text-xs text-slate-500 mt-1">Probability adjusted leads</p>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 shadow-sm">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Forecast vs Target</p>
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-black text-emerald-400">+12%</h3>
            <ArrowUpRight className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-xs text-slate-500 mt-1">Above annual budget</p>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 shadow-sm">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Revenue / Head</p>
          <h3 className="text-2xl font-black text-slate-100">₹1.4L</h3>
          <p className="text-xs text-slate-500 mt-1">Monthly average</p>
        </div>
      </div>

      {/* Main Forecast Chart */}
      <div className="bg-slate-900/50 backdrop-blur-xl p-8 rounded-2xl border border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-bold text-slate-100">H2 Revenue Projection</h3>
            <p className="text-sm text-slate-400 font-medium mt-1">Confirmed backlog vs. sales pipeline vs. targets</p>
          </div>
        </div>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(val) => `₹${val/1000}k`} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0f172a', 
                  border: '1px solid #1e293b',
                  borderRadius: '12px',
                  color: '#f1f5f9'
                }}
                itemStyle={{ color: '#f1f5f9' }}
                formatter={(val) => formatCurrency(val)}
              />
              <Legend verticalAlign="top" height={36} />
              <Bar dataKey="confirmed" name="Confirmed Backlog" fill="#0ea5e9" stackId="a" radius={[0, 0, 0, 0]} />
              <Bar dataKey="weighted" name="Weighted Pipeline" fill="#1e293b" stackId="a" radius={[4, 4, 0, 0]} />
              <Line type="monotone" dataKey="target" name="Target Revenue" stroke="#f59e0b" strokeWidth={3} dot={{r: 4, fill: '#f59e0b'}} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RevenueDashboard;
