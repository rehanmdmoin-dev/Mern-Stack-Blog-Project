const Like = require('../../models/like');
const Blog = require('../../models/blog');
const User = require('../../models/user');

class LikeController {
  // POST /api/blogs/:blogId/like — Private
  async likeBlog(req, res) {
    try {
      const { blogId } = req.params;

      const blog = await Blog.findOne({ _id: blogId, status: 'published', isDeleted: false });
      if (!blog) {
        return res.status(404).json({ status: false, message: 'Blog not found or not published' });
      }

      try {
        await Like.create({ blog: blogId, user: req.user._id });
      } catch (err) {
        if (err.code === 11000) {
          return res.status(409).json({ status: false, message: 'You already liked this blog' });
        }
        throw err;
      }

      await Promise.all([
        Blog.findByIdAndUpdate(blogId, { $inc: { likesCount: 1 } }),
        User.findByIdAndUpdate(req.user._id, { $addToSet: { likedBlogs: blogId } }),
      ]);

      return res.status(201).json({ status: true, message: 'Blog liked' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }

  // DELETE /api/blogs/:blogId/like — Private
  async unlikeBlog(req, res) {
    try {
      const { blogId } = req.params;

      const like = await Like.findOneAndDelete({ blog: blogId, user: req.user._id });
      if (!like) {
        return res.status(404).json({ status: false, message: 'You have not liked this blog' });
      }

      await Promise.all([
        Blog.findByIdAndUpdate(blogId, { $inc: { likesCount: -1 } }),
        User.findByIdAndUpdate(req.user._id, { $pull: { likedBlogs: blogId } }),
      ]);

      return res.status(200).json({ status: true, message: 'Blog unliked' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }

  // GET /api/blogs/:blogId/like/status — Private
  async getLikeStatus(req, res) {
    try {
      const { blogId } = req.params;
      const liked = await Like.exists({ blog: blogId, user: req.user._id });
      return res.status(200).json({ status: true, data: { liked: Boolean(liked) } });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }
}

module.exports = new LikeController();
