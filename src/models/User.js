import bcrypt from 'bcryptjs'
import { pool } from '../lib/db.js'

class User {
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(30) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        profile_image TEXT DEFAULT '',
        role ENUM('user', 'admin') DEFAULT 'user',
        is_active BOOLEAN DEFAULT TRUE,
        last_login DATETIME DEFAULT CURRENT_TIMESTAMP,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_username (username)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `
    try {
      await pool.execute(query)
      console.log('✅ Users table created or already exists')
    } catch (error) {
      console.error('❌ Error creating users table:', error)
      throw error
    }
  }

  static async create(userData) {
    const { username, email, password, profile_image = '', role = 'user' } = userData
    
    // Validate
    if (!username || username.length < 3) {
      throw new Error('Username must be at least 3 characters')
    }
    if (!email) {
      throw new Error('Email is required')
    }
    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters')
    }

    // Hash password
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)

    const query = `
      INSERT INTO users (username, email, password, profile_image, role)
      VALUES (?, ?, ?, ?, ?)
    `
    
    try {
      const [result] = await pool.execute(query, [username, email, hashedPassword, profile_image, role])
      return await this.findById(result.insertId)
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Username or email already exists')
      }
      throw error
    }
  }

  static async findById(id) {
    const query = 'SELECT * FROM users WHERE id = ?'
    const [rows] = await pool.execute(query, [id])
    if (rows.length === 0) return null
    return this.sanitizeUser(rows[0])
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = ?'
    const [rows] = await pool.execute(query, [email])
    if (rows.length === 0) return null
    return this.sanitizeUser(rows[0])
  }

  static async findByUsername(username) {
    const query = 'SELECT * FROM users WHERE username = ?'
    const [rows] = await pool.execute(query, [username])
    if (rows.length === 0) return null
    return this.sanitizeUser(rows[0])
  }

  static async findByEmailOrUsername(identifier) {
    const query = 'SELECT * FROM users WHERE email = ? OR username = ?'
    const [rows] = await pool.execute(query, [identifier, identifier])
    if (rows.length === 0) return null
    return rows[0] // Return full user object for password comparison
  }

  static async updateLastLogin(id) {
    const query = 'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?'
    await pool.execute(query, [id])
  }

  static async update(id, userData) {
    const { username, email, profile_image, role, is_active } = userData
    const updates = []
    const values = []

    if (username) {
      updates.push('username = ?')
      values.push(username)
    }
    if (email) {
      updates.push('email = ?')
      values.push(email)
    }
    if (profile_image !== undefined) {
      updates.push('profile_image = ?')
      values.push(profile_image)
    }
    if (role) {
      updates.push('role = ?')
      values.push(role)
    }
    if (is_active !== undefined) {
      updates.push('is_active = ?')
      values.push(is_active)
    }

    if (updates.length === 0) return null

    values.push(id)
    const query = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`
    
    try {
      await pool.execute(query, values)
      return await this.findById(id)
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Username or email already exists')
      }
      throw error
    }
  }

  static async delete(id) {
    const query = 'DELETE FROM users WHERE id = ?'
    const [result] = await pool.execute(query, [id])
    return result.affectedRows > 0
  }

  static async findAll(filters = {}) {
    let query = 'SELECT * FROM users WHERE 1=1'
    const values = []

    if (filters.role) {
      query += ' AND role = ?'
      values.push(filters.role)
    }
    if (filters.is_active !== undefined) {
      query += ' AND is_active = ?'
      values.push(filters.is_active)
    }

    query += ' ORDER BY created_at DESC'
    
    if (filters.limit) {
      query += ' LIMIT ?'
      values.push(filters.limit)
    }

    const [rows] = await pool.execute(query, values)
    return rows.map(row => this.sanitizeUser(row))
  }

  static async comparePassword(candidatePassword, hashedPassword) {
    return await bcrypt.compare(candidatePassword, hashedPassword)
  }

  static sanitizeUser(user) {
    const { password, ...sanitized } = user
    return sanitized
  }
}

export default User
