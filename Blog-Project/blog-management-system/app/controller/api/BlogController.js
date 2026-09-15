const Blog = require('../../models/blog');
const Comment = require('../../models/comment');
const Like = require('../../models/like');
const Category = require('../../models/category');
const Tag = require('../../models/tag');
const User = require('../../models/user');
const getPagination = require('../../utils/paginate');

class BlogController {
  // POST /api/blogs — Private/Author
  async createBlog(req, res) {
    try {
      const { title, description, content, category, tags, featuredImage, saveAsDraft } = req.body;

      const categoryDoc = await Category.findById(category);
      if (!categoryDoc) {
        return res.status(400).json({ status: false, message: 'Invalid category' });
      }

      if (tags && tags.length) {
        const count = await Tag.countDocuments({ _id: { $in: tags } });
        if (count !== tags.length) {
          return res.status(400).json({ status: false, message: 'One or more tags are invalid' });
        }
      }

      const blog = await Blog.create({
        title,
        description,
        content,
        category,
        tags: tags || [],
        featuredImage: featuredImage || '',
        author: req.user._id,
        status: saveAsDraft ? 'draft' : 'pending', // authors submit for admin approval unless saving draft
      });

      return res.status(201).json({ status: true, data: blog });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }

  // PUT /api/blogs/:id — Private/Author (owner) or Admin
  async updateBlog(req, res) {
    try {
      const blog = await Blog.findOne({ _id: req.params.id, isDeleted: false });
      if (!blog) {
        return res.status(404).json({ status: false, message: 'Blog not found' });
      }

      const isOwner = String(blog.author) === String(req.user._id);
      if (!isOwner && req.user.role !== 'admin') {
        return res.status(403).json({ status: false, message: 'You are not allowed to edit this blog' });
      }

      const { title, description, content, category, tags, featuredImage } = req.body;

      if (category) {
        const categoryDoc = await Category.findById(category);
        if (!categoryDoc) {
          return res.status(400).json({ status: false, message: 'Invalid category' });
        }
        blog.category = category;
      }
      if (tags) {
        const count = await Tag.countDocuments({ _id: { $in: tags } });
        if (count !== tags.length) {
          return res.status(400).json({ status: false, message: 'One or more tags are invalid' });
        }
        blog.tags = tags;
      }
      if (title) blog.title = title;
      if (description) blog.description = description;
      if (content) blog.content = content;
      if (featuredImage !== undefined) blog.featuredImage = featuredImage;

      // Editing a previously published/rejected blog by the author sends it back for review.
      if (isOwner && ['published', 'rejected'].includes(blog.status)) {
        blog.status = 'pending';
      }

      await blog.save();
      return res.status(200).json({ status: true, data: blog });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }

  // DELETE /api/blogs/:id — Private/Author (owner) or Admin — hard delete
  async deleteBlog(req, res) {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        return res.status(404).json({ status: false, message: 'Blog not found' });
      }

      const isOwner = String(blog.author) === String(req.user._id);
      if (!isOwner && req.user.role !== 'admin') {
        return res.status(403).json({ status: false, message: 'You are not allowed to delete this blog' });
      }

      await Blog.findByIdAndDelete(req.params.id);
      await Promise.all([
        Comment.deleteMany({ blog: blog._id }),
        Like.deleteMany({ blog: blog._id }),
      ]);

      return res.status(200).json({ status: true, message: 'Blog permanently deleted' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }

  // PUT /api/blogs/:id/soft-delete — Private/Author (owner) or Admin
  async softDeleteBlog(req, res) {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        return res.status(404).json({ status: false, message: 'Blog not found' });
      }

      const isOwner = String(blog.author) === String(req.user._id);
      if (!isOwner && req.user.role !== 'admin') {
        return res.status(403).json({ status: false, message: 'You are not allowed to delete this blog' });
      }

      blog.isDeleted = true;
      await blog.save();
      return res.status(200).json({ status: true, message: 'Blog moved to trash' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }

  // PUT /api/blogs/:id/submit — Private/Author (owner)
  async submitBlog(req, res) {
    try {
      const blog = await Blog.findOne({ _id: req.params.id, isDeleted: false });
      if (!blog) {
        return res.status(404).json({ status: false, message: 'Blog not found' });
      }
      if (String(blog.author) !== String(req.user._id)) {
        return res.status(403).json({ status: false, message: 'You are not allowed to submit this blog' });
      }
      if (!['draft', 'rejected'].includes(blog.status)) {
        return res.status(400).json({ status: false, message: `Cannot submit a blog with status '${blog.status}'` });
      }

      blog.status = 'pending';
      await blog.save();
      return res.status(200).json({ status: true, message: 'Blog submitted for review', data: blog });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }

  // PUT /api/blogs/:id/publish — Private/Admin
  async publishBlog(req, res) {
    try {
      const blog = await Blog.findOne({ _id: req.params.id, isDeleted: false });
      if (!blog) {
        return res.status(404).json({ status: false, message: 'Blog not found' });
      }

      blog.status = 'published';
      blog.rejectionReason = '';
      await blog.save();
      return res.status(200).json({ status: true, message: 'Blog published', data: blog });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }

  // PUT /api/blogs/:id/reject — Private/Admin
  async rejectBlog(req, res) {
    try {
      const blog = await Blog.findOne({ _id: req.params.id, isDeleted: false });
      if (!blog) {
        return res.status(404).json({ status: false, message: 'Blog not found' });
      }

      blog.status = 'rejected';
      blog.rejectionReason = req.body.reason || '';
      await blog.save();
      return res.status(200).json({ status: true, message: 'Blog rejected', data: blog });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }

  // PUT /api/blogs/:id/unpublish — Private/Admin
  async unpublishBlog(req, res) {
    try {
      const blog = await Blog.findOne({ _id: req.params.id, isDeleted: false });
      if (!blog) {
        return res.status(404).json({ status: false, message: 'Blog not found' });
      }

      blog.status = 'unpublished';
      await blog.save();
      return res.status(200).json({ status: true, message: 'Blog unpublished', data: blog });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }

  // GET /api/blogs — Public — search, filter, sort, paginate
  async getBlogs(req, res) {
    try {
      const { search, category, author, tag, sort, dateFrom, dateTo } = req.query;
      const { skip, limit, buildMeta } = getPagination(req.query);

      const filter = { status: 'published', isDeleted: false };
      if (category) filter.category = category;
      if (author) filter.author = author;
      if (tag) filter.tags = tag;
      if (dateFrom || dateTo) {
        filter.publishedAt = {};
        if (dateFrom) filter.publishedAt.$gte = new Date(dateFrom);
        if (dateTo) filter.publishedAt.$lte = new Date(dateTo);
      }

      if (search) {
        // $text can't be combined inside $or reliably alongside other clauses, so we use
        // regex across title/description/content OR a matching author name instead.
        const matchingAuthorIds = await User.find({
          role: 'author',
          name: { $regex: search, $options: 'i' },
        }).distinct('_id');

        filter.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } },
          ...(matchingAuthorIds.length ? [{ author: { $in: matchingAuthorIds } }] : []),
        ];
      }

      const sortMap = {
        latest: { publishedAt: -1 },
        oldest: { publishedAt: 1 },
        'most-viewed': { views: -1 },
        'most-liked': { likesCount: -1 },
        'most-commented': { commentsCount: -1 },
      };
      const sortOption = sortMap[sort] || sortMap.latest;

      const [blogs, total] = await Promise.all([
        Blog.find(filter)
          .populate('author', 'name profileImage')
          .populate('category', 'name slug')
          .populate('tags', 'name slug')
          .sort(sortOption)
          .skip(skip)
          .limit(limit),
        Blog.countDocuments(filter),
      ]);

      return res.status(200).json({ status: true, data: blogs, meta: buildMeta(total) });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }

  // GET /api/blogs/:slug — Public — increments view count
  async getBlogBySlug(req, res) {
    try {
      const blog = await Blog.findOneAndUpdate(
        { slug: req.params.slug, status: 'published', isDeleted: false },
        { $inc: { views: 1 } },
        { new: true }
      )
        .populate('author', 'name bio profileImage')
        .populate('category', 'name slug')
        .populate('tags', 'name slug');

      if (!blog) {
        return res.status(404).json({ status: false, message: 'Blog not found' });
      }

      return res.status(200).json({ status: true, data: blog });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }

  // GET /api/blogs/id/:id — Private/Author (owner) or Admin — any status
  async getBlogByIdForOwner(req, res) {
    try {
      const blog = await Blog.findById(req.params.id)
        .populate('author', 'name profileImage')
        .populate('category', 'name slug')
        .populate('tags', 'name slug');

      if (!blog) {
        return res.status(404).json({ status: false, message: 'Blog not found' });
      }

      const isOwner = String(blog.author._id) === String(req.user._id);
      if (!isOwner && req.user.role !== 'admin') {
        return res.status(403).json({ status: false, message: 'You are not allowed to view this blog' });
      }

      return res.status(200).json({ status: true, data: blog });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }

  // GET /api/blogs/mine — Private/Author — own blogs, all statuses, filterable
  async getMyBlogs(req, res) {
    try {
      const { status } = req.query;
      const { skip, limit, buildMeta } = getPagination(req.query);

      const filter = { author: req.user._id, isDeleted: false };
      if (status) filter.status = status;

      const [blogs, total] = await Promise.all([
        Blog.find(filter)
          .populate('category', 'name slug')
          .populate('tags', 'name slug')
          .sort({ updatedAt: -1 })
          .skip(skip)
          .limit(limit),
        Blog.countDocuments(filter),
      ]);

      return res.status(200).json({ status: true, data: blogs, meta: buildMeta(total) });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }

  // GET /api/blogs/admin/all — Private/Admin — every blog regardless of status
  async getAllBlogsAdmin(req, res) {
    try {
      const { status, search, author, category } = req.query;
      const { skip, limit, buildMeta } = getPagination(req.query);

      const filter = { isDeleted: false };
      if (status) filter.status = status;
      if (author) filter.author = author;
      if (category) filter.category = category;
      if (search) {
        filter.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ];
      }

      const [blogs, total] = await Promise.all([
        Blog.find(filter)
          .populate('author', 'name email')
          .populate('category', 'name slug')
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit),
        Blog.countDocuments(filter),
      ]);

      return res.status(200).json({ status: true, data: blogs, meta: buildMeta(total) });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: false, message: 'Something went wrong' });
    }
  }
}

module.exports = new BlogController();
