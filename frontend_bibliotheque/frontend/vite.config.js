import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/livres': 'http://localhost:8181',
      '/reservations': 'http://localhost:8181'
    }
  }
})
