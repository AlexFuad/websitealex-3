import mongoose from 'mongoose'

const portfolioSchema = new mongoose.Schema({
  project_name: {
    type: String,
    required: [true, 'Project name is required'],
    trim: true,
    maxlength: [200, 'Project name cannot exceed 200 characters']
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    trim: true,
    lowercase: true,
    index: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  image_url: {
    type: String,
    default: ''
  },
  demo_link: {
    type: String,
    default: ''
  },
  repo_link: {
    type: String,
    default: ''
  },
  tags: {
    type: [String],
    default: []
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Web Application', 'Mobile App', 'API', 'UI/UX Design', 'Tool', 'Library', 'Other'],
    default: 'Web Application'
  },
  project_type: {
    type: String,
    enum: ['Personal', 'Commercial', 'Open Source', 'Freelance'],
    default: 'Personal'
  },
  status: {
    type: String,
    enum: ['Planning', 'In Progress', 'Completed', 'On Hold', 'Archived'],
    default: 'Planning'
  },
  order_index: {
    type: Number,
    default: 0,
    min: 0
  },
  start_date: {
    type: Date,
    default: Date.now
  },
  end_date: {
    type: Date,
    default: null
  },
  team_size: {
    type: Number,
    default: 1,
    min: 1
  },
  role: {
    type: String,
    enum: ['Lead Developer', 'Full Stack Developer', 'Frontend Developer', 'Backend Developer', 'UI/UX Designer', 'Project Manager', 'DevOps Engineer', 'QA Engineer', 'Other'],
    default: 'Full Stack Developer'
  },
  technologies: [{
    name: {
      type: String,
      trim: true,
      maxlength: [50, 'Technology name cannot exceed 50 characters']
    },
    proficiency_level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
      default: 'Intermediate'
    }
  }],
  featured: {
    type: Boolean,
    default: false
  },
  client_name: {
    type: String,
    trim: true,
    maxlength: [100, 'Client name cannot exceed 100 characters']
  },
  client_url: {
    type: String,
    trim: true
  },
  client_testimonial: {
    type: String,
    trim: true,
    maxlength: [500, 'Client testimonial cannot exceed 500 characters']
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

// Generate slug from project name
portfolioSchema.pre('save', async function(next) {
  if (this.isModified('project_name') && !this.slug) {
    this.slug = this.project_name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }
  next()
})

// Indexes for performance
portfolioSchema.index({ slug: 1 })
portfolioSchema.index({ category: 1 })
portfolioSchema.index({ status: 1 })
portfolioSchema.index({ featured: 1 })
portfolioSchema.index({ created_at: -1 })
portfolioSchema.index({ tags: 'text' })

// Virtual for portfolio URL
portfolioSchema.virtual('url').get(function() {
  return `/portfolio/${this.slug}`
})

// Virtual for full portfolio URL with domain
portfolioSchema.virtual('full_url').get(function() {
  return `${process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'}${this.url}`
})

// Virtual for formatted date
portfolioSchema.virtual('formatted_date').get(function() {
  return this.created_at 
    ? this.created_at.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    : null
})

// Instance method to check if project is featured
portfolioSchema.methods.isFeatured = function() {
  return this.featured
}

// Static method to find featured projects
portfolioSchema.statics.findFeatured = function(limit = 6) {
  return this.find({
    featured: true,
    status: 'Completed'
  })
  .sort({ order_index: 1, created_at: -1 })
  .limit(limit)
}

// Static method to find projects by category
portfolioSchema.statics.findByCategory = function(category) {
  return this.find({
    category: category,
    status: 'Completed'
  })
  .sort({ order_index: 1, created_at: -1 })
}

// Static method to find recent projects
portfolioSchema.statics.findRecent = function(limit = 6) {
  return this.find({
    status: 'Completed'
  })
  .sort({ created_at: -1 })
  .limit(limit)
}

const Portfolio = mongoose.models.Portfolio || mongoose.model('Portfolio', portfolioSchema)

export default Portfolio
