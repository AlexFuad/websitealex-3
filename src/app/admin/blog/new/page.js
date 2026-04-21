'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Save, 
  Eye, 
  EyeOff, 
  Bold, 
  Italic, 
  Underline, 
  Link, 
  Image, 
  Code2, 
  List, 
  AlignLeft,
  AlignCenter,
  AlignRight,
  Quote,
  Redo,
  Undo
} from 'lucide-react'
import dynamic from 'next/dynamic'
import 'react-quill-new/dist/quill.snow.css'

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-r-2 border-t-2 border-l-2 border-blue-500"></div>
})

export default function NewBlogPost() {
  const router = useRouter()
  const quillRef = useRef(null)
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [tags, setTags] = useState('')
  const [category, setCategory] = useState('technology')
  const [seoTitle, setSeoTitle] = useState('')
  const [seoDescription, setSeoDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [status, setStatus] = useState('draft')
  const [isPreview, setIsPreview] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const [readingTime, setReadingTime] = useState(0)

  const categories = [
    { value: 'technology', label: 'Technology' },
    { value: 'tutorial', label: 'Tutorial' },
    { value: 'news', label: 'News' },
    { value: 'opinion', label: 'Opinion' },
    { value: 'case-study', label: 'Case Study' },
    { value: 'announcement', label: 'Announcement' }
  ]

  useEffect(() => {
    // Generate slug from title
    if (title && !slug) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .trim()
      
      setSlug(generatedSlug)
    }
  }, [title])

  useEffect(() => {
    // Calculate word count and reading time
    if (content) {
      const text = content.replace(/<[^>]*>/g, '') // Remove HTML tags
      const words = text.trim().split(/\s+/).length
      setWordCount(words)
      setReadingTime(Math.max(1, Math.ceil(words / 200))) // 200 words per minute
    }
  }, [content])

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }, // Font sizes
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, // Text color
      [{ 'background': [] }, // Background color
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }], // Decrease/Increase indent
      [{ 'direction': { 'align': [] }}, // Text direction
      [{ 'size': ['small', false, false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] },
      [{ 'script': 'sub' }, { 'script': 'super' }], // Subscript/Superscript
      ['blockquote', 'code-block'],
      [{ 'link': 'link' }, { 'image': 'image' }],
      ['clean'] // Clear formatting
    ],
    clipboard: {
      matchVisual: false // Show text-only paste
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    
    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          slug,
          content,
          excerpt,
          tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
          category,
          seo_meta: {
            title: seoTitle || title,
            description: seoDescription || excerpt,
            keywords: tags.split(',').map(tag => tag.trim()).filter(tag => tag)
          },
          image_url: imageUrl,
          status
        })
      })

      if (response.ok) {
        const result = await response.json()
        router.push('/admin/blog')
      } else {
        throw new Error('Failed to save blog post')
      }
    } catch (error) {
      console.error('Save error:', error)
      alert('Failed to save blog post. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const handlePublish = async () => {
    await handleSave()
    setStatus('published')
  }

  const insertText = (text) => {
    const quill = quillRef.current?.getEditor()
    if (quill) {
      const range = quill.getSelection()
      quill.insertText(range ? range.index : 0, text)
    }
  }

  const insertLink = () => {
    const url = prompt('Enter URL:')
    if (url) {
      const quill = quillRef.current?.getEditor()
      if (quill) {
        const range = quill.getSelection()
        quill.formatText(range ? range.index : 0, url.length, 'link', url)
      }
    }
  }

  const insertImage = () => {
    const url = prompt('Enter image URL:')
    if (url) {
      insertText(`<img src="${url}" alt="Image" style="max-width: 100%; height: auto;" />`)
    }
  }

  const togglePreview = () => {
    setIsPreview(!isPreview)
  }

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Admin Layout with Sidebar */}
      <div className="flex w-full">
        {/* Sidebar Navigation - This will be handled by the layout */}
        
        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-white">Create New Blog Post</h1>
              <div className="flex space-x-2">
                <button
                  onClick={togglePreview}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isPreview 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-gray-600 text-white hover:bg-gray-700'
                  }`}
                >
                  {isPreview ? <Eye className="w-4 h-4 inline mr-2" /> : <EyeOff className="w-4 h-4 inline mr-2" />}
                  {isPreview ? 'Preview' : 'Edit'}
                </button>
                
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isSaving ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-r-2 border-t-2 border-l-2 border-white"></div>
                      <span className="ml-2">Saving...</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Save className="w-4 h-4 mr-2" />
                      <span>Save Draft</span>
                    </div>
                  )}
                </button>
                
                <button
                  onClick={handlePublish}
                  disabled={isSaving}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <span>Publish</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex flex-1">
            {/* Editor Mode */}
            {!isPreview ? (
              <div className="flex h-full">
                {/* Left Panel - Editor */}
                <div className="w-1/3 p-6 border-r border-gray-700">
                  {/* SEO Metadata Form */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <h2 className="text-xl font-semibold text-white mb-4">SEO Metadata</h2>
                    
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        SEO Title
                      </label>
                      <input
                        type="text"
                        value={seoTitle}
                        onChange={(e) => setSeoTitle(e.target.value)}
                        placeholder="Enter SEO title (max 60 chars)"
                        maxLength={60}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        SEO Description
                      </label>
                      <textarea
                        value={seoDescription}
                        onChange={(e) => setSeoDescription(e.target.value)}
                        placeholder="Enter SEO description (max 160 chars)"
                        maxLength={160}
                        rows={3}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      />
                    </div>

                    {/* Basic Info */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Blog Title
                        </label>
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Enter blog title"
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          URL Slug
                        </label>
                        <input
                          type="text"
                          value={slug}
                          onChange={(e) => setSlug(e.target.value)}
                          placeholder="url-friendly-slug"
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Excerpt
                        </label>
                        <textarea
                          value={excerpt}
                          onChange={(e) => setExcerpt(e.target.value)}
                          placeholder="Brief description for social sharing"
                          rows={2}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Tags (comma separated)
                        </label>
                        <input
                          type="text"
                          value={tags}
                          onChange={(e) => setTags(e.target.value)}
                          placeholder="react, next.js, tutorial"
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Category
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                        >
                          {categories.map(cat => (
                            <option key={cat.value} value={cat.value}>
                              {cat.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Featured Image URL
                        </label>
                        <input
                          type="text"
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                          placeholder="https://example.com/image.jpg"
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Status
                        </label>
                        <select
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                        >
                          <option value="draft">Draft</option>
                          <option value="published">Published</option>
                          <option value="archived">Archived</option>
                        </select>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                      <h3 className="text-lg font-semibold text-white mb-2">Content Stats</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Words:</span>
                          <span className="text-white font-medium">{wordCount}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Reading Time:</span>
                          <span className="text-white font-medium">{readingTime} min</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Editor Toolbar */}
                  <div className="mt-6">
                    <div className="flex flex-wrap gap-2 p-2 bg-gray-800 rounded-t-lg">
                      <button
                        onClick={() => insertText('**', 'bold')}
                        className="p-2 hover:bg-gray-700 rounded transition-colors duration-200"
                        title="Bold"
                      >
                        <Bold className="w-4 h-4 text-gray-300" />
                      </button>
                      <button
                        onClick={() => insertText('*', 'italic')}
                        className="p-2 hover:bg-gray-700 rounded transition-colors duration-200"
                        title="Italic"
                      >
                        <Italic className="w-4 h-4 text-gray-300" />
                      </button>
                      <button
                        onClick={() => insertText('<u>', 'underline')}
                        className="p-2 hover:bg-gray-700 rounded transition-colors duration-200"
                        title="Underline"
                      >
                        <Underline className="w-4 h-4 text-gray-300" />
                      </button>
                      <button
                        onClick={insertLink}
                        className="p-2 hover:bg-gray-700 rounded transition-colors duration-200"
                        title="Insert Link"
                      >
                        <Link className="w-4 h-4 text-gray-300" />
                      </button>
                      <button
                        onClick={insertImage}
                        className="p-2 hover:bg-gray-700 rounded transition-colors duration-200"
                        title="Insert Image"
                      >
                        <Image className="w-4 h-4 text-gray-300" />
                      </button>
                      <button
                        onClick={() => insertText('`', 'code')}
                        className="p-2 hover:bg-gray-700 rounded transition-colors duration-200"
                        title="Code"
                      >
                        <Code2 className="w-4 h-4 text-gray-300" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Panel - Editor */}
                <div className="flex-2 p-6">
                  <div className="bg-gray-800 rounded-lg h-full">
                    <ReactQuill
                      ref={quillRef}
                      theme="snow"
                      value={content}
                      onChange={setContent}
                      modules={modules}
                      placeholder="Start writing your blog post..."
                      className="h-[600px]"
                    />
                  </div>
                </div>
              </div>
            ) : (
              /* Preview Mode */
              <div className="flex-1 p-6 overflow-auto">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg shadow-2xl max-w-4xl mx-auto"
                >
                  <div className="p-8">
                    {/* Preview Header */}
                    <div className="border-b border-gray-200 pb-4 mb-6">
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {title || 'Untitled Post'}
                      </h1>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>By Admin</span>
                        <span>•</span>
                        <span>{new Date().toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Featured Image */}
                    {imageUrl && (
                      <div className="mb-6">
                        <img 
                          src={imageUrl} 
                          alt={title || 'Blog post image'}
                          className="w-full rounded-lg shadow-lg"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div 
                      className="prose prose-lg max-w-none text-gray-800"
                      dangerouslySetInnerHTML={{ __html: content }}
                    />

                    {/* Excerpt */}
                    {excerpt && (
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Excerpt</h3>
                        <p className="text-gray-700">{excerpt}</p>
                      </div>
                    )}

                    {/* Tags */}
                    {tags && (
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                          {tags.split(',').map((tag, index) => (
                            <span 
                              key={index}
                              className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                            >
                              {tag.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
          </div>
        </div>
      </div>
    </div>
  )
}
