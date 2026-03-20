import React, { useState } from 'react';
import { Network, Plus, Trash2, Users, Download, Info } from 'lucide-react';
import { exportToCSV } from '../../utils/exportUtils';

const DepartmentMapping = () => {
  const [departments, setDepartments] = useState([
    { id: 1, name: 'Engineering', head: 'Rajesh Kumar', staffCount: 145, budget: '₹12M' },
    { id: 2, name: 'Product Management', head: 'Sneha Reddy', staffCount: 24, budget: '₹4M' },
    { id: 3, name: 'Design', head: 'Ananya Singh', staffCount: 18, budget: '₹2.5M' },
    { id: 4, name: 'Sales & Marketing', head: 'Vikram Mehta', staffCount: 32, budget: '₹6M' },
    { id: 5, name: 'Human Resources', head: 'Priya Sharma', staffCount: 12, budget: '₹1.8M' },
  ]);

  const [newDept, setNewDept] = useState({ name: '', head: '', staffCount: '', budget: '' });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!newDept.name.trim()) {
      newErrors.name = 'Department Name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(newDept.name)) {
      newErrors.name = 'Name should contain only letters';
    }

    if (!newDept.head.trim()) {
      newErrors.head = 'Department Head is required';
    } else if (!/^[a-zA-Z\s]+$/.test(newDept.head)) {
      newErrors.head = 'Head Name should contain only letters';
    }

    if (newDept.staffCount === '' || Number(newDept.staffCount) < 0) {
      newErrors.staffCount = 'Cannot be negative';
    }

    if (!newDept.budget.trim()) {
      newErrors.budget = 'Budget is required';
    } else if (newDept.budget.includes('-')) {
      newErrors.budget = 'Budget cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddDept = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setDepartments([...departments, { ...newDept, id: Date.now() }]);
    setNewDept({ name: '', head: '', staffCount: '', budget: '' });
    setErrors({});
  };

  const deleteDept = (id) => {
    setDepartments(departments.filter(d => d.id !== id));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 tracking-tight flex items-center gap-3">
            <Network className="w-8 h-8 text-blue-500" />
            Department Mapping
          </h1>
          <p className="text-slate-400 mt-2 font-medium">Define your organizational structure and departmental ownership.</p>
        </div>
        <button 
          onClick={() => exportToCSV(departments, 'Departments.csv')}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm font-bold text-slate-300 hover:bg-slate-800 transition-all shadow-sm"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Dept Form */}
        <div className="bg-slate-900/50 backdrop-blur-xl p-8 rounded-2xl border border-slate-800 shadow-sm h-fit transition-all">
          <h3 className="text-lg font-bold text-slate-100 mb-6">Create Department</h3>
          <form onSubmit={handleAddDept} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300 ml-1">Department Name</label>
              <input 
                type="text" 
                placeholder="e.g. Quality Assurance"
                value={newDept.name}
                onChange={(e) => {
                  setNewDept({ ...newDept, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: '' });
                }}
                className={`w-full px-4 py-2.5 bg-slate-800/50 border ${errors.name ? 'border-rose-500/50 focus:ring-rose-500/20' : 'border-slate-700 focus:ring-blue-500/20'} rounded-xl text-sm outline-none focus:ring-2 text-slate-200`} 
              />
              {errors.name && <p className="text-[10px] text-rose-500 font-bold ml-1">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300 ml-1">Department Head</label>
              <input 
                type="text" 
                placeholder="Manager Name"
                value={newDept.head}
                onChange={(e) => {
                  setNewDept({ ...newDept, head: e.target.value });
                  if (errors.head) setErrors({ ...errors, head: '' });
                }}
                className={`w-full px-4 py-2.5 bg-slate-800/50 border ${errors.head ? 'border-rose-500/50 focus:ring-rose-500/20' : 'border-slate-700 focus:ring-blue-500/20'} rounded-xl text-sm outline-none focus:ring-2 text-slate-200`} 
              />
              {errors.head && <p className="text-[10px] text-rose-500 font-bold ml-1">{errors.head}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-300 ml-1">Staff Count</label>
                <input 
                  type="number" 
                  placeholder="0"
                  value={newDept.staffCount}
                  onChange={(e) => {
                    setNewDept({ ...newDept, staffCount: e.target.value });
                    if (errors.staffCount) setErrors({ ...errors, staffCount: '' });
                  }}
                  className={`w-full px-4 py-2.5 bg-slate-800/50 border ${errors.staffCount ? 'border-rose-500/50 focus:ring-rose-500/20' : 'border-slate-700 focus:ring-blue-500/20'} rounded-xl text-sm outline-none focus:ring-2 text-slate-200`} 
                />
                {errors.staffCount && <p className="text-[10px] text-rose-500 font-bold ml-1">{errors.staffCount}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-300 ml-1">Budget</label>
                <input 
                  type="text" 
                  placeholder="₹0"
                  value={newDept.budget}
                  onChange={(e) => {
                    setNewDept({ ...newDept, budget: e.target.value });
                    if (errors.budget) setErrors({ ...errors, budget: '' });
                  }}
                  className={`w-full px-4 py-2.5 bg-slate-800/50 border ${errors.budget ? 'border-rose-500/50 focus:ring-rose-500/20' : 'border-slate-700 focus:ring-blue-500/20'} rounded-xl text-sm outline-none focus:ring-2 text-slate-200`} 
                />
                {errors.budget && <p className="text-[10px] text-rose-500 font-bold ml-1">{errors.budget}</p>}
              </div>
            </div>
            <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20">
              <Plus className="w-4 h-4" />
              Create Department
            </button>
          </form>
        </div>

        {/* Dept Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {departments.map((dept) => (
            <div key={dept.id} className="bg-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 shadow-sm hover:border-blue-500/50 transition-all group relative">
              <button 
                onClick={() => deleteDept(dept.id)}
                className="absolute top-4 right-4 p-2 text-slate-600 hover:text-rose-400 hover:bg-rose-900/20 rounded-lg transition-all opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-400">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-100">{dept.name}</h4>
                  <p className="text-xs text-slate-400 font-medium">Head: {dept.head}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-3 bg-slate-800/50 rounded-xl">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Team Size</p>
                  <p className="text-lg font-black text-slate-300 mt-1">{dept.staffCount}</p>
                </div>
                <div className="p-3 bg-slate-800/50 rounded-xl">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Annual Budget</p>
                  <p className="text-lg font-black text-slate-300 mt-1">{dept.budget}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="md:col-span-2 p-4 bg-amber-900/10 rounded-xl flex gap-3 border border-amber-900/20 transition-colors">
            <span className="text-amber-400 shrink-0">
              <Info className="w-5 h-5" />
            </span>
            <p className="text-[11px] text-amber-300 font-medium leading-relaxed">
              Departments are used for cost allocation and resource grouping. Ensure the "Head of Department" is correctly mapped for approval workflows.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentMapping;
