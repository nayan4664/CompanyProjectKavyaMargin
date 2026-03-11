import React, { useState, useRef, useEffect } from "react";
import {
  TrendingUp,
  Download,
  Filter,
  FileSpreadsheet,
  IndianRupee,
  ChevronDown,
} from "lucide-react";

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
} from "recharts";

import { exportToCSV } from "../../utils/exportUtils";

/* DATA */

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

const monthsList = [
  "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"
];

const RevenueDashboard = () => {

  const [selectedMonths, setSelectedMonths] = useState([]);
  const [selectedYear, setSelectedYear] = useState("All");
  const [openDropdown, setOpenDropdown] = useState(false);

  const dropdownRef = useRef();

  /* CLOSE DROPDOWN */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);

  }, []);

  /* TOGGLE MONTH */

  const toggleMonth = (month) => {

    if (selectedMonths.includes(month)) {
      setSelectedMonths(selectedMonths.filter((m) => m !== month));
    } else {
      setSelectedMonths([...selectedMonths, month]);
    }

  };

  /* FILTER DATA */

  const filteredData = revenueData.filter((item) => {

    const monthMatch =
      selectedMonths.length === 0 || selectedMonths.includes(item.month);

    const yearMatch =
      selectedYear === "All" || item.year === Number(selectedYear);

    return monthMatch && yearMatch;

  });

  /* KPI */

  const totalBacklog = filteredData.reduce((a, b) => a + b.confirmed, 0);
  const pipeline = filteredData.reduce((a, b) => a + b.weighted, 0);

  const avgRevenue =
    filteredData.length > 0 ? totalBacklog / filteredData.length : 0;

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

          <p className="text-slate-400 mt-2 font-medium">
            Predictive analysis of future revenue streams and margin expectations.
          </p>
        </div>

        <button
          onClick={() => exportToCSV(filteredData, "RevenueForecast.csv")}
          className="flex items-center gap-2 bg-green-600 px-4 py-2 rounded text-white"
        >
          <FileSpreadsheet size={16} />
          <Download size={16} />
          Download
        </button>

      </header>

      {/* FILTER BAR */}

      <div className="flex gap-4 items-center bg-slate-900 p-4 rounded-lg">

        <Filter className="text-gray-400" />

        {/* MONTH DROPDOWN */}

        <div className="relative" ref={dropdownRef}>

          <button
            onClick={() => setOpenDropdown(!openDropdown)}
            className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded"
          >
            Month
            <ChevronDown size={16} />
          </button>

          {openDropdown && (

            <div className="absolute mt-2 w-40 bg-slate-800 rounded shadow-lg p-3 space-y-2 z-50">

              {monthsList.map((month) => (

                <label key={month} className="flex gap-2 text-sm">

                  <input
                    type="checkbox"
                    checked={selectedMonths.includes(month)}
                    onChange={() => toggleMonth(month)}
                  />

                  {month}

                </label>

              ))}

            </div>

          )}

        </div>

        {/* YEAR */}

        <select
          className="bg-slate-800 p-2 rounded"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="All">All Years</option>
          <option value="2026">2026</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
        </select>

        {/* RESET */}

        <button
          onClick={() => {
            setSelectedMonths([]);
            setSelectedYear("All");
          }}
          className="bg-gray-700 px-4 py-2 rounded"
        >
          Reset
        </button>

      </div>

      {/* KPI */}

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-xs text-gray-400">Total Backlog</p>
          <h3 className="text-2xl">{formatCurrency(totalBacklog)}</h3>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-xs text-gray-400">Weighted Pipeline</p>
          <h3 className="text-2xl text-blue-400">{formatCurrency(pipeline)}</h3>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <p className="text-xs text-gray-400">Revenue / Month</p>
          <h3 className="text-2xl">{formatCurrency(avgRevenue)}</h3>
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

            <Bar dataKey="confirmed" fill="#0ea5e9" />

            <Bar dataKey="weighted" fill="#1e293b" />

            <Line dataKey="target" stroke="#f59e0b" strokeWidth={3} />

          </ComposedChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

};

export default RevenueDashboard;