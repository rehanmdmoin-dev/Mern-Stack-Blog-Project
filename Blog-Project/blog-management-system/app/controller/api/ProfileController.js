const User = require('../../models/user');
const Blog = require('../../models/blog');
const Comment = require('../../models/comment');
const getPagination = require('../../utils/paginate');

class ProfileController {
  // PUT /api/profile — Private
  async updateProfile(req, res) {
    try {
      const { name, bio, profileImage } = req.body;

      const user = await User.findById(req.user._id);
      if (name) user.name = name;
      if (bio !== undefined) user.bio = bio;
      if (profileImage !== undefined) user.profileImage = profileImage;

      await user.save();
      return res.status(200).json({ status: true, data: user.toSafeObject() });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }

  // GET /api/profile/liked-blogs — Private
  async getLikedBlogs(req, res) {
    try {
      const { skip, limit, buildMeta } = getPagination(req.query);

      const user = await User.findById(req.user._id);
      const total = user.likedBlogs.length;

      const blogs = await Blog.find({
        _id: { $in: user.likedBlogs },
        status: 'published',
        isDeleted: false,
      })
        .populate('author', 'name profileImage')
        .populate('category', 'name slug')
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit);

      return res.status(200).json({ status: true, data: blogs, meta: buildMeta(total) });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }

  // GET /api/profile/reading-history — Private
  async getReadingHistory(req, res) {
    try {
      const user = await User.findById(req.user._id).populate({
        path: 'readingHistory.blog',
        select: 'title slug featuredImage publishedAt',
      });

      const history = user.readingHistory
        .filter((h) => h.blog)
        .sort((a, b) => b.viewedAt - a.viewedAt);

      return res.status(200).json({ status: true, data: history });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }

  // POST /api/profile/reading-history/:blogId — Private
  async addToReadingHistory(req, res) {
    try {
      const { blogId } = req.params;
      const blog = await Blog.findOne({ _id: blogId, status: 'published', isDeleted: false });
      if (!blog) {
        return res.status(404).json({ status: false, message: 'Blog not found or not published' });
      }

      const user = await User.findById(req.user._id);
      // Remove any existing entry for this blog, then push it to the front (most recent)
      user.readingHistory = user.readingHistory.filter((h) => String(h.blog) !== String(blogId));
      user.readingHistory.unshift({ blog: blogId, viewedAt: new Date() });
      // Cap history length to keep the document size bounded
      user.readingHistory = user.readingHistory.slice(0, 200);

      await user.save();
      return res.status(200).json({ status: true, message: 'Added to reading history' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }

  // GET /api/profile/commented-blogs — Private
  async getCommentedBlogs(req, res) {
    try {
      const { skip, limit, buildMeta } = getPagination(req.query);

      // Distinct blog IDs the user has commented on, most recent comment first
      const blogIds = await Comment.distinct('blog', { author: req.user._id, isDeleted: false });
      const total = blogIds.length;

      const blogs = await Blog.find({ _id: { $in: blogIds }, isDeleted: false })
        .populate('author', 'name profileImage')
        .populate('category', 'name slug')
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limit);

      return res.status(200).json({ status: true, data: blogs, meta: buildMeta(total) });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }
}

module.exports = new ProfileController();
