import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    css: true,
    globals: true,
    setupFiles: path.join(__dirname, './test/setup.ts')
  },
  resolve: {
    alias: {
      '@': __dirname
    },
  },
})