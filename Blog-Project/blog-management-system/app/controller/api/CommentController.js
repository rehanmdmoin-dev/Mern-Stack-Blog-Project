const Comment = require('../../models/comment');
const Blog = require('../../models/blog');
const getPagination = require('../../utils/paginate');

class CommentController {
  // POST /api/blogs/:blogId/comments — Private
  async addComment(req, res) {
    try {
      const { blogId } = req.params;
      const { content } = req.body;

      const blog = await Blog.findOne({ _id: blogId, status: 'published', isDeleted: false });
      if (!blog) {
        return res.status(404).json({ status: false, message: 'Blog not found or not published' });
      }

      const comment = await Comment.create({
        blog: blogId,
        author: req.user._id,
        content,
      });

      await Blog.findByIdAndUpdate(blogId, { $inc: { commentsCount: 1 } });
      await comment.populate('author', 'name profileImage');

      return res.status(201).json({ status: true, data: comment });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }

  // PUT /api/comments/:id — Private (owner)
  async updateComment(req, res) {
    try {
      const comment = await Comment.findOne({ _id: req.params.id, isDeleted: false });
      if (!comment) {
        return res.status(404).json({ status: false, message: 'Comment not found' });
      }
      if (String(comment.author) !== String(req.user._id)) {
        return res.status(403).json({ status: false, message: 'You are not allowed to edit this comment' });
      }

      comment.content = req.body.content;
      await comment.save();
      return res.status(200).json({ status: true, data: comment });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }

  // DELETE /api/comments/:id — Private (owner) or Admin
  async deleteComment(req, res) {
    try {
      const comment = await Comment.findOne({ _id: req.params.id, isDeleted: false });
      if (!comment) {
        return res.status(404).json({ status: false, message: 'Comment not found' });
      }

      const isOwner = String(comment.author) === String(req.user._id);
      if (!isOwner && req.user.role !== 'admin') {
        return res.status(403).json({ status: false, message: 'You are not allowed to delete this comment' });
      }

      comment.isDeleted = true;
      await comment.save();
      await Blog.findByIdAndUpdate(comment.blog, { $inc: { commentsCount: -1 } });

      return res.status(200).json({ status: true, message: 'Comment deleted' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }

  // PUT /api/comments/:id/status — Private/Admin
  async moderateComment(req, res) {
    try {
      const { status } = req.body; // approved | rejected | hidden
      if (!['approved', 'rejected', 'hidden'].includes(status)) {
        return res.status(400).json({ status: false, message: 'Invalid status value' });
      }

      const comment = await Comment.findOne({ _id: req.params.id, isDeleted: false });
      if (!comment) {
        return res.status(404).json({ status: false, message: 'Comment not found' });
      }

      comment.status = status;
      await comment.save();
      return res.status(200).json({ status: true, data: comment });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }

  // GET /api/blogs/:blogId/comments — Public (approved only, unless admin)
  async getCommentsForBlog(req, res) {
    try {
      const { blogId } = req.params;
      const { skip, limit, buildMeta } = getPagination(req.query);

      const filter = { blog: blogId, isDeleted: false };
      if (!(req.user && req.user.role === 'admin')) {
        filter.status = 'approved';
      }

      const [comments, total] = await Promise.all([
        Comment.find(filter)
          .populate('author', 'name profileImage')
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit),
        Comment.countDocuments(filter),
      ]);

      return res.status(200).json({ status: true, data: comments, meta: buildMeta(total) });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }
}

module.exports = new CommentController();
