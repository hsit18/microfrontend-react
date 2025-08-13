# Microfrontend React Application

A modern microfrontend architecture built with React, Vite, Tailwind CSS, and Module Federation using `@originjs/vite-plugin-federation`. This project demonstrates how to build scalable frontend applications using a distributed architecture pattern.

## 🏗️ Architecture

This project consists of three main applications:

- **Host App** (Port 3000): Main shell application that handles routing and navigation
- **User List App** (Port 3001): Displays a searchable list of users
- **User Details App** (Port 3002): Shows detailed information about selected users

## 🚀 Features

- **Module Federation**: Seamless integration between microfrontends using `@originjs/vite-plugin-federation`
- **React Router**: Client-side routing with navigation support
- **Tailwind CSS**: Modern, responsive UI design
- **Error Boundaries**: Graceful error handling for each microfrontend
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time User Selection**: Navigate from user list to user details
- **Search Functionality**: Filter users by name, email, or role
- **Status Indicators**: Visual status indicators for users
- **Tabbed Interface**: Organized user information display

## 📦 Project Structure

```
microfrontend-react/
├── packages/
│   ├── host-app/              # Main shell application
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── Header.jsx
│   │   │   │   └── ErrorBoundary.jsx
│   │   │   ├── App.jsx
│   │   │   ├── main.jsx
│   │   │   └── index.css
│   │   ├── package.json
│   │   ├── vite.config.js
│   │   └── tailwind.config.js
│   ├── user-list-app/         # User list microfrontend
│   │   ├── src/
│   │   │   ├── UserListApp.jsx
│   │   │   ├── main.jsx
│   │   │   └── index.css
│   │   ├── package.json
│   │   ├── vite.config.js
│   │   └── tailwind.config.js
│   └── user-details-app/      # User details microfrontend
│       ├── src/
│       │   ├── UserDetailsApp.jsx
│       │   ├── main.jsx
│       │   └── index.css
│       ├── package.json
│       ├── vite.config.js
│       └── tailwind.config.js
├── package.json               # Root workspace configuration
└── README.md
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd microfrontend-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install dependencies for all packages**
   ```bash
   npm install --workspaces
   ```

## 🚀 Running the Application

### Development Mode

Start all applications in development mode:
```bash
npm run dev
```

This will start:
- Host App: http://localhost:3000
- User List App: http://localhost:3001
- User Details App: http://localhost:3002

### Individual Applications

You can also start each application individually:

```bash
# Host App
npm run dev:host

# User List App
npm run dev:user-list

# User Details App
npm run dev:user-details
```

## 🔧 Building for Production

Build all applications:
```bash
npm run build
```

Preview production builds:
```bash
npm run preview
```

## 🎯 Usage

1. **Navigate to http://localhost:3000** to access the host application
2. **Click "View Users"** to see the user list microfrontend
3. **Search users** by name, email, or role using the search bar
4. **Click on any user** to view their detailed information
5. **Use the navigation** to switch between different sections

## 🎨 UI Components

### Host App Features
- **Header Navigation**: Responsive navigation bar with active state indicators
- **Error Boundaries**: Fallback UI for microfrontend loading errors
- **Loading States**: Spinner animations during microfrontend loading
- **Responsive Layout**: Mobile-first responsive design

### User List App Features
- **User Cards**: Attractive cards with avatars and status indicators
- **Search Functionality**: Real-time filtering of users
- **Status Indicators**: Visual indicators for active, away, and offline users
- **Responsive Grid**: Adaptive grid layout for different screen sizes

### User Details App Features
- **Tabbed Interface**: Overview, Projects, and Skills tabs
- **User Profile**: Comprehensive user information display
- **Project Management**: Current projects with status indicators
- **Skills Display**: Tag-based skills visualization
- **Contact Information**: Complete contact and work details

## 🔧 Technical Implementation

### Module Federation Configuration

Each microfrontend is configured with Module Federation using `@originjs/vite-plugin-federation`:

**Host App** (`vite.config.js`):
```javascript
federation({
  name: 'host-app',
  remotes: {
    'user-list-app': 'http://localhost:3001/remoteEntry.js',
    'user-details-app': 'http://localhost:3002/remoteEntry.js'
  },
  shared: ['react', 'react-dom', 'react-router-dom']
})
```

**Microfrontends** expose their main components:
```javascript
federation({
  name: 'user-list-app',
  filename: 'remoteEntry.js',
  exposes: {
    './UserListApp': './src/UserListApp.jsx'
  },
  shared: ['react', 'react-dom']
})
```

### Shared Dependencies

All applications share React and React-DOM to ensure consistency:
```javascript
shared: ['react', 'react-dom', 'react-router-dom']
```

## 🎛️ Development Scripts

- `npm run dev` - Start all applications in development mode
- `npm run build` - Build all applications for production
- `npm run preview` - Preview production builds
- `npm run dev:host` - Start only the host application
- `npm run dev:user-list` - Start only the user list application
- `npm run dev:user-details` - Start only the user details application

## 🔍 Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 3000, 3001, and 3002 are available
2. **Module federation errors**: Make sure all applications are running simultaneously
3. **Dependency conflicts**: Clear node_modules and reinstall if needed

### Debugging

- Check browser console for module federation errors
- Verify all applications are accessible at their respective ports
- Ensure shared dependencies are properly configured

## 🚀 Deployment

For production deployment:

1. Build all applications: `npm run build`
2. Deploy each microfrontend to separate domains/CDNs
3. Update the remote URLs in the host app's vite.config.js
4. Ensure proper CORS configuration for cross-origin requests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test across all microfrontends
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Resources

- [@originjs/vite-plugin-federation Documentation](https://github.com/originjs/vite-plugin-federation)
- [Module Federation Documentation](https://module-federation.github.io/)
- [Vite Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
