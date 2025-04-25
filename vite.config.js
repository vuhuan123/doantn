import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from '@svgr/rollup';
// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: [
      '@emotion/react', 
      '@emotion/styled', 
      '@mui/material/Tooltip'
    ],
  },
  plugins: [
  react(),
  svgr(),
  ],
  resolve: {
    alias: [
      { find: '~', replacement: '/src' }
    ]
  }
})
