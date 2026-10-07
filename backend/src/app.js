const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const config = require('./config');
const routes = require('./routes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

if (!config.jwtSecret) throw new Error('JWT_SECRET is missing. Copy .env.example to .env and set it.');

const app = express();
app.use(helmet());
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());
app.use('/api', routes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
