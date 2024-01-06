const express = require('express');
const router = express.Router();
const multer = require('multer');
const knex = require('knex')(require('../knexfile'));
const cors = require('cors');
const path = require('path');

router.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', '..', 'public'));
  },
  filename: function (req, file, cb) {
    console.log(file.originalname)
    const finalFileName = `uploads/${file.originalname}`;
    cb(null, finalFileName);
  },
});

const upload = multer({ storage: storage });

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
  try {
    const uploads = await knex('uploads').select('*');
    console.log('Uploads:', uploads);
    res.json({ uploads });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Post a new file upload.
 * @route POST /uploads
 * @param {string} user_id.body.required - User ID (UUID) associated with the upload
 * @param {file} file.body.required - File to be uploaded (GLTF)
 * @returns {Upload} - Created upload object
 */
router.post('/', upload.single('gltfFile'), async (req, res) => {
  const { user_id } = req.body;
  const filePath = req.file.filename;

  if (!user_id) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  const [newUpload] = await knex('uploads').insert({ user_id, filename: filePath }).returning('*');

  if (!newUpload) {
    throw new Error('Failed to create upload');
  }

  res.json(newUpload);
});

module.exports = router;
