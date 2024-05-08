import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://react-mern-wdm.onrender.com',
        changeOrigin: true, // Needed for cross-origin requests
      },
    },
  },
});
