// Swagger Docs: Signup Route
/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string     // User's full name
 *               email:
 *                 type: string     // Must be unique
 *               password:
 *                 type: string     // Will be hashed
 *               role:
 *                 type: string     // "admin" or "operator"
 *     responses:
 *       201:
 *         description: User created
 */

// Swagger Docs: Login Route
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: JWT token returned
 */

// Import dependencies
const express = require('express');
const router = express.Router();

// Import controller logic for signup and login
const { signup, login } = require('../controllers/authController');

// POST /api/auth/signup — Create a new user
router.post('/signup', signup);

// POST /api/auth/login — Log in and receive JWT
router.post('/login', login);

// Export the routes to be mounted in server.js
module.exports = router;
