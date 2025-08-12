# React 19 Microfrontend with Webpack Module Federation

A complete microfrontend architecture demonstration using React 19 and Webpack Module Federation.

## 🏗️ Architecture

This project demonstrates a microfrontend architecture with:

- **Host App** (port 3000): Main application that orchestrates and loads remote microfrontends
- **App1** (port 3001): Users list microfrontend that can run independently or be consumed by the host

## 🚀 Features

- ⚛️ **React 19**: Latest React features and concurrent rendering
- 🔧 **Webpack Module Federation**: Dynamic runtime loading of microfrontends
- 🎨 **Modern UI**: Clean, responsive design with CSS Grid and Flexbox
- 📱 **Mobile Responsive**: Works seamlessly on all device sizes
- 🔄 **Independent Deployment**: Each microfrontend can be deployed separately
- 🎯 **TypeScript**: Full type safety across all applications

## 📁 Project Structure

```
microfrontend-react/
├── packages/
│   ├── host-app/          # Main host application (port 3000)
│   │   ├── src/
│   │   │   ├── App.tsx
│   │   │   ├── App.css
│   │   │   ├── index.tsx
│   │   │   └── types.d.ts
│   │   ├── public/
│   │   ├── webpack.config.js
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── app1/              # Users list microfrontend (port 3001)
│       ├── src/
│       │   ├── components/
│       │   │   └── UsersList.tsx
│       │   ├── App.tsx
│       │   ├── App.css
│       │   └── index.tsx
│       ├── public/
│       ├── webpack.config.js
│       ├── package.json
│       └── tsconfig.json
├── package.json
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Quick Start

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd microfrontend-react
   npm run install:all
   ```

2. **Start all applications:**
   ```bash
   npm start
   ```

   This will start:
   - Host App: http://localhost:3000
   - App1 (Users List): http://localhost:3001

### Individual Development

You can also run each application independently:

```bash
# Start only the host app
npm run start:host

# Start only app1
npm run start:app1
```

## 🔧 Development

### Available Scripts

- `npm start` - Start all applications concurrently
- `npm run start:host` - Start only the host application
- `npm run start:app1` - Start only app1
- `npm run build` - Build all applications for production
- `npm run build:host` - Build only the host application
- `npm run build:app1` - Build only app1

### Adding New Microfrontends

1. Create a new package in `packages/` directory
2. Set up Webpack Module Federation configuration
3. Expose components via `exposes` in webpack config
4. Add the remote to host app's `remotes` configuration
5. Import and use the component in the host app

## 📦 Module Federation Configuration

### Host App Configuration

The host app consumes remote microfrontends:

```javascript
new ModuleFederationPlugin({
  name: 'host',
  remotes: {
    app1: 'app1@http://localhost:3001/remoteEntry.js',
  },
  shared: {
    react: { singleton: true, eager: true },
    'react-dom': { singleton: true, eager: true },
  },
})
```

### Remote App Configuration

Each remote app exposes components:

```javascript
new ModuleFederationPlugin({
  name: 'app1',
  filename: 'remoteEntry.js',
  exposes: {
    './UsersList': './src/components/UsersList.tsx',
  },
  shared: {
    react: { singleton: true, eager: true },
    'react-dom': { singleton: true, eager: true },
  },
})
```

## 🎯 Key Benefits

1. **Independent Development**: Teams can work on different microfrontends independently
2. **Independent Deployment**: Deploy each microfrontend separately without affecting others
3. **Technology Diversity**: Different teams can use different versions of libraries
4. **Scalability**: Easy to scale teams and applications
5. **Code Sharing**: Share common dependencies efficiently

## 🚀 Production Deployment

### Build for Production

```bash
npm run build
```

### Deployment Strategy

1. Build each microfrontend separately
2. Deploy each microfrontend to its own CDN/server
3. Update the host app's remote URLs to point to production URLs
4. Deploy the host application

### Environment Configuration

Update webpack.config.js remotes URLs based on environment:

```javascript
remotes: {
  app1: process.env.NODE_ENV === 'production' 
    ? 'app1@https://app1.yourdomain.com/remoteEntry.js'
    : 'app1@http://localhost:3001/remoteEntry.js',
}
```

## 🔍 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure proper CORS headers are set in webpack-dev-server
2. **Version Conflicts**: Check shared dependencies configuration
3. **Loading Errors**: Verify remote URLs are accessible

### Debug Mode

To debug Module Federation loading:

```javascript
// Add to webpack config
optimization: {
  splitChunks: false,
},
// Enable verbose logging
stats: 'verbose',
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Useful Links

- [Webpack Module Federation Documentation](https://webpack.js.org/concepts/module-federation/)
- [React 19 Documentation](https://react.dev/)
- [Microfrontends Best Practices](https://micro-frontends.org/)
