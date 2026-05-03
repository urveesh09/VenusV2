import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/VenusV2/',
  css: {
    minify: false,
  },
  build: {
    // Prevent asset size warnings
    chunkSizeWarningLimit: 10000,
  },
})
