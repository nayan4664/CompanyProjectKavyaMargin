import React, { useState, useEffect } from 'react';
import { Briefcase, Search, Download, Filter, Clock, Edit2, Trash2, Check, X, MoreVertical } from 'lucide-react';
import { exportToCSV, exportToXML } from '../../utils/exportUtils';

const defaultBenchData = [
  { id: 1, name: 'Rahul Reddy', role: 'Product Manager', dept: 'Product', benchTime: '45 Days', cost: '₹2.0L/mo', status: 'Available' },
  { id: 2, name: 'Kiran Deep', role: 'QA Lead', dept: 'Engineering', benchTime: '12 Days', cost: '₹1.1L/mo', status: 'Interviewing' },
  { id: 3, name: 'Sneha Rao', role: 'Data Analyst', dept: 'Data', benchTime: '62 Days', cost: '₹1.4L/mo', status: 'Available' },
  { id: 4, name: 'Vikram Singh', role: 'DevOps Engineer', dept: 'Engineering', benchTime: '5 Days', cost: '₹1.8L/mo', status: 'Available' },
];

const BenchList = () => {
  const [benchList, setBenchList] = useState(defaultBenchData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [currentUser, setCurrentUser] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(user);
    const storedBench = localStorage.getItem('benchList');
    if (storedBench) {
      try {
        setBenchList(JSON.parse(storedBench));
      } catch (e) {
        console.error("Error parsing bench list:", e);
      }
    }
  }, []);

  const handleExport = (type) => {
    if (currentUser?.role === 'Team Lead' || currentUser?.role === 'Project Manager') {
      alert(`Unauthorized: ${currentUser.role}s cannot download reports.`);
      return;
    }
    if (type === 'CSV') exportToCSV(benchList, 'Bench_Resources.csv');
    else exportToXML(benchList, 'Bench_Resources.xml', 'BenchResources');
  };

  const departments = ['All', ...new Set(benchList.map(res => res.dept))];

  const handleEditClick = (res) => {
    if (currentUser?.role === 'Team Lead' || currentUser?.role === 'Project Manager') {
      alert(`Unauthorized: ${currentUser.role}s cannot edit records.`);
      return;
    }
    setEditingId(res.id);
    setEditFormData({ ...res });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = () => {
    const updatedList = benchList.map(res => res.id === editingId ? editFormData : res);
    setBenchList(updatedList);
    localStorage.setItem('benchList', JSON.stringify(updatedList));
    setEditingId(null);
    setEditFormData({});
  };

  const handleDelete = (id) => {
    if (currentUser?.role === 'Team Lead' || currentUser?.role === 'Project Manager') {
      alert(`Unauthorized: ${currentUser.role}s cannot delete records.`);
      return;
    }
    if (window.confirm('Are you sure you want to delete this resource from the bench?')) {
      const updatedList = benchList.filter(res => res.id !== id);
      setBenchList(updatedList);
      localStorage.setItem('benchList', JSON.stringify(updatedList));
    }
  };

  const filteredBench = benchList.filter(res => {
    const matchesSearch = res.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.dept.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDept = selectedDept === 'All' || res.dept === selectedDept;
    
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight flex items-center gap-3">
            <Briefcase className="w-8 h-8 md:w-10 md:h-10 text-blue-500" />
            Bench List
          </h1>
          <p className="text-slate-400 mt-2 font-bold tracking-wide">Detailed inventory of unallocated resources and their bench duration.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          {currentUser?.role !== 'Team Lead' && currentUser?.role !== 'Project Manager' && (
            <button 
              onClick={() => handleExport('CSV')}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-sm font-black text-slate-300 hover:bg-slate-800 hover:text-white transition-all shadow-xl group w-full sm:w-auto"
            >
              <Download className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
              EXPORT CSV
            </button>
          )}
        </div>
      </header>

      {/* Filter Bar */}
      <div className="bg-slate-900/40 border border-slate-800/50 rounded-[2rem] overflow-hidden backdrop-blur-xl">
        <div className="p-4 md:p-8 border-b border-slate-800/50 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between md:gap-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search by name, role or department..."
              className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-sm font-bold text-white focus:outline-none focus:border-blue-500/50 transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <Filter className="w-4 h-4 text-slate-500 hidden sm:block" />
            <select
              className="bg-slate-950/50 border border-slate-800 rounded-xl py-3 px-4 text-sm font-bold text-white focus:outline-none focus:border-blue-500/50 transition-colors flex-1 md:flex-none"
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept} Department</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/30">
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-800">Resource Name</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-800">Department / Role</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-800">Bench Duration</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-800">Monthly Cost</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-800 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filteredBench.map((res) => (
                <tr key={res.id} className="group hover:bg-slate-800/20 transition-colors">
                  <td className="px-6 py-5">
                    {editingId === res.id ? (
                      <input 
                        type="text" 
                        name="name"
                        value={editFormData.name} 
                        onChange={handleInputChange}
                        className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-sm font-bold text-white w-full"
                      />
                    ) : (
                      <p className="text-sm font-black text-white">{res.name}</p>
                    )}
                  </td>
                  <td className="px-6 py-5">
                    {editingId === res.id ? (
                      <div className="space-y-2">
                        <input 
                          type="text" 
                          name="dept"
                          value={editFormData.dept} 
                          onChange={handleInputChange}
                          className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-xs font-bold text-slate-400 w-full"
                        />
                        <input 
                          type="text" 
                          name="role"
                          value={editFormData.role} 
                          onChange={handleInputChange}
                          className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-xs font-bold text-slate-400 w-full"
                        />
                      </div>
                    ) : (
                      <>
                        <p className="text-sm font-black text-blue-500">{res.dept}</p>
                        <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-tighter">{res.role}</p>
                      </>
                    )}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-amber-500" />
                      <span className="text-sm font-bold text-slate-400">{res.benchTime}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-black text-white">{res.cost}</span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {editingId === res.id ? (
                        <>
                          <button onClick={handleSaveEdit} className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-all">
                            <Check className="w-4 h-4" />
                          </button>
                          <button onClick={handleCancelEdit} className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-all">
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        currentUser?.role !== 'Team Lead' && currentUser?.role !== 'Project Manager' && (
                          <>
                            <button 
                              onClick={() => handleEditClick(res)}
                              className="p-2 rounded-lg bg-slate-800/50 text-slate-400 hover:text-blue-500 hover:bg-blue-500/10 transition-all opacity-0 group-hover:opacity-100"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDelete(res.id)}
                              className="p-2 rounded-lg bg-slate-800/50 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-all opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BenchList;