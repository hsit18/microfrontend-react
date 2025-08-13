import React, { Suspense, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import ErrorBoundary from './components/ErrorBoundary'
import pubSubService from './services/pubsub.ts'

// Lazy load microfrontends
const UserListApp = React.lazy(() => import('user-list-app/UserListApp'))
const UserDetailsApp = React.lazy(() => import('user-details-app/UserDetailsApp'))

function App() {
  useEffect(() => {
    // Publish app loaded event
    pubSubService.publish('app.loaded', {
      appName: 'host-app',
      timestamp: Date.now()
    })

    // Subscribe to navigation events
    const navigationToken = pubSubService.subscribe('navigation.change', (data) => {
      console.log('[Host] Navigation change requested:', data)
      // Handle navigation changes from microfrontends if needed
    })

    // Cleanup subscriptions on unmount
    return () => {
      pubSubService.unsubscribe(navigationToken)
    }
  }, [])

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
  const [pubSubStatus, setPubSubStatus] = useState('Not Connected')
  const [events, setEvents] = useState([])

  useEffect(() => {
    // Check pub/sub availability
    if (window.MFE_PubSub) {
      setPubSubStatus('Connected')
      
      // Subscribe to all events for demonstration
      const tokens = []
      
      const eventTypes = ['user.selected', 'user.updated', 'navigation.change', 'navigation.back', 'app.loaded', 'data.refresh']
      
      eventTypes.forEach(eventType => {
        const token = window.MFE_PubSub.subscribe(eventType, (data) => {
          setEvents(prev => [...prev.slice(-4), {
            type: eventType,
            data,
            timestamp: new Date().toLocaleTimeString()
          }])
        })
        tokens.push(token)
      })
      
      return () => {
        tokens.forEach(token => window.MFE_PubSub.unsubscribe(token))
      }
    }
  }, [])

  const testPubSub = () => {
    if (window.MFE_PubSub) {
      window.MFE_PubSub.publish('data.refresh', {
        source: 'host-app-test',
        timestamp: Date.now()
      })
    }
  }

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Welcome to Microfrontend App</h1>
      <p className="text-lg text-gray-600 mb-8">
        This is a demonstration of microfrontend architecture using React, Vite, and Module Federation with Pub/Sub communication.
      </p>
      
      {/* Pub/Sub Status */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 max-w-2xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">Pub/Sub System Status</h3>
        <div className="flex items-center justify-center space-x-4 mb-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            pubSubStatus === 'Connected' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {pubSubStatus}
          </span>
          <button
            onClick={testPubSub}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
          >
            Test Pub/Sub
          </button>
        </div>
        
        {/* Recent Events */}
        {events.length > 0 && (
          <div className="text-left">
            <h4 className="font-medium mb-2">Recent Events:</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {events.map((event, index) => (
                <div key={index} className="bg-gray-50 p-2 rounded text-xs">
                  <span className="font-medium text-blue-600">{event.type}</span>
                  <span className="text-gray-500 ml-2">{event.timestamp}</span>
                  <div className="text-gray-700">{JSON.stringify(event.data, null, 2)}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
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
  
  useEffect(() => {
    // Subscribe to user selection events from the user list app
    const userSelectedToken = pubSubService.subscribe('user.selected', (data) => {
      console.log('[Host] User selected:', data)
      navigate(`/users/${data.userId}`)
      
      // Publish navigation change event
      pubSubService.publish('navigation.change', {
        path: `/users/${data.userId}`,
        params: { userId: data.userId }
      })
    })

    return () => {
      pubSubService.unsubscribe(userSelectedToken)
    }
  }, [navigate])

  const handleUserSelect = (userId) => {
    // Publish user selection event
    pubSubService.publish('user.selected', { userId })
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

  useEffect(() => {
    // Publish user details view event
    if (id) {
      pubSubService.publish('navigation.change', {
        path: `/users/${id}`,
        params: { userId: parseInt(id) }
      })
    }

    // Subscribe to navigation back events
    const backToken = pubSubService.subscribe('navigation.back', () => {
      navigate('/users')
    })

    return () => {
      pubSubService.unsubscribe(backToken)
    }
  }, [id, navigate])

  const handleBackToUsers = () => {
    pubSubService.publish('navigation.back', { previousPath: `/users/${id}` })
    navigate('/users')
  }

  return (
    <div>
      <button
        onClick={handleBackToUsers}
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
