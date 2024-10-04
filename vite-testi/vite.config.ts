import {defineConfig} from 'vite';
import {resolve} from 'path';

export default defineConfig({
  build: {
    // Set the output directory to be within your project
    outDir: resolve(__dirname, 'dist'),

    // Configure Rollup to use both index.html, main.html, and sw.ts as entry points
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'), // Path to index.html
        main: resolve(__dirname, 'main.html'), // Path to main.html
        sw: resolve(__dirname, 'sw.ts'), // Add sw.ts here to compile it separately
      },
      output: {
        // Ensure that sw.js is output at the root of the dist folder
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'sw') return 'sw.js';
          return '[name].js';
        },
      },
    },

    // Optional optimizations
    minify: 'esbuild', // Set minifier to 'esbuild' or 'terser'
    sourcemap: true, // Generate source maps for debugging

    cssCodeSplit: true, // Enable code splitting for CSS
    chunkSizeWarningLimit: 500, // Set the size limit to 500kb
  },
});
