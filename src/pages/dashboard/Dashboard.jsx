import React from 'react';
import { 
  Users, 
  TrendingUp, 
  Activity,
  Briefcase,
  BrainCircuit,
  FileText,
  Receipt,
  ShieldCheck,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCcw,
  Building2,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart,
  Area
} from 'recharts';
import { useTheme } from '../../context/ThemeContext';

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

const StatCard = ({ title, value, change, icon: Icon, trend, color, isDarkMode }) => (
  <div className={`p-6 rounded-3xl border transition-all duration-300 group ${
    isDarkMode 
      ? 'bg-slate-900/40 border-slate-800/50 shadow-lg hover:shadow-blue-500/5 hover:border-blue-500/30' 
      : 'bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200'
  }`}>
    <div className="flex items-start justify-between">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-xl ${isDarkMode ? 'bg-slate-800/50' : 'bg-gray-50'} ${color}`}>
            <Icon className="w-5 h-5" />
          </div>
          <p className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{title}</p>
        </div>
        <h3 className={`text-3xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{value}</h3>
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
            trend === 'up' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
          }`}>
            {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {change}%
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-tighter ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>vs prev month</span>
        </div>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const { isDarkMode } = useTheme();

  const refreshData = () => {
    window.location.reload();
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-100 tracking-tight flex items-center gap-4">
            Enterprise Dashboard
            <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
              <span className="text-xs font-black uppercase tracking-widest text-blue-500 animate-pulse">Live</span>
            </div>
          </h1>
          <p className="text-slate-400 mt-2 font-bold tracking-wide">Real-time resource allocation & margin intelligence</p>
        </div>
        <button 
          onClick={refreshData}
          className="flex items-center gap-2.5 px-6 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-sm font-black text-slate-300 hover:bg-slate-800 hover:text-white transition-all shadow-xl group"
        >
          <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500 text-blue-500" />
          REFRESH DATA
        </button>
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
          isDarkMode={isDarkMode}
        />
        <StatCard 
          title="Operational Cost" 
          value="₹14.8M" 
          change="2.1" 
          trend="down" 
          icon={TrendingDown}
          color="text-rose-400"
          isDarkMode={isDarkMode}
        />
        <StatCard 
          title="Resource Utilization" 
          value="84.2%" 
          change="5.6" 
          trend="up" 
          icon={Activity}
          color="text-emerald-400"
          isDarkMode={isDarkMode}
        />
        <StatCard 
          title="Project Success Rate" 
          value="96.8%" 
          change="0.4" 
          trend="up" 
          icon={ShieldCheck}
          color="text-purple-400"
          isDarkMode={isDarkMode}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Chart */}
        <div className={`lg:col-span-2 p-8 rounded-[2.5rem] border shadow-xl ${
          isDarkMode ? 'bg-slate-900/40 border-slate-800/50' : 'bg-white border-gray-100'
        }`}>
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className={`text-xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Revenue & Margin Velocity</h3>
              <p className={`text-xs font-bold uppercase tracking-widest mt-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Consolidated monthly trajectory</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className={`text-[10px] font-black uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className={`text-[10px] font-black uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Margin</span>
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
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "#1e293b" : "#e2e8f0"} opacity={0.5} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: isDarkMode ? '#475569' : '#94a3b8', fontSize: 10, fontWeight: 800}} 
                  dy={15}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: isDarkMode ? '#475569' : '#94a3b8', fontSize: 10, fontWeight: 800}} 
                  tickFormatter={(v) => `₹${v}M`}
                />
                <Tooltip 
                  cursor={{stroke: isDarkMode ? '#334155' : '#cbd5e1', strokeWidth: 2}}
                  contentStyle={{ 
                    backgroundColor: isDarkMode ? '#0f172a' : '#ffffff', 
                    border: isDarkMode ? '1px solid #1e293b' : '1px solid #e2e8f0',
                    borderRadius: '20px',
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
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

        {/* Right Column: Module Insights */}
        <div className="space-y-8">
          <Link to="/organization/company-setup" className="block group">
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-[2rem] hover:border-blue-500/50 transition-all duration-500 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform duration-500">
                  <Building2 className="w-7 h-7" />
                </div>
                <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-xl border-4 border-slate-950 bg-slate-800 flex items-center justify-center text-[10px] font-black text-slate-400">
                      HQ
                    </div>
                  ))}
                </div>
              </div>
              <h3 className="text-xl font-black text-slate-100 mb-2 group-hover:text-blue-500 transition-colors">Organization</h3>
              <p className="text-sm text-slate-500 font-bold leading-relaxed mb-6">Global entity configuration and departmental hierarchy mapping.</p>
              <div className="flex items-center gap-2 text-xs font-black text-blue-500 uppercase tracking-widest">
                Configure Setup
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </Link>

          <Link to="/employee-cost/list" className="block group">
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-[2rem] hover:border-emerald-500/50 transition-all duration-500 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform duration-500">
                  <Users className="w-7 h-7" />
                </div>
                <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                  <span className="text-xs font-black text-emerald-500 uppercase tracking-tighter">+12 New</span>
                </div>
              </div>
              <h3 className="text-xl font-black text-slate-100 mb-2 group-hover:text-emerald-500 transition-colors">Employee Cost</h3>
              <p className="text-sm text-slate-500 font-bold leading-relaxed mb-6">Granular cost breakdown and professional resource management.</p>
              <div className="flex items-center gap-2 text-xs font-black text-emerald-500 uppercase tracking-widest">
                Manage Resources
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
