//Configure Passport and JWT
const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const jwtSecret = 'your-secret-key'; // Replace with a secure secret key

// Passport configuration
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
};

passport.use(new JwtStrategy(jwtOptions, (jwtPayload, done) => {
  // Check if the user exists in the database based on the payload
  User.findById(jwtPayload.id, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
}));

// Registration route
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();
    // Respond with a success message
    res.status(201).json({ message: 'Registration successful', user: savedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
  // Compare the provided password with the stored hashed password
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
  // Generate a JWT token
  const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });
  // Respond with the token
  res.json({ message: 'Authentication successful', token });
});
// protected route
app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: 'Protected route accessed' });
});
