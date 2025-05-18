//FLOW nhé: client → route → controller → service → db

const express = require('express');
const cors = require('cors');
const app = express();

// Cho phép FE ở cổng 8080 truy cập
app.use(cors());

const userRoutes = require('./routes/user.route');
const authRoutes = require('./routes/auth.route');
const productRoute = require('./routes/product.route');
const categoryRoutes = require('./routes/category.route');
const billRoutes = require('./routes/bill.route');

require('dotenv').config();

app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/login', authRoutes);
app.use('/api/product', productRoute);
app.use('/api/category', categoryRoutes);
app.use('/api/bill', billRoutes);

module.exports = app;


