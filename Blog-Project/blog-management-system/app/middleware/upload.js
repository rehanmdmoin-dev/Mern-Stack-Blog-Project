const multer = require('multer');

const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (req, file, callback) => callback(null, allowedTypes.includes(file.mimetype)),
});

module.exports = upload;