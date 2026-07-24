import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages: https://<user>.github.io/note/ 하위. 로컬은 '/'.
const base = process.env.GITHUB_PAGES === '1' ? '/note/' : '/'

export default defineConfig({
  base,
  plugins: [react()],
  server: { port: 5175, open: true },
})
