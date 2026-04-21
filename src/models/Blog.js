import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    trim: true,
    lowercase: true,
    index: true
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  tags: {
    type: [String],
    default: []
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['technology', 'tutorial', 'news', 'opinion', 'case-study', 'announcement'],
    default: 'technology'
  },
  seo_meta: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  },
  image_url: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  featured: {
    type: Boolean,
    default: false
  },
  read_time: {
    type: Number,
    default: 5,
    min: [1, 'Read time must be at least 1 minute']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

// Generate slug from title
blogSchema.pre('save', async function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }
  next()
})

// Indexes for performance
blogSchema.index({ slug: 1 })
blogSchema.index({ category: 1 })
blogSchema.index({ status: 1 })
blogSchema.index({ created_at: -1 })

// Virtual for blog URL
blogSchema.virtual('url').get(function() {
  return `/blog/${this.slug}`
})

// Virtual for full blog URL with domain
blogSchema.virtual('full_url').get(function() {
  return `${process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'}${this.url}`
})

// Instance method to check if blog is published
blogSchema.methods.isPublished = function() {
  return this.status === 'published'
}

const Blog = mongoose.model('Blog', blogSchema)

export default Blog
