import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import { peerDependencies } from './package.json';


export default defineConfig({
  build: {
    lib: {
      name: 'flow-editor',
      formats: ['cjs', 'es'],
      entry: './src/index.ts',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(peerDependencies)],
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [dts()],
})
