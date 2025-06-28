// Import dependencies
const User = require('../models/User');      // Sequelize User model
const jwt = require('jsonwebtoken');         // For generating JWT token
const bcrypt = require('bcrypt');            // For hashing and verifying passwords

// Signup Controller (POST /api/auth/signup)
// Registers a new user and stores their info securely
exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Hash the user's password before saving
  const hashed = await bcrypt.hash(password, 10);

  try {
    // Save the user to the database
    const user = await User.create({ name, email, password: hashed, role });

    // Respond with the user object (excluding password)
    res.json(user);
  } catch (err) {
    // Handle errors like duplicate email, missing fields, etc.
    res.status(400).json({ error: err.message });
  }
};

// Login Controller (POST /api/auth/login)
// Authenticates user and returns a JWT token
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Look up user by email
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(404).json({ error: 'User not found' });

  // Check if password matches hashed password
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: 'Invalid credentials' });

  // Generate a JWT token containing user ID and role
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET
  );

  // Send token to frontend to store (e.g., in localStorage)
  res.json({ token });
};
