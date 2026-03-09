import React from 'react';
import { FileText, Download, Filter, Search, Calendar, ChevronRight, TrendingUp } from 'lucide-react';
import { exportToCSV, exportToPDF } from '../../utils/exportUtils';

const reportData = [
  { id: 1, name: 'Q1 Performance Review', type: 'Financial', author: 'System AI', date: '2026-04-01', size: '1.2 MB' },
  { id: 2, name: 'H2 Revenue Projections', type: 'Forecast', author: 'Admin User', date: '2026-03-15', size: '2.4 MB' },
  { id: 3, name: 'Bench Cost Analysis - Mar', type: 'Efficiency', author: 'System AI', date: '2026-03-10', size: '0.8 MB' },
  { id: 4, name: 'Annual Strategy Document', type: 'Strategy', author: 'Project Director', date: '2026-01-05', size: '4.5 MB' },
];

const ForecastReport = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500" id="forecast-report-content">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 tracking-tight flex items-center gap-3">
            <FileText className="w-8 h-8 text-blue-500" />
            Forecast Reports
          </h1>
          <p className="text-slate-400 mt-2 font-medium">Access and generate detailed financial and operational reports.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => exportToPDF('forecast-report-content', 'Forecast_Reports_Summary.pdf')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
          >
            <Download className="w-4 h-4" />
            Generate Custom Report
          </button>
        </div>
      </header>

      {/* Report Filters */}
      <div className="bg-slate-900/50 backdrop-blur-xl p-4 rounded-2xl border border-slate-800 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input type="text" placeholder="Search reports..." className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none text-slate-200" />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all border border-slate-700">
            <Calendar className="w-4 h-4" />
            Date Range
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all border border-slate-700">
            <Filter className="w-4 h-4" />
            Category
          </button>
        </div>
      </div>

      {/* Report Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportData.map((report) => (
          <div key={report.id} className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 shadow-sm hover:border-blue-500/30 transition-all group cursor-pointer">
            <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-100 line-clamp-1">{report.name}</h4>
            <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mt-1">{report.type}</p>
            <div className="mt-6 pt-6 border-t border-slate-800 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500 font-medium">Date</span>
                <span className="text-slate-300 font-bold">{report.date}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500 font-medium">Size</span>
                <span className="text-slate-300 font-bold">{report.size}</span>
              </div>
            </div>
            <button className="w-full mt-6 py-2 bg-slate-800 group-hover:bg-blue-600 group-hover:text-white text-slate-300 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2">
              <Download className="w-3.5 h-3.5" />
              Download
            </button>
          </div>
        ))}
      </div>

      {/* Featured Insight */}
      <div className="bg-slate-900 p-8 rounded-3xl shadow-xl shadow-black/20 relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <TrendingUp className="w-32 h-32 text-blue-400" />
        </div>
        <div className="relative z-10">
          <h3 className="text-white font-bold text-xl mb-2">Automated Monthly Close</h3>
          <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
            The March financial close report has been automatically generated by the AI engine. It includes a detailed reconciliation of actual billing vs forecast with a 98.4% match accuracy.
          </p>
          <button className="mt-6 px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl text-sm hover:bg-blue-700 transition-all flex items-center gap-2">
            View Analysis
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForecastReport;
