import React, { useState, useEffect } from 'react';
import { Briefcase, Search, Download, Filter, Clock, AlertTriangle, ExternalLink, MoreVertical, Edit2, Trash2, Check, X } from 'lucide-react';
import { exportToCSV, exportToXML } from '../../utils/exportUtils';

const defaultBenchData = [
  { id: 1, name: 'Rahul Reddy', role: 'Product Manager', dept: 'Product', benchTime: '45 Days', cost: '₹2.0L/mo', status: 'Available' },
  { id: 2, name: 'Kiran Deep', role: 'QA Lead', dept: 'Engineering', benchTime: '12 Days', cost: '₹1.1L/mo', status: 'Interviewing' },
  { id: 3, name: 'Sneha Rao', role: 'Data Analyst', dept: 'Data', benchTime: '62 Days', cost: '₹1.4L/mo', status: 'Available' },
  { id: 4, name: 'Vikram Singh', role: 'DevOps Engineer', dept: 'Engineering', benchTime: '5 Days', cost: '₹1.8L/mo', status: 'Available' },
];

const BenchList = () => {
  const [benchList, setBenchList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(user);

    const storedBench = JSON.parse(localStorage.getItem('benchList'));
    if (storedBench) {
      setBenchList(storedBench);
    } else {
      setBenchList(defaultBenchData);
      localStorage.setItem('benchList', JSON.stringify(defaultBenchData));
    }
  }, []);

  const handleEditClick = (res) => {
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
    if (window.confirm('Are you sure you want to delete this resource from the bench?')) {
      const updatedList = benchList.filter(res => res.id !== id);
      setBenchList(updatedList);
      localStorage.setItem('benchList', JSON.stringify(updatedList));
    }
  };

  const filteredBench = benchList.filter(res => 
    res.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    res.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    res.dept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 tracking-tight flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-blue-500" />
            Bench List
          </h1>
          <p className="text-slate-400 mt-2 font-medium">Detailed inventory of unallocated resources and their bench duration.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => exportToCSV(benchList, 'Bench_Resources.csv')}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm font-bold text-slate-300 hover:bg-slate-800 transition-all shadow-sm"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button 
            onClick={() => exportToXML(benchList, 'Bench_Resources.xml', 'BenchResources')}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm font-bold text-slate-300 hover:bg-slate-800 transition-all shadow-sm"
          >
            <Download className="w-4 h-4" />
            Export XML
          </button>
        </div>
      </header>

      {/* Bench Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 shadow-sm transition-colors">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Bench Count</p>
          <div className="mt-2 flex items-baseline gap-2">
            <h3 className="text-3xl font-black text-slate-100">{benchList.length}</h3>
            <span className="text-xs font-bold text-slate-500">Resources</span>
          </div>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 shadow-sm transition-colors">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Avg. Bench Time</p>
          <div className="mt-2 flex items-baseline gap-2">
            <h3 className="text-3xl font-black text-slate-100">
              {benchList.length > 0 
                ? Math.round(benchList.reduce((acc, curr) => acc + parseInt(curr.benchTime), 0) / benchList.length) 
                : 0}
            </h3>
            <span className="text-xs font-bold text-slate-500">Days</span>
          </div>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 shadow-sm transition-colors">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Critical ({'>'}60 Days)</p>
          <div className="mt-2 flex items-baseline gap-2">
            <h3 className="text-3xl font-black text-rose-500">
              {benchList.filter(res => parseInt(res.benchTime) > 60).length.toString().padStart(2, '0')}
            </h3>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
        </div>
      </div>

      {/* Bench Table */}
      <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800 shadow-sm overflow-hidden transition-colors">
        <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search by name or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none text-slate-200 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all border border-slate-700">
            <Filter className="w-4 h-4" />
            Filter by Dept
          </button>
        </div>
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/50">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Resource</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Dept</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Bench Time</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Cost Impact</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500">Status</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredBench.map((res) => (
                <tr key={res.id} className="hover:bg-slate-800/50 transition-colors group">
                  <td className="px-6 py-4">
                    {editingId === res.id ? (
                      <div className="space-y-2">
                        <input 
                          type="text" 
                          name="name"
                          value={editFormData.name}
                          onChange={handleInputChange}
                          className="w-full px-2 py-1 bg-slate-950 border border-slate-800 rounded text-sm text-slate-100 outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <input 
                          type="text" 
                          name="role"
                          value={editFormData.role}
                          onChange={handleInputChange}
                          className="w-full px-2 py-1 bg-slate-950 border border-slate-800 rounded text-xs text-slate-400 outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm font-bold text-slate-100">{res.name}</p>
                        <p className="text-xs text-slate-400 font-medium">{res.role}</p>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === res.id ? (
                      <select 
                        name="dept"
                        value={editFormData.dept}
                        onChange={handleInputChange}
                        className="px-2 py-1 bg-slate-950 border border-slate-800 rounded text-xs text-slate-100 outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="Design">Design</option>
                        <option value="Product">Product</option>
                        <option value="Engineering">Engineering</option>
                        <option value="HR">HR</option>
                        <option value="Data">Data</option>
                      </select>
                    ) : (
                      <span className="text-xs font-bold text-slate-500">{res.dept}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === res.id ? (
                      <input 
                        type="text" 
                        name="benchTime"
                        value={editFormData.benchTime}
                        onChange={handleInputChange}
                        className="w-24 px-2 py-1 bg-slate-950 border border-slate-800 rounded text-sm text-slate-100 outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <Clock className={`w-3.5 h-3.5 ${parseInt(res.benchTime) > 30 ? 'text-rose-500' : 'text-slate-500'}`} />
                        <span className={`text-sm font-bold ${parseInt(res.benchTime) > 30 ? 'text-rose-400' : 'text-slate-300'}`}>
                          {res.benchTime}
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === res.id ? (
                      <input 
                        type="text" 
                        name="cost"
                        value={editFormData.cost}
                        onChange={handleInputChange}
                        className="w-24 px-2 py-1 bg-slate-950 border border-slate-800 rounded text-sm text-slate-100 outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    ) : (
                      <span className="text-sm font-black text-slate-100">{res.cost}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === res.id ? (
                      <select 
                        name="status"
                        value={editFormData.status}
                        onChange={handleInputChange}
                        className="px-2 py-1 bg-slate-950 border border-slate-800 rounded text-[10px] text-slate-100 outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="Available">Available</option>
                        <option value="Interviewing">Interviewing</option>
                        <option value="Allocated">Allocated</option>
                      </select>
                    ) : (
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                        res.status === 'Interviewing' 
                          ? 'bg-amber-500/10 text-amber-400' 
                          : 'bg-emerald-500/10 text-emerald-400'
                      }`}>
                        {res.status}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {currentUser?.role !== 'Project Manager' && currentUser?.role !== 'Team Lead' && (
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {editingId === res.id ? (
                          <>
                            <button 
                              onClick={handleSaveEdit}
                              className="p-2 text-emerald-500 hover:bg-emerald-500/10 rounded-lg transition-all" 
                              title="Save"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={handleCancelEdit}
                              className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all" 
                              title="Cancel"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button 
                              onClick={() => handleEditClick(res)}
                              className="p-2 text-slate-500 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-all" 
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDelete(res.id)}
                              className="p-2 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-all" 
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-slate-500 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-all" title="Reallocate">
                              <ExternalLink className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    )}
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
