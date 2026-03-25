require('dns').setDefaultResultOrder('ipv4first');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => {
    console.error('❌ MongoDB connection error:');
    if (err.message.includes('ECONNREFUSED') && err.message.includes('querySrv')) {
      console.error('👉 TIP: This is usually a DNS or Network issue.');
      console.error('👉 Ensure your IP is whitelisted in MongoDB Atlas (Network Access -> 0.0.0.0/0).');
      console.error('👉 If you are using a VPN or Corporate Network, try disconnecting it.');
    }
    console.error(err);
  });

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

const employeeRoutes = require('./routes/employees');
app.use('/api/employees', employeeRoutes);

const benchRoutes = require('./routes/bench');
app.use('/api/bench', benchRoutes);

const invoiceRoutes = require('./routes/invoices');
app.use('/api/invoices', invoiceRoutes);

const revenueRoutes = require('./routes/revenue');
app.use('/api/revenue', revenueRoutes);

const contractRoutes = require('./routes/contracts');
app.use('/api/contracts', contractRoutes);

const companyRoutes = require('./routes/company');
app.use('/api/company', companyRoutes);

const dashboardRoutes = require('./routes/dashboard');
app.use('/api/dashboard', dashboardRoutes);

const forecastRoutes = require('./routes/forecast');
app.use('/api/forecast', forecastRoutes);

const resourceRoutes = require('./routes/resources');
app.use('/api/resources', resourceRoutes);

const riskRoutes = require('./routes/risks');
app.use('/api/risks', riskRoutes);

const marginRoutes = require('./routes/margins');
app.use('/api/margins', marginRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
