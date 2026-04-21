import { NextResponse } from 'next/server'
import { Portfolio } from '../../../models/index.js'
import connectDB from '../../../lib/db.js'

// GET /api/portfolio - Fetch all portfolio projects
export async function GET(request) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    
    // Build query
    const query = {}
    if (category) query.category = category
    if (featured) query.featured = true
    
    // Fetch projects
    const projects = await Portfolio.find(query)
      .sort({ order_index: 1, created_at: -1 })
      .lean()
    
    return NextResponse.json({
      projects,
      categories: await Portfolio.distinct('category'),
      total: projects.length
    })
  } catch (error) {
    console.error('Portfolio GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch portfolio projects' },
      { status: 500 }
    )
  }
}

// POST /api/portfolio - Create new portfolio project
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
    if (!body.project_name || !body.description) {
      return NextResponse.json(
        { error: 'Project name and description are required' },
        { status: 400 }
      )
    }
    
    // Create portfolio project
    const project = new Portfolio({
      project_name: body.project_name,
      slug: generateSlug(body.project_name),
      description: body.description,
      detailed_description: body.detailed_description || '',
      image_url: body.image_url || '',
      additional_images: body.additional_images || [],
      demo_link: body.demo_link || '',
      repo_link: body.repo_link || '',
      tags: Array.isArray(body.tags) ? body.tags : body.tags.split(','),
      category: body.category || 'Web Application',
      technologies: body.technologies || [],
      project_type: body.project_type || 'Personal',
      status: body.status || 'Completed',
      order_index: body.order_index || 0,
      start_date: body.start_date || new Date(),
      end_date: body.end_date || new Date(),
      team_size: body.team_size || 1,
      role: body.role || 'Full Stack Developer'
    })
    
    const savedProject = await project.save()
    
    return NextResponse.json({
      message: 'Portfolio project created successfully',
      project: savedProject
    }, { status: 201 })
  } catch (error) {
    console.error('Portfolio POST error:', error)
    return NextResponse.json(
      { error: 'Failed to create portfolio project' },
      { status: 500 }
    )
  }
}

// PUT /api/portfolio/[id] - Update portfolio project
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
    
    // Find and update project
    const updatedProject = await Portfolio.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    )
    
    if (!updatedProject) {
      return NextResponse.json(
        { error: 'Portfolio project not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      message: 'Portfolio project updated successfully',
      project: updatedProject
    })
  } catch (error) {
    console.error('Portfolio PUT error:', error)
    return NextResponse.json(
      { error: 'Failed to update portfolio project' },
      { status: 500 }
    )
  }
}

// DELETE /api/portfolio/[id] - Delete portfolio project
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
    
    // Delete project
    const deletedProject = await Portfolio.findByIdAndDelete(id)
    
    if (!deletedProject) {
      return NextResponse.json(
        { error: 'Portfolio project not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      message: 'Portfolio project deleted successfully'
    })
  } catch (error) {
    console.error('Portfolio DELETE error:', error)
    return NextResponse.json(
      { error: 'Failed to delete portfolio project' },
      { status: 500 }
    )
  }
}

// Helper function to generate slug from project name
function generateSlug(projectName) {
  return projectName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
}
