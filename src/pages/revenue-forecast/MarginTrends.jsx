import React from 'react';
import { TrendingUp, Download, ArrowUpRight, ArrowDownRight, Info, PieChart as PieChartIcon } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area
} from 'recharts';
import { exportToPDF } from '../../utils/exportUtils';

const trendData = [
  { month: 'Jan', gross: 32, net: 24, target: 30 },
  { month: 'Feb', gross: 34, net: 26, target: 30 },
  { month: 'Mar', gross: 31, net: 22, target: 30 },
  { month: 'Apr', gross: 35, net: 28, target: 30 },
  { month: 'May', gross: 38, net: 31, target: 30 },
  { month: 'Jun', gross: 36, net: 29, target: 30 },
];

const MarginTrends = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500" id="margin-trends-content">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 tracking-tight flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-blue-500" />
            Margin Trends
          </h1>
          <p className="text-slate-400 mt-2 font-medium">Historical and projected margin performance analysis.</p>
        </div>
        <button 
          onClick={() => exportToPDF('margin-trends-content', 'Margin_Trends_Analysis.pdf')}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm font-bold text-slate-300 hover:bg-slate-800 transition-all shadow-sm"
        >
          <Download className="w-4 h-4" />
          Download Trends
        </button>
      </header>

      {/* Margin Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900/50 backdrop-blur-xl p-8 rounded-2xl border border-slate-800 shadow-sm">
          <h3 className="text-lg font-bold text-slate-100 mb-8">Gross vs Net Margin Trend</h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorGross" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} unit="%" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    border: '1px solid #1e293b',
                    borderRadius: '12px',
                    color: '#f1f5f9'
                  }}
                  itemStyle={{ color: '#f1f5f9' }}
                />
                <Legend verticalAlign="top" height={36} />
                <Area type="monotone" dataKey="gross" name="Gross Margin" stroke="#0ea5e9" fill="url(#colorGross)" strokeWidth={3} />
                <Area type="monotone" dataKey="net" name="Net Margin" stroke="#6366f1" fill="url(#colorNet)" strokeWidth={3} />
                <Line type="monotone" dataKey="target" name="Target" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl p-8 rounded-2xl border border-slate-800 shadow-sm">
          <h3 className="text-lg font-bold text-slate-100 mb-6">Performance Metrics</h3>
          <div className="space-y-6">
            <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-800">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Average Gross Margin</p>
              <div className="flex items-center justify-between">
                <h4 className="text-2xl font-black text-slate-100">34.2%</h4>
                <div className="flex items-center gap-1 text-emerald-400 font-bold text-xs">
                  <ArrowUpRight className="w-3 h-3" />
                  +2.1%
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-800">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Average Net Margin</p>
              <div className="flex items-center justify-between">
                <h4 className="text-2xl font-black text-slate-100">27.5%</h4>
                <div className="flex items-center gap-1 text-rose-400 font-bold text-xs">
                  <ArrowDownRight className="w-3 h-3" />
                  -0.4%
                </div>
              </div>
            </div>
            <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20">
              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Efficiency Score</p>
              <h4 className="text-2xl font-black text-blue-100">92/100</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20 flex gap-4">
        <Info className="w-6 h-6 text-blue-400 shrink-0" />
        <div>
          <h4 className="text-sm font-bold text-blue-100">Trend Analysis</h4>
          <p className="text-xs text-blue-300 mt-1 leading-relaxed font-medium">
            Net margins stabilized in June following the implementation of the new SGA overhead optimization strategy. Projected growth for Q3 is 1.5% based on current pipeline.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarginTrends;
