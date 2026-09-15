const express = require('express');
const { body } = require('express-validator');
const validate = require('../../middleware/validate');
const { protect } = require('../../middleware/auth');
const authorize = require('../../middleware/authorize');
const BlogController = require('../../controller/api/BlogController');

const router = express.Router();

const blogValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('content').trim().notEmpty().withMessage('Content is required'),
  body('category').notEmpty().withMessage('Category is required'),
];

// Public
router.get('/', BlogController.getBlogs);

// Specific routes before the dynamic ':slug' route
router.get('/mine', protect, authorize('author'), BlogController.getMyBlogs);
router.get('/admin/all', protect, authorize('admin'), BlogController.getAllBlogsAdmin);
router.get('/id/:id', protect, authorize('author', 'admin'), BlogController.getBlogByIdForOwner);

router.post('/', protect, authorize('author'), blogValidation, validate, BlogController.createBlog);
router.put('/:id', protect, authorize('author', 'admin'), BlogController.updateBlog);
router.delete('/:id', protect, authorize('author', 'admin'), BlogController.deleteBlog);
router.put('/:id/soft-delete', protect, authorize('author', 'admin'), BlogController.softDeleteBlog);
router.put('/:id/submit', protect, authorize('author'), BlogController.submitBlog);

router.put('/:id/publish', protect, authorize('admin'), BlogController.publishBlog);
router.put('/:id/reject', protect, authorize('admin'), BlogController.rejectBlog);
router.put('/:id/unpublish', protect, authorize('admin'), BlogController.unpublishBlog);

// Public — keep last since ':slug' would otherwise shadow the routes above
router.get('/:slug', BlogController.getBlogBySlug);

module.exports = router;
