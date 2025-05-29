require('dotenv').config();
const express = require('express');
require("dotenv").config();
const connectDB = require('./utils/db');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const authRoutes=require('./routes/authRoutes')
const planRoutes = require('./routes/planRoutes');

const app = express();
app.use(express.json());

const startServer = async () => {
  await connectDB(); 
  app.use('/api', subscriptionRoutes);
  app.use("/api/auth", authRoutes);
  app.use('/api/plan',planRoutes)


  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer(); 
