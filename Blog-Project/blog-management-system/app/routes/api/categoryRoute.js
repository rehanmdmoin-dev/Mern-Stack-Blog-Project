const express = require('express');
const { body } = require('express-validator');
const validate = require('../../middleware/validate');
const { protect } = require('../../middleware/auth');
const authorize = require('../../middleware/authorize');
const CategoryController = require('../../controller/api/CategoryController');

const router = express.Router();

router.get('/', CategoryController.getCategories);

router.post(
  '/',
  protect,
  authorize('admin'),
  [body('name').trim().notEmpty().withMessage('Category name is required')],
  validate,
  CategoryController.createCategory
);

router.put('/:id', protect, authorize('admin'), CategoryController.updateCategory);
router.delete('/:id', protect, authorize('admin'), CategoryController.deleteCategory);
router.put('/:id/activate', protect, authorize('admin'), CategoryController.activateCategory);
router.put('/:id/deactivate', protect, authorize('admin'), CategoryController.deactivateCategory);

module.exports = router;
