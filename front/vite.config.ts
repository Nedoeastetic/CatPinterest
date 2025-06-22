import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Важно для Docker
    port: 5172,
    strictPort: true,
    watch: {
      usePolling: true // Нужно для Docker в Windows
    }
  }
})