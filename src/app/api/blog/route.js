import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { Blog } from '../../../models/index.js'
import connectDB from '../../../lib/db.js'

// GET /api/blog - Fetch all blog posts
export async function GET(request) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page')) || 1
    const limit = parseInt(searchParams.get('limit')) || 10
    const category = searchParams.get('category')
    const status = searchParams.get('status')
    
    // Build query
    const query = {}
    if (category) query.category = category
    if (status) query.status = status
    if (searchParams.get('featured')) query.featured = true
    
    // Get total count for pagination
    const total = await Blog.countDocuments(query)
    
    // Fetch posts with pagination
    const posts = await Blog.find(query)
      .sort({ created_at: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('author', 'username email profile_image')
      .lean()
    
    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasNext: page * limit < total
      }
    })
  } catch (error) {
    console.error('Blog GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}

// POST /api/blog - Create new blog post
export async function POST(request) {
  try {
    await connectDB()
    
    const session = await getServerSession()
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      )
    }
    
    const body = await request.json()
    
    // Validate required fields
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }
    
    // Create blog post
    const blogPost = new Blog({
      title: body.title,
      slug: body.slug || generateSlug(body.title),
      content: body.content,
      excerpt: body.excerpt,
      tags: Array.isArray(body.tags) ? body.tags : body.tags.split(','),
      category: body.category || 'technology',
      seo_meta: body.seo_meta || {},
      image_url: body.image_url || '',
      author: session.user.id,
      status: body.status || 'draft'
    })
    
    const savedPost = await blogPost.save()
    
    return NextResponse.json({
      message: 'Blog post created successfully',
      post: savedPost
    }, { status: 201 })
  } catch (error) {
    console.error('Blog POST error:', error)
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}

// PUT /api/blog/[id] - Update blog post
export async function PUT(request, { params }) {
  try {
    await connectDB()
    
    const session = await getServerSession()
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      )
    }
    
    const body = await request.json()
    const { id } = params
    
    // Find and update blog post
    const updatedPost = await Blog.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    )
    
    if (!updatedPost) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      message: 'Blog post updated successfully',
      post: updatedPost
    })
  } catch (error) {
    console.error('Blog PUT error:', error)
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    )
  }
}

// DELETE /api/blog/[id] - Delete blog post
export async function DELETE(request, { params }) {
  try {
    await connectDB()
    
    const session = await getServerSession()
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      )
    }
    
    const { id } = params
    
    // Delete blog post
    const deletedPost = await Blog.findByIdAndDelete(id)
    
    if (!deletedPost) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      message: 'Blog post deleted successfully'
    })
  } catch (error) {
    console.error('Blog DELETE error:', error)
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    )
  }
}

// Helper function to generate slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
}
