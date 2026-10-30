import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

export default function Home() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/me/')
      .then((res) => setUser(res.data))
      .catch(() => navigate('/login'))
      .finally(() => setLoading(false))
  }, [navigate])

  const handleLogout = async () => {
    try {
      await api.post('/logout/')
    } finally {
      navigate('/login')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-400 text-sm">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 px-4 sm:px-8 py-4 flex items-center justify-between">
        <span className="text-xl font-bold text-indigo-600 tracking-tight">titleloop</span>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-500 hover:text-red-500 font-medium transition-colors"
        >
          Logout
        </button>
      </nav>

      {/* Main content */}
      <main className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10">
          <div className="text-5xl mb-4">👋</div>
          <h2 className="text-3xl font-bold text-gray-800">
            Hey, {user?.username}!
          </h2>
          <p className="text-gray-500 mt-3 text-base">
            Welcome to <span className="text-indigo-600 font-semibold">titleloop</span>. You're all set.
          </p>

          <div className="mt-8 text-left bg-gray-50 rounded-xl p-5 space-y-2 text-sm text-gray-600">
            <div><span className="font-medium text-gray-700">Email:</span> {user?.email}</div>
            <div><span className="font-medium text-gray-700">Phone:</span> {user?.phone}</div>
          </div>
        </div>
      </main>
    </div>
  )
}
