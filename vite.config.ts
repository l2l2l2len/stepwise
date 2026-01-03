import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split large dependencies into separate chunks
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-math': ['mathjs'],
          'vendor-charts': ['recharts'],
          'vendor-katex': ['katex'],
          'vendor-icons': ['lucide-react'],
        }
      }
    },
    // Increase chunk size warning limit since some chunks are intentionally larger
    chunkSizeWarningLimit: 600,
  }
});
