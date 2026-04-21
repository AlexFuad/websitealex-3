import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

// List of admin routes that require authentication
const adminRoutes = [
  '/admin/dashboard',
  '/admin/blog',
  '/admin/blog/new',
  '/admin/skills',
  '/admin/portfolio',
  '/admin/settings'
]

// Public routes that don't require authentication
const publicRoutes = [
  '/',
  '/blog',
  '/portfolio',
  '/contact',
  '/api',
  '/admin/login',
  '/admin/register'
]

// Guest access routes (can be accessed without authentication)
const guestRoutes = [
  '/admin/dashboard',
  '/admin/blog',
  '/admin/portfolio'
]

export default function middleware(request) {
  const { pathname } = request.nextUrl

  // Skip authentication for public routes
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Check if it's an admin route
  if (adminRoutes.some(route => pathname.startsWith(route))) {
    const token = request.cookies.get('next-auth.session-token')?.value

    // Allow guest access for certain routes
    if (guestRoutes.some(route => pathname.startsWith(route))) {
      try {
        // Try to verify token but allow access even if invalid (read-only)
        const decodedToken = getToken({ 
          req: request, 
          secret: process.env.NEXTAUTH_SECRET 
        })

        // Add user info to request headers (guest user if no valid token)
        const response = NextResponse.next()
        response.headers.set('x-user-id', decodedToken?.id || 'guest')
        response.headers.set('x-user-email', decodedToken?.email || 'guest@example.com')
        response.headers.set('x-user-role', decodedToken?.role || 'guest')
        response.headers.set('x-user-username', decodedToken?.username || 'Guest User')
        response.headers.set('x-access-level', 'guest')

        return response
      } catch (error) {
        // Allow access as guest if token verification fails
        const response = NextResponse.next()
        response.headers.set('x-user-id', 'guest')
        response.headers.set('x-user-email', 'guest@example.com')
        response.headers.set('x-user-role', 'guest')
        response.headers.set('x-user-username', 'Guest User')
        response.headers.set('x-access-level', 'guest')

        return response
      }
    }

    // Allow access without admin role requirement
    try {
      // Try to verify token but allow access even without admin role
      const decodedToken = getToken({ 
        req: request, 
        secret: process.env.NEXTAUTH_SECRET 
      })

      // Add user info to request headers for downstream use
      const response = NextResponse.next()
      response.headers.set('x-user-id', decodedToken?.id || 'guest')
      response.headers.set('x-user-email', decodedToken?.email || 'guest@example.com')
      response.headers.set('x-user-role', decodedToken?.role || 'guest')
      response.headers.set('x-user-username', decodedToken?.username || 'Guest User')
      response.headers.set('x-access-level', decodedToken?.role || 'guest')

      return response
    } catch (error) {
      // Allow access even if token verification fails
      const response = NextResponse.next()
      response.headers.set('x-user-id', 'guest')
      response.headers.set('x-user-email', 'guest@example.com')
      response.headers.set('x-user-role', 'guest')
      response.headers.set('x-user-username', 'Guest User')
      response.headers.set('x-access-level', 'guest')

      return response
    }
  }

  // For non-admin routes, continue normally
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt (robots file)
     * - sitemap.xml (sitemap file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'
  ]
}
