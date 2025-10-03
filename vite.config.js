import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/', // Netlify serverer fra domenets rot
  appType: 'mpa', // lar deg ha flere HTML-entries
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        // Legg KUN til sider som faktisk finnes i repoet:
        // login:    resolve(__dirname, 'auth/login/index.html'),
        // register: resolve(__dirname, 'auth/register/index.html'),
        // profile:  resolve(__dirname, 'profile/index.html'),
        // post:     resolve(__dirname, 'post/index.html'),
        // postEdit: resolve(__dirname, 'post/edit/index.html'),
        // postCreate: resolve(__dirname, 'post/create/index.html'),
      },
    },
  },
});
