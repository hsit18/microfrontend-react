import React from 'react';
import UsersList from './components/UsersList';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app1-container">
      <h1>👥 App1 - Users Management</h1>
      <p>This is a standalone microfrontend that can run independently</p>
      <UsersList />
    </div>
  );
};

export default App;
