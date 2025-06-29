// Custom error-handling middleware for Express
// This function will catch any errors passed via next(err) or thrown inside async functions
module.exports = (err, req, res, next) => {
  // Log the full error stack to the console (for debugging purposes)
  console.error(err.stack);

  // Send a JSON error response with appropriate status code and message
  res.status(err.status || 500).json({
    error: err.message || 'Server Error'
  });
};

