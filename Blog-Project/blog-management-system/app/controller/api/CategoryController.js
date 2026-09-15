const Category = require('../../models/category');

class CategoryController {
  // POST /api/categories — Private/Admin
  async createCategory(req, res) {
    try {
      const { name, description } = req.body;

      const existing = await Category.findOne({ name: { $regex: `^${name}$`, $options: 'i' } });
      if (existing) {
        return res.status(409).json({ status: false, message: 'Category already exists' });
      }

      const category = await Category.create({ name, description });
      return res.status(201).json({ status: true, data: category });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }

  // PUT /api/categories/:id — Private/Admin
  async updateCategory(req, res) {
    try {
      const { name, description } = req.body;

      if (name) {
        const dup = await Category.findOne({
          name: { $regex: `^${name}$`, $options: 'i' },
          _id: { $ne: req.params.id },
        });
        if (dup) {
          return res.status(409).json({ status: false, message: 'Another category with this name already exists' });
        }
      }

      const category = await Category.findByIdAndUpdate(
        req.params.id,
        { name, description },
        { new: true, runValidators: true }
      );
      if (!category) {
        return res.status(404).json({ status: false, message: 'Category not found' });
      }
      return res.status(200).json({ status: true, data: category });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }

  // DELETE /api/categories/:id — Private/Admin
  async deleteCategory(req, res) {
    try {
      const category = await Category.findByIdAndDelete(req.params.id);
      if (!category) {
        return res.status(404).json({ status: false, message: 'Category not found' });
      }
      return res.status(200).json({ status: true, message: 'Category deleted' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }

  // GET /api/categories — Public
  async getCategories(req, res) {
    try {
      const { isActive } = req.query;
      const filter = {};
      if (isActive !== undefined) filter.isActive = isActive === 'true';

      const categories = await Category.find(filter).sort({ name: 1 });
      return res.status(200).json({ status: true, data: categories });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }

  // PUT /api/categories/:id/activate — Private/Admin
  async activateCategory(req, res) {
    try {
      const category = await Category.findByIdAndUpdate(req.params.id, { isActive: true }, { new: true });
      if (!category) {
        return res.status(404).json({ status: false, message: 'Category not found' });
      }
      return res.status(200).json({ status: true, data: category });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }

  // PUT /api/categories/:id/deactivate — Private/Admin
  async deactivateCategory(req, res) {
    try {
      const category = await Category.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
      if (!category) {
        return res.status(404).json({ status: false, message: 'Category not found' });
      }
      return res.status(200).json({ status: true, data: category });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }
}

module.exports = new CategoryController();
