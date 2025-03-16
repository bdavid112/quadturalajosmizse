import { defineConfig, PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import svgr from 'vite-plugin-svgr'
import compression from 'vite-plugin-compression'
import purgecss from 'vite-plugin-purgecss'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    compression({ algorithm: 'brotliCompress' }),
    purgecss({
      content: ['./index.html', './src/**/*.tsx'],
      /* safelist: ['keep-this-class', /^bg-/, /^text-/], */ // Keep these classes
    }) as unknown as PluginOption,
  ],

  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@pages': path.resolve(__dirname, 'src/pages'),
    },
  },
  build: {
    minify: 'esbuild',
    rollupOptions: {
      treeshake: true,
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
    },
    ssr: false,
  },
})
