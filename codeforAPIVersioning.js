// server.js

const express = require('express');
const app = express();
const port = 3000;

// Middleware for parsing JSON requests
app.use(express.json());

// Include versioned routes
app.use('/v1', require('./routes/v1'));
app.use('/v2', require('./routes/v2'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// routes/v1/users.js

const express = require('express');
const router = express.Router();

// Sample data (replace with your own data source)
const users = [
  { id: 1, name: 'User 1' },
  { id: 2, name: 'User 2' },
];

// Get a list of users
router.get('/users', (req, res) => {
  res.json(users);
});

module.exports = router;
// routes/v2/users.js

const express = require('express');
const router = express.Router();

// Sample data (replace with your own data source)
const users = [
  { id: 1, firstName: 'John', lastName: 'Doe' },
  { id: 2, firstName: 'Jane', lastName: 'Smith' },
];

// Get a list of users with additional fields
router.get('/users', (req, res) => {
  res.json(users);
});

module.exports = router;
