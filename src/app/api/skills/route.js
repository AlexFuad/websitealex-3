import { NextResponse } from 'next/server'
import { Skill } from '../../../models/index.js'
import connectDB from '../../../lib/db.js'

// GET /api/skills - Fetch all skills
export async function GET(request) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    
    // Build query
    const query = {}
    if (category) query.category = category
    if (featured) query.is_featured = true
    
    // Fetch skills
    const skills = await Skill.find(query)
      .sort({ level: -1, display_order: 1 })
      .lean()
    
    return NextResponse.json({
      skills,
      categories: await Skill.distinct('category'),
      total: skills.length
    })
  } catch (error) {
    console.error('Skills GET error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch skills' },
      { status: 500 }
    )
  }
}

// POST /api/skills - Create new skill
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
    if (!body.name || !body.category || body.level === undefined) {
      return NextResponse.json(
        { error: 'Name, category, and level are required' },
        { status: 400 }
      )
    }
    
    // Create skill
    const skill = new Skill({
      name: body.name,
      category: body.category,
      level: body.level,
      icon_name: body.icon_name || 'Code',
      description: body.description || '',
      years_experience: body.years_experience || 0,
      is_featured: body.is_featured || false,
      display_order: body.display_order || 0,
      tags: body.tags || []
    })
    
    const savedSkill = await skill.save()
    
    return NextResponse.json({
      message: 'Skill created successfully',
      skill: savedSkill
    }, { status: 201 })
  } catch (error) {
    console.error('Skills POST error:', error)
    return NextResponse.json(
      { error: 'Failed to create skill' },
      { status: 500 }
    )
  }
}

// PUT /api/skills/[id] - Update skill
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
    
    // Find and update skill
    const updatedSkill = await Skill.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    )
    
    if (!updatedSkill) {
      return NextResponse.json(
        { error: 'Skill not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      message: 'Skill updated successfully',
      skill: updatedSkill
    })
  } catch (error) {
    console.error('Skills PUT error:', error)
    return NextResponse.json(
      { error: 'Failed to update skill' },
      { status: 500 }
    )
  }
}

// DELETE /api/skills/[id] - Delete skill
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
    
    // Delete skill
    const deletedSkill = await Skill.findByIdAndDelete(id)
    
    if (!deletedSkill) {
      return NextResponse.json(
        { error: 'Skill not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      message: 'Skill deleted successfully'
    })
  } catch (error) {
    console.error('Skills DELETE error:', error)
    return NextResponse.json(
      { error: 'Failed to delete skill' },
      { status: 500 }
    )
  }
}
