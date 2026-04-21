import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio_db'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      maxPoolSize: 10,
      bufferMaxEntries: 0,
      bufferCommands: false,
    })

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`)
    console.log(`📊 Database: ${conn.connection.name}`)
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err)
      if (err.name === 'MongoNetworkError') {
        console.error('🔍 Network error - Check MongoDB server status')
      }
    })

    mongoose.connection.on('disconnected', () => {
      console.log('⚠️ MongoDB disconnected')
    })

    mongoose.connection.on('connected', () => {
      console.log('🔗 MongoDB connection established')
    })

    // Graceful shutdown
    process.on('SIGINT', async () => {
      console.log('🔄 Closing MongoDB connection...')
      await mongoose.connection.close()
      console.log('✅ MongoDB connection closed')
      process.exit(0)
    })

    return conn
  } catch (error) {
    console.error('❌ Database connection failed:', error.message)
    console.error('🔍 Troubleshooting tips:')
    console.error('  1. Check if MongoDB is running: mongod')
    console.error('  2. Verify connection string:', MONGODB_URI)
    console.error('  3. Check network connectivity')
    process.exit(1)
  }
}

export default connectDB

// Export mongoose instance for use in models
export { mongoose }
