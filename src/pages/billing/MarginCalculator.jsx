import React, { useState, useEffect } from 'react';
import { Calculator, RefreshCw, Download, ArrowRight, PieChart as PieChartIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { exportToPDF } from '../../utils/exportUtils';

const MarginCalculator = () => {
  const [inputs, setFormData] = useState({
    billingRate: 45,
    resourceCost: 18,
    utilization: 85,
    overhead: 15,
    hours: 160,
  });

  const [results, setResults] = useState({
    revenue: 0,
    cost: 0,
    margin: 0,
    marginPercent: 0,
  });

  useEffect(() => {
    const revenue = inputs.billingRate * (inputs.hours * (inputs.utilization / 100));
    const directCost = inputs.resourceCost * inputs.hours;
    const overheadCost = revenue * (inputs.overhead / 100);
    const totalCost = directCost + overheadCost;
    const margin = revenue - totalCost;
    const marginPercent = revenue > 0 ? (margin / revenue) * 100 : 0;

    setResults({
      revenue,
      cost: totalCost,
      margin,
      marginPercent,
    });
  }, [inputs]);

  const chartData = [
    { name: 'Margin', value: results.margin > 0 ? results.margin : 0, color: '#0ea5e9' },
    { name: 'Direct Cost', value: inputs.resourceCost * inputs.hours, color: '#6366f1' },
    { name: 'Overhead', value: results.revenue * (inputs.overhead / 100), color: '#94a3b8' },
  ];

  const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

  return (
    <div className="space-y-8 animate-in fade-in duration-500" id="margin-calc-content">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 tracking-tight flex items-center gap-3">
            <Calculator className="w-8 h-8 text-primary-600" />
            Margin Calculator
          </h1>
          <p className="text-slate-400 mt-2 font-medium">Quickly calculate project margins based on billing rates and resource costs.</p>
        </div>
        <button 
          onClick={() => exportToPDF('margin-calc-content', 'Margin_Calculation.pdf')}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm font-bold text-slate-300 hover:bg-slate-800 transition-all shadow-sm"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calculator Inputs */}
        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-sm space-y-6 transition-all">
          <h3 className="text-lg font-bold text-slate-100 mb-2 flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-primary-500" />
            Adjust Parameters
          </h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300">Hourly Billing Rate ($)</label>
              <input 
                type="number" 
                value={inputs.billingRate}
                onChange={(e) => setFormData({ ...inputs, billingRate: Number(e.target.value) })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500/20 text-slate-200" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300">Resource Hourly Cost ($)</label>
              <input 
                type="number" 
                value={inputs.resourceCost}
                onChange={(e) => setFormData({ ...inputs, resourceCost: Number(e.target.value) })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500/20 text-slate-200" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300">Utilization (%)</label>
              <input 
                type="range" 
                min="0" max="100"
                value={inputs.utilization}
                onChange={(e) => setFormData({ ...inputs, utilization: Number(e.target.value) })}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary-600" 
              />
              <div className="flex justify-between text-[10px] font-bold text-slate-500">
                <span>0%</span>
                <span className="text-primary-500">{inputs.utilization}%</span>
                <span>100%</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300">Overhead % (SGA, etc.)</label>
              <input 
                type="number" 
                value={inputs.overhead}
                onChange={(e) => setFormData({ ...inputs, overhead: Number(e.target.value) })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary-500/20 text-slate-200" 
              />
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-sm relative overflow-hidden group transition-all">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                <PieChartIcon className="w-24 h-24 text-primary-600" />
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Gross Margin (%)</p>
              <h3 className={`text-5xl font-black mt-2 ${results.marginPercent > 30 ? 'text-emerald-500' : 'text-rose-500'}`}>
                {results.marginPercent.toFixed(1)}%
              </h3>
              <div className="mt-6 h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#0f172a', 
                        border: 'none', 
                        borderRadius: '8px',
                        color: '#f8fafc'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6 transition-all">
              <h4 className="text-slate-100 font-bold text-lg border-b border-slate-800 pb-4">Financial Breakdown</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm font-medium">Est. Monthly Revenue</span>
                  <span className="text-slate-100 font-bold">{formatCurrency(results.revenue)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm font-medium">Total Monthly Cost</span>
                  <span className="text-slate-100 font-bold">{formatCurrency(results.cost)}</span>
                </div>
                <div className="h-[1px] bg-slate-800 my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-primary-400 text-sm font-black uppercase tracking-widest">Net Margin</span>
                  <span className="text-primary-400 text-xl font-black">{formatCurrency(results.margin)}</span>
                </div>
              </div>
              <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2">
                Save to Scenarios
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarginCalculator;
