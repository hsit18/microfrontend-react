import React from 'react'
import ReactDOM from 'react-dom/client'
import UserDetailsApp from './UserDetailsApp.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserDetailsApp userId="1" />
  </React.StrictMode>,
)
