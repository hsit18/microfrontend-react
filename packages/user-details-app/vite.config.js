import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'user-details-app',
      filename: 'remoteEntry.js',
      exposes: {
        './UserDetailsApp': './src/UserDetailsApp.jsx'
      },
      shared: ['react', 'react-dom', 'pubsub-js']
    })
  ],
  server: {
    port: 3002
  },
  preview: {
    port: 3002
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
