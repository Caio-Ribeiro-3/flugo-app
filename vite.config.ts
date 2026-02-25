import { defineConfig } from 'vite'
import path from 'path';
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Map '@' to the 'src' directory
      '@': path.resolve(__dirname, './src'),
      // Or map 'src' to the 'src' directory directly
      // src: '/src',
    },
  }
})
