import React from 'react';
import { 
  Users, 
  TrendingUp, 
  AlertCircle, 
  ArrowUpRight, 
  ArrowDownRight,
  Activity,
  Briefcase,
  PieChart,
  BrainCircuit,
  FileText,
  Receipt,
  ShieldCheck,
  TrendingDown
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  AreaChart,
  Area,
  Cell
} from 'recharts';

const performanceData = [
  { month: 'Jan', revenue: 45, margin: 32, cost: 28 },
  { month: 'Feb', revenue: 52, margin: 34, cost: 30 },
  { month: 'Mar', revenue: 48, margin: 31, cost: 32 },
  { month: 'Apr', revenue: 61, margin: 35, cost: 38 },
  { month: 'May', revenue: 55, margin: 38, cost: 35 },
  { month: 'Jun', revenue: 67, margin: 36, cost: 42 },
];

const moduleInsights = [
  { label: 'Organization', icon: ShieldCheck, status: 'Active', value: '12 Depts', color: 'text-blue-400' },
  { label: 'Employee Cost', icon: Users, status: 'On Track', value: '₹12.4M', color: 'text-indigo-400' },
  { label: 'Bench Management', icon: Briefcase, status: 'Optimization', value: '18 Resources', color: 'text-amber-400' },
  { label: 'Contract Analyzer', icon: FileText, status: '8 New', value: '94% Compliance', color: 'text-emerald-400' },
  { label: 'AI Prediction', icon: BrainCircuit, status: '92% Acc', value: '+4.2% Growth', color: 'text-purple-400' },
  { label: 'Automated Invoicing', icon: Receipt, status: 'Pending', value: '₹8.2M Due', color: 'text-rose-400' },
];

const StatCard = ({ title, value, change, icon: Icon, trend, color }) => (
  <div className="bg-slate-900/40 backdrop-blur-md p-6 rounded-3xl border border-slate-800/50 shadow-lg hover:shadow-blue-500/5 hover:border-blue-500/30 transition-all duration-300 group">
    <div className="flex items-start justify-between">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-xl bg-slate-800/50 ${color}`}>
            <Icon className="w-5 h-5" />
          </div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{title}</p>
        </div>
        <h3 className="text-3xl font-black text-white tracking-tight">{value}</h3>
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
            trend === 'up' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
          }`}>
            {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {change}%
          </div>
          <span className="text-[10px] text-slate-600 font-bold uppercase tracking-tighter">vs prev month</span>
        </div>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="max-w-[1600px] mx-auto space-y-10 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-white tracking-tighter">Enterprise <span className="text-blue-500">Overview</span></h1>
          <p className="text-slate-500 font-medium text-sm flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-500/50" />
            Live system monitoring and cross-module intelligence
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-2xl text-xs font-bold text-slate-400">
            Updated: Just now
          </div>
          <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-2xl transition-all shadow-lg shadow-blue-500/20 active:scale-95 uppercase tracking-widest">
            Refresh Data
          </button>
        </div>
      </header>

      {/* Primary KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Portfolio Margin" 
          value="₹32.4M" 
          change="8.4" 
          trend="up" 
          icon={TrendingUp}
          color="text-blue-400"
        />
        <StatCard 
          title="Operational Cost" 
          value="₹14.8M" 
          change="2.1" 
          trend="down" 
          icon={TrendingDown}
          color="text-rose-400"
        />
        <StatCard 
          title="Resource Utilization" 
          value="84.2%" 
          change="5.6" 
          trend="up" 
          icon={Activity}
          color="text-emerald-400"
        />
        <StatCard 
          title="Project Success Rate" 
          value="96.8%" 
          change="0.4" 
          trend="up" 
          icon={ShieldCheck}
          color="text-purple-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Chart */}
        <div className="lg:col-span-2 bg-slate-900/40 backdrop-blur-md p-8 rounded-[2.5rem] border border-slate-800/50 shadow-xl">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-black text-white tracking-tight">Revenue & Margin Velocity</h3>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Consolidated monthly trajectory</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-[10px] font-black text-slate-400 uppercase">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-black text-slate-400 uppercase">Margin</span>
              </div>
            </div>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMarg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" opacity={0.5} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#475569', fontSize: 10, fontWeight: 800}} 
                  dy={15}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#475569', fontSize: 10, fontWeight: 800}} 
                  tickFormatter={(v) => `₹${v}M`}
                />
                <Tooltip 
                  cursor={{stroke: '#334155', strokeWidth: 2}}
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    border: '1px solid #1e293b',
                    borderRadius: '20px',
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3b82f6" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorRev)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="margin" 
                  stroke="#10b981" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorMarg)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Module Health/Insights */}
        <div className="bg-slate-900/40 backdrop-blur-md p-8 rounded-[2.5rem] border border-slate-800/50 shadow-xl flex flex-col">
          <h3 className="text-xl font-black text-white tracking-tight mb-8">Module <span className="text-blue-500">Intelligence</span></h3>
          <div className="flex-1 space-y-5">
            {moduleInsights.map((item, i) => (
              <div key={i} className="group p-4 bg-slate-800/20 hover:bg-slate-800/40 rounded-[1.5rem] border border-slate-800/50 transition-all duration-300 cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl bg-slate-950/50 group-hover:scale-110 transition-transform ${item.color}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-black text-slate-100 tracking-tight truncate">{item.label}</p>
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{item.status}</span>
                    </div>
                    <p className="text-lg font-black text-white mt-1">{item.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-4 bg-blue-500/5 hover:bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl transition-all">
            System Deep Dive
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
