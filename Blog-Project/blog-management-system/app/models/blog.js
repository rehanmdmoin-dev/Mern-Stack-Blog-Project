const mongoose = require('mongoose');
const slugify = require('slugify');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: 200,
    },
    slug: { type: String, unique: true },
    description: {
      type: String,
      required: [true, 'Short description is required'],
      maxlength: 500,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    featuredImage: { type: String, default: '' },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
    status: {
      type: String,
      enum: ['draft', 'pending', 'published', 'rejected', 'unpublished'],
      default: 'draft',
    },
    isDeleted: { type: Boolean, default: false }, // soft delete
    views: { type: Number, default: 0 },
    likesCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
    publishedAt: { type: Date },
    rejectionReason: { type: String, default: '' },
  },
  { timestamps: true }
);

blogSchema.index({ title: 'text', description: 'text', content: 'text' });
blogSchema.index({ status: 1, isDeleted: 1 });
blogSchema.index({ author: 1 });
blogSchema.index({ category: 1 });
blogSchema.index({ tags: 1 });
blogSchema.index({ publishedAt: -1 });

blogSchema.pre('save', async function (next) {
  if (this.isModified('title')) {
    const base = slugify(this.title, { lower: true, strict: true });
    let slug = base;
    let counter = 1;
    // Ensure uniqueness by appending a counter if needed
    const Blog = this.constructor;
    while (await Blog.exists({ slug, _id: { $ne: this._id } })) {
      slug = `${base}-${counter++}`;
    }
    this.slug = slug;
  }
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

module.exports = mongoose.model('Blog', blogSchema);
