import path from 'path';
import { defineConfig } from 'vite';
import { pascalCase } from 'change-case';
import vitePluginDts from 'vite-plugin-dts';
import pkg from './package.json';
import nodePolyfills from 'rollup-plugin-polyfill-node';

export default defineConfig(({ mode }) => {
  const isDev = getModeFromEnv(mode) === 'development';

  return {
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/main.ts'),
        name: pascalCase(pkg.name.split('/').pop() ?? ''),
        fileName: 'lib',
        formats: ['cjs', 'es', 'umd'],
      },
      outDir: 'dist',
      sourcemap: isDev,
      /**
       * @see https://rollupjs.org/configuration-options/#watch
       */
      watch: isDev ? {} : null,
      rollupOptions: {
        external: ['fs/promises', /^prettier/, 'chalk'],
        output: {
          globals: {
            'fs/promises': 'fs/promises',
            prettier: 'prettier',
            chalk: 'chalk',
          },
        },
      },
    },
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'src'),
      },
    },
    plugins: [
      vitePluginDts({
        insertTypesEntry: true,
      }),
      nodePolyfills(),
    ],
  };
});

function getModeFromEnv(mode: unknown) {
  switch (mode) {
    case 'development':
      return mode;
    default:
      return 'production';
  }
}
