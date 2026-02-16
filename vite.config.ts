import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// nuevo despligue esto 
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
})
