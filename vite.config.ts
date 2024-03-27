import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, './src'),
      },
      {
        find: '@public',
        replacement: resolve(__dirname, './public'),
      },
    ],
  },
  plugins: [
    react(),
    svgr({
      include: '**/*.svg?react',
    }),
  ],
});
