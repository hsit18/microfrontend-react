#!/bin/bash

# Development setup script for React 19 Microfrontend project

echo "🚀 Setting up React 19 Microfrontend Development Environment..."

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt "18" ]; then
    echo "❌ Node.js 18+ is required. Current version: $(node --version)"
    exit 1
fi

echo "✅ Node.js version check passed: $(node --version)"

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install host-app dependencies
echo "📦 Installing host-app dependencies..."
cd packages/host-app
npm install
cd ../..

# Install app1 dependencies
echo "📦 Installing app1 dependencies..."
cd packages/app1
npm install
cd ../..

echo "✅ All dependencies installed successfully!"

echo "🎯 Quick Start Commands:"
echo "  npm start              # Start all applications"
echo "  npm run start:host     # Start only host app (port 3000)"
echo "  npm run start:app1     # Start only app1 (port 3001)"
echo ""
echo "🌐 Application URLs:"
echo "  Host App: http://localhost:3000"
echo "  App1:     http://localhost:3001"
echo ""
echo "🚀 Run 'npm start' to begin development!"
