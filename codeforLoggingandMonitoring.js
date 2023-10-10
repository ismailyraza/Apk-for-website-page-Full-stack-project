const winston = require('winston');

// Create a logger instance
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(), // Log to the console
    new winston.transports.File({ filename: 'error.log', level: 'error' }), // Log errors to a file
    new winston.transports.File({ filename: 'combined.log' }), // Log everything to a different file
  ],
});

// Example usage:
logger.info('This is an info message');
logger.error('This is an error message');
// Error handling middleware
app.use((err, req, res, next) => {
  // Log the error
  logger.error(err.stack);

  // Handle the error and respond to the client
  res.status(500).json({ error: 'Something went wrong' });
});
const express = require('express');
const prometheus = require('prom-client');

const app = express();
const port = 3000;

// Create a Prometheus counter
const requestCounter = new prometheus.Counter({
  name: 'app_requests_total',
  help: 'Total number of requests to the app',
});

app.use((req, res, next) => {
  // Increment the request counter for each incoming request
  requestCounter.inc();
  next();
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Expose Prometheus metrics at /metrics
app.get('/metrics', (req, res) => {
  res.set('Content-Type', prometheus.register.contentType);
  res.end(prometheus.register.metrics());
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
