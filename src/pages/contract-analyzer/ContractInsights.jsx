// import React from 'react';
// import { Lightbulb, TrendingUp, AlertTriangle, CheckCircle2, Download, FileText, ArrowRight } from 'lucide-react';
// import { exportToPDF } from '../../utils/exportUtils';

// const ContractInsights = () => {
//   const insights = [
//     {
//       id: 1,
//       type: 'Margin',
//       title: 'Billing Rate Optimization',
//       desc: 'TechCorp agreement allows for a 5% annual inflation adjustment. Current billing is at base rate.',
//       impact: '+₹4.2L Annual Revenue',
//       status: 'Action Required',
//       color: 'blue'
//     },
//     {
//       id: 2,
//       type: 'Risk',
//       title: 'Unfavorable Liability Clause',
//       desc: 'Section 14.2 defines uncapped liability for indirect damages. Normal standard is 1x annual contract value.',
//       impact: 'High Financial Risk',
//       status: 'Urgent Review',
//       color: 'rose'
//     },
//     {
//       id: 3,
//       type: 'SLA',
//       title: 'Bonus Opportunity',
//       desc: 'Project Alpha contract includes a 2% bonus if uptime exceeds 99.9% for three consecutive months.',
//       impact: '+₹1.8L One-time Bonus',
//       status: 'On Track',
//       color: 'emerald'
//     }
//   ];

//   return (
//     <div className="space-y-8 animate-in fade-in duration-500" id="contract-insights-content">
//       <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-slate-100 tracking-tight flex items-center gap-3">
//             <Lightbulb className="w-8 h-8 text-blue-500" />
//             Contract Insights
//           </h1>
//           <p className="text-slate-400 mt-2 font-medium">AI-generated strategic insights and risks extracted from active contracts.</p>
//         </div>
//         <button 
//           onClick={() => exportToPDF('contract-insights-content', 'Contract_Insights_Report.pdf')}
//           className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm font-bold text-slate-300 hover:bg-slate-800 transition-all shadow-sm"
//         >
//           <Download className="w-4 h-4" />
//           Download Insights
//         </button>
//       </header>

//       {/* Insight Summary */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 shadow-sm flex items-center gap-4">
//           <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center shrink-0">
//             <TrendingUp className="w-6 h-6" />
//           </div>
//           <div>
//             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Revenue Upside</p>
//             <h3 className="text-xl font-black text-slate-100">₹6.0L</h3>
//           </div>
//         </div>
//         <div className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 shadow-sm flex items-center gap-4">
//           <div className="w-12 h-12 bg-rose-500/10 text-rose-400 rounded-xl flex items-center justify-center shrink-0">
//             <AlertTriangle className="w-6 h-6" />
//           </div>
//           <div>
//             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Risk Flags</p>
//             <h3 className="text-xl font-black text-slate-100">02 Critical</h3>
//           </div>
//         </div>
//         <div className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 shadow-sm flex items-center gap-4">
//           <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center shrink-0">
//             <CheckCircle2 className="w-6 h-6" />
//           </div>
//           <div>
//             <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Compliant Ratio</p>
//             <h3 className="text-xl font-black text-slate-100">94%</h3>
//           </div>
//         </div>
//       </div>

//       {/* Detailed Insights List */}
//       <div className="grid grid-cols-1 gap-6">
//         {insights.map((insight) => (
//           <div key={insight.id} className="bg-slate-900/50 backdrop-blur-xl p-8 rounded-2xl border border-slate-800 shadow-sm hover:border-blue-500/30 transition-all group relative overflow-hidden">
//             <div className={`absolute top-0 left-0 w-1.5 h-full bg-${insight.color === 'blue' ? 'blue' : insight.color === 'rose' ? 'rose' : 'emerald'}-500`} />
//             <div className="flex flex-col lg:flex-row gap-8">
//               <div className="flex-1">
//                 <div className="flex items-center gap-3 mb-4">
//                   <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-${insight.color === 'blue' ? 'blue' : insight.color === 'rose' ? 'rose' : 'emerald'}-500/10 text-${insight.color === 'blue' ? 'blue' : insight.color === 'rose' ? 'rose' : 'emerald'}-400`}>
//                     {insight.type}
//                   </span>
//                   <span className="text-xs font-bold text-slate-500 italic">{insight.status}</span>
//                 </div>
//                 <h4 className="text-xl font-bold text-slate-100 mb-2">{insight.title}</h4>
//                 <p className="text-sm text-slate-400 leading-relaxed font-medium">
//                   {insight.desc}
//                 </p>
//               </div>
//               <div className="lg:w-64 shrink-0 flex flex-col justify-center items-start lg:items-end">
//                 <p className={`text-lg font-black text-${insight.color === 'blue' ? 'blue' : insight.color === 'rose' ? 'rose' : 'emerald'}-400`}>{insight.impact}</p>
//                 <button className="mt-4 flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors">
//                   View Full Clause
//                   <ArrowRight className="w-3 h-3" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ContractInsights;


