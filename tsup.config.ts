import { defineConfig } from 'tsup'

export default defineConfig({
  // `src` é uma pasta; o bundler precisa do arquivo de entrada executável da aplicação.
  entry: ['src/server.ts'],
  format: ['esm'],
  outDir: 'build',
  sourcemap: true,
  target: 'esnext',
})
