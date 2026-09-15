const express = require('express');
const { protect } = require('../../middleware/auth');
const upload = require('../../middleware/upload');
const UploadController = require('../../controller/api/UploadController');

const router = express.Router();
router.post('/image', protect, upload.single('image'), UploadController.uploadImage);

module.exports = router;