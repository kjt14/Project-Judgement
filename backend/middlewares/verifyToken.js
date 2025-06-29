// Import the JWT library
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token for protected routes
function verifyToken(req, res, next) {
  // Get the token from the Authorization header (format: "Bearer <token>")
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Split removes "Bearer "

  // If no token provided, block the request
  if (!token) return res.status(403).json({ error: 'No token provided' });

  // Verify the token using secret from .env
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });

    // If valid, attach user info (id, role, etc.) to request object
    req.user = user;

    // Proceed to next middleware or route
    next();
  });
}

// Export the middleware function for reuse
module.exports = verifyToken;

