import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    proxy: {
      // Anything starting with `/api` goes to your backend
      '/api': {
        target: process.env.VITE_API_URL || 'http://backend:8000', // backend URL
        changeOrigin: true,
      }
    }
  }
})
