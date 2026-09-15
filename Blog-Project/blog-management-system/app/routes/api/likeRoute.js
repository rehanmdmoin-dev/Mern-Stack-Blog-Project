const express = require('express');
const { protect } = require('../../middleware/auth');
const LikeController = require('../../controller/api/LikeController');

const router = express.Router({ mergeParams: true });

router.post('/blogs/:blogId/like', protect, LikeController.likeBlog);
router.delete('/blogs/:blogId/like', protect, LikeController.unlikeBlog);
router.get('/blogs/:blogId/like/status', protect, LikeController.getLikeStatus);

module.exports = router;
