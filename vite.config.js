import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: false
  },
  // Vitest configuration block
  test: {
    environment: 'node',
    globals: false
  }
});
