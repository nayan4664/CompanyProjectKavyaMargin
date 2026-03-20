import React, { useState, useRef, useEffect } from "react";
import { TrendingUp, Download, Filter, FileSpreadsheet, IndianRupee, PieChart, BarChart3, Target, ChevronDown, Check } from "lucide-react";

import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  AreaChart,
  Area,
  BarChart,
  Cell
} from "recharts";

import { exportToCSV } from "../../utils/exportUtils";

/* Revenue Data */

const revenueData = [
  { month: "Jan", year: 2025, confirmed: 3200000, weighted: 3500000, target: 3600000 },
  { month: "Feb", year: 2025, confirmed: 3000000, weighted: 3400000, target: 3500000 },
  { month: "Mar", year: 2025, confirmed: 4200000, weighted: 4700000, target: 4500000 },
  { month: "Apr", year: 2025, confirmed: 3900000, weighted: 4300000, target: 4200000 },
  { month: "May", year: 2025, confirmed: 4100000, weighted: 4600000, target: 4500000 },
  { month: "Jun", year: 2025, confirmed: 4500000, weighted: 5000000, target: 4700000 },

  { month: "Jul", year: 2024, confirmed: 3500000, weighted: 3900000, target: 3800000 },
  { month: "Aug", year: 2024, confirmed: 3700000, weighted: 4100000, target: 4000000 },
  { month: "Sep", year: 2024, confirmed: 3600000, weighted: 4200000, target: 4100000 },
];

const ALL_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const RevenueDashboard = () => {

  const [selectedMonths, setSelectedMonths] = useState(["All"]);
  const [selectedYear, setSelectedYear] = useState("All");
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMonthDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* FILTER DATA */

  const filteredData = revenueData.filter((item) => {

    const monthMatch =
      selectedMonths.includes("All") || selectedMonths.includes(item.month);

    const yearMatch =
      selectedYear === "All" || item.year === Number(selectedYear);

    return monthMatch && yearMatch;

  });

  const toggleMonth = (month) => {
    if (month === "All") {
      setSelectedMonths(["All"]);
    } else {
      let newMonths = selectedMonths.filter(m => m !== "All");
      if (newMonths.includes(month)) {
        newMonths = newMonths.filter(m => m !== month);
        if (newMonths.length === 0) newMonths = ["All"];
      } else {
        newMonths.push(month);
      }
      setSelectedMonths(newMonths);
    }
  };

  /* KPI CALCULATIONS */

  const totalBacklog = filteredData.reduce(
    (acc, item) => acc + item.confirmed,
    0
  );

  const pipeline = filteredData.reduce(
    (acc, item) => acc + item.weighted,
    0
  );

  const avgRevenue =
    filteredData.length > 0
      ? totalBacklog / filteredData.length
      : 0;

  /* CURRENCY FORMATTER */

  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  return (

    <div
      id="revenue-dashboard-content"
      className="space-y-8 p-6 bg-slate-950 min-h-screen text-white animate-in fade-in duration-500"
    >

      {/* HEADER */}

      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold text-slate-100 tracking-tight flex items-center gap-3">
            <IndianRupee className="w-8 h-8 text-blue-500" />
            Revenue Forecast Dashboard
          </h1>
          <p className="text-slate-400 mt-2 font-medium">Predictive analysis of future revenue streams and margin expectations.</p>
        </div>

        <div className="flex gap-3">

          <button
            onClick={() => exportToCSV(revenueData, 'Revenue_Forecast.csv')}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-300 hover:bg-slate-800"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>

        </div>

      </header>

      {/* FILTERS */}

      <div className="flex gap-4 items-center bg-slate-900 p-4 rounded-lg relative z-50">

        <Filter className="text-gray-400" />

        {/* MONTH MULTI-SELECT FILTER */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsMonthDropdownOpen(!isMonthDropdownOpen)}
            className="flex items-center gap-2 bg-slate-800 p-2 rounded text-sm text-slate-200 min-w-[140px] justify-between border border-slate-700 hover:bg-slate-700 transition-colors"
          >
            <span className="truncate">
              {selectedMonths.includes("All") ? "All Months" : 
               selectedMonths.length > 2 ? `${selectedMonths.length} Selected` : 
               selectedMonths.join(", ")}
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isMonthDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isMonthDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl py-2 animate-in slide-in-from-top-2 duration-200">
              <div
                onClick={() => toggleMonth("All")}
                className="flex items-center gap-3 px-4 py-2 hover:bg-slate-700 cursor-pointer transition-colors"
              >
                <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedMonths.includes("All") ? 'bg-blue-600 border-blue-600' : 'border-slate-600'}`}>
                  {selectedMonths.includes("All") && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="text-sm font-medium text-slate-200">All Months</span>
              </div>
              <div className="h-px bg-slate-700 my-1 mx-2" />
              {ALL_MONTHS.map((month) => (
                <div
                  key={month}
                  onClick={() => toggleMonth(month)}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-slate-700 cursor-pointer transition-colors"
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedMonths.includes(month) ? 'bg-blue-600 border-blue-600' : 'border-slate-600'}`}>
                    {selectedMonths.includes(month) && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-sm font-medium text-slate-200">{month}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* YEAR FILTER */}

        <select
          className="bg-slate-800 p-2 rounded text-sm text-slate-200 border border-slate-700 hover:bg-slate-700 outline-none transition-colors"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="All">All Years</option>
          <option value="2026">2026</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
        </select>

        {/* RESET BUTTON */}

        <button
          onClick={() => {
            setSelectedMonths(["All"]);
            setSelectedYear("All");
          }}
          className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded text-sm font-bold text-slate-300 transition-colors border border-slate-700"
        >
          Reset
        </button>

      </div>

      {/* KPI CARDS */}

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-xs text-gray-400">Total Backlog</p>
          <h3 className="text-2xl">
            {formatCurrency(totalBacklog)}
          </h3>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-xs text-gray-400">Weighted Pipeline</p>
          <h3 className="text-2xl text-blue-400">
            {formatCurrency(pipeline)}
          </h3>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-xs text-gray-400">Revenue / Month</p>
          <h3 className="text-2xl">
            {formatCurrency(avgRevenue)}
          </h3>
        </div>

      </div>

      {/* CHART */}

      <div className="bg-slate-900 p-6 rounded-xl">

        <ResponsiveContainer width="100%" height={400}>

          <ComposedChart data={filteredData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip formatter={(val) => formatCurrency(val)} />

            <Legend />

            <Bar dataKey="confirmed" name="Confirmed Revenue" fill="#0ea5e9" radius={[4, 4, 0, 0]} />

            <Bar dataKey="weighted" name="Weighted Pipeline" fill="#6366f1" radius={[4, 4, 0, 0]} />

            <Line
              type="monotone"
              dataKey="target"
              name="Target Revenue"
              stroke="#f59e0b"
              strokeWidth={3}
              dot={{ fill: '#f59e0b', r: 4 }}
              activeDot={{ r: 6 }}
            />

          </ComposedChart>

        </ResponsiveContainer>

      </div>

    </div>

  );
};

export default RevenueDashboard;