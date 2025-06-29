// Import the Telemetry model
const Telemetry = require('../models/Telemetry');

// Controller to receive and store telemetry data
// Route: POST /api/telemetry
// This API is called by drones (or simulators) to send live sensor/position data
exports.receiveTelemetry = async (req, res) => {
  try {
    // Extract data from the request body
    const { droneId, gps, altitude, speed, battery } = req.body;

    // Save the telemetry entry into the database
    const entry = await Telemetry.create({
      droneId,
      gps,
      altitude,
      speed,
      battery,
    });

    // Return the stored entry as confirmation
    res.status(201).json(entry);
  } catch (error) {
    // Handle unexpected server/database errors
    res.status(500).json({ error: 'Failed to save telemetry data' });
  }
};

