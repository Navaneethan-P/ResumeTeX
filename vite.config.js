import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/ResumeTeX/',
  optimizeDeps: {
    include: ['@monaco-editor/react'],
  },
})
