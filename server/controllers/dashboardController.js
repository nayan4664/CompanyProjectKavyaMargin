const Employee = require('../models/Employee');
const Invoice = require('../models/Invoice');
const Bench = require('../models/Bench');

// @desc    Get aggregated dashboard stats
// @route   GET /api/dashboard/stats
const getDashboardStats = async (req, res) => {
  try {
    // 1. Total Employee Cost (Monthly)
    const employees = await Employee.find({ status: 'Active' });
    const totalMonthlyEmployeeCost = employees.reduce((acc, emp) => acc + (emp.monthlyCost || 0), 0);

    // 2. Bench Count & Cost
    const benchResources = await Bench.find({ status: { $ne: 'Allocated' } });
    const benchCount = benchResources.length;
    // Extract number from cost string like "₹1.1L/mo"
    const totalBenchCost = benchResources.reduce((acc, res) => {
      const costMatch = res.cost.match(/(\d+(\.\d+)?)/);
      const cost = costMatch ? parseFloat(costMatch[0]) * 100000 : 0;
      return acc + cost;
    }, 0);

    // 3. Total Revenue (from Paid/Pending Invoices)
    const invoices = await Invoice.find({ status: { $in: ['Paid', 'Pending'] } });
    const totalRevenue = invoices.reduce((acc, inv) => acc + (inv.amount || 0), 0);
    const paidRevenue = invoices.filter(i => i.status === 'Paid').reduce((acc, i) => acc + (i.amount || 0), 0);

    // 4. Net Margin (Rough estimate: Revenue - Costs)
    const netMargin = totalRevenue - totalMonthlyEmployeeCost;
    const marginPercentage = totalRevenue > 0 ? (netMargin / totalRevenue) * 100 : 0;

    res.status(200).json({
      totalRevenue,
      paidRevenue,
      totalMonthlyEmployeeCost,
      benchCount,
      totalBenchCost,
      netMargin,
      marginPercentage: marginPercentage.toFixed(2),
      activeProjects: [...new Set(invoices.map(i => i.project))].length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDashboardStats
};
