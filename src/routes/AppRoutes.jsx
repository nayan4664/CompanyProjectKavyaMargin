import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import DashboardLayout from '../layouts/DashboardLayout';

// Pages - Auth
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

// Pages - Dashboard
import Dashboard from '../pages/dashboard/Dashboard';

// Pages - Organization
import CompanySetup from '../pages/organization/CompanySetup';
import BillingModel from '../pages/organization/BillingModel';
import DepartmentMapping from '../pages/organization/DepartmentMapping';

// Pages - Employee Cost
import EmployeeCostList from '../pages/employee-cost/EmployeeCostList';
import AddEmployeeCost from '../pages/employee-cost/AddEmployeeCost';
import CostBreakdown from '../pages/employee-cost/CostBreakdown';

// Pages - Billing
import BillingRateConfig from '../pages/billing/BillingRateConfig';
import MarginCalculator from '../pages/billing/MarginCalculator';
import ScenarioSimulator from '../pages/billing/ScenarioSimulator';

// Pages - Margin Tracker
import ProjectMarginDashboard from '../pages/margin-tracker/ProjectMarginDashboard';
import BudgetTracking from '../pages/margin-tracker/BudgetTracking';
import BurnRate from '../pages/margin-tracker/BurnRate';

// Pages - AI Prediction
import MarginPrediction from '../pages/ai-prediction/MarginPrediction';
import RiskAnalysis from '../pages/ai-prediction/RiskAnalysis';
import ForecastInsights from '../pages/ai-prediction/ForecastInsights';

// Pages - Resource Allocation
import ResourceDashboard from '../pages/resource-allocation/ResourceDashboard';
import SkillMapping from '../pages/resource-allocation/SkillMapping';
import AvailabilityTracker from '../pages/resource-allocation/AvailabilityTracker';

// Pages - Bench Management
import BenchList from '../pages/bench-management/BenchList';
import BenchCostAnalysis from '../pages/bench-management/BenchCostAnalysis';
import ReallocationSuggestions from '../pages/bench-management/ReallocationSuggestions';

// Pages - Contract Analyzer
import UploadContract from '../pages/contract-analyzer/UploadContract';
import ContractInsights from '../pages/contract-analyzer/ContractInsights';
import SLAAnalysis from '../pages/contract-analyzer/SLAAnalysis';

// Pages - Invoicing
import InvoiceList from '../pages/invoicing/InvoiceList';
import GenerateInvoice from '../pages/invoicing/GenerateInvoice';
import PaymentTracking from '../pages/invoicing/PaymentTracking';

// Pages - Revenue Forecast
import RevenueDashboard from '../pages/revenue-forecast/RevenueDashboard';
import ForecastReport from '../pages/revenue-forecast/ForecastReport';
import MarginTrends from '../pages/revenue-forecast/MarginTrends';

