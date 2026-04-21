import mongoose from 'mongoose'

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Skill name is required'],
    trim: true,
    maxlength: [100, 'Skill name cannot exceed 100 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Frontend', 'Backend', 'Database', 'DevOps', 'Design', 'Mobile', 'Testing', 'Other'],
    default: 'Frontend'
  },
  level: {
    type: Number,
    required: [true, 'Skill level is required'],
    min: [0, 'Skill level must be at least 0'],
    max: [100, 'Skill level cannot exceed 100'],
    default: 50
  },
  icon_name: {
    type: String,
    required: [true, 'Icon name is required'],
    trim: true,
    maxlength: [50, 'Icon name cannot exceed 50 characters'],
    default: 'Code'
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  years_experience: {
    type: Number,
    min: [0, 'Years experience must be at least 0'],
    default: 0
  },
  is_featured: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true,
    maxlength: [30, 'Tag cannot exceed 30 characters']
  }],
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

// Indexes for performance
skillSchema.index({ category: 1 })
skillSchema.index({ level: -1 })
skillSchema.index({ is_featured: -1 })

// Virtual for skill level text
skillSchema.methods.getLevelText = function() {
  if (this.level >= 80) return 'Expert'
  if (this.level >= 60) return 'Advanced'
  if (this.level >= 40) return 'Intermediate'
  return 'Beginner'
}

const Skill = mongoose.model('Skill', skillSchema)

export default Skill
