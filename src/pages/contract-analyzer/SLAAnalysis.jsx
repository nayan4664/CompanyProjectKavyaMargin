// import React from 'react';
// import { ShieldCheck, Download, AlertTriangle, Clock, Search, Filter, TrendingUp, Info } from 'lucide-react';
// import { 
//   BarChart, 
//   Bar, 
//   XAxis, 
//   YAxis, 
//   CartesianGrid, 
//   Tooltip, 
//   ResponsiveContainer,
//   ReferenceLine
// } from 'recharts';
// import { exportToPDF } from '../../utils/exportUtils';

// const slaData = [
//   { metric: 'Uptime', target: 99.9, actual: 99.95, unit: '%' },
//   { metric: 'Response Time', target: 4, actual: 3.2, unit: 'hr' },
//   { metric: 'Resolution', target: 24, actual: 26, unit: 'hr' },
//   { metric: 'Bug Fix', target: 48, actual: 36, unit: 'hr' },
// ];

// const SLAAnalysis = () => {
//   return (
//     <div className="space-y-8 animate-in fade-in duration-500" id="sla-analysis-content">
//       <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-slate-100 tracking-tight flex items-center gap-3">
//             <ShieldCheck className="w-8 h-8 text-blue-500" />
//             SLA Analysis
//           </h1>
//           <p className="text-slate-400 mt-2 font-medium">Real-time tracking of service level agreements against contractual obligations.</p>
//         </div>
//         <button 
//           onClick={() => exportToPDF('sla-analysis-content', 'SLA_Compliance_Report.pdf')}
//           className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm font-bold text-slate-300 hover:bg-slate-800 transition-all shadow-sm"
//         >
//           <Download className="w-4 h-4" />
//           Download PDF
//         </button>
//       </header>

//       {/* Compliance Overview */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <div className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 shadow-sm">
//           <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Overall Compliance</p>
//           <div className="flex items-baseline gap-2">
//             <h3 className="text-3xl font-black text-slate-100">92.5%</h3>
//             <span className="text-xs font-bold text-emerald-400">+1.2%</span>
//           </div>
//         </div>
//         <div className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 shadow-sm">
//           <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Metrics Tracked</p>
//           <h3 className="text-3xl font-black text-slate-100">12</h3>
//         </div>
//         <div className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 shadow-sm">
//           <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Breaches (MTD)</p>
//           <h3 className="text-3xl font-black text-rose-500">01</h3>
//         </div>
//         <div className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 shadow-sm">
//           <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Penalty Risk</p>
//           <h3 className="text-3xl font-black text-amber-500">₹45k</h3>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Metric Performance Chart */}
//         <div className="bg-slate-900/50 backdrop-blur-xl p-8 rounded-2xl border border-slate-800 shadow-sm">
//           <h3 className="text-lg font-bold text-slate-100 mb-8">Metric vs Target</h3>
//           <div className="h-[350px] w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={slaData} layout="vertical" margin={{ left: 40 }}>
//                 <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#1e293b" />
//                 <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
//                 <YAxis dataKey="metric" type="category" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} />
//                 <Tooltip 
//                   cursor={{fill: '#1e293b'}}
//                   contentStyle={{ 
//                     backgroundColor: '#0f172a', 
//                     border: '1px solid #1e293b',
//                     borderRadius: '12px',
//                     color: '#f1f5f9'
//                   }}
//                   itemStyle={{ color: '#f1f5f9' }}
//                 />
//                 <Bar dataKey="actual" fill="#0ea5e9" radius={[0, 4, 4, 0]} barSize={20} />
//                 <Bar dataKey="target" fill="#1e293b" radius={[0, 4, 4, 0]} barSize={20} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Breach Alerts */}
//         <div className="bg-slate-900/50 backdrop-blur-xl p-8 rounded-2xl border border-slate-800 shadow-sm">
//           <h3 className="text-lg font-bold text-slate-100 mb-6">Critical Alerts</h3>
//           <div className="space-y-4">
//             <div className="p-4 bg-rose-500/10 rounded-2xl border border-rose-500/20 flex gap-4">
//               <AlertTriangle className="w-6 h-6 text-rose-500 shrink-0" />
//               <div>
//                 <h4 className="text-sm font-bold text-rose-100">Resolution SLA Breach</h4>
//                 <p className="text-xs text-rose-300 mt-1 font-medium leading-relaxed">
//                   Project Beta exceeded the 24hr resolution window for 3 tickets. Potential penalty: ₹12,500.
//                 </p>
//                 <button className="mt-3 text-[10px] font-black uppercase tracking-widest text-rose-500 hover:underline">Assign Reviewer</button>
//               </div>
//             </div>
//             <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/20 flex gap-4">
//               <Clock className="w-6 h-6 text-amber-500 shrink-0" />
//               <div>
//                 <h4 className="text-sm font-bold text-amber-100">Nearing Threshold</h4>
//                 <p className="text-xs text-amber-300 mt-1 font-medium leading-relaxed">
//                   Response time for Client SkyHigh is at 3.8hrs (Target: 4hrs). Optimization recommended.
//                 </p>
//                 <button className="mt-3 text-[10px] font-black uppercase tracking-widest text-amber-500 hover:underline">View Tickets</button>
//               </div>
//             </div>
//           </div>
//           <div className="mt-8 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 flex gap-3">
//             <Info className="w-5 h-5 text-blue-400 shrink-0" />
//             <p className="text-[11px] text-blue-300 font-medium leading-relaxed">
//               SLA data is synced every 15 minutes with the ticketing system.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SLAAnalysis;



