const Tag = require('../../models/tag');

class TagController {
  // POST /api/tags — Private/Admin
  async createTag(req, res) {
    try {
      const { name } = req.body;
      const existing = await Tag.findOne({ name: { $regex: `^${name}$`, $options: 'i' } });
      if (existing) {
        return res.status(409).json({ status: false, message: 'Tag already exists' });
      }

      const tag = await Tag.create({ name });
      return res.status(201).json({ status: true, data: tag });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }

  // PUT /api/tags/:id — Private/Admin
  async updateTag(req, res) {
    try {
      const { name } = req.body;
      const tag = await Tag.findByIdAndUpdate(req.params.id, { name }, { new: true, runValidators: true });
      if (!tag) {
        return res.status(404).json({ status: false, message: 'Tag not found' });
      }
      return res.status(200).json({ status: true, data: tag });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }

  // DELETE /api/tags/:id — Private/Admin
  async deleteTag(req, res) {
    try {
      const tag = await Tag.findByIdAndDelete(req.params.id);
      if (!tag) {
        return res.status(404).json({ status: false, message: 'Tag not found' });
      }
      return res.status(200).json({ status: true, message: 'Tag deleted' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }

  // GET /api/tags — Public
  async getTags(req, res) {
    try {
      const tags = await Tag.find().sort({ name: 1 });
      return res.status(200).json({ status: true, data: tags });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }
}

module.exports = new TagController();
