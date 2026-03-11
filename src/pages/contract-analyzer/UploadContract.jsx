<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UploadContract = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(user);
    
    // Redirect if unauthorized
    if (user?.role === 'Project Manager' || user?.role === 'Team Lead' || user?.role === 'HR' || user?.role === 'Viewers') {
      navigate('/dashboard');
    }
  }, [navigate]);
=======
// import React, { useState } from 'react';
// import { FileText, Upload, CheckCircle2, AlertCircle, Clock, Search, FileCode } from 'lucide-react';

// const UploadContract = () => {
//   const [dragActive, setDragActive] = useState(false);
//   const [uploadedFiles, setUploadedFiles] = useState([
//     { name: 'Service_Agreement_TechCorp.pdf', size: '2.4 MB', status: 'Analyzed', date: '2026-03-01' },
//     { name: 'SLA_Cloud_Migration.docx', size: '1.1 MB', status: 'Processing', date: '2026-03-05' },
//   ]);

//   const handleDrag = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true);
//     } else if (e.type === "dragleave") {
//       setDragActive(false);
//     }
//   };

//   return (
//     <div className="space-y-8 animate-in fade-in duration-500">
//       <header>
//         <h1 className="text-3xl font-bold text-slate-100 tracking-tight flex items-center gap-3">
//           <Upload className="w-8 h-8 text-blue-500" />
//           Contract Upload & Analysis
//         </h1>
//         <p className="text-slate-400 mt-2 font-medium">Upload legal documents for automated AI analysis of margins, SLAs, and compliance.</p>
//       </header>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Upload Zone */}
//         <div className="lg:col-span-2 space-y-6">
//           <div 
//             onDragEnter={handleDrag}
//             onDragLeave={handleDrag}
//             onDragOver={handleDrag}
//             className={`relative h-80 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center transition-all ${
//               dragActive ? 'border-blue-500 bg-blue-500/10 scale-[1.01]' : 'border-slate-800 bg-slate-900/50 backdrop-blur-xl'
//             }`}
//           >
//             <div className="w-16 h-16 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center mb-4">
//               <Upload className="w-8 h-8" />
//             </div>
//             <h3 className="text-lg font-bold text-slate-100">Drag & Drop Contracts</h3>
//             <p className="text-sm text-slate-400 mt-1 font-medium">or click to browse from your computer</p>
//             <p className="text-[10px] text-slate-500 mt-4 uppercase font-bold tracking-widest">Supports PDF, DOCX, TXT (Max 25MB)</p>
//             <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
//           </div>

//           {/* Recent Uploads */}
//           <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800 shadow-sm overflow-hidden">
//             <div className="p-6 border-b border-slate-800 flex justify-between items-center">
//               <h4 className="font-bold text-slate-100">Recent Uploads</h4>
//               <button className="text-xs font-bold text-blue-400 hover:text-blue-300 uppercase tracking-widest transition-colors">View All</button>
//             </div>
//             <div className="divide-y divide-slate-800">
//               {uploadedFiles.map((file, i) => (
//                 <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors">
//                   <div className="flex items-center gap-4">
//                     <div className="p-2 bg-slate-800 rounded-lg">
//                       <FileText className="w-5 h-5 text-slate-500" />
//                     </div>
//                     <div>
//                       <p className="text-sm font-bold text-slate-100">{file.name}</p>
//                       <p className="text-[10px] text-slate-500 font-medium">{file.size} • {file.date}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
//                       file.status === 'Analyzed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
//                     }`}>
//                       {file.status}
//                     </span>
//                     {file.status === 'Analyzed' && (
//                       <button className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors">View Insights</button>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* AI Processing Info */}
//         <div className="space-y-6">
//           <div className="bg-slate-900 p-8 rounded-3xl shadow-xl shadow-black/20 text-white border border-slate-800">
//             <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
//               <FileCode className="w-5 h-5 text-blue-400" />
//               Analysis Engine
//             </h4>
//             <div className="space-y-6">
//               <div className="flex gap-4">
//                 <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/30">
//                   <span className="text-[10px] font-bold text-blue-400">01</span>
//                 </div>
//                 <div>
//                   <p className="text-sm font-bold text-slate-100">Clause Extraction</p>
//                   <p className="text-xs text-slate-400 mt-1">Identifies payment terms, penalties, and resource obligations.</p>
//                 </div>
//               </div>
//               <div className="flex gap-4">
//                 <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/30">
//                   <span className="text-[10px] font-bold text-blue-400">02</span>
//                 </div>
//                 <div>
//                   <p className="text-sm font-bold text-slate-100">Margin Validation</p>
//                   <p className="text-xs text-slate-400 mt-1">Cross-references billing rates with internal cost sheets.</p>
//                 </div>
//               </div>
//               <div className="flex gap-4">
//                 <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/30">
//                   <span className="text-[10px] font-bold text-blue-400">03</span>
//                 </div>
//                 <div>
//                   <p className="text-sm font-bold text-slate-100">Risk Scoring</p>
//                   <p className="text-xs text-slate-400 mt-1">Flags unfavorable terms or potential compliance issues.</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-amber-500/10 p-6 rounded-2xl border border-amber-500/20">
//             <div className="flex gap-3">
//               <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
//               <div>
//                 <h5 className="text-xs font-bold text-amber-100 uppercase tracking-widest">Compliance Tip</h5>
//                 <p className="text-xs text-amber-300 mt-1 leading-relaxed font-medium">
//                   Ensure all signed addendums are uploaded along with the master service agreement for 100% accuracy.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UploadContract;


import React, { useState } from "react";
import { FileText, Upload, AlertCircle, FileCode, Download } from "lucide-react";
import * as XLSX from "xlsx";

const UploadContract = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  const [analysisResult, setAnalysisResult] = useState({
    clause: "Waiting for file...",
    margin: "Pending",
    risk: "Not calculated",
  });

