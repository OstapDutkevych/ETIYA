const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/auth');
const saveRoutes = require('./routes/saveUser');
const connectDB = require('./helpers/database');

const app = express();

connectDB()

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/api/auth', authRoutes);
app.use('/app', saveRoutes);

module.exports = app;

