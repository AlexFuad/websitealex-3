import mysql from 'mysql2/promise'

const MYSQL_HOST = process.env.MYSQL_HOST || 'localhost'
const MYSQL_PORT = process.env.MYSQL_PORT || 3306
const MYSQL_USER = process.env.MYSQL_USER || 'root'
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || ''
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'portfolio_db'

let pool = null

const connectDB = async () => {
  try {
    pool = mysql.createPool({
      host: MYSQL_HOST,
      port: MYSQL_PORT,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0
    })

    // Test connection
    const connection = await pool.getConnection()
    console.log(`✅ MySQL Connected: ${MYSQL_HOST}:${MYSQL_PORT}`)
    console.log(`� Database: ${MYSQL_DATABASE}`)
    connection.release()

    // Handle connection events
    pool.on('error', (err) => {
      console.error('❌ MySQL pool error:', err)
    })

    // Graceful shutdown
    process.on('SIGINT', async () => {
      console.log('🔄 Closing MySQL connection...')
      if (pool) {
        await pool.end()
        console.log('✅ MySQL connection closed')
      }
      process.exit(0)
    })

    return pool
  } catch (error) {
    console.error('❌ Database connection failed:', error.message)
    console.error('🔍 Troubleshooting tips:')
    console.error('  1. Check if MySQL is running')
    console.error('  2. Verify connection settings')
    console.error('  3. Check network connectivity')
    process.exit(1)
  }
}

export default connectDB

// Export pool for use in models
export { pool }