import React, { useState } from "react";
import {
  Lightbulb,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Download,
  ArrowRight
} from "lucide-react";

const initialInsights = [
  {
    id: 1,
    type: "Margin",
    title: "Billing Term Extraction",
    desc: "Extracted all billing terms including rate, escalation, and adjustments for accurate revenue planning.",
    impact: "+₹4.2L Annual Revenue",
    status: "Action Required",
    color: "blue"
  },
  {
    id: 2,
    type: "Risk",
    title: "Penalty & SLA Detection",
    desc: "Detected uncapped liability and SLA breach clauses for potential financial risk.",
    impact: "High Financial Risk",
    status: "Urgent Review",
    color: "rose"
  },
  {
    id: 3,
    type: "Payment",
    title: "Payment Clause Analysis",
    desc: "Reviewed payment terms and schedules to ensure compliance with revenue recognition.",
    impact: "+₹1.8L One-time Bonus",
    status: "On Track",
    color: "emerald"
  }
];

const ContractInsights = () => {

  const [insights] = useState(initialInsights);
  const [filter, setFilter] = useState("All");

  // FILTER LOGIC
  const filteredInsights =
    filter === "All"
      ? insights
      : insights.filter((item) => item.type === filter);

  // VIEW CLAUSE BUTTON
  const handleViewClause = (insight) => {
    alert(`Opening details for:\n${insight.title}`);
  };

  // EXCEL EXPORT FUNCTION
  const exportToExcel = () => {
    const headers = ["Type", "Title", "Description", "Impact", "Status"];

    const rows = insights.map((item) => [
      item.type,
      item.title,
      item.desc,
      item.impact,
      item.status
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);

    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Contract_Insights_Report.csv");
    document.body.appendChild(link);

    link.click();
  };

  return (
    <div
      className="space-y-8 animate-in fade-in duration-500"
      id="contract-insights-content"
    >

      {/* HEADER */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold text-slate-100 tracking-tight flex items-center gap-3">
            <Lightbulb className="w-8 h-8 text-blue-500" />
            Contract Insights
          </h1>

          <p className="text-slate-400 mt-2 font-medium">
            AI-powered insights from uploaded contracts for margin, risk,
            and payment analysis.
          </p>
        </div>

        {/* DOWNLOAD BUTTON */}
        <button
          onClick={exportToExcel}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm font-bold text-slate-300 hover:bg-slate-800 transition-all shadow-sm"
        >
          <Download className="w-4 h-4" />
          Download Excel
        </button>

      </header>

      {/* FILTER BUTTONS */}
      <div className="flex flex-wrap gap-3">

        {["All", "Margin", "Risk", "Payment"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition ${
              filter === type
                ? "bg-blue-600 text-white"
                : "bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800"
            }`}
          >
            {type}
          </button>
        ))}

      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
          <TrendingUp className="text-blue-400 w-10 h-10" />
          <div>
            <p className="text-xs text-slate-500">Revenue Upside</p>
            <h3 className="text-xl font-bold text-slate-100">₹6.0L</h3>
          </div>
        </div>

        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
          <AlertTriangle className="text-rose-400 w-10 h-10" />
          <div>
            <p className="text-xs text-slate-500">Risk Flags</p>
            <h3 className="text-xl font-bold text-slate-100">02 Critical</h3>
          </div>
        </div>

        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
          <CheckCircle2 className="text-emerald-400 w-10 h-10" />
          <div>
            <p className="text-xs text-slate-500">Compliant Ratio</p>
            <h3 className="text-xl font-bold text-slate-100">94%</h3>
          </div>
        </div>

      </div>

      {/* INSIGHTS LIST */}
      <div className="grid grid-cols-1 gap-6">

        {filteredInsights.map((insight) => (

          <div
            key={insight.id}
            className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-blue-500/30 transition-all"
          >

            <div className="flex flex-col lg:flex-row gap-8">

              {/* LEFT SIDE */}
              <div className="flex-1">

                <div className="flex items-center gap-3 mb-4">

                  <span className="text-xs font-bold text-blue-400">
                    {insight.type}
                  </span>

                  <span className="text-xs text-slate-500">
                    {insight.status}
                  </span>

                </div>

                <h4 className="text-xl font-bold text-slate-100 mb-2">
                  {insight.title}
                </h4>

                <p className="text-sm text-slate-400">
                  {insight.desc}
                </p>

              </div>

              {/* RIGHT SIDE */}
              <div className="lg:w-64 flex flex-col items-end">

                <p className="text-lg font-bold text-blue-400">
                  {insight.impact}
                </p>

                <button
                  onClick={() => handleViewClause(insight)}
                  className="mt-4 flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
                >
                  View Full Clause
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default ContractInsights;