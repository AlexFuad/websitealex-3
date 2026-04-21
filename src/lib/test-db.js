import connectDB from './db.js'
import { User, Blog, Skill, Portfolio } from '../models/index.js'

// Test database connection and models
async function testDatabase() {
  try {
    console.log('🔗 Testing database connection...')
    
    // Connect to database
    await connectDB()
    console.log('✅ Database connected successfully!')
    
    // Test User model
    console.log('\n👤 Testing User model...')
    const testUser = new User({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      profile_image: 'https://example.com/profile.jpg'
    })
    
    try {
      await testUser.validate()
      console.log('✅ User model validation passed')
    } catch (error) {
      console.log('❌ User model validation failed:', error.message)
    }
    
    // Test Blog model
    console.log('\n📝 Testing Blog model...')
    const testBlog = new Blog({
      title: 'Test Blog Post',
      slug: 'test-blog-post',
      content: '<p>This is a test blog post content</p>',
      tags: ['test', 'blog'],
      category: 'technology',
      seo_meta: {
        title: 'Test Blog SEO Title',
        description: 'Test blog SEO description',
        keywords: ['test', 'blog', 'seo']
      },
      image_url: 'https://example.com/blog-image.jpg',
      author: '507f1f77bcf86cd799439011' // Dummy ObjectId
    })
    
    try {
      await testBlog.validate()
      console.log('✅ Blog model validation passed')
    } catch (error) {
      console.log('❌ Blog model validation failed:', error.message)
    }
    
    // Test Skill model
    console.log('\n🛠️ Testing Skill model...')
    const testSkill = new Skill({
      name: 'JavaScript',
      category: 'Frontend',
      level: 95,
      icon_name: 'Code',
      description: 'Advanced JavaScript programming skills',
      years_experience: 5,
      tags: ['javascript', 'es6', 'async']
    })
    
    try {
      await testSkill.validate()
      console.log('✅ Skill model validation passed')
    } catch (error) {
      console.log('❌ Skill model validation failed:', error.message)
    }
    
    // Test Portfolio model
    console.log('\n💼 Testing Portfolio model...')
    const testPortfolio = new Portfolio({
      project_name: 'Test Project',
      slug: 'test-project',
      description: 'This is a test project description',
      image_url: 'https://example.com/project-image.jpg',
      demo_link: 'https://demo.example.com',
      repo_link: 'https://github.com/example/test-project',
      tags: ['test', 'project'],
      category: 'Web Application',
      technologies: [
        {
          name: 'React',
          level: 'Advanced',
          icon_name: 'Code'
        },
        {
          name: 'Node.js',
          level: 'Intermediate',
          icon_name: 'Database'
        }
      ],
      project_type: 'Personal',
      status: 'Completed',
      order_index: 1
    })
    
    try {
      await testPortfolio.validate()
      console.log('✅ Portfolio model validation passed')
    } catch (error) {
      console.log('❌ Portfolio model validation failed:', error.message)
    }
    
    // Test model methods
    console.log('\n🔧 Testing model methods...')
    
    // Test User methods
    console.log('Testing User methods...')
    const userMethods = ['comparePassword', 'toPublicJSON']
    userMethods.forEach(method => {
      if (typeof testUser[method] === 'function') {
        console.log(`✅ User.${method} method exists`)
      } else {
        console.log(`❌ User.${method} method missing`)
      }
    })
    
    // Test Blog methods
    console.log('Testing Blog methods...')
    const blogMethods = ['incrementViewCount', 'isPublished']
    blogMethods.forEach(method => {
      if (typeof testBlog[method] === 'function') {
        console.log(`✅ Blog.${method} method exists`)
      } else {
        console.log(`❌ Blog.${method} method missing`)
      }
    })
    
    // Test Skill methods
    console.log('Testing Skill methods...')
    const skillMethods = ['isExpert', 'getLevelText']
    skillMethods.forEach(method => {
      if (typeof testSkill[method] === 'function') {
        console.log(`✅ Skill.${method} method exists`)
      } else {
        console.log(`❌ Skill.${method} method missing`)
      }
    })
    
    // Test Portfolio methods
    console.log('Testing Portfolio methods...')
    const portfolioMethods = ['incrementViewCount', 'isCompleted', 'getPrimaryTechnology']
    portfolioMethods.forEach(method => {
      if (typeof testPortfolio[method] === 'function') {
        console.log(`✅ Portfolio.${method} method exists`)
      } else {
        console.log(`❌ Portfolio.${method} method missing`)
      }
    })
    
    // Test static methods
    console.log('\n📚 Testing static methods...')
    
    // User static methods
    if (typeof User.findByCredentials === 'function') {
      console.log('✅ User.findByCredentials static method exists')
    } else {
      console.log('❌ User.findByCredentials static method missing')
    }
    
    // Blog static methods
    const blogStaticMethods = ['findPublished', 'findFeatured']
    blogStaticMethods.forEach(method => {
      if (typeof Blog[method] === 'function') {
        console.log(`✅ Blog.${method} static method exists`)
      } else {
        console.log(`❌ Blog.${method} static method missing`)
      }
    })
    
    // Skill static methods
    const skillStaticMethods = ['findByCategory', 'findFeatured', 'findTopSkills']
    skillStaticMethods.forEach(method => {
      if (typeof Skill[method] === 'function') {
        console.log(`✅ Skill.${method} static method exists`)
      } else {
        console.log(`❌ Skill.${method} static method missing`)
      }
    })
    
    // Portfolio static methods
    const portfolioStaticMethods = ['findFeatured', 'findByCategory', 'findByTechnology']
    portfolioStaticMethods.forEach(method => {
      if (typeof Portfolio[method] === 'function') {
        console.log(`✅ Portfolio.${method} static method exists`)
      } else {
        console.log(`❌ Portfolio.${method} static method missing`)
      }
    })
    
    // Test virtual fields
    console.log('\n🌐 Testing virtual fields...')
    
    // Test User virtuals
    const userVirtuals = ['profile_url']
    userVirtuals.forEach(virtual => {
      if (testUser.toObject().hasOwnProperty(virtual)) {
        console.log(`✅ User.${virtual} virtual field exists`)
      } else {
        console.log(`❌ User.${virtual} virtual field missing`)
      }
    })
    
    // Test Blog virtuals
    const blogVirtuals = ['url', 'full_url', 'formatted_date']
    blogVirtuals.forEach(virtual => {
      if (testBlog.toObject().hasOwnProperty(virtual)) {
        console.log(`✅ Blog.${virtual} virtual field exists`)
      } else {
        console.log(`❌ Blog.${virtual} virtual field missing`)
      }
    })
    
    // Test Skill virtuals
    const skillVirtuals = ['level_percentage', 'level_color', 'category_icon']
    skillVirtuals.forEach(virtual => {
      if (testSkill.toObject().hasOwnProperty(virtual)) {
        console.log(`✅ Skill.${virtual} virtual field exists`)
      } else {
        console.log(`❌ Skill.${virtual} virtual field missing`)
      }
    })
    
    // Test Portfolio virtuals
    const portfolioVirtuals = ['url', 'full_url', 'date_range', 'technology_names']
    portfolioVirtuals.forEach(virtual => {
      if (testPortfolio.toObject().hasOwnProperty(virtual)) {
        console.log(`✅ Portfolio.${virtual} virtual field exists`)
      } else {
        console.log(`❌ Portfolio.${virtual} virtual field missing`)
      }
    })
    
    console.log('\n🎉 Database and models test completed!')
    
  } catch (error) {
    console.error('❌ Database test failed:', error.message)
  } finally {
    // Close connection
    process.exit(0)
  }
}

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testDatabase()
}

export default testDatabase
