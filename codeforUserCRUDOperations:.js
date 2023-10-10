//Create a New User


const User = require('./models/user'); // Import the User model


app.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body); // Create a new User instance based on the request body
    const savedUser = await newUser.save(); // Save the user to the database
    res.status(201).json(savedUser); // Respond with the saved user data
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Retrieve User Data
// Retrieve all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find(); // Retrieve all users from the database
    res.json(users); // Respond with the list of users
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Retrieve a single user by ID
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Find a user by ID
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user); // Respond with the user data
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//Update User Data
app.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated user data
    });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser); // Respond with the updated user data
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
//Delete User
app.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndRemove(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
