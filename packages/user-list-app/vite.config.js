import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'user-list-app',
      filename: 'remoteEntry.js',
      exposes: {
        './UserListApp': './src/UserListApp.jsx'
      },
      shared: ['react', 'react-dom']
    })
  ],
  server: {
    port: 3001
  },
  preview: {
    port: 3001
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      external: ['react', 'react-dom']
    }
  }
})
