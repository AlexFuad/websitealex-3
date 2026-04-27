'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Save, Trash2, Eye, EyeOff, Calendar, Clock, Tag, Search, Filter, ChevronDown, ExternalLink, Github, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'

export default function NewBlogPost() {
  const router = useRouter()
  const { data: session } = useSession()
  const quillRef = useRef(null)
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('Web Application')
  const [tags, setTags] = useState('')
  const [metaTitle, setMetaTitle] = useState('')
  const [metaDescription, setMetaDescription] = useState('')
  const [status, setStatus] = useState('draft')
  const [featured, setFeatured] = useState(false)
  const [publishedAt, setPublishedAt] = useState('')
  const [isPreview, setIsPreview] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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
    const generateSlug = (text) => {
      return text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '-')
        .replace(/-+/g, '-')
        .trim()
    }

    const handleTitleChange = (e) => {
      const newTitle = e.target.value
      setTitle(newTitle)
      setSlug(generateSlug(newTitle))
    }

    const fetchPosts = async () => {
      setLoading(true)
      setError('')
      
      try {
        const params = new URLSearchParams()
        if (searchTerm) params.set('search', searchTerm)
        if (selectedCategory) params.set('category', selectedCategory)
        params.set('status', 'published')
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

  const handleSave = async () => {
    setIsSaving(true)
    setError('')
    
    try {
      const postData = {
        title,
        slug: slug || title.toLowerCase().replace(/[^a-z0-9\s-]/g, '-').replace(/-+/g, '-').trim(),
        excerpt,
        content,
        category,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        meta_title: metaTitle || title,
        meta_description: metaDescription || excerpt,
        status,
        featured,
        published_at: status === 'published' ? publishedAt || new Date().toISOString() : null
      }

      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.accessToken}`
        },
        body: JSON.stringify(postData)
      })

      if (!response.ok) {
        throw new Error('Failed to save post')
      }

      const result = await response.json()
      
      if (result.success) {
        router.push('/admin/blog')
      } else {
        throw new Error(result.message || 'Failed to save post')
      }
    } catch (err) {
      console.error('Error saving post:', err)
      setError(err.message || 'Failed to save post')
    } finally {
      setIsSaving(false)
    }
  }

  const handleSaveDraft = async () => {
    setStatus('draft')
    await handleSave()
  }

  const handlePublish = async () => {
    setStatus('published')
    await handleSave()
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
              <span className="text-white font-medium">New Post</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsPreview(!isPreview)}
                className={`p-2 rounded-lg transition-colors duration-300 ${
                  isPreview 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                {isPreview ? (
                  <>
                    <EyeOff className="w-5 h-5" />
                    <span className="ml-2 hidden sm:inline">Edit</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-5 h-5" />
                    <span className="ml-2 hidden sm:inline">Preview</span>
                  </>
                )}
              </button>
              
              <button
                onClick={handleSave}
                disabled={isSaving || !title.trim()}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <Save className="w-5 h-5" />
                <span className="ml-2 hidden sm:inline">Save</span>
              </button>
              
              <button
                onClick={handleSaveDraft}
                disabled={isSaving || !title.trim()}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <Save className="w-5 h-5" />
                <span className="ml-2 hidden sm:inline">Save Draft</span>
              </button>
              
              <button
                onClick={handlePublish}
                disabled={isSaving || !title.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <Save className="w-5 h-5" />
                <span className="ml-2 hidden sm:inline">Publish</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Editor */}
          <div className="space-y-6">
            {/* Title Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                placeholder="Enter post title..."
                required
              />
            </div>

            {/* Slug Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                URL Slug
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                placeholder="url-friendly-post-title"
              />
            </div>

            {/* Excerpt Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Excerpt
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                placeholder="Brief description of post..."
              />
            </div>

            {/* Category Select */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tags
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                placeholder="tag1, tag2, tag3..."
              />
            </div>

            {/* Status Toggle */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Status
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="draft"
                    checked={status === 'draft'}
                    onChange={() => setStatus('draft')}
                    className="mr-2"
                  />
                  <span className="text-gray-300">Draft</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="published"
                    checked={status === 'published'}
                    onChange={() => setStatus('published')}
                    className="mr-2"
                  />
                  <span className="text-gray-300">Published</span>
                </label>
              </div>
            </div>

            {/* Featured Toggle */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="mr-2 rounded"
                />
                <span className="text-sm font-medium text-gray-300">Featured Post</span>
              </label>
            </div>

            {/* Published Date */}
            {status === 'published' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Published Date
                </label>
                <input
                  type="datetime-local"
                  value={publishedAt}
                  onChange={(e) => setPublishedAt(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                />
              </div>
            )}

            {/* SEO Metadata */}
            <div className="border-t border-gray-700 pt-6">
              <h3 className="text-lg font-medium text-white mb-4">SEO Metadata</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                    placeholder="SEO title (optional)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                    placeholder="SEO description (optional)"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Quill Editor */}
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg border border-gray-700">
              <div className="p-4">
                <ReactQuill
                  ref={quillRef}
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  modules={{
                    toolbar: [
                      [{ 'header': [1, 2, 3, 4, 5, 6, false] },
                      [{ 'font': [] }],
                      [{ 'size': ['small', false, false, 'large', 'huge'] }],
                      [{ 'script': 'sub' }, { 'script': 'super' }],
                      ['blockquote', 'code-block'],
                      [{ 'link': 'link' }, { 'image': 'image' }],
                      ['clean']
                    ],
                    clipboard: {
                      matchVisual: false
                    }
                  }}
                  formats={[
                    'header', 'font', 'size',
                    'bold', 'italic', 'underline', 'strike',
                    'blockquote', 'code-block',
                    'list', 'bullet', 'ordered',
                    'script', 'sub', 'super',
                    'indent', 'outdent',
                    'direction', 'align',
                    'link', 'image', 'video',
                    'formula', 'clean'
                  ]}
                  placeholder="Write your blog post content here..."
                  className="bg-gray-800 text-white"
                />
              </div>
            </div>

            {/* Character Count */}
            <div className="text-sm text-gray-400 mt-2">
              {content.length} characters
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-6 p-4 bg-red-900 border border-red-700 rounded-lg">
            <div className="flex items-center">
              <X className="w-5 h-5 text-red-400 mr-2" />
              <span className="text-red-300">{error}</span>
            </div>
          </div>
        )}

        {/* Success Message */}
        {isSaving && (
          <div className="mt-6 p-4 bg-green-900 border border-green-700 rounded-lg">
            <div className="flex items-center">
              <Save className="w-5 h-5 text-green-400 mr-2 animate-spin" />
              <span className="text-green-300">Saving post...</span>
            </div>
          </div>
        )}
      </div>

      {/* Preview Mode */}
      {isPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg border border-gray-700 max-w-4xl max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Preview</h2>
                <button
                  onClick={() => setIsPreview(false)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="prose prose-invert max-w-none">
                <h1 className="text-2xl font-bold mb-4">{title || 'Untitled Post'}</h1>
                {excerpt && (
                  <p className="text-gray-300 mb-4">{excerpt}</p>
                )}
                <div 
                  className="text-gray-100 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
