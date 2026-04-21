import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  FileText, 
  Palette, 
  Briefcase, 
  Settings, 
  LogOut 
} from 'lucide-react'

export default async function AdminLayout({ children }) {
  const session = await getServerSession()

  // Check if user is authenticated and has admin role
  if (!session || session.user?.role !== 'admin') {
    redirect('/admin/login')
  }

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
      current: false
    },
    {
      name: 'Blog',
      href: '/admin/blog',
      icon: FileText,
      current: false
    },
    {
      name: 'Skills',
      href: '/admin/skills',
      icon: Palette,
      current: false
    },
    {
      name: 'Portfolio',
      href: '/admin/portfolio',
      icon: Briefcase,
      current: false
    },
    {
      name: 'Settings',
      href: '/admin/settings',
      icon: Settings,
      current: false
    }
  ]

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Admin Panel</h2>
              <p className="text-gray-400 text-sm">Management System</p>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">
                {session.user.username?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-white font-medium">{session.user.username}</p>
              <p className="text-gray-400 text-sm">{session.user.email}</p>
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                Admin
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const isActive = typeof window !== 'undefined' && window.location.pathname === item.href
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200
                  ${isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }
                `}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-6 border-t border-gray-700">
          <form action="/api/auth/signout" method="POST">
            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-white">
              {navigation.find(item => 
                typeof window !== 'undefined' && 
                window.location.pathname === item.href
              )?.name || 'Dashboard'}
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">
                Welcome back, {session.user.username}
              </span>
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-gray-900">
          <div className="py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
