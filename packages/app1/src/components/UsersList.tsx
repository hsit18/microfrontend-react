import React, { useState, useEffect } from 'react';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data simulation
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUsers: User[] = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
          role: 'Admin'
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          role: 'Developer'
        },
        {
          id: 3,
          name: 'Mike Johnson',
          email: 'mike.johnson@example.com',
          role: 'Designer'
        },
        {
          id: 4,
          name: 'Sarah Wilson',
          email: 'sarah.wilson@example.com',
          role: 'Manager'
        },
        {
          id: 5,
          name: 'David Brown',
          email: 'david.brown@example.com',
          role: 'Developer'
        },
        {
          id: 6,
          name: 'Emily Davis',
          email: 'emily.davis@example.com',
          role: 'QA Engineer'
        }
      ];
      
      setUsers(mockUsers);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  const addUser = () => {
    const newUser: User = {
      id: users.length + 1,
      name: `User ${users.length + 1}`,
      email: `user${users.length + 1}@example.com`,
      role: 'Developer'
    };
    setUsers([...users, newUser]);
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase();
  };

  const getRoleColor = (role: string): string => {
    const roleColors: { [key: string]: string } = {
      'Admin': '#ff6b6b',
      'Manager': '#4ecdc4',
      'Developer': '#45b7d1',
      'Designer': '#96ceb4',
      'QA Engineer': '#feca57'
    };
    return roleColors[role] || '#6c757d';
  };

  if (loading) {
    return (
      <div className="users-list-container">
        <div className="loading">
          <span>🔄 Loading users...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="users-list-container">
      <div className="users-list-header">
        <h2 className="users-list-title">Users List</h2>
        <button className="add-user-btn" onClick={addUser}>
          ➕ Add User
        </button>
      </div>
      
      {users.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">👤</div>
          <p>No users found. Click "Add User" to get started!</p>
        </div>
      ) : (
        <div className="users-grid">
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <div className="user-avatar">
                {getInitials(user.name)}
              </div>
              <h3 className="user-name">{user.name}</h3>
              <p className="user-email">{user.email}</p>
              <span 
                className="user-role" 
                style={{ 
                  backgroundColor: `${getRoleColor(user.role)}20`,
                  color: getRoleColor(user.role),
                  border: `1px solid ${getRoleColor(user.role)}40`
                }}
              >
                {user.role}
              </span>
            </div>
          ))}
        </div>
      )}
      
      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        background: '#f8f9fa', 
        borderRadius: '8px',
        fontSize: '0.9rem',
        color: '#666'
      }}>
        💡 This component is loaded via Module Federation from App1 (port 3001)
      </div>
    </div>
  );
};

export default UsersList;
