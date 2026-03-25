const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Employee = require('./models/employee');
const Resource = require('./models/resource');
const Risk = require('./models/risk');
const Margin = require('./models/margin');
const Revenue = require('./models/revenue');
const ForecastReport = require('./models/forecastReport');
const MarginTrend = require('./models/marginTrend');
const Invoice = require('./models/invoice');

dotenv.config();

const employees = [
  { name: 'Nayan Sharma', email: 'nayan@kavyainfoweb.com', role: 'Super Admin', department: 'Executive', joiningDate: '2023-01-15', CTC: 2400000, monthlyCost: 200000, location: 'Nagpur' },
  { name: 'Sushil Kumar', email: 'sushil@kavyainfoweb.com', role: 'Company Admin', department: 'Management', joiningDate: '2023-02-10', CTC: 1800000, monthlyCost: 150000, location: 'Nagpur' },
  { name: 'Rajni Singh', email: 'rajni@kavyainfoweb.com', role: 'Project Manager', department: 'Operations', joiningDate: '2023-03-05', CTC: 1500000, monthlyCost: 125000, location: 'Nagpur' }
];

const resources = [
  { name: 'Amit Verma', role: 'Frontend Developer', primarySkill: 'React.js', secondarySkill: 'Node.js', proficiencyLevel: 'Expert', experienceYears: 5, currentProject: 'Project Alpha', releaseDate: '2026-04-15', availabilityPercentage: 0, allocationPercentage: 100, department: 'Frontend' },
  { name: 'Sonal Singh', role: 'UI/UX Designer', primarySkill: 'Figma', secondarySkill: 'Adobe XD', proficiencyLevel: 'Advanced', experienceYears: 4, currentProject: 'Design System', releaseDate: '2026-03-20', availabilityPercentage: 20, allocationPercentage: 80, department: 'Design' },
  { name: 'Rahul Kapoor', role: 'Backend Developer', primarySkill: 'Node.js', secondarySkill: 'Express.js', proficiencyLevel: 'Expert', experienceYears: 6, currentProject: 'Project Alpha', releaseDate: '2026-05-10', availabilityPercentage: 0, allocationPercentage: 100, department: 'Backend' },
  { name: 'Priya Das', role: 'QA Engineer', primarySkill: 'Selenium', secondarySkill: 'Cypress', proficiencyLevel: 'Advanced', experienceYears: 3, currentProject: 'Bench', releaseDate: '2026-04-20', availabilityPercentage: 100, allocationPercentage: 0, department: 'QA' }
];

const risks = [
  { name: 'Project Alpha Margin Leakage', impact: 'High', probability: '70%', score: 85, category: 'Financial', action: 'Shift 2 FTEs to Offshore' },
  { name: 'Resource Bench Duration', impact: 'Medium', probability: '40%', score: 45, category: 'Resource', action: 'Internal Skill Upskilling' },
  { name: 'Delayed Invoice Payment', impact: 'High', probability: '60%', score: 72, category: 'Financial', action: 'Automate Reminders' },
  { name: 'Offshore Ramp-up Delay', impact: 'Medium', probability: '80%', score: 64, category: 'Operations', action: 'Accelerate Hiring' },
  { name: 'Contract SLA Breach', impact: 'Low', probability: '20%', score: 18, category: 'Legal', action: 'Review Clause 4.2' },
  { name: 'Utilization Efficiency Drop', impact: 'Medium', probability: '50%', score: 52, category: 'Resource', action: 'Reassign from Bench' }
];

const margins = [
  { name: 'Project Alpha', client: 'TechCorp', margin: 32, revenue: '₹4.5M', status: 'On Track' },
  { name: 'Project Beta', client: 'GlobalSoft', margin: 18, revenue: '₹2.1M', status: 'At Risk' },
  { name: 'Mobile App', client: 'FitTrack', margin: 42, revenue: '₹3.2M', status: 'Exceeding' },
  { name: 'Cloud Migration', client: 'SkyHigh', margin: 25, revenue: '₹8.4M', status: 'On Track' },
  { name: 'ERP Sync', client: 'DataFlow', margin: 15, revenue: '₹1.8M', status: 'At Risk' }
];

