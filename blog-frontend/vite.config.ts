import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3002 // Adjust the port number as needed
  },
  resolve: {
    
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      provider: 'istanbul',
      reporter: ['clover', 'text'],
      reportsDirectory: './coverage',
      thresholds: {
        lines: 80,
        functions:80,
        branches:80,
        statements:80,
      },
    },
    setupFiles: ['./src/__test__/vitest.setup.ts'],
  },
})
