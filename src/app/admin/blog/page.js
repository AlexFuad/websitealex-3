'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Edit, 
  Trash2, 
  Plus, 
  Eye, 
  Calendar,
  TrendingUp,
  MessageSquare,
  Search
} from 'lucide-react'

export default function BlogManagement() {
  const router = useRouter()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'technology', label: 'Technology' },
    { value: 'tutorial', label: 'Tutorial' },
    { value: 'news', label: 'News' },
    { value: 'opinion', label: 'Opinion' },
    { value: 'case-study', label: 'Case Study' },
    { value: 'announcement', label: 'Announcement' }
  ]

  const statuses = [
    { value: '', label: 'All Status' },
    { value: 'draft', label: 'Draft' },
    { value: 'published', label: 'Published' },
    { value: 'archived', label: 'Archived' }
  ]

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (searchTerm) params.set('search', searchTerm)
      if (selectedCategory) params.set('category', selectedCategory)
      if (selectedStatus) params.set('status', selectedStatus)
      params.set('page', currentPage.toString())
      params.set('limit', '10')

      const response = await fetch(`/api/blog?${params.toString()}`, {
        cache: 'no-store'
      })
      
      if (response.ok) {
        const data = await response.json()
        setPosts(data.posts)
        setTotalPages(data.pagination.pages)
      } else {
        console.error('Failed to fetch posts')
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return

    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchPosts() // Refresh the list
      } else {
        alert('Failed to delete blog post')
      }
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('Failed to delete blog post')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'text-green-400 bg-green-100'
      case 'draft': return 'text-yellow-400 bg-yellow-100'
      case 'archived': return 'text-gray-400 bg-gray-100'
      default: return 'text-gray-400 bg-gray-100'
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Blog Management</h1>
          
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    fetchPosts()
                  }
                }}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              >
                {statuses.map(status => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>

              <button
                onClick={() => router.push('/admin/blog/new')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
              >
                <Plus className="w-4 h-4 inline mr-2" />
                New Post
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-r-2 border-t-2 border-l-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="glass-card-dark p-6 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <FileText className="w-8 h-8 text-blue-400" />
                  <span className="text-2xl font-bold text-white">{posts.length}</span>
                </div>
                <p className="text-gray-400 text-sm">Total Posts</p>
              </div>
              
              <div className="glass-card-dark p-6 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Calendar className="w-8 h-8 text-green-400" />
                  <span className="text-2xl font-bold text-white">
                    {posts.filter(p => p.status === 'published').length}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">Published</p>
              </div>
              
              <div className="glass-card-dark p-6 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Edit className="w-8 h-8 text-yellow-400" />
                  <span className="text-2xl font-bold text-white">
                    {posts.filter(p => p.status === 'draft').length}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">Drafts</p>
              </div>
              
              <div className="glass-card-dark p-6 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="w-8 h-8 text-purple-400" />
                  <span className="text-2xl font-bold text-white">
                    {posts.reduce((total, post) => total + (post.view_count || 0), 0)}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">Total Views</p>
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  key={post._id}
                  className="glass-card-dark rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                >
                  {/* Post Header */}
                  <div className="p-6 border-b border-gray-700">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">
                          {post.title}
                        </h3>
                        <div className="flex items-center space-x-2 mb-3">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(post.status)}`}>
                            {post.status}
                          </span>
                          <span className="text-gray-400 text-sm">
                            by {post.author?.username || 'Unknown'} • {formatDate(post.created_at)}
                          </span>
                        </div>
                        
                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {post.tags.slice(0, 3).map((tag, tagIndex) => (
                              <span key={tagIndex} className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded-full">
                                {tag}
                              </span>
                            ))}
                            {post.tags.length > 3 && (
                              <span className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded-full">
                                +{post.tags.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                      {/* Actions */}
                      <div className="flex space-x-2">
                        <button
                          onClick={() => router.push(`/admin/blog/new?edit=${post._id}`)}
                          className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        
                        <button
                          onClick={() => router.push(`/blog/${post.slug}`)}
                          className="p-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-300"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        
                        <button
                          onClick={() => handleDelete(post._id)}
                          className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Post Excerpt */}
                  <div className="p-6">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {truncateText(post.excerpt || post.content?.replace(/<[^>]*>/g, ''), 150)}
                    </p>
                    
                    {/* View Count */}
                    <div className="flex items-center text-gray-400 text-sm mt-2">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      <span>{post.view_count || 0} views</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-4 mt-8">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  Previous
                </button>
                
                <div className="flex space-x-2">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 rounded-lg transition-all duration-300 ${
                        currentPage === i + 1
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-white hover:bg-gray-600'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
