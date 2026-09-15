const express = require('express');
const { body } = require('express-validator');
const validate = require('../../middleware/validate');
const { protect } = require('../../middleware/auth');
const authorize = require('../../middleware/authorize');
const TagController = require('../../controller/api/TagController');

const router = express.Router();

router.get('/', TagController.getTags);

router.post(
  '/',
  protect,
  authorize('admin'),
  [body('name').trim().notEmpty().withMessage('Tag name is required')],
  validate,
  TagController.createTag
);

router.put('/:id', protect, authorize('admin'), TagController.updateTag);
router.delete('/:id', protect, authorize('admin'), TagController.deleteTag);

module.exports = router;
