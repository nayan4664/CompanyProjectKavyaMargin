import React, { useState, useEffect } from 'react';
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
  ArrowRight,
  BarChart3,
  PieChart
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
import { dashboardAPI } from '../../services/api';
import { useDashboard } from '../../context/DashboardContext';

const StatCard = ({ title, value, change, icon: Icon, trend, color, isDarkMode }) => (
  <div className={`p-4 md:p-6 rounded-2xl md:rounded-3xl border transition-all duration-300 group ${
    isDarkMode 
      ? 'bg-slate-900/40 border-slate-800/50 shadow-lg hover:shadow-blue-500/5 hover:border-blue-500/30' 
      : 'bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200'
  }`}>
    <div className="flex items-start justify-between">
      <div className="space-y-3 md:space-y-4 w-full">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-xl ${isDarkMode ? 'bg-slate-800/50' : 'bg-gray-50'} ${color}`}>
            <Icon className="w-4 h-4 md:w-5 md:h-5" />
          </div>
          <p className={`text-[8px] md:text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{title}</p>
        </div>
        <h3 className={`text-2xl md:text-3xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{value}</h3>
        <div className="flex items-center flex-wrap gap-2">
          <div className={`flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[8px] md:text-[10px] font-bold ${
            trend === 'up' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
          }`}>
            {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {change}%
          </div>
          <span className={`text-[8px] md:text-[10px] font-bold uppercase tracking-tighter ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>vs prev month</span>
        </div>
      </div>
    </div>
  </div>
);

const ModuleCard = ({ label, status, value, icon: Icon, color, link, isDarkMode }) => (
  <Link to={link} className="block group">
    <div className={`backdrop-blur-xl border p-6 rounded-[1.5rem] md:rounded-[2rem] hover:border-blue-500/50 transition-all duration-500 shadow-2xl h-full flex flex-col ${
      isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-gray-100'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 ${
          isDarkMode ? 'bg-blue-500/10' : 'bg-blue-50'
        } ${color}`}>
          <Icon className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        <div className={`px-2 py-1 rounded-lg border text-[8px] font-black uppercase tracking-widest ${
          isDarkMode ? 'bg-slate-800/50 border-slate-700 text-slate-400' : 'bg-gray-50 border-gray-100 text-slate-500'
        }`}>
          {status}
        </div>
      </div>
      <h3 className={`text-sm md:text-base font-black mb-1 group-hover:text-blue-500 transition-colors ${
        isDarkMode ? 'text-slate-100' : 'text-slate-900'
      }`}>{label}</h3>
      <div className={`text-lg md:text-xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-slate-700'}`}>
        {value}
      </div>
      <div className="mt-auto flex items-center gap-2 text-[8px] md:text-[10px] font-black text-blue-500 uppercase tracking-widest">
        View Details
        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </Link>
);

const Dashboard = () => {
  const { isDarkMode } = useTheme();
  const { lastUpdated } = useDashboard();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    try {
      setIsRefreshing(true);
      const response = await dashboardAPI.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    } finally {
      setIsRefreshing(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [lastUpdated]);

  const refreshData = () => {
    fetchStats();
  };

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-4">
          <RefreshCcw className="w-8 h-8 text-blue-500 animate-spin" />
          <p className="text-slate-500 font-bold animate-pulse">Initializing Dashboard...</p>
        </div>
      </div>
    );
  }

  const { kpis, moduleInsights, performanceData } = stats;

  const iconMap = {
    'Organization': Building2,
    'Employee Cost': Users,
    'Bench Management': Briefcase,
    'Contract Analyzer': FileText,
    'AI Prediction': BrainCircuit,
    'Invoicing': Receipt,
    'Margin Tracker': BarChart3,
    'Resource Allocation': PieChart,
    'Revenue Forecast': TrendingUp
  };

  const linkMap = {
    'Organization': '/organization/company-setup',
    'Employee Cost': '/employee-cost/list',
    'Bench Management': '/bench-management/list',
    'Contract Analyzer': '/contract-analyzer/insights',
    'AI Prediction': '/ai-prediction/forecast-insights',
    'Invoicing': '/invoicing/list',
    'Margin Tracker': '/margin-tracker/dashboard',
    'Resource Allocation': '/resource-allocation/dashboard',
    'Revenue Forecast': '/revenue-forecast/dashboard'
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 md:space-y-10 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className={`text-3xl md:text-4xl font-black tracking-tight flex flex-wrap items-center gap-4 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
            Enterprise Dashboard
            <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
              <span className="text-xs font-black uppercase tracking-widest text-blue-500 animate-pulse">Live</span>
            </div>
          </h1>
          <p className="text-slate-400 mt-2 font-bold tracking-wide text-sm md:text-base">Real-time resource allocation & margin intelligence</p>
        </div>
        <button 
          onClick={refreshData}
          disabled={isRefreshing}
          className={`flex items-center justify-center gap-2.5 px-6 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-sm font-black text-slate-300 hover:bg-slate-800 hover:text-white transition-all shadow-xl group w-full md:w-auto ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <RefreshCcw className={`w-4 h-4 text-blue-500 transition-transform duration-500 ${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180'}`} />
          {isRefreshing ? 'REFRESHING...' : 'REFRESH DATA'}
        </button>
      </header>

      {/* Primary KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard 
          title="Total Portfolio Margin" 
          value={kpis.totalMargin} 
          change="8.4" 
          trend="up" 
          icon={TrendingUp}
          color="text-blue-400"
          isDarkMode={isDarkMode}
        />
        <StatCard 
          title="Operational Cost" 
          value={kpis.operationalCost} 
          change="2.1" 
          trend="down" 
          icon={TrendingDown}
          color="text-rose-400"
          isDarkMode={isDarkMode}
        />
        <StatCard 
          title="Resource Utilization" 
          value={kpis.utilization} 
          change="5.6" 
          trend="up" 
          icon={Activity}
          color="text-emerald-400"
          isDarkMode={isDarkMode}
        />
        <StatCard 
          title="Project Success Rate" 
          value={kpis.successRate} 
          change="0.4" 
          trend="up" 
          icon={ShieldCheck}
          color="text-purple-400"
          isDarkMode={isDarkMode}
        />
      </div>

      <div className="space-y-6 md:space-y-10">
        {/* Performance Chart */}
        <div className={`p-4 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border shadow-xl ${
          isDarkMode ? 'bg-slate-900/40 border-slate-800/50' : 'bg-white border-gray-100'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-10">
            <div>
              <h3 className={`text-lg md:text-xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Revenue & Margin Velocity</h3>
              <p className={`text-[10px] md:text-xs font-bold uppercase tracking-widest mt-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Consolidated monthly trajectory</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-blue-500" />
                <span className={`text-[8px] md:text-[10px] font-black uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-emerald-500" />
                <span className={`text-[8px] md:text-[10px] font-black uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Margin</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] md:h-[400px] w-full">
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

        {/* Module Quick Links Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className={`text-xl md:text-2xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Module Insights</h3>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Real-time status across all systems</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {moduleInsights.map((module, index) => (
              <ModuleCard 
                key={index}
                label={module.label}
                status={module.status}
                value={module.value}
                icon={iconMap[module.label] || ShieldCheck}
                color={module.color}
                link={linkMap[module.label] || '#'}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;