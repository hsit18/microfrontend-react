import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import ErrorBoundary from './components/ErrorBoundary'

// Lazy load microfrontends
const UserListApp = React.lazy(() => import('user-list-app/UserListApp'))
const UserDetailsApp = React.lazy(() => import('user-details-app/UserDetailsApp'))

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <ErrorBoundary>
            <Suspense fallback={<div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            </div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/users" element={<UserListWrapper />} />
                <Route path="/users/:id" element={<UserDetailsWrapper />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
    </Router>
  )
}

function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Welcome to Microfrontend App</h1>
      <p className="text-lg text-gray-600 mb-8">
        This is a demonstration of microfrontend architecture using React, Vite, and Module Federation.
      </p>
      <div className="space-x-4">
        <Link
          to="/users"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          View Users
        </Link>
      </div>
    </div>
  )
}

function UserListWrapper() {
  const navigate = useNavigate()
  
  const handleUserSelect = (userId) => {
    navigate(`/users/${userId}`)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Users List</h2>
      <UserListApp onUserSelect={handleUserSelect} />
    </div>
  )
}

function UserDetailsWrapper() {
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <div>
      <button
        onClick={() => navigate('/users')}
        className="mb-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
      >
        ← Back to Users
      </button>
      <h2 className="text-2xl font-bold mb-4">User Details</h2>
      <UserDetailsApp userId={id} />
    </div>
  )
}

export default App
