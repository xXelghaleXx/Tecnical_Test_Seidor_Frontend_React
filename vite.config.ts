import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// nuevo despligue esto 
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Tecnical_Test_Seidor_Frontend_React/',
})
