const express = require('express');
const { body } = require('express-validator');
const validate = require('../../middleware/validate');
const { protect, optionalAuth } = require('../../middleware/auth');
const authorize = require('../../middleware/authorize');
const CommentController = require('../../controller/api/CommentController');

// mergeParams lets this router read :blogId from the parent mount in blogRoute-style nesting
const router = express.Router({ mergeParams: true });

const contentValidation = [
  body('content').trim().notEmpty().withMessage('Comment content is required').isLength({ max: 1000 }),
];

// Nested under /api/blogs/:blogId/comments
router.get('/blogs/:blogId/comments', optionalAuth, CommentController.getCommentsForBlog);
router.post('/blogs/:blogId/comments', protect, contentValidation, validate, CommentController.addComment);

// Flat comment-level routes
router.put('/comments/:id', protect, contentValidation, validate, CommentController.updateComment);
router.delete('/comments/:id', protect, CommentController.deleteComment);
router.put('/comments/:id/status', protect, authorize('admin'), CommentController.moderateComment);

module.exports = router;
