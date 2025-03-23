const express = require('express');
const { uploadData } = require('../controllers/dataController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

/**
 * @swagger
 * /api/data/upload:
 *   post:
 *     summary: Upload data
 *     description: Upload JSON, CSV, or text data for processing
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               dataType:
 *                 type: string
 *                 description: Type of data (json, csv, text)
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: File to upload (for CSV)
 *               data:
 *                 type: string
 *                 description: Raw data (for JSON or text)
 *     responses:
 *       200:
 *         description: Data processed and saved
 *       400:
 *         description: Invalid data type or missing data
 *       500:
 *         description: Internal server error
 */
router.post('/upload', upload.single('file'), uploadData);

module.exports = router;