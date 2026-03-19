require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const employeeRoutes = require('./routes/employeeRoutes');
const authRoutes = require('./routes/authRoutes');
const benchRoutes = require('./routes/benchRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const companyRoutes = require('./routes/companyRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const forecastRoutes = require('./routes/forecastRoutes');

const app = express();

// Connect to Database
connectDB();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/employees', employeeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/bench', benchRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/forecast', forecastRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.json({ message: 'KavyaMargin API is running' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
