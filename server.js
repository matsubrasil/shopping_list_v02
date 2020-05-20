const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');
dotenv.config({ path: './config/config.env' });

const app = express();

app.use(cors());
const connectDB = require('./config/db');

const routes = require('./routes');

const PORT = process.env.PORT || 5000;

connectDB();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.yellow.bold);
});
