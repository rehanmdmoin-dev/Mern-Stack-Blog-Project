const User = require('../../models/user');
const Blog = require('../../models/blog');

class AuthorController {
  // GET /api/authors/:id — Public — public author profile with published blogs + stats
  async getAuthorProfile(req, res) {
    try {
      const author = await User.findOne({ _id: req.params.id, role: 'author', isActive: true }).select(
        'name bio profileImage createdAt'
      );
      if (!author) {
        return res.status(404).json({ status: false, message: 'Author not found' });
      }

      const [stats, recentBlogs] = await Promise.all([
        Blog.aggregate([
          { $match: { author: author._id, isDeleted: false, status: 'published' } },
          {
            $group: {
              _id: null,
              totalBlogs: { $sum: 1 },
              totalViews: { $sum: '$views' },
              totalLikes: { $sum: '$likesCount' },
              totalComments: { $sum: '$commentsCount' },
            },
          },
        ]),
        Blog.find({ author: author._id, isDeleted: false, status: 'published' })
          .sort({ publishedAt: -1 })
          .limit(10)
          .select('title slug description featuredImage views likesCount commentsCount publishedAt'),
      ]);

      return res.status(200).json({
        status: true,
        data: {
          author,
          stats: stats[0] || { totalBlogs: 0, totalViews: 0, totalLikes: 0, totalComments: 0 },
          recentBlogs,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }
}

module.exports = new AuthorController();
