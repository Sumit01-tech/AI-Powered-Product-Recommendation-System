const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/recommendation.controller');
const auth = require('../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Recommendations
 *   description: Product recommendation endpoints
 */

/**
 * @swagger
 * /api/recommendations/personalized:
 *   get:
 *     summary: Get personalized product recommendations for the logged-in user
 *     tags: [Recommendations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Personalized recommendations returned
 *       401:
 *         description: Unauthorized
 */
router.get('/personalized', auth, ctrl.getRecommendations);

/**
 * @swagger
 * /api/recommendations/trending:
 *   get:
 *     summary: Get trending products based on overall popularity
 *     tags: [Recommendations]
 *     responses:
 *       200:
 *         description: List of trending products
 */
router.get('/trending', ctrl.getTrendingProducts);

module.exports = router;
