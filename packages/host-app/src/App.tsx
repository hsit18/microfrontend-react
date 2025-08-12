import React, { Suspense } from 'react';
import './App.css';
import RemoteWrapper from './components/RemoteWrapper';

// Declare the remote module type
declare module 'app1/UsersList' {
  const UsersList: React.ComponentType;
  export default UsersList;
}

// Dynamic import for the remote component
const UsersList = React.lazy(() => import('app1/UsersList'));

const App: React.FC = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1>🏠 Host Application</h1>
        <p>Welcome to the Microfrontend Architecture Demo</p>
      </header>
      
      <main className="app-main">
        <div className="remote-app-container">
          <h2>📋 Users Management</h2>
          <p>This section is loaded from App1 (Remote Microfrontend)</p>
          
          <RemoteWrapper 
            fallback={<div className="loading">Loading Users List...</div>}
            errorFallback={<div className="error">❌ Failed to load Users List from App1. Make sure App1 is running on port 3001.</div>}
          >
            <UsersList />
          </RemoteWrapper>
        </div>
      </main>
      
      <footer className="app-footer">
        <p>Powered by React 19 + Webpack Module Federation</p>
      </footer>
    </div>
  );
};

export default App;
