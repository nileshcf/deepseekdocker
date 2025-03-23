const express = require('express');
const { trainModel, predict } = require('../controllers/modelController');

const router = express.Router();

/**
 * @swagger
 * /api/model/train:
 *   post:
 *     summary: Train model
 *     description: Train the DeepSeek model using uploaded data
 *     responses:
 *       200:
 *         description: Model trained and saved
 *       500:
 *         description: Internal server error
 */
router.post('/train', trainModel);

/**
 * @swagger
 * /api/model/predict:
 *   post:
 *     summary: Make predictions
 *     description: Use the trained model to make predictions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               input:
 *                 type: array
 *                 items:
 *                   type: number
 *                 description: Input data for prediction
 *     responses:
 *       200:
 *         description: Prediction result
 *       500:
 *         description: Internal server error
 */
router.post('/predict', predict);

module.exports = router;