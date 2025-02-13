


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
     
      '/api': {
        target: 'https://hotel-booking-with-khalti-integration-2.onrender.com',
        changeOrigin: true,
      },
// 'khalti-api':{
//   target:'https://hotel-booking-with-khalti-integration-2.onrender.com/khalti-api',
//   changeOrigin: true,
// }

    },
  },
});