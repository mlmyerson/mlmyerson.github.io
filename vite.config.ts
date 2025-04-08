import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',  // For username.github.io repos, use '/'
  build: {
    // Generate clean URLs for GitHub Pages
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        // Format to ensure proper MIME types
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  },
  server: {
    // Configure dev server to use correct MIME types
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
    }
  }
})
