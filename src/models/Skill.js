import { pool } from '../lib/db.js'

class Skill {
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS skills (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        category ENUM('Frontend', 'Backend', 'Database', 'DevOps', 'Design', 'Mobile', 'Testing', 'Other') DEFAULT 'Frontend',
        level INT NOT NULL DEFAULT 50,
        icon_name VARCHAR(50) NOT NULL DEFAULT 'Code',
        description VARCHAR(500) DEFAULT '',
        years_experience INT DEFAULT 0,
        is_featured BOOLEAN DEFAULT FALSE,
        tags JSON DEFAULT '[]',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_category (category),
        INDEX idx_level (level),
        INDEX idx_is_featured (is_featured)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `
    try {
      await pool.execute(query)
      console.log('✅ Skills table created or already exists')
    } catch (error) {
      console.error('❌ Error creating skills table:', error)
      throw error
    }
  }

  static async create(skillData) {
    const { name, category = 'Frontend', level = 50, icon_name = 'Code', description = '', years_experience = 0, is_featured = false, tags = [] } = skillData
    
    if (!name) {
      throw new Error('Skill name is required')
    }
    if (level < 0 || level > 100) {
      throw new Error('Skill level must be between 0 and 100')
    }

    const tagsJson = JSON.stringify(tags)

    const query = `
      INSERT INTO skills (name, category, level, icon_name, description, years_experience, is_featured, tags)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `
    
    try {
      const [result] = await pool.execute(query, [name, category, level, icon_name, description, years_experience, is_featured, tagsJson])
      return await this.findById(result.insertId)
    } catch (error) {
      throw error
    }
  }

  static async findById(id) {
    const query = 'SELECT * FROM skills WHERE id = ?'
    const [rows] = await pool.execute(query, [id])
    if (rows.length === 0) return null
    return this.formatSkill(rows[0])
  }

  static async update(id, skillData) {
    const { name, category, level, icon_name, description, years_experience, is_featured, tags } = skillData
    const updates = []
    const values = []

    if (name) {
      updates.push('name = ?')
      values.push(name)
    }
    if (category) {
      updates.push('category = ?')
      values.push(category)
    }
    if (level !== undefined) {
      updates.push('level = ?')
      values.push(level)
    }
    if (icon_name) {
      updates.push('icon_name = ?')
      values.push(icon_name)
    }
    if (description !== undefined) {
      updates.push('description = ?')
      values.push(description)
    }
    if (years_experience !== undefined) {
      updates.push('years_experience = ?')
      values.push(years_experience)
    }
    if (is_featured !== undefined) {
      updates.push('is_featured = ?')
      values.push(is_featured)
    }
    if (tags !== undefined) {
      updates.push('tags = ?')
      values.push(JSON.stringify(tags))
    }

    if (updates.length === 0) return null

    values.push(id)
    const query = `UPDATE skills SET ${updates.join(', ')} WHERE id = ?`
    
    try {
      await pool.execute(query, values)
      return await this.findById(id)
    } catch (error) {
      throw error
    }
  }

  static async delete(id) {
    const query = 'DELETE FROM skills WHERE id = ?'
    const [result] = await pool.execute(query, [id])
    return result.affectedRows > 0
  }

  static async findAll(filters = {}) {
    let query = 'SELECT * FROM skills WHERE 1=1'
    const values = []

    if (filters.category) {
      query += ' AND category = ?'
      values.push(filters.category)
    }
    if (filters.is_featured !== undefined) {
      query += ' AND is_featured = ?'
      values.push(filters.is_featured)
    }
    if (filters.min_level !== undefined) {
      query += ' AND level >= ?'
      values.push(filters.min_level)
    }

    query += ' ORDER BY level DESC, created_at DESC'
    
    if (filters.limit) {
      query += ' LIMIT ?'
      values.push(filters.limit)
    }

    const [rows] = await pool.execute(query, values)
    return rows.map(row => this.formatSkill(row))
  }

  static async findByCategory(category) {
    return this.findAll({ category })
  }

  static async findFeatured(limit = 10) {
    return this.findAll({ is_featured: true, limit })
  }

  static formatSkill(skill) {
    return {
      ...skill,
      tags: typeof skill.tags === 'string' ? JSON.parse(skill.tags) : skill.tags,
      getLevelText: () => {
        if (skill.level >= 80) return 'Expert'
        if (skill.level >= 60) return 'Advanced'
        if (skill.level >= 40) return 'Intermediate'
        return 'Beginner'
      }
    }
  }
}

export default Skill
