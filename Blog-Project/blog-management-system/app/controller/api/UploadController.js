const cloudinary = require('../../config/cloudinary');

class UploadController {
  async uploadImage(req, res) {
    if (!req.file) return res.status(400).json({ status: false, message: 'Please choose a valid image file' });
    if (!cloudinary.isConfigured) {
      return res.status(503).json({ status: false, message: 'Cloudinary is not configured on the server' });
    }

    try {
      const folder = req.body.folder === 'profiles' ? 'ledger/profiles' : 'ledger/blogs';
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder, resource_type: 'image', transformation: [{ quality: 'auto', fetch_format: 'auto' }] },
          (error, value) => (error ? reject(error) : resolve(value)),
        );
        stream.end(req.file.buffer);
      });
      return res.status(201).json({ status: true, data: { url: result.secure_url, publicId: result.public_id } });
    } catch (error) {
      console.error(error);
      return res.status(502).json({ status: false, message: error.message || 'Image upload failed' });
    }
  }
}

module.exports = new UploadController();