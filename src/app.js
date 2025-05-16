//FLOW nhé: client → route → controller → service → db

const express = require('express');
const app = express();

const userRoutes = require('./routes/user.route');
const authRoutes = require('./routes/auth.route');
const productRoute = require('./routes/product.route');
const categoryRoutes = require('./routes/category.route');
const billRoutes = require('./routes/bill.route');

require('dotenv').config();

app.use(express.json());
app.use('/api/user', userRoutes);
app.use('api/login', authRoutes);
app.use('/product', productRoute);
app.use('/category', categoryRoutes);
app.use('/bill', billRoutes);

module.exports = app;


