import { pool } from '../lib/db.js'

class Blog {
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS blogs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        content TEXT NOT NULL,
        tags JSON DEFAULT '[]',
        category ENUM('technology', 'tutorial', 'news', 'opinion', 'case-study', 'announcement') DEFAULT 'technology',
        seo_title VARCHAR(255) DEFAULT '',
        seo_description TEXT DEFAULT '',
        image_url TEXT DEFAULT '',
        status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
        featured BOOLEAN DEFAULT FALSE,
        read_time INT DEFAULT 5,
        author_id INT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_slug (slug),
        INDEX idx_category (category),
        INDEX idx_status (status),
        INDEX idx_created_at (created_at),
        INDEX idx_author_id (author_id),
        FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `
    try {
      await pool.execute(query)
      console.log('✅ Blogs table created or already exists')
    } catch (error) {
      console.error('❌ Error creating blogs table:', error)
      throw error
    }
  }

  static generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '-')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  static async create(blogData) {
    const { title, slug, content, tags = [], category = 'technology', seo_title = '', seo_description = '', image_url = '', status = 'draft', featured = false, read_time = 5, author_id } = blogData
    
    if (!title) {
      throw new Error('Title is required')
    }
    if (!content) {
      throw new Error('Content is required')
    }

    const finalSlug = slug || this.generateSlug(title)
    const tagsJson = JSON.stringify(tags)

    const query = `
      INSERT INTO blogs (title, slug, content, tags, category, seo_title, seo_description, image_url, status, featured, read_time, author_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    
    try {
      const [result] = await pool.execute(query, [title, finalSlug, content, tagsJson, category, seo_title, seo_description, image_url, status, featured, read_time, author_id])
      return await this.findById(result.insertId)
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Slug already exists')
      }
      throw error
    }
  }

  static async findById(id) {
    const query = 'SELECT * FROM blogs WHERE id = ?'
    const [rows] = await pool.execute(query, [id])
    if (rows.length === 0) return null
    return this.formatBlog(rows[0])
  }

  static async findBySlug(slug) {
    const query = 'SELECT * FROM blogs WHERE slug = ?'
    const [rows] = await pool.execute(query, [slug])
    if (rows.length === 0) return null
    return this.formatBlog(rows[0])
  }

  static async update(id, blogData) {
    const { title, slug, content, tags, category, seo_title, seo_description, image_url, status, featured, read_time, author_id } = blogData
    const updates = []
    const values = []

    if (title) {
      updates.push('title = ?')
      values.push(title)
    }
    if (slug) {
      updates.push('slug = ?')
      values.push(slug)
    }
    if (content) {
      updates.push('content = ?')
      values.push(content)
    }
    if (tags !== undefined) {
      updates.push('tags = ?')
      values.push(JSON.stringify(tags))
    }
    if (category) {
      updates.push('category = ?')
      values.push(category)
    }
    if (seo_title !== undefined) {
      updates.push('seo_title = ?')
      values.push(seo_title)
    }
    if (seo_description !== undefined) {
      updates.push('seo_description = ?')
      values.push(seo_description)
    }
    if (image_url !== undefined) {
      updates.push('image_url = ?')
      values.push(image_url)
    }
    if (status) {
      updates.push('status = ?')
      values.push(status)
    }
    if (featured !== undefined) {
      updates.push('featured = ?')
      values.push(featured)
    }
    if (read_time !== undefined) {
      updates.push('read_time = ?')
      values.push(read_time)
    }
    if (author_id !== undefined) {
      updates.push('author_id = ?')
      values.push(author_id)
    }

    if (updates.length === 0) return null

    values.push(id)
    const query = `UPDATE blogs SET ${updates.join(', ')} WHERE id = ?`
    
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
    const query = 'DELETE FROM blogs WHERE id = ?'
    const [result] = await pool.execute(query, [id])
    return result.affectedRows > 0
  }

  static async findAll(filters = {}) {
    let query = 'SELECT * FROM blogs WHERE 1=1'
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
    if (filters.author_id) {
      query += ' AND author_id = ?'
      values.push(filters.author_id)
    }
    if (filters.search) {
      query += ' AND (title LIKE ? OR content LIKE ?)'
      const searchTerm = `%${filters.search}%`
      values.push(searchTerm, searchTerm)
    }

    query += ' ORDER BY created_at DESC'
    
    if (filters.limit) {
      query += ' LIMIT ?'
      values.push(filters.limit)
    }

    if (filters.offset) {
      query += ' OFFSET ?'
      values.push(filters.offset)
    }

    const [rows] = await pool.execute(query, values)
    return rows.map(row => this.formatBlog(row))
  }

  static async search(searchTerm, filters = {}) {
    return this.findAll({ ...filters, search: searchTerm })
  }

  static formatBlog(blog) {
    return {
      ...blog,
      tags: typeof blog.tags === 'string' ? JSON.parse(blog.tags) : blog.tags,
      seo_meta: {
        title: blog.seo_title,
        description: blog.seo_description
      },
      url: `/blog/${blog.slug}`,
      full_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'}/blog/${blog.slug}`,
      isPublished: blog.status === 'published'
    }
  }
}

export default Blog
