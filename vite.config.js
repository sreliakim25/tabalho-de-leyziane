import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'logo.jpg'],
      manifest: {
        name: 'Primeiros Passos Tech',
        short_name: 'Passos Tech',
        description: 'Aprenda tecnologia do zero, no seu ritmo de forma simples, segura e sem complicação.',
        theme_color: '#8B1A1A',
        background_color: '#F0EAD8',
        display: 'standalone',
        orientation: 'any',
        icons: [
          {
            src: 'logo.jpg',
            sizes: '512x512',
            type: 'image/jpeg',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
})

