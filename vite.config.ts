import { resolve } from 'path'
import { defineConfig } from 'vite'
import { safexTransform } from 'vite-plugin-safex-transform'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  publicDir: resolve('res'),
  // build: {
  // minify: false,
  //   outDir: resolve(__dirname, 'safex-webgl'),
  //   emptyOutDir: true,
  // },
  server: { port: 5049 },
  plugins: [safexTransform(), viteSingleFile({ deleteInlinedFiles: true })],
})
