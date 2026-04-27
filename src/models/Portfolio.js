import { pool } from '../lib/db.js'

class Portfolio {
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS portfolios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        project_name VARCHAR(200) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        description TEXT NOT NULL,
        image_url TEXT DEFAULT '',
        demo_link TEXT DEFAULT '',
        repo_link TEXT DEFAULT '',
        tags JSON DEFAULT '[]',
        category ENUM('Web Application', 'Mobile App', 'API', 'UI/UX Design', 'Tool', 'Library', 'Other') DEFAULT 'Web Application',
        project_type ENUM('Personal', 'Commercial', 'Open Source', 'Freelance') DEFAULT 'Personal',
        status ENUM('Planning', 'In Progress', 'Completed', 'On Hold', 'Archived') DEFAULT 'Planning',
        order_index INT DEFAULT 0,
        start_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        end_date DATETIME DEFAULT NULL,
        team_size INT DEFAULT 1,
        role ENUM('Lead Developer', 'Full Stack Developer', 'Frontend Developer', 'Backend Developer', 'UI/UX Designer', 'Project Manager', 'DevOps Engineer', 'QA Engineer', 'Other') DEFAULT 'Full Stack Developer',
        technologies JSON DEFAULT '[]',
        featured BOOLEAN DEFAULT FALSE,
        client_name VARCHAR(100) DEFAULT '',
        client_url TEXT DEFAULT '',
        client_testimonial VARCHAR(500) DEFAULT '',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_slug (slug),
        INDEX idx_category (category),
        INDEX idx_status (status),
        INDEX idx_featured (featured),
        INDEX idx_created_at (created_at),
        INDEX idx_order_index (order_index)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `
    try {
      await pool.execute(query)
      console.log('✅ Portfolios table created or already exists')
    } catch (error) {
      console.error('❌ Error creating portfolios table:', error)
      throw error
    }
  }

  static generateSlug(projectName) {
    return projectName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '-')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  static async create(portfolioData) {
    const { project_name, slug, description, image_url = '', demo_link = '', repo_link = '', tags = [], category = 'Web Application', project_type = 'Personal', status = 'Planning', order_index = 0, start_date, end_date, team_size = 1, role = 'Full Stack Developer', technologies = [], featured = false, client_name = '', client_url = '', client_testimonial = '' } = portfolioData
    
    if (!project_name) {
      throw new Error('Project name is required')
    }
    if (!description) {
      throw new Error('Description is required')
    }

    const finalSlug = slug || this.generateSlug(project_name)
    const tagsJson = JSON.stringify(tags)
    const technologiesJson = JSON.stringify(technologies)

    const query = `
      INSERT INTO portfolios (project_name, slug, description, image_url, demo_link, repo_link, tags, category, project_type, status, order_index, start_date, end_date, team_size, role, technologies, featured, client_name, client_url, client_testimonial)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    
    try {
      const [result] = await pool.execute(query, [project_name, finalSlug, description, image_url, demo_link, repo_link, tagsJson, category, project_type, status, order_index, start_date, end_date, team_size, role, technologiesJson, featured, client_name, client_url, client_testimonial])
      return await this.findById(result.insertId)
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Slug already exists')
      }
      throw error
    }
  }

  static async findById(id) {
    const query = 'SELECT * FROM portfolios WHERE id = ?'
    const [rows] = await pool.execute(query, [id])
    if (rows.length === 0) return null
    return this.formatPortfolio(rows[0])
  }

  static async findBySlug(slug) {
    const query = 'SELECT * FROM portfolios WHERE slug = ?'
    const [rows] = await pool.execute(query, [slug])
    if (rows.length === 0) return null
    return this.formatPortfolio(rows[0])
  }

  static async update(id, portfolioData) {
    const { project_name, slug, description, image_url, demo_link, repo_link, tags, category, project_type, status, order_index, start_date, end_date, team_size, role, technologies, featured, client_name, client_url, client_testimonial } = portfolioData
    const updates = []
    const values = []

    if (project_name) {
      updates.push('project_name = ?')
      values.push(project_name)
    }
    if (slug) {
      updates.push('slug = ?')
      values.push(slug)
    }
    if (description) {
      updates.push('description = ?')
      values.push(description)
    }
    if (image_url !== undefined) {
      updates.push('image_url = ?')
      values.push(image_url)
    }
    if (demo_link !== undefined) {
      updates.push('demo_link = ?')
      values.push(demo_link)
    }
    if (repo_link !== undefined) {
      updates.push('repo_link = ?')
      values.push(repo_link)
    }
    if (tags !== undefined) {
      updates.push('tags = ?')
      values.push(JSON.stringify(tags))
    }
    if (category) {
      updates.push('category = ?')
      values.push(category)
    }
    if (project_type) {
      updates.push('project_type = ?')
      values.push(project_type)
    }
    if (status) {
      updates.push('status = ?')
      values.push(status)
    }
    if (order_index !== undefined) {
      updates.push('order_index = ?')
      values.push(order_index)
    }
    if (start_date !== undefined) {
      updates.push('start_date = ?')
      values.push(start_date)
    }
    if (end_date !== undefined) {
      updates.push('end_date = ?')
      values.push(end_date)
    }
    if (team_size !== undefined) {
      updates.push('team_size = ?')
      values.push(team_size)
    }
    if (role) {
      updates.push('role = ?')
      values.push(role)
    }
    if (technologies !== undefined) {
      updates.push('technologies = ?')
      values.push(JSON.stringify(technologies))
    }
    if (featured !== undefined) {
      updates.push('featured = ?')
      values.push(featured)
    }
    if (client_name !== undefined) {
      updates.push('client_name = ?')
      values.push(client_name)
    }
    if (client_url !== undefined) {
      updates.push('client_url = ?')
      values.push(client_url)
    }
    if (client_testimonial !== undefined) {
      updates.push('client_testimonial = ?')
      values.push(client_testimonial)
    }

    if (updates.length === 0) return null

    values.push(id)
    const query = `UPDATE portfolios SET ${updates.join(', ')} WHERE id = ?`
    
    try {
      await pool.execute(query, values)
      return await this.findById(id)
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Slug already exists')
      }
      throw error
    }
  }

  static async delete(id) {
    const query = 'DELETE FROM portfolios WHERE id = ?'
    const [result] = await pool.execute(query, [id])
    return result.affectedRows > 0
  }

  static async findAll(filters = {}) {
    let query = 'SELECT * FROM portfolios WHERE 1=1'
    const values = []

    if (filters.status) {
      query += ' AND status = ?'
      values.push(filters.status)
    }
    if (filters.category) {
      query += ' AND category = ?'
      values.push(filters.category)
    }
    if (filters.featured !== undefined) {
      query += ' AND featured = ?'
      values.push(filters.featured)
    }
    if (filters.project_type) {
      query += ' AND project_type = ?'
      values.push(filters.project_type)
    }

    query += ' ORDER BY order_index ASC, created_at DESC'
    
    if (filters.limit) {
      query += ' LIMIT ?'
      values.push(filters.limit)
    }

    if (filters.offset) {
      query += ' OFFSET ?'
      values.push(filters.offset)
    }

    const [rows] = await pool.execute(query, values)
    return rows.map(row => this.formatPortfolio(row))
  }

  static async findFeatured(limit = 6) {
    return this.findAll({ featured: true, status: 'Completed', limit })
  }

  static async findByCategory(category) {
    return this.findAll({ category, status: 'Completed' })
  }

  static async findRecent(limit = 6) {
    return this.findAll({ status: 'Completed', limit })
  }

  static async search(searchTerm, filters = {}) {
    let query = 'SELECT * FROM portfolios WHERE 1=1'
    const values = []

    if (searchTerm) {
      query += ' AND (project_name LIKE ? OR description LIKE ?)'
      const term = `%${searchTerm}%`
      values.push(term, term)
    }

    if (filters.status) {
      query += ' AND status = ?'
      values.push(filters.status)
    }
    if (filters.category) {
      query += ' AND category = ?'
      values.push(filters.category)
    }

    query += ' ORDER BY order_index ASC, created_at DESC'
    
    if (filters.limit) {
      query += ' LIMIT ?'
      values.push(filters.limit)
    }

    const [rows] = await pool.execute(query, values)
    return rows.map(row => this.formatPortfolio(row))
  }

  static formatPortfolio(portfolio) {
    return {
      ...portfolio,
      tags: typeof portfolio.tags === 'string' ? JSON.parse(portfolio.tags) : portfolio.tags,
      technologies: typeof portfolio.technologies === 'string' ? JSON.parse(portfolio.technologies) : portfolio.technologies,
      url: `/portfolio/${portfolio.slug}`,
      full_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'}/portfolio/${portfolio.slug}`,
      formatted_date: portfolio.created_at 
        ? new Date(portfolio.created_at).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })
        : null,
      isFeatured: portfolio.featured
    }
  }
}

export default Portfolio
