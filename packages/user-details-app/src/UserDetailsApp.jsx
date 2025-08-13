import React, { useState, useEffect } from 'react'

// Mock users data (same as in user-list-app for consistency)
const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
    role: 'Software Engineer',
    status: 'active',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, San Francisco, CA 94102',
    joinDate: '2022-01-15',
    department: 'Engineering',
    manager: 'Sarah Wilson',
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS'],
    projects: [
      { name: 'E-commerce Platform', status: 'In Progress', role: 'Lead Developer' },
      { name: 'Mobile App Redesign', status: 'Completed', role: 'Frontend Developer' },
      { name: 'API Integration', status: 'Planning', role: 'Backend Developer' }
    ],
    bio: 'Experienced software engineer with a passion for building scalable web applications. Loves working with modern JavaScript frameworks and cloud technologies.'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
    role: 'Product Manager',
    status: 'active',
    phone: '+1 (555) 234-5678',
    address: '456 Oak Ave, New York, NY 10001',
    joinDate: '2021-08-20',
    department: 'Product',
    manager: 'Mike Johnson',
    skills: ['Product Strategy', 'User Research', 'Analytics', 'Agile', 'Figma'],
    projects: [
      { name: 'User Experience Optimization', status: 'In Progress', role: 'Product Owner' },
      { name: 'Feature Roadmap Q3', status: 'Completed', role: 'Lead PM' },
      { name: 'Market Research Initiative', status: 'In Progress', role: 'Research Lead' }
    ],
    bio: 'Strategic product manager focused on user-centered design and data-driven decision making. Expert in translating business requirements into technical solutions.'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
    role: 'UI/UX Designer',
    status: 'away',
    phone: '+1 (555) 345-6789',
    address: '789 Pine St, Austin, TX 78701',
    joinDate: '2020-11-10',
    department: 'Design',
    manager: 'David Brown',
    skills: ['UI Design', 'UX Research', 'Prototyping', 'Adobe Creative Suite', 'Sketch'],
    projects: [
      { name: 'Design System Update', status: 'In Progress', role: 'Lead Designer' },
      { name: 'Mobile App UI Refresh', status: 'Completed', role: 'UI Designer' },
      { name: 'User Journey Mapping', status: 'Planning', role: 'UX Researcher' }
    ],
    bio: 'Creative designer passionate about creating intuitive and beautiful user experiences. Specializes in design systems and user research methodologies.'
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
    role: 'Data Scientist',
    status: 'active',
    phone: '+1 (555) 456-7890',
    address: '321 Elm St, Seattle, WA 98101',
    joinDate: '2021-03-05',
    department: 'Analytics',
    manager: 'John Doe',
    skills: ['Python', 'Machine Learning', 'SQL', 'Tableau', 'TensorFlow'],
    projects: [
      { name: 'Predictive Analytics Model', status: 'In Progress', role: 'Lead Data Scientist' },
      { name: 'Customer Segmentation Analysis', status: 'Completed', role: 'Data Analyst' },
      { name: 'ML Pipeline Optimization', status: 'Planning', role: 'ML Engineer' }
    ],
    bio: 'Data scientist with expertise in machine learning and statistical analysis. Focused on turning complex data into actionable business insights.'
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david.brown@example.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
    role: 'DevOps Engineer',
    status: 'offline',
    phone: '+1 (555) 567-8901',
    address: '654 Maple Dr, Denver, CO 80202',
    joinDate: '2019-07-12',
    department: 'Infrastructure',
    manager: 'Jane Smith',
    skills: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'Jenkins'],
    projects: [
      { name: 'Infrastructure Modernization', status: 'In Progress', role: 'DevOps Lead' },
      { name: 'CI/CD Pipeline Setup', status: 'Completed', role: 'Build Engineer' },
      { name: 'Security Audit', status: 'Planning', role: 'Security Engineer' }
    ],
    bio: 'DevOps engineer specializing in cloud infrastructure and automation. Expert in containerization and continuous integration/deployment practices.'
  }
]

function UserDetailsApp({ userId }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundUser = mockUsers.find(u => u.id === parseInt(userId))
      setUser(foundUser)
      setLoading(false)
    }, 800)
  }, [userId])

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-500'
      case 'away':
        return 'bg-yellow-500'
      case 'offline':
        return 'bg-gray-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'text-green-800 bg-green-100'
      case 'away':
        return 'text-yellow-800 bg-yellow-100'
      case 'offline':
        return 'text-gray-800 bg-gray-100'
      default:
        return 'text-gray-800 bg-gray-100'
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">User not found</h3>
        <p className="mt-1 text-sm text-gray-500">The user you're looking for doesn't exist.</p>
      </div>
    )
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '👤' },
    { id: 'projects', name: 'Projects', icon: '📋' },
    { id: 'skills', name: 'Skills', icon: '🎯' }
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* User Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className={`absolute bottom-0 right-0 w-6 h-6 rounded-full border-4 border-white ${getStatusColor(user.status)}`}></div>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-lg text-blue-600 font-medium">{user.role}</p>
            <p className="text-gray-600">{user.department} Department</p>
            <div className="mt-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusText(user.status)}`}>
                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Joined</p>
            <p className="font-medium">{new Date(user.joinDate).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">About</h3>
                <p className="text-gray-700">{user.bio}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-3">Contact Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="w-4 h-4 mr-3">📧</span>
                      <span className="text-gray-700">{user.email}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 mr-3">📱</span>
                      <span className="text-gray-700">{user.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 mr-3">📍</span>
                      <span className="text-gray-700">{user.address}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-3">Work Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="w-4 h-4 mr-3">🏢</span>
                      <span className="text-gray-700">{user.department}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 mr-3">👨‍💼</span>
                      <span className="text-gray-700">Reports to {user.manager}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 mr-3">📅</span>
                      <span className="text-gray-700">Joined {new Date(user.joinDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Current Projects</h3>
              <div className="space-y-4">
                {user.projects.map((project, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">{project.name}</h4>
                        <p className="text-sm text-gray-600">Role: {project.role}</p>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Skills & Expertise</h3>
              <div className="flex flex-wrap gap-3">
                {user.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserDetailsApp
