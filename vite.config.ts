import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // This is crucial for GitHub Pages deployment
  build: {
    assetsInlineLimit: 0, // Ensures images are handled as files rather than being inlined as base64
  }
});
