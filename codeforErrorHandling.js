// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  // Handle specific error types (e.g., Mongoose validation errors)
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: 'Validation error', errors: err.errors });
  }

  // Handle other errors
  res.status(500).json({ message: 'Internal server error' });
});
// Example route with error handling
app.get('/example', (req, res, next) => {
  try {
    // ... your code ...
    if (somethingWentWrong) {
      throw new Error('Something went wrong');
    }
    // ... more code ...
    res.json({ message: 'Success' });
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
});
// Example async route with error handling
app.get('/async-example', async (req, res, next) => {
  try {
    // ... your asynchronous code ...
    if (somethingWentWrong) {
      throw new Error('Something went wrong');
    }
    // ... more code ...
    res.json({ message: 'Success' });
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
});
class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Usage:
app.get('/custom-error-example', (req, res, next) => {
  try {
    if (somethingWentWrong) {
      throw new CustomError('Custom error message', 400);
    }
    res.json({ message: 'Success' });
  } catch (error) {
    next(error); // Pass the custom error to the global error handler
  }
});
app.post('/mongoose-validation-example', async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Handle Mongoose validation errors
      const validationErrors = {};
      for (const field in error.errors) {
        validationErrors[field] = error.errors[field].message;
      }
      return res.status(400).json({ message: 'Validation error', errors: validationErrors });
    }
    next(error); // Pass other errors to the global error handler
  }
});
