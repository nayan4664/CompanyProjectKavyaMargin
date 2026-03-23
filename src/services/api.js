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
  { id: '1', name: 'Nayan Sharma', email: 'nayan@kavyainfoweb.com', role: 'Super Admin', department: 'Executive', status: 'Active', joiningDate: '2023-01-15', CTC: 2400000, monthlyCost: 200000 },
  { id: '2', name: 'Sushil Kumar', email: 'sushil@kavyainfoweb.com', role: 'Company Admin', department: 'Management', status: 'Active', joiningDate: '2023-02-10', CTC: 1800000, monthlyCost: 150000 },
  { id: '3', name: 'Rajni Singh', email: 'rajni@kavyainfoweb.com', role: 'Project Manager', department: 'Operations', status: 'Active', joiningDate: '2023-03-05', CTC: 1500000, monthlyCost: 125000 }
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
  'nayan@kavyainfoweb.com': { 
    password: 'Nayan@4664', 
    role: 'Super Admin', 
    fullName: 'Nayan Sharma',
    contactNo: '+91 98765 43210',
    address: 'Executive Wing, Tech Park, Nagpur'
  },
  'sushil@kavyainfoweb.com': { 
    password: 'Sushil@4664', 
    role: 'Company Admin', 
    fullName: 'Sushil Kumar',
    contactNo: '+91 98765 43211',
    address: 'Management Block, Tech Park, Nagpur'
  },
  'rajni@kavyainfoweb.com': { 
    password: 'Rajni@4664', 
    role: 'Project Manager', 
    fullName: 'Rajni Singh',
    contactNo: '+91 98765 43212',
    address: 'Operations Floor, Tech Park, Nagpur'
  },
  'raj@kavyainfoweb.com': { 
    password: 'Raj@4664', 
    role: 'HR', 
    fullName: 'Raj Malhotra',
    contactNo: '+91 98765 43213',
    address: 'HR Department, Tech Park, Nagpur'
  },
  'priti@kavyainfoweb.com': { 
    password: 'Priti@4664', 
    role: 'Team Lead', 
    fullName: 'Priti Deshmukh',
    contactNo: '+91 98765 43214',
    address: 'Engineering Bay, Tech Park, Nagpur'
  }
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
    
    // 1. Check if the user exists in registered users (localStorage)
    const registeredUsers = getStorageItem('mock_registered_users', []);
    const registeredUser = registeredUsers.find(u => u.email.toLowerCase() === normalizedEmail);

    if (registeredUser) {
      // If it's a registered user, check if they are using one of the hardcoded passwords or their own
      const hardcodedUser = HARDCODED_USERS[normalizedEmail];
      const expectedPassword = hardcodedUser ? hardcodedUser.password : registeredUser.password;

      if (password === expectedPassword) {
        const userData = {
          _id: 'reg_' + Date.now(),
          fullName: registeredUser.fullName,
          email: registeredUser.email,
          role: registeredUser.role,
          contactNo: registeredUser.contactNo,
          address: registeredUser.address,
          token: 'mock_token_reg_' + Date.now()
        };
        return { data: userData };
      } else {
        throw { response: { data: { message: 'Invalid email or password' } } };
      }
    }

    // If email is not in mock_registered_users, login fails
    throw { response: { data: { message: 'This email has not been registered yet. Please register first.' } } };
  },
  register: async (userData) => {
    await delay();
    
    // Save the new user to localStorage so they can login later with their provided data
    const registeredUsers = getStorageItem('mock_registered_users', []);
    
    // Check if email already exists in registered list
    const exists = registeredUsers.some(u => u.email.toLowerCase() === userData.email.toLowerCase());
    if (exists) {
      throw { response: { data: { message: 'User already registered' } } };
    }

    const newUser = {
      ...userData,
      id: 'user_' + Date.now()
    };
    
    setStorageItem('mock_registered_users', [...registeredUsers, newUser]);
    
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
    return { 
      data: {
        projections: [
          { month: 'Jul', revenue: 4500000, cost: 3100000, target: 4200000 },
          { month: 'Aug', revenue: 4800000, cost: 3200000, target: 4500000 },
          { month: 'Sep', revenue: 5200000, cost: 3400000, target: 4800000 },
          { month: 'Oct', revenue: 5800000, cost: 3600000, target: 5200000 },
          { month: 'Nov', revenue: 6400000, cost: 3900000, target: 5800000 },
          { month: 'Dec', revenue: 7200000, cost: 4200000, target: 6500000 },
        ],
        summary: {
          totalEstRevenue: 33900000,
          totalEstCost: 21400000,
          projectedMargin: 36.8,
          forecastAccuracy: 94.2
        },
        recommendations: [
          { title: 'Optimize Bench Utilization', impact: 'High Impact', desc: 'Reallocating 5 resources from bench to Project X can increase Q4 margin by 2.4%.' },
          { title: 'Offshore Transition', impact: 'Medium Impact', desc: 'Moving 15% of support tasks to offshore teams will reduce operational costs by ₹1.2M.' },
          { title: 'Billing Rate Review', impact: 'Low Impact', desc: 'Updating rates for legacy contracts could yield an additional ₹400k in H2.' }
        ]
      }
    };
  }
};

export default {};