// filepath: c:\Users\Daino Otieno\OneDrive\Desktop\code (Brandon)\project\vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 3001, // Change this to a port that is not in use
    open: true, // This will open the browser automatically
  },
});