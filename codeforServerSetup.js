// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Create an Express app
const app = express();

// Define the port for the server (you can use an environment variable here)
const port = process.env.PORT || 3000;

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)
app.use(bodyParser.json()); // Parse JSON request bodies

// Connect to MongoDB (replace with your MongoDB connection URL)
mongoose.connect('mongodb://localhost/userdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Handle MongoDB connection errors
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

// Handle successful MongoDB connection
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define your routes and middleware here

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