>>>>>>> 6697b1b (add org contact feature)
  const [uploadedFiles, setUploadedFiles] = useState([
    {
      name: "Service_Agreement_TechCorp.pdf",
      size: "2.4 MB",
      status: "Analyzed",
      date: "2026-03-01",
    },
    {
      name: "SLA_Cloud_Migration.docx",
      size: "1.1 MB",
      status: "Processing",
      date: "2026-03-05",
    },
  ]);

  const formatFileSize = (size) => {
    return (size / (1024 * 1024)).toFixed(2) + " MB";
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else {
      setDragActive(false);
    }
  };

  /* ---------------- ANALYSIS ENGINE ---------------- */

  const runAnalysisEngine = (fileName) => {
    let clause = "Standard clauses detected";
    let margin = "Healthy margin detected";
    let risk = "Low Risk";

    if (fileName.toLowerCase().includes("sla")) {
      clause = "SLA penalties and uptime clauses detected";
      margin = "Margin within acceptable range";
      risk = "Medium Risk";
    }

    if (fileName.toLowerCase().includes("agreement")) {
      clause = "Payment terms and legal obligations detected";
      margin = "Margin below recommended threshold";
      risk = "High Risk";
    }

    setAnalysisResult({
      clause,
      margin,
      risk,
    });
  };

  /* ---------------- FILE PROCESSING ---------------- */

  const processFile = (file) => {
    if (!file) return;

    const today = new Date().toISOString().split("T")[0];

    const newFile = {
      name: file.name,
      size: formatFileSize(file.size),
      status: "Processing",
      date: today,
    };

    setUploadedFiles((prev) => [newFile, ...prev]);

    setUploadProgress(0);
    let progress = 0;

    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);

        runAnalysisEngine(file.name); // RUN ANALYSIS

        setShowAlert(true);

        setTimeout(() => {
          setShowAlert(false);
        }, 2500);

        setTimeout(() => {
          setUploadedFiles((prev) =>
            prev.map((f, i) =>
              i === 0 ? { ...f, status: "Analyzed" } : f
            )
          );
        }, 3000);
      }
    }, 200);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  /* ---------------- EXCEL DOWNLOAD ---------------- */

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(uploadedFiles);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Contracts");

    XLSX.writeFile(workbook, "Contract_Upload_Report.xlsx");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">

      {/* Success Alert */}
      {showAlert && (
        <div className="bg-emerald-500/10 border border-emerald-400 text-emerald-300 px-4 py-3 rounded-xl text-sm font-semibold">
          ✅ File uploaded successfully
        </div>
      )}

      <header>
        <h1 className="text-3xl font-bold text-slate-100 flex items-center gap-3">
          <Upload className="w-8 h-8 text-blue-500" />
          Contract Upload & Analysis
        </h1>

        <p className="text-slate-400 mt-2">
          Upload legal documents for automated AI analysis of margins, SLAs, and compliance.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Upload Section */}
        <div className="lg:col-span-2 space-y-6">

          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`relative h-80 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center transition-all ${
              dragActive
                ? "border-blue-500 bg-blue-500/10"
                : "border-slate-800 bg-slate-900/50"
            }`}
          >
            <Upload className="w-10 h-10 text-blue-400 mb-3" />

            <h3 className="text-lg font-bold text-slate-100">
              Drag & Drop Contracts
            </h3>

            <p className="text-sm text-slate-400">
              or click to browse
            </p>

            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleFileUpload}
            />

            {/* Progress Bar */}
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="absolute bottom-6 w-2/3 bg-slate-700 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-blue-500 h-full transition-all"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}
          </div>

          {/* Recent Uploads */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">

            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
              <h4 className="text-slate-100 font-bold">
                Recent Uploads
              </h4>

              <button
                onClick={downloadExcel}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-xs px-4 py-2 rounded-lg font-semibold"
              >
                <Download className="w-4 h-4" />
                Download Excel
              </button>
            </div>

            <div className="divide-y divide-slate-800">
              {uploadedFiles.map((file, i) => (
                <div
                  key={i}
                  className="p-4 flex items-center justify-between hover:bg-slate-800/40"
                >
                  <div className="flex items-center gap-4">
                    <FileText className="w-5 h-5 text-slate-400" />

                    <div>
                      <p className="text-sm text-slate-100 font-semibold">
                        {file.name}
                      </p>

                      <p className="text-xs text-slate-500">
                        {file.size} • {file.date}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      file.status === "Analyzed"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-amber-500/10 text-amber-400"
                    }`}
                  >
                    {file.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Analysis Engine */}
        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 text-white">

          <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
            <FileCode className="w-5 h-5 text-blue-400" />
            Analysis Engine
          </h4>

          <div className="space-y-6 text-sm text-slate-300">

            <div>
              <p className="font-bold text-slate-100">
                01 Clause Extraction
              </p>

              <p className="text-xs text-blue-400 mt-1">
                {analysisResult.clause}
              </p>
            </div>

            <div>
              <p className="font-bold text-slate-100">
                02 Margin Validation
              </p>

              <p className="text-xs text-emerald-400 mt-1">
                {analysisResult.margin}
              </p>
            </div>

            <div>
              <p className="font-bold text-slate-100">
                03 Risk Scoring
              </p>

              <p
                className={`text-xs mt-1 font-semibold ${
                  analysisResult.risk === "High Risk"
                    ? "text-red-400"
                    : analysisResult.risk === "Medium Risk"
                    ? "text-amber-400"
                    : "text-emerald-400"
                }`}
              >
                {analysisResult.risk}
              </p>
            </div>

          </div>
        </div>
      </div>

      <div className="bg-amber-500/10 p-6 rounded-2xl border border-amber-500/20 flex gap-3">
        <AlertCircle className="text-amber-400 w-5 h-5" />

        <p className="text-xs text-amber-300">
          Ensure all signed addendums are uploaded with the master agreement
          for accurate analysis.
        </p>
      </div>
    </div>
  );
};

export default UploadContract;