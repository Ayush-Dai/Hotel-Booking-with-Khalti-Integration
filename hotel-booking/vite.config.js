


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
     
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
// 'khalti-api':{
//   target:'http://localhost:5000/khalti-api',
//   changeOrigin: true,
// }

    },
  },
});