import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      'firebase/app': path.resolve(__dirname, './src/lib/mock-firebase.js'),
      'firebase/firestore': path.resolve(__dirname, './src/lib/mock-firebase.js')
    }
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.js'],
    globals: true
  }
})