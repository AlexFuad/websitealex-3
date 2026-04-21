import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation'

export default async function AdminDashboard() {
  const session = await getServerSession()

  // Check if user is authenticated and has admin role
  if (!session || session.user?.role !== 'admin') {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-card-dark p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Welcome, {session.user.username}!</h2>
            <p className="text-gray-400">You have successfully logged in to the admin panel.</p>
          </div>
          
          <div className="glass-card-dark p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Users:</span>
                <span className="text-white font-semibold">1,234</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Posts:</span>
                <span className="text-white font-semibold">567</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Projects:</span>
                <span className="text-white font-semibold">89</span>
              </div>
            </div>
          </div>
          
          <div className="glass-card-dark p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="text-sm text-gray-400">
                  <span className="text-blue-400">User john_doe</span> logged in successfully
                </p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <p className="text-sm text-gray-400">
                  <span className="text-green-400">New blog post</span> "Getting Started with Next.js 14" published
                </p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
