const express = require('express');
const { protect } = require('../../middleware/auth');
const ProfileController = require('../../controller/api/ProfileController');

const router = express.Router();

router.use(protect);

router.put('/', ProfileController.updateProfile);
router.get('/liked-blogs', ProfileController.getLikedBlogs);
router.get('/commented-blogs', ProfileController.getCommentedBlogs);
router.get('/reading-history', ProfileController.getReadingHistory);
router.post('/reading-history/:blogId', ProfileController.addToReadingHistory);

module.exports = router;
