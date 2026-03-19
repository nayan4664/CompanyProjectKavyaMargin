// Mock API Services for Frontend-only implementation
// This file replaces axios calls with simulated database logic using localStorage

const getStorageItem = (key, defaultValue) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : defaultValue;
};

const setStorageItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Initial Mock Data
const INITIAL_EMPLOYEES = [
  { id: '1', fullName: 'Nayan Sharma', email: 'nayan@kavyainfoweb.com', role: 'Super Admin', department: 'Executive', status: 'Active', joiningDate: '2023-01-15' },
  { id: '2', fullName: 'Sushil Kumar', email: 'sushil@kavyainfoweb.com', role: 'Company Admin', department: 'Management', status: 'Active', joiningDate: '2023-02-10' },
  { id: '3', fullName: 'Rajni Singh', email: 'rajni@kavyainfoweb.com', role: 'Project Manager', department: 'Operations', status: 'Active', joiningDate: '2023-03-05' }
];

const INITIAL_COMPANY = {
  companyName: '',
  registrationNumber: '',
  taxId: '',
  industry: '',
  website: '',
  email: '',
  phone: '',
  address: '',
  currency: 'INR',
  fiscalYearStart: 'April',
};

const HARDCODED_USERS = {
  'nayan@kavyainfoweb.com': { password: 'Nayan@4664', role: 'Super Admin', fullName: 'Nayan' },
  'sushil@kavyainfoweb.com': { password: 'Sushil@4664', role: 'Company Admin', fullName: 'Sushil' },
  'rajni@kavyainfoweb.com': { password: 'Rajni@4664', role: 'Project Manager', fullName: 'Rajni' },
  'raj@kavyainfoweb.com': { password: 'Raj@4664', role: 'HR', fullName: 'Raj' },
  'priti@kavyainfoweb.com': { password: 'Priti@4664', role: 'Team Lead', fullName: 'Priti' }
};

// Simulated delay to mimic API calls
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Employee Services
export const employeeAPI = {
  getAll: async () => {
    await delay();
    const employees = getStorageItem('mock_employees', INITIAL_EMPLOYEES);
    return { data: employees };
  },
  getById: async (id) => {
    await delay();
    const employees = getStorageItem('mock_employees', INITIAL_EMPLOYEES);
    const employee = employees.find(e => e.id === id);
    return { data: employee };
  },
  create: async (data) => {
    await delay();
    const employees = getStorageItem('mock_employees', INITIAL_EMPLOYEES);
    const newEmployee = { ...data, id: Date.now().toString() };
    setStorageItem('mock_employees', [...employees, newEmployee]);
    return { data: newEmployee };
  },
  update: async (id, data) => {
    await delay();
    const employees = getStorageItem('mock_employees', INITIAL_EMPLOYEES);
    const updatedEmployees = employees.map(e => e.id === id ? { ...e, ...data } : e);
    setStorageItem('mock_employees', updatedEmployees);
    return { data: data };
  },
  delete: async (id) => {
    await delay();
    const employees = getStorageItem('mock_employees', INITIAL_EMPLOYEES);
    const filteredEmployees = employees.filter(e => e.id !== id);
    setStorageItem('mock_employees', filteredEmployees);
    return { data: { success: true } };
  }
};

// Auth Services
export const authAPI = {
  login: async (credentials) => {
    await delay();
    const { email, password } = credentials;
    const normalizedEmail = email.toLowerCase().trim();
    const hardcodedUser = HARDCODED_USERS[normalizedEmail];

    if (hardcodedUser) {
      if (password === hardcodedUser.password) {
        const userData = {
          _id: 'mock_' + Date.now(),
          fullName: hardcodedUser.fullName,
          email: normalizedEmail,
          role: hardcodedUser.role,
          token: 'mock_token_' + Date.now()
        };
        return { data: userData };
      } else {
        throw { response: { data: { message: 'Invalid password for this role account' } } };
      }
    }

    // Default Viewer role for any other email
    const userData = {
      _id: 'viewer_' + Date.now(),
      fullName: normalizedEmail.split('@')[0] || 'Viewer',
      email: normalizedEmail,
      role: 'Viewers',
      token: 'mock_token_viewer_' + Date.now()
    };
    return { data: userData };
  },
  register: async (userData) => {
    await delay();
    return { data: { message: 'Registration successful!', success: true } };
  }
};

// Bench Services
export const benchAPI = {
  getAll: async () => {
    await delay();
    return { data: getStorageItem('mock_bench', []) };
  },
  create: async (data) => {
    await delay();
    const bench = getStorageItem('mock_bench', []);
    const newItem = { ...data, id: Date.now().toString() };
    setStorageItem('mock_bench', [...bench, newItem]);
    return { data: newItem };
  }
};

// Invoice Services
export const invoiceAPI = {
  getAll: async () => {
    await delay();
    return { data: getStorageItem('mock_invoices', []) };
  },
  create: async (data) => {
    await delay();
    const invoices = getStorageItem('mock_invoices', []);
    const newItem = { ...data, id: Date.now().toString() };
    setStorageItem('mock_invoices', [...invoices, newItem]);
    return { data: newItem };
  }
};

// Company Services
export const companyAPI = {
  get: async () => {
    await delay();
    return { data: getStorageItem('mock_company', INITIAL_COMPANY) };
  },
  update: async (data) => {
    await delay();
    setStorageItem('mock_company', data);
    return { data: data };
  }
};

// Dashboard Services
export const dashboardAPI = {
  getStats: async () => {
    await delay();
    return {
      data: {
        totalEmployees: 150,
        activeProjects: 12,
        totalRevenue: '₹45.2M',
        averageMargin: '32.5%'
      }
    };
  }
};

// Forecast Services
export const forecastAPI = {
  getProjections: async () => {
    await delay();
    return { data: [] };
  }
};

export default {};
