'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Edit, Trash2, Eye, Calendar, Clock, Tag, Search, Filter, ChevronDown, ExternalLink, Github, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function BlogManagement() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session } = useSession()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedPosts, setSelectedPosts] = useState([])

  const categories = [
    { value: 'Web Application', label: 'Web Applications' },
    { value: 'Mobile App', label: 'Mobile Apps' },
    { value: 'API', label: 'APIs' },
    { value: 'UI/UX Design', label: 'Design' },
    { value: 'Tool', label: 'Tools' },
    { value: 'Library', label: 'Libraries' },
    { value: 'Other', label: 'Other' }
  ]

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      setError('')
      
      try {
        const params = new URLSearchParams()
        if (searchTerm) params.set('search', searchTerm)
        if (selectedCategory) params.set('category', selectedCategory)
        params.set('page', currentPage.toString())
        params.set('limit', '10')

        const response = await fetch(`/api/blog?${params.toString()}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch posts')
        }
        
        const data = await response.json()
        setPosts(data.posts || [])
        setTotalPages(data.pagination?.pages || 1)
      } catch (err) {
        console.error('Error fetching posts:', err)
        setError('Failed to load posts')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [searchTerm, selectedCategory, currentPage])

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchTerm) params.set('search', searchTerm)
    if (selectedCategory) params.set('category', selectedCategory)
    params.set('page', '1')
    router.push(`/admin/blog?${params.toString()}`)
  }

  const handleCategoryChange = (category) => {
    const params = new URLSearchParams()
    if (searchTerm) params.set('search', searchTerm)
    if (category) params.set('category', category)
    params.set('page', '1')
    router.push(`/admin/blog?${params.toString()}`)
  }

  const handlePageChange = (page) => {
    const params = new URLSearchParams()
    if (searchTerm) params.set('search', searchTerm)
    if (selectedCategory) params.set('category', selectedCategory)
    params.set('page', page.toString())
    router.push(`/admin/blog?${params.toString()}`)
  }

  const handleSelectPost = (postId) => {
    setSelectedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    )
  }

  const handleSelectAll = () => {
    if (selectedPosts.length === posts.length) {
      setSelectedPosts([])
    } else {
      setSelectedPosts(posts.map(post => post._id))
    }
  }

  const handleBulkDelete = async () => {
    if (selectedPosts.length === 0) return
    
    if (!confirm(`Are you sure you want to delete ${selectedPosts.length} post(s)?`)) {
      return
    }

    try {
      const deletePromises = selectedPosts.map(postId =>
        fetch(`/api/blog/${postId}`, { method: 'DELETE' })
      )
      
      await Promise.all(deletePromises)
      
      setPosts(posts.filter(post => !selectedPosts.includes(post._id)))
      setSelectedPosts([])
    } catch (err) {
      console.error('Error deleting posts:', err)
      setError('Failed to delete posts')
    }
  }

  const handleDelete = async (postId) => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return
    }

    try {
      const response = await fetch(`/api/blog/${postId}`, { method: 'DELETE' })
      
      if (!response.ok) {
        throw new Error('Failed to delete post')
      }
      
      setPosts(posts.filter(post => post._id !== postId))
    } catch (err) {
      console.error('Error deleting post:', err)
      setError('Failed to delete post')
    }
  }

  const truncateText = (text, maxLength) => {
    if (!text) return ''
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400">Please sign in to access this page.</p>
          <Link 
            href="/admin/login" 
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/admin/dashboard" className="text-white hover:text-gray-300">
                Dashboard
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-white font-medium">Blog</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                href="/admin/blog/new"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                New Post
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-8">
          <form onSubmit={handleSearch} className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search posts..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                />
              </div>
            </div>
            
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="appearance-none pr-8 pl-4 pr-10 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
            
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Search
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-900 border border-red-700 rounded-lg">
            <div className="flex items-center">
              <X className="w-5 h-5 text-red-400 mr-2" />
              <span className="text-red-300">{error}</span>
            </div>
          </div>
        )}

        {/* Bulk Actions */}
        {selectedPosts.length > 0 && (
          <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">
                {selectedPosts.length} post(s) selected
              </span>
              <button
                onClick={handleBulkDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
              >
                Delete Selected
              </button>
            </div>
          </div>
        )}

        {/* Posts List */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Posts</h2>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedPosts.length === posts.length && posts.length > 0}
                    onChange={handleSelectAll}
                    className="mr-2 rounded"
                  />
                  <span className="text-gray-300">Select All</span>
                </label>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400">No posts found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-gray-700 rounded-lg border border-gray-600 p-6"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start flex-1">
                        <input
                          type="checkbox"
                          checked={selectedPosts.includes(post._id)}
                          onChange={() => handleSelectPost(post._id)}
                          className="mr-4 mt-1 rounded"
                        />
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-medium text-white">
                              {post.title}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                post.status === 'published' 
                                  ? 'bg-green-600 text-white' 
                                  : 'bg-gray-600 text-white'
                              }`}>
                                {post.status}
                              </span>
                              {post.featured && (
                                <span className="px-2 py-1 text-xs bg-yellow-600 text-white rounded-full">
                                  Featured
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
                            <span className="flex items-center">
                              <Tag className="w-4 h-4 mr-1" />
                              {post.category}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {formatDate(post.created_at)}
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {post.updated_at && formatDate(post.updated_at)}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-2 mb-4">
                            <Link
                              href={`/admin/blog/edit/${post._id}`}
                              className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300"
                            >
                              <Edit className="w-4 h-4" />
                            </Link>
                            
                            <Link
                              href={`/blog/${post.slug}`}
                              target="_blank"
                              className="p-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors duration-300"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            
                            <button
                              onClick={() => handleDelete(post._id)}
                              className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-300"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
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
            )}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4 mt-8">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              Previous
            </button>
            
            <div className="flex space-x-2">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
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
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