import React, { useState } from 'react';
import { ShieldCheck, Download, AlertTriangle, Clock, Info } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { exportToPDF, exportToCSV } from '../../utils/exportUtils';

/* SLA Data with Projects */
const slaData = [
  { project: 'Alpha', metric: 'Uptime', target: 99.9, actual: 99.95, unit: '%' },
  { project: 'Alpha', metric: 'Response Time', target: 4, actual: 3.2, unit: 'hr' },
  { project: 'Beta', metric: 'Resolution', target: 24, actual: 26, unit: 'hr' },
  { project: 'Gamma', metric: 'Bug Fix', target: 48, actual: 36, unit: 'hr' },
];

/* Trend Data */
const slaTrendData = [
  { month: 'Jan', Uptime: 99.8, ResponseTime: 4.5, Resolution: 22 },
  { month: 'Feb', Uptime: 99.9, ResponseTime: 3.8, Resolution: 25 },
  { month: 'Mar', Uptime: 99.7, ResponseTime: 4.2, Resolution: 27 },
  { month: 'Apr', Uptime: 99.95, ResponseTime: 3.2, Resolution: 26 },
];

const SLAAnalysis = () => {

  const [filterProject, setFilterProject] = useState('All Projects');

  const projects = ['All Projects', 'Alpha', 'Beta', 'Gamma'];

  /* Filter Logic */
  const filteredData =
    filterProject === 'All Projects'
      ? slaData
      : slaData.filter(item => item.project === filterProject);

  /* Breach Calculation */
  const slaBreachStatus = filteredData.map(item => ({
    ...item,
    status: item.actual <= item.target ? 'Met' : 'Breached',
    penalty: item.actual > item.target ? '₹12,500' : '₹0',
  }));

  return (
    <div className="space-y-8 animate-in fade-in duration-500" id="sla-analysis-content">

      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold text-slate-100 flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-blue-500" />
            SLA Analysis
          </h1>

          <p className="text-slate-400 mt-2">
            Real-time tracking of service level agreements including penalty and compliance clauses.
          </p>
        </div>

        <div className="flex gap-3">

          {/* Project Filter */}
          <select
            value={filterProject}
            onChange={(e) => setFilterProject(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-200 text-sm rounded-lg px-3 py-2"
          >
            {projects.map((project, index) => (
              <option key={index} value={project}>
                {project}
              </option>
            ))}
          </select>

          {/* Export PDF */}
          {/* <button
            onClick={() => exportToPDF('sla-analysis-content', 'SLA_Report.pdf')}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-300 hover:bg-slate-800"
          >
            <Download className="w-4 h-4" />
            PDF
          </button> */}

          {/* Export CSV */}
          <button
            onClick={() => exportToCSV(slaBreachStatus, 'SLA_Breach_Report.csv')}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-300 hover:bg-slate-800"
          >
            <Download className="w-4 h-4 rotate-45" />
            CSV
          </button>

        </div>
      </header>


      {/* Compliance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {[
          { label: 'Overall Compliance', value: '92.5%', color: 'emerald' },
          { label: 'Metrics Tracked', value: '12', color: 'blue' },
          { label: 'Breaches (MTD)', value: '01', color: 'rose' },
          { label: 'Penalty Risk', value: '₹45k', color: 'amber' }
        ].map((item, i) => (

          <div key={i} className="bg-slate-900 p-6 rounded-xl border border-slate-800">

            <p className="text-xs text-slate-400 uppercase mb-2">
              {item.label}
            </p>

            <h3 className={`text-3xl font-bold text-${item.color}-400`}>
              {item.value}
            </h3>

          </div>

        ))}

      </div>


      {/* SLA Chart + Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* SLA Chart */}
        <div className="bg-slate-900 p-8 rounded-xl border border-slate-800">

          <h3 className="text-lg font-bold text-slate-100 mb-6">
            Metric vs Target
          </h3>

          <div className="h-[320px]">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart
                data={filteredData}
                layout="vertical"
                margin={{ left: 40 }}
              >

                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />

                <XAxis type="number" />

                <YAxis
                  dataKey="metric"
                  type="category"
                />

                <Tooltip />

                <Bar
                  dataKey="actual"
                  fill="#0ea5e9"
                  radius={[0,4,4,0]}
                />

                <Bar
                  dataKey="target"
                  fill="#1e293b"
                  radius={[0,4,4,0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>


        {/* Alerts */}
        <div className="bg-slate-900 p-8 rounded-xl border border-slate-800">

          <h3 className="text-lg font-bold text-slate-100 mb-6">
            Critical Alerts
          </h3>

          <div className="space-y-4">

            <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex gap-3">

              <AlertTriangle className="text-rose-500 w-5 h-5"/>

              <div>

                <h4 className="text-sm font-bold text-rose-200">
                  Resolution SLA Breach
                </h4>

                <p className="text-xs text-rose-300">
                  Project Beta exceeded 24hr resolution window.
                </p>

              </div>

            </div>

            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex gap-3">

              <Clock className="text-amber-500 w-5 h-5"/>

              <div>

                <h4 className="text-sm font-bold text-amber-200">
                  Nearing SLA Limit
                </h4>

                <p className="text-xs text-amber-300">
                  Response time approaching 4hr threshold.
                </p>

              </div>

            </div>

          </div>

          <div className="mt-6 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg flex gap-2">

            <Info className="text-blue-400 w-4 h-4"/>

            <p className="text-xs text-blue-300">
              SLA data syncs every 15 minutes.
            </p>

          </div>

        </div>

      </div>


      {/* Breach Table */}
      <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">

        <h3 className="text-lg font-bold text-slate-100 mb-4">
          SLA Breach Summary
        </h3>

        <table className="w-full text-sm text-slate-300">

          <thead>

            <tr className="text-slate-400 border-b border-slate-700">

              <th className="p-2">Project</th>
              <th className="p-2">Metric</th>
              <th className="p-2">Target</th>
              <th className="p-2">Actual</th>
              <th className="p-2">Status</th>
              <th className="p-2">Penalty</th>

            </tr>

          </thead>

          <tbody>

            {slaBreachStatus.map((item,i) => (

              <tr key={i} className="border-b border-slate-800">

                <td className="p-2">{item.project}</td>

                <td className="p-2">{item.metric}</td>

                <td className="p-2">{item.target}{item.unit}</td>

                <td className="p-2">{item.actual}{item.unit}</td>

                <td className={`p-2 font-bold ${item.status === 'Met'
                  ? 'text-green-400'
                  : 'text-red-400'
                }`}>
                  {item.status}
                </td>

                <td className="p-2">{item.penalty}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default SLAAnalysis;