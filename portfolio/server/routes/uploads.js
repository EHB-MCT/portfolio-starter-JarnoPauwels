const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const knex = require('knex')(require('../knexfile'));

/**
 * @typedef {Object} Upload
 * @property {number} id - Upload ID
 * @property {string} filename - Uploaded file name
 * @property {string} user_id - User ID (UUID) associated with the upload
 */

/**
 * Get all uploads.
 * @route GET /uploads
 * @returns {Upload[]} - Array of uploads
 */
router.get('/', async (req, res) => {
  const uploads = await knex.select().from('uploads');
  res.json(uploads);
});

/**
 * Post a new file upload.
 * @route POST /uploads
 * @param {string} user_id.body.required - User ID (UUID) associated with the upload
 * @param {file} file.body.required - File to be uploaded (GLTF)
 * @returns {Upload} - Created upload object
 */
router.post('/', upload.single('file'), async (req, res) => {
  const { user_id } = req.body;
  const { filename } = req.body;

  const [newUpload] = await knex('uploads').insert({ user_id, filename }).returning('*');
  res.json(newUpload);
});

module.exports = router;
