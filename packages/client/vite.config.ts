import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import path from 'path';
import svgr from 'vite-plugin-svgr';
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
      components: path.resolve(__dirname, './src/components'),
      pages: path.resolve(__dirname, './src/pages'),
      utils: path.resolve(__dirname, './src/utils'),
      assets: path.resolve(__dirname, './src/assets'),
      api: path.resolve(__dirname, './src/api'),
      styles: path.resolve(__dirname, './src/styles'),
    },
  },
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  build: {
    emptyOutDir: true,
    outDir: 'dist',
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[ext]/[name][extname]',
        chunkFileNames: 'assets/[chunks]/[name].[hash].js',
        entryFileNames: 'assets/js/main.js',
      },
    },
  },
  plugins: [
    react(),
    svgr({
      esbuildOptions: { loader: 'tsx' },
      svgrOptions: {
        typescript: true,
        replaceAttrValues: {
          '#000': 'currentColor',
          black: 'currentColor',
        },
      },
    }),
  ],
});
