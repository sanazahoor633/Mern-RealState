import tailwindcss from '@tailwindcss/vite'

import { defineConfig } from 'vite'

export default defineConfig({
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:2020',
      secure: false,

     },
  }
},
  
  plugins: [
    tailwindcss(),
  ],
})