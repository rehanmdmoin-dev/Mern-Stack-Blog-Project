const Blog = require('../../models/blog');
const User = require('../../models/user');
const Comment = require('../../models/comment');
const Category = require('../../models/category');
const Tag = require('../../models/tag');
const Like = require('../../models/like');

class DashboardController {
  // GET /api/dashboard/author — Private/Author
  async getAuthorDashboard(req, res) {
    try {
      const authorId = req.user._id;

      const [statusCounts, totals, mostPopularBlog, monthlyStats, myBlogIds] = await Promise.all([
        Blog.aggregate([
          { $match: { author: authorId, isDeleted: false } },
          { $group: { _id: '$status', count: { $sum: 1 } } },
        ]),
        Blog.aggregate([
          { $match: { author: authorId, isDeleted: false, status: 'published' } },
          {
            $group: {
              _id: null,
              totalViews: { $sum: '$views' },
              totalLikes: { $sum: '$likesCount' },
              totalComments: { $sum: '$commentsCount' },
            },
          },
        ]),
        Blog.findOne({ author: authorId, isDeleted: false, status: 'published' })
          .sort({ views: -1 })
          .select('title slug views likesCount commentsCount publishedAt'),
        // Monthly Blog Statistics — blogs published per month for the last 12 months
        Blog.aggregate([
          { $match: { author: authorId, isDeleted: false, status: 'published' } },
          {
            $group: {
              _id: { $dateToString: { format: '%Y-%m', date: '$publishedAt' } },
              blogsPublished: { $sum: 1 },
              totalViews: { $sum: '$views' },
              totalLikes: { $sum: '$likesCount' },
            },
          },
          { $sort: { _id: -1 } },
          { $limit: 12 },
        ]),
        Blog.find({ author: authorId, isDeleted: false }).distinct('_id'),
      ]);

      const recentComments = await Comment.find({ blog: { $in: myBlogIds }, isDeleted: false, status: 'approved' })
        .populate('author', 'name profileImage')
        .populate('blog', 'title slug')
        .sort({ createdAt: -1 })
        .limit(10);

      const byStatus = statusCounts.reduce((acc, s) => ({ ...acc, [s._id]: s.count }), {});

      return res.status(200).json({
        status: true,
        data: {
          totalBlogs: Object.values(byStatus).reduce((a, b) => a + b, 0),
          publishedBlogs: byStatus.published || 0,
          draftBlogs: byStatus.draft || 0,
          blogsByStatus: byStatus,
          totals: totals[0] || { totalViews: 0, totalLikes: 0, totalComments: 0 },
          mostPopularBlog,
          monthlyStats,
          recentComments,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }

  // GET /api/dashboard/admin — Private/Admin — full site-wide KPI overview
  async getAdminDashboard(req, res) {
    try {
      const [siteFacets, userFacets, recentUsers, pendingReview] = await Promise.all([
        Blog.aggregate([
          { $match: { isDeleted: false } },
          {
            $facet: {
              byStatus: [{ $group: { _id: '$status', count: { $sum: 1 } } }],
              engagementTotals: [
                { $match: { status: 'published' } },
                {
                  $group: {
                    _id: null,
                    totalViews: { $sum: '$views' },
                    totalLikes: { $sum: '$likesCount' },
                    totalComments: { $sum: '$commentsCount' },
                  },
                },
              ],
              topAuthors: [
                { $match: { status: 'published' } },
                {
                  $group: {
                    _id: '$author',
                    totalViews: { $sum: '$views' },
                    totalLikes: { $sum: '$likesCount' },
                    blogCount: { $sum: 1 },
                  },
                },
                { $sort: { totalViews: -1 } },
                { $limit: 5 },
                { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'author' } },
                { $unwind: '$author' },
                {
                  $project: {
                    _id: 0,
                    authorId: '$author._id',
                    name: '$author.name',
                    email: '$author.email',
                    totalViews: 1,
                    totalLikes: 1,
                    blogCount: 1,
                  },
                },
              ],
              topCategories: [
                { $match: { status: 'published' } },
                { $group: { _id: '$category', blogCount: { $sum: 1 }, totalViews: { $sum: '$views' } } },
                { $sort: { blogCount: -1 } },
                { $limit: 5 },
                { $lookup: { from: 'categories', localField: '_id', foreignField: '_id', as: 'category' } },
                { $unwind: '$category' },
                { $project: { _id: 0, categoryId: '$category._id', name: '$category.name', blogCount: 1, totalViews: 1 } },
              ],
              mostViewedBlogs: [
                { $match: { status: 'published' } },
                { $sort: { views: -1 } },
                { $limit: 5 },
                { $project: { title: 1, slug: 1, views: 1, likesCount: 1, commentsCount: 1 } },
              ],
              mostCommentedBlogs: [
                { $match: { status: 'published' } },
                { $sort: { commentsCount: -1 } },
                { $limit: 5 },
                { $project: { title: 1, slug: 1, commentsCount: 1, views: 1 } },
              ],
              latestBlogs: [
                { $match: { status: 'published' } },
                { $sort: { publishedAt: -1 } },
                { $limit: 5 },
                { $project: { title: 1, slug: 1, publishedAt: 1 } },
              ],
            },
          },
        ]),
        User.aggregate([{ $group: { _id: '$role', count: { $sum: 1 } } }]),
        User.find().sort({ createdAt: -1 }).limit(10).select('name email role createdAt'),
        Blog.find({ isDeleted: false, status: 'pending' })
          .populate('author', 'name email')
          .sort({ createdAt: -1 })
          .limit(10)
          .select('title author createdAt'),
      ]);

      const [totalCategories, totalTags, totalComments, totalLikes] = await Promise.all([
        Category.countDocuments(),
        Tag.countDocuments(),
        Comment.countDocuments({ isDeleted: false }),
        Like.countDocuments(),
      ]);

      const facets = siteFacets[0];
      const byStatus = facets.byStatus.reduce((acc, s) => ({ ...acc, [s._id]: s.count }), {});
      const usersByRole = userFacets.reduce((acc, u) => ({ ...acc, [u._id]: u.count }), {});

      return res.status(200).json({
        status: true,
        data: {
          totalUsers: Object.values(usersByRole).reduce((a, b) => a + b, 0),
          totalAuthors: usersByRole.author || 0,
          totalReaders: usersByRole.reader || 0,
          totalAdmins: usersByRole.admin || 0,
          totalBlogs: Object.values(byStatus).reduce((a, b) => a + b, 0),
          publishedBlogs: byStatus.published || 0,
          draftBlogs: byStatus.draft || 0,
          pendingBlogs: byStatus.pending || 0,
          totalCategories,
          totalTags,
          totalComments,
          totalLikes,
          engagementTotals: facets.engagementTotals[0] || { totalViews: 0, totalLikes: 0, totalComments: 0 },
          topAuthors: facets.topAuthors,
          topCategories: facets.topCategories,
          mostViewedBlogs: facets.mostViewedBlogs,
          mostCommentedBlogs: facets.mostCommentedBlogs,
          latestBlogs: facets.latestBlogs,
          recentlyRegisteredUsers: recentUsers,
          pendingReview,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }

  // GET /api/dashboard/analytics/trend — Private/Admin
  async getPublishingTrend(req, res) {
    try {
      const { days = 30 } = req.query;
      const since = new Date();
      since.setDate(since.getDate() - Number(days));

      const trend = await Blog.aggregate([
        { $match: { isDeleted: false, status: 'published', publishedAt: { $gte: since } } },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$publishedAt' } },
            blogsPublished: { $sum: 1 },
            totalViews: { $sum: '$views' },
            totalLikes: { $sum: '$likesCount' },
          },
        },
        { $sort: { _id: 1 } },
      ]);

      return res.status(200).json({ status: true, data: trend });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }

  // GET /api/dashboard/analytics/categories — Private/Admin
  async getCategoryAnalytics(req, res) {
    try {
      const data = await Blog.aggregate([
        { $match: { isDeleted: false, status: 'published' } },
        {
          $group: {
            _id: '$category',
            blogCount: { $sum: 1 },
            totalViews: { $sum: '$views' },
            totalLikes: { $sum: '$likesCount' },
            totalComments: { $sum: '$commentsCount' },
            avgViews: { $avg: '$views' },
          },
        },
        { $lookup: { from: 'categories', localField: '_id', foreignField: '_id', as: 'category' } },
        { $unwind: '$category' },
        {
          $project: {
            _id: 0,
            categoryId: '$category._id',
            name: '$category.name',
            blogCount: 1,
            totalViews: 1,
            totalLikes: 1,
            totalComments: 1,
            avgViewsPerBlog: { $round: ['$avgViews', 2] },
          },
        },
        { $sort: { blogCount: -1 } },
      ]);

      return res.status(200).json({ status: true, data });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }

  // GET /api/dashboard/analytics/tags — Private/Admin
  async getTagAnalytics(req, res) {
    try {
      const data = await Blog.aggregate([
        { $match: { isDeleted: false, status: 'published' } },
        { $unwind: '$tags' },
        {
          $group: {
            _id: '$tags',
            blogCount: { $sum: 1 },
            totalViews: { $sum: '$views' },
            totalLikes: { $sum: '$likesCount' },
          },
        },
        { $lookup: { from: 'tags', localField: '_id', foreignField: '_id', as: 'tag' } },
        { $unwind: '$tag' },
        {
          $project: {
            _id: 0,
            tagId: '$tag._id',
            name: '$tag.name',
            blogCount: 1,
            totalViews: 1,
            totalLikes: 1,
          },
        },
        { $sort: { blogCount: -1 } },
      ]);

      return res.status(200).json({ status: true, data });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }

  // GET /api/dashboard/analytics/blog-performance — Private/Admin
  async getBlogPerformance(req, res) {
    try {
      const { limit = 10 } = req.query;
      const n = Math.min(Number(limit) || 10, 50);

      const [topViewed, topLiked, topCommented, averages] = await Promise.all([
        Blog.find({ isDeleted: false, status: 'published' })
          .sort({ views: -1 })
          .limit(n)
          .select('title slug views likesCount commentsCount author')
          .populate('author', 'name'),
        Blog.find({ isDeleted: false, status: 'published' })
          .sort({ likesCount: -1 })
          .limit(n)
          .select('title slug views likesCount commentsCount author')
          .populate('author', 'name'),
        Blog.find({ isDeleted: false, status: 'published' })
          .sort({ commentsCount: -1 })
          .limit(n)
          .select('title slug views likesCount commentsCount author')
          .populate('author', 'name'),
        Blog.aggregate([
          { $match: { isDeleted: false, status: 'published' } },
          {
            $group: {
              _id: null,
              avgViews: { $avg: '$views' },
              avgLikes: { $avg: '$likesCount' },
              avgComments: { $avg: '$commentsCount' },
            },
          },
          {
            $project: {
              _id: 0,
              avgViewsPerBlog: { $round: ['$avgViews', 2] },
              avgLikesPerBlog: { $round: ['$avgLikes', 2] },
              avgCommentsPerBlog: { $round: ['$avgComments', 2] },
            },
          },
        ]),
      ]);

      return res.status(200).json({
        status: true,
        data: {
          topViewed,
          topLiked,
          topCommented,
          averages: averages[0] || { avgViewsPerBlog: 0, avgLikesPerBlog: 0, avgCommentsPerBlog: 0 },
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }

  // GET /api/dashboard/analytics/authors — Private/Admin
  async getAuthorAnalytics(req, res) {
    try {
      const data = await Blog.aggregate([
        { $match: { isDeleted: false, status: 'published' } },
        {
          $group: {
            _id: '$author',
            blogCount: { $sum: 1 },
            totalViews: { $sum: '$views' },
            totalLikes: { $sum: '$likesCount' },
            totalComments: { $sum: '$commentsCount' },
          },
        },
        { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'author' } },
        { $unwind: '$author' },
        {
          $project: {
            _id: 0,
            authorId: '$author._id',
            name: '$author.name',
            email: '$author.email',
            blogCount: 1,
            totalViews: 1,
            totalLikes: 1,
            totalComments: 1,
          },
        },
        { $sort: { totalViews: -1 } },
      ]);

      return res.status(200).json({ status: true, data });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }

  // GET /api/dashboard/analytics/active-readers — Private/Admin
  async getMostActiveReaders(req, res) {
    try {
      const [likeCounts, commentCounts] = await Promise.all([
        Like.aggregate([{ $group: { _id: '$user', likeCount: { $sum: 1 } } }]),
        Comment.aggregate([
          { $match: { isDeleted: false } },
          { $group: { _id: '$author', commentCount: { $sum: 1 } } },
        ]),
      ]);

      const activityMap = new Map();
      for (const l of likeCounts) {
        activityMap.set(String(l._id), { userId: l._id, likeCount: l.likeCount, commentCount: 0 });
      }
      for (const c of commentCounts) {
        const key = String(c._id);
        const existing = activityMap.get(key);
        if (existing) existing.commentCount = c.commentCount;
        else activityMap.set(key, { userId: c._id, likeCount: 0, commentCount: c.commentCount });
      }

      const ranked = [...activityMap.values()]
        .map((a) => ({ ...a, activityScore: a.likeCount + a.commentCount }))
        .sort((a, b) => b.activityScore - a.activityScore)
        .slice(0, 10);

      const users = await User.find({ _id: { $in: ranked.map((r) => r.userId) } }).select('name email');
      const userMap = new Map(users.map((u) => [String(u._id), u]));

      const data = ranked.map((r) => ({
        userId: r.userId,
        name: userMap.get(String(r.userId))?.name,
        email: userMap.get(String(r.userId))?.email,
        likeCount: r.likeCount,
        commentCount: r.commentCount,
        activityScore: r.activityScore,
      }));

      return res.status(200).json({ status: true, data });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }

  // GET /api/dashboard/analytics/top-commenters — Private/Admin
  async getTopCommenters(req, res) {
    try {
      const data = await Comment.aggregate([
        { $match: { isDeleted: false, status: 'approved' } },
        { $group: { _id: '$author', commentCount: { $sum: 1 } } },
        { $sort: { commentCount: -1 } },
        { $limit: 10 },
        { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
        { $unwind: '$user' },
        {
          $project: {
            _id: 0,
            userId: '$user._id',
            name: '$user.name',
            email: '$user.email',
            commentCount: 1,
          },
        },
      ]);

      return res.status(200).json({ status: true, data });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }
}

module.exports = new DashboardController();
