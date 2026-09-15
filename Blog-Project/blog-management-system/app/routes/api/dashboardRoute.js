const express = require('express');
const { protect } = require('../../middleware/auth');
const authorize = require('../../middleware/authorize');
const DashboardController = require('../../controller/api/DashboardController');

const router = express.Router();

router.get('/author', protect, authorize('author'), DashboardController.getAuthorDashboard);
router.get('/admin', protect, authorize('admin'), DashboardController.getAdminDashboard);

router.get('/analytics/trend', protect, authorize('admin'), DashboardController.getPublishingTrend);
router.get('/analytics/categories', protect, authorize('admin'), DashboardController.getCategoryAnalytics);
router.get('/analytics/tags', protect, authorize('admin'), DashboardController.getTagAnalytics);
router.get('/analytics/blog-performance', protect, authorize('admin'), DashboardController.getBlogPerformance);
router.get('/analytics/authors', protect, authorize('admin'), DashboardController.getAuthorAnalytics);
router.get('/analytics/active-readers', protect, authorize('admin'), DashboardController.getMostActiveReaders);
router.get('/analytics/top-commenters', protect, authorize('admin'), DashboardController.getTopCommenters);

module.exports = router;
