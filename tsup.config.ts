import { defineConfig } from 'tsup';
import path from 'node:path';

const alias = {
  '@': path.resolve('src'),
  '@components': path.resolve('src/components'),
  '@hooks': path.resolve('src/hooks'),
  '@services': path.resolve('src/services'),
  '@lib': path.resolve('src/lib'),
  '@config': path.resolve('src/config'),
  '@styles': path.resolve('src/styles'),
  '@types': path.resolve('src/types'),
};

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: {
    resolve: true,
  },
  tsconfig: 'tsconfig.build.json',
  sourcemap: true,
  clean: true,
  outDir: 'dist',
  splitting: false,
  treeshake: true,
  external: ['react', 'react-dom', 'next', 'next/dynamic', 'next/image', 'next/link', 'next/navigation'],
  esbuildOptions(options) {
    options.alias = alias;
  },
});