const revenues = [
  { month: "Jan", year: 2025, confirmed: 3200000, weighted: 3500000, target: 3600000 },
  { month: "Feb", year: 2025, confirmed: 3000000, weighted: 3400000, target: 3500000 },
  { month: "Mar", year: 2025, confirmed: 4200000, weighted: 4700000, target: 4500000 },
  { month: "Apr", year: 2025, confirmed: 3900000, weighted: 4300000, target: 4200000 },
  { month: "May", year: 2025, confirmed: 4100000, weighted: 4600000, target: 4500000 },
  { month: "Jun", year: 2025, confirmed: 4500000, weighted: 5000000, target: 4700000 },
  { month: "Jul", year: 2025, confirmed: 4800000, weighted: 5200000, target: 5000000 },
  { month: "Aug", year: 2025, confirmed: 4600000, weighted: 5100000, target: 4900000 },
  { month: "Sep", year: 2025, confirmed: 5000000, weighted: 5500000, target: 5300000 },
  { month: "Oct", year: 2025, confirmed: 5200000, weighted: 5800000, target: 5500000 },
  { month: "Nov", year: 2025, confirmed: 5500000, weighted: 6000000, target: 5800000 },
  { month: "Dec", year: 2025, confirmed: 6000000, weighted: 6500000, target: 6200000 },
  { month: "Jan", year: 2024, confirmed: 2800000, weighted: 3100000, target: 3000000 },
  { month: "Feb", year: 2024, confirmed: 2900000, weighted: 3200000, target: 3100000 },
  { month: "Mar", year: 2024, confirmed: 3100000, weighted: 3400000, target: 3300000 },
  { month: "Apr", year: 2024, confirmed: 3300000, weighted: 3600000, target: 3500000 },
  { month: "May", year: 2024, confirmed: 3500000, weighted: 3800000, target: 3700000 },
  { month: "Jun", year: 2024, confirmed: 3700000, weighted: 4000000, target: 3900000 },
  { month: "Jul", year: 2024, confirmed: 3500000, weighted: 3900000, target: 3800000 },
  { month: "Aug", year: 2024, confirmed: 3700000, weighted: 4100000, target: 4000000 },
  { month: "Sep", year: 2024, confirmed: 3600000, weighted: 4200000, target: 4100000 },
  { month: "Oct", year: 2024, confirmed: 3800000, weighted: 4300000, target: 4200000 },
  { month: "Nov", year: 2024, confirmed: 4000000, weighted: 4500000, target: 4400000 },
  { month: "Dec", year: 2024, confirmed: 4200000, weighted: 4700000, target: 4600000 }
];

const forecastReports = [
  { name: "Q1 Performance Review", type: "Financial", author: "System AI", date: "2026-04-01", size: "1.2 MB" },
  { name: "H2 Revenue Projections", type: "Forecast", author: "Admin User", date: "2026-03-15", size: "2.4 MB" },
  { name: "Bench Cost Analysis - Mar", type: "Efficiency", author: "System AI", date: "2026-03-10", size: "0.8 MB" },
  { name: "Annual Strategy Document", type: "Strategy", author: "Project Director", date: "2026-01-05", size: "4.5 MB" }
];

const marginTrends = [
  { month: "Jan", year: 2025, gross: 32, net: 24, target: 30 },
  { month: "Feb", year: 2025, gross: 34, net: 26, target: 30 },
  { month: "Mar", year: 2025, gross: 31, net: 22, target: 30 },
  { month: "Apr", year: 2025, gross: 35, net: 28, target: 30 },
  { month: "May", year: 2025, gross: 38, net: 31, target: 30 },
  { month: "Jun", year: 2025, gross: 36, net: 29, target: 30 }
];

const invoices = [
  { invoiceId: 'INV-2026-001', clientName: 'TechCorp', project: 'Project Alpha', date: '2026-03-01', dueDate: '2026-03-15', items: [{ description: 'Frontend Development', hours: 160, rate: 2500, amount: 400000 }], taxRate: 18, status: 'Paid' },
  { invoiceId: 'INV-2026-002', clientName: 'GlobalSoft', project: 'Project Beta', date: '2026-02-25', dueDate: '2026-03-10', items: [{ description: 'Backend API', hours: 120, rate: 1500, amount: 180000 }], taxRate: 18, status: 'Paid' },
  { invoiceId: 'INV-2026-003', clientName: 'SkyHigh', project: 'Cloud Migration', date: '2026-03-10', dueDate: '2026-03-25', items: [{ description: 'Cloud Infrastructure', hours: 200, rate: 3500, amount: 700000 }], taxRate: 18, status: 'Pending' },
  { invoiceId: 'INV-2026-004', clientName: 'FitTrack', project: 'Mobile App', date: '2026-02-20', dueDate: '2026-03-05', items: [{ description: 'Mobile Development', hours: 100, rate: 2500, amount: 250000 }], taxRate: 18, status: 'Paid' },
  { invoiceId: 'INV-2026-005', clientName: 'DataFlow', project: 'ERP Sync', date: '2026-03-15', dueDate: '2026-03-30', items: [{ description: 'Data Migration', hours: 80, rate: 2000, amount: 160000 }], taxRate: 18, status: 'Pending' }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await Employee.deleteMany();
    await Resource.deleteMany();
    await Risk.deleteMany();
    await Margin.deleteMany();
    await Revenue.deleteMany();
    await ForecastReport.deleteMany();
    await MarginTrend.deleteMany();
    await Invoice.deleteMany();
    console.log('Cleared existing data.');

    // Seed Data
    await Employee.insertMany(employees);
    await Resource.insertMany(resources);
    await Risk.insertMany(risks);
    await Margin.insertMany(margins);
    await Revenue.insertMany(revenues);
    await ForecastReport.insertMany(forecastReports);
    await MarginTrend.insertMany(marginTrends);
    await Invoice.insertMany(invoices);

    console.log('✅ Seeding completed successfully!');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

seedData();
