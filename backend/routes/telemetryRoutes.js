/**
 * @swagger
 * /api/telemetry:
 *   post:
 *     summary: Submit telemetry data
 *     tags: [Telemetry]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               droneId:
 *                 type: string
 *               gps:
 *                 type: string
 *               altitude:
 *                 type: number
 *               speed:
 *                 type: number
 *               battery:
 *                 type: number
 *     responses:
 *       201:
 *         description: Telemetry saved
 */

const express = require('express');
const router = express.Router();

const { receiveTelemetry } = require('../controllers/telemetryController');
const verifyToken = require('../middleware/verifyToken');
const { Telemetry } = require('../models'); // Import model to fetch data

// POST /api/telemetry
// Save telemetry data sent from drone
router.post('/', verifyToken, receiveTelemetry);

// GET /api/telemetry/:droneId - Get latest telemetry by drone ID
router.get('/:droneId', verifyToken, async (req, res) => {
  try {
    const { droneId } = req.params;

    const data = await Telemetry.findOne({
      where: { droneId },
      order: [['createdAt', 'DESC']] // get latest
    });

    if (!data) {
      return res.status(404).json({ error: 'No telemetry found for this drone' });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch telemetry' });
  }
});


// Export router to use in server.js
module.exports = router;
