const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email addresses are unique
  },
  phone: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Others'],
    required: true,
  },
  howDidYouHear: {
    type: [String],
    enum: ['LinkedIn', 'Friends', 'Job Portal', 'Others'],
    required: true,
  },
  city: {
    type: String,
    enum: ['Mumbai', 'Pune', 'Ahmedabad'],
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  // You can add other fields as needed, such as image URLs or additional user data
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Export the User model for use in your routes and controllers
module.exports = User;
