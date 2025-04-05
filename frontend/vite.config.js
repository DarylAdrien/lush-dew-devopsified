import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Allows access from any IP
    allowedHosts: ['lushdew.local'],  // Allow this custom domain
    port: 5173, // Ensure this matches the port exposed in your Ingress
  },
})