const AppRoutes = () => {

  const ProtectedRoute = ({ children, allowedRoles }) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!allowedRoles.includes(currentUser?.role)) {
      return <Navigate to="/dashboard" replace />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard and Main App Routes */}
        <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
        
        {/* Organization */}
        <Route path="/organization/company-setup" element={<DashboardLayout><ProtectedRoute allowedRoles={['Super Admin', 'Company Admin']}><CompanySetup /></ProtectedRoute></DashboardLayout>} />
        <Route path="/organization/billing-model" element={<DashboardLayout><ProtectedRoute allowedRoles={['Super Admin', 'Company Admin']}><BillingModel /></ProtectedRoute></DashboardLayout>} />
        <Route path="/organization/department-mapping" element={<DashboardLayout><ProtectedRoute allowedRoles={['Super Admin', 'Company Admin']}><DepartmentMapping /></ProtectedRoute></DashboardLayout>} />

        {/* Employee Cost */}
        <Route path="/employee-cost/list" element={<DashboardLayout><EmployeeCostList /></DashboardLayout>} />
        <Route path="/employee-cost/add" element={<DashboardLayout><AddEmployeeCost /></DashboardLayout>} />
        <Route path="/employee-cost/edit/:id" element={<DashboardLayout><AddEmployeeCost /></DashboardLayout>} />
        <Route path="/employee-cost/breakdown" element={<DashboardLayout><CostBreakdown /></DashboardLayout>} />

        {/* Billing */}
        <Route path="/billing/rate-config" element={<DashboardLayout><ProtectedRoute allowedRoles={['Super Admin', 'Company Admin', 'Project Manager']}><BillingRateConfig /></ProtectedRoute></DashboardLayout>} />
        <Route path="/billing/margin-calculator" element={<DashboardLayout><ProtectedRoute allowedRoles={['Super Admin', 'Company Admin', 'Project Manager']}><MarginCalculator /></ProtectedRoute></DashboardLayout>} />
        <Route path="/billing/scenario-simulator" element={<DashboardLayout><ProtectedRoute allowedRoles={['Super Admin', 'Company Admin', 'Project Manager']}><ScenarioSimulator /></ProtectedRoute></DashboardLayout>} />

        {/* Margin Tracker */}
        <Route path="/margin-tracker/dashboard" element={<DashboardLayout><ProjectMarginDashboard /></DashboardLayout>} />
        <Route path="/margin-tracker/budget-tracking" element={<DashboardLayout><BudgetTracking /></DashboardLayout>} />
        <Route path="/margin-tracker/burn-rate" element={<DashboardLayout><BurnRate /></DashboardLayout>} />

        {/* AI Prediction */}
        <Route path="/ai-prediction/margin-prediction" element={<DashboardLayout><ProtectedRoute allowedRoles={['Super Admin', 'Company Admin', 'Project Manager']}><MarginPrediction /></ProtectedRoute></DashboardLayout>} />
        <Route path="/ai-prediction/risk-analysis" element={<DashboardLayout><ProtectedRoute allowedRoles={['Super Admin', 'Company Admin', 'Project Manager']}><RiskAnalysis /></ProtectedRoute></DashboardLayout>} />
        <Route path="/ai-prediction/forecast-insights" element={<DashboardLayout><ProtectedRoute allowedRoles={['Super Admin', 'Company Admin', 'Project Manager']}><ForecastInsights /></ProtectedRoute></DashboardLayout>} />

        {/* Resource Allocation */}
        <Route path="/resource-allocation/dashboard" element={<DashboardLayout><ResourceDashboard /></DashboardLayout>} />
        <Route path="/resource-allocation/skill-mapping" element={<DashboardLayout><SkillMapping /></DashboardLayout>} />
        <Route path="/resource-allocation/availability-tracker" element={<DashboardLayout><AvailabilityTracker /></DashboardLayout>} />

        {/* Bench Management */}
        <Route path="/bench-management/list" element={<DashboardLayout><BenchList /></DashboardLayout>} />
        <Route path="/bench-management/cost-analysis" element={<DashboardLayout><BenchCostAnalysis /></DashboardLayout>} />
        <Route path="/bench-management/reallocation-suggestions" element={<DashboardLayout><ReallocationSuggestions /></DashboardLayout>} />

        {/* Contract Analyzer */}
        <Route path="/contract-analyzer/upload" element={<DashboardLayout><ProtectedRoute allowedRoles={['Super Admin', 'Company Admin', 'Project Manager']}><UploadContract /></ProtectedRoute></DashboardLayout>} />
        <Route path="/contract-analyzer/insights" element={<DashboardLayout><ProtectedRoute allowedRoles={['Super Admin', 'Company Admin', 'Project Manager']}><ContractInsights /></ProtectedRoute></DashboardLayout>} />
        <Route path="/contract-analyzer/sla-analysis" element={<DashboardLayout><ProtectedRoute allowedRoles={['Super Admin', 'Company Admin', 'Project Manager']}><SLAAnalysis /></ProtectedRoute></DashboardLayout>} />

        {/* Invoicing */}
        <Route path="/invoicing/list" element={<DashboardLayout><ProtectedRoute allowedRoles={['Super Admin', 'Company Admin', 'Project Manager', 'HR']}><InvoiceList /></ProtectedRoute></DashboardLayout>} />
        <Route path="/invoicing/generate" element={<DashboardLayout><ProtectedRoute allowedRoles={['Super Admin', 'Company Admin', 'Project Manager', 'HR']}><GenerateInvoice /></ProtectedRoute></DashboardLayout>} />
        <Route path="/invoicing/payment-tracking" element={<DashboardLayout><ProtectedRoute allowedRoles={['Super Admin', 'Company Admin', 'Project Manager', 'HR']}><PaymentTracking /></ProtectedRoute></DashboardLayout>} />

        {/* Revenue Forecast */}
        <Route path="/revenue-forecast/dashboard" element={<DashboardLayout><RevenueDashboard /></DashboardLayout>} />
        <Route path="/revenue-forecast/report" element={<DashboardLayout><ForecastReport /></DashboardLayout>} />
        <Route path="/revenue-forecast/margin-trends" element={<DashboardLayout><ProtectedRoute allowedRoles={['Super Admin', 'Company Admin', 'Project Manager', 'HR', 'Team Lead', 'Viewers']}><MarginTrends /></ProtectedRoute></DashboardLayout>} />

        {/* Redirect for unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
