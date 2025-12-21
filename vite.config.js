import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins:[
        tailwindcss(),
    ],
  root: '.', // carpeta raíz de tu proyecto
  build: {
    outDir: 'dist', // carpeta donde se genera el build
  },
  server: {
    port: 5173, // puerto del servidor de desarrollo
  },
});
