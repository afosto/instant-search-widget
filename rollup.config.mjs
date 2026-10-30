import { readFileSync } from 'node:fs';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';
import cssnano from 'cssnano';
import postcss from 'postcss';
import prettier from 'prettier';
import * as sass from 'sass';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import prettierConfig from './prettier.config.js';

const packageJson = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));

const INPUT = 'src/index.js';

const createBanner = () => {
  return `
/**
 * @license Afosto Instant Search Widget v${packageJson.version} | ${packageJson.repository.url}
 * afosto-instant-search-widget.min.js
 *
 * Copyright (c) Afosto Saas BV.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
  `;
};

const defaultPlugins = [
  alias({
    entries: [
      { find: 'react', replacement: 'preact/compat' },
      { find: 'react-dom/test-utils', replacement: 'preact/test-utils' },
      { find: 'react-dom', replacement: 'preact/compat' },
      { find: 'react/jsx-runtime', replacement: 'preact/jsx-runtime' },
    ],
  }),
];

/**
 * Compiles imported .scss files with Sass and minifies them with cssnano. With a fileName the
 * stylesheet is emitted as that asset; without one the import is dropped from the bundle.
 */
const scss = ({ fileName } = {}) => ({
  name: 'scss',
  async load(id) {
    if (!id.endsWith('.scss')) {
      return null;
    }

    if (fileName) {
      const { css, loadedUrls } = sass.compile(id);
      for (const url of loadedUrls) {
        this.addWatchFile(fileURLToPath(url));
      }
      const result = await postcss([cssnano()]).process(css, { from: id });
      this.emitFile({ type: 'asset', fileName, source: result.css });
    }

    return { code: '', moduleSideEffects: false };
  },
});

/**
 * Copies the locale files from src/i18n to dest, optionally transforming each file's contents.
 */
const copyI18n = ({ dest, transform = content => content }) => ({
  name: 'copy-i18n',
  async buildEnd() {
    await mkdir(dest, { recursive: true });
    for (const fileName of await readdir('src/i18n')) {
      const content = await readFile(join('src/i18n', fileName), 'utf8');
      await writeFile(join(dest, fileName), transform(content, fileName));
    }
  },
});

/**
 * Prints the size of each written chunk, minified and gzipped.
 */
const reportSize = () => ({
  name: 'report-size',
  writeBundle(options, bundle) {
    for (const chunk of Object.values(bundle)) {
      if (chunk.type === 'chunk') {
        const kilobytes = bytes => `${(bytes / 1024).toFixed(2)} KB`;
        this.info(
          `${chunk.fileName}: ${kilobytes(Buffer.byteLength(chunk.code))}, gzipped ${kilobytes(
            gzipSync(chunk.code).length,
          )}`,
        );
      }
    }
  },
});

const prettierOptions = {
  ...prettierConfig,
  parser: 'babel',
};

export default [
  {
    input: INPUT,
    plugins: [
      ...defaultPlugins,
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        presets: [
          ['@babel/preset-env', { modules: false, useBuiltIns: 'usage', corejs: 3 }],
          ['@babel/preset-react'],
        ],
      }),
      nodeResolve({
        browser: true,
      }),
      scss({ fileName: 'afosto-instant-search-widget.min.css' }),
      commonjs({
        exclude: 'src/**',
      }),
      terser(),
      copyI18n({
        dest: 'dist/i18n',
        transform(content, filename) {
          const locale = filename.replace('.js', '');
          const messages = content
            .replace('export default messages;', '')
            .replace('};', '}')
            .replace('const messages = ', '');

          return prettier.format(
            `
              // Load this after the AfostoInstantSearchWidget
              AfostoInstantSearchWidget.addMessages('${locale}', ${messages});
            `,
            prettierOptions,
          );
        },
      }),
      reportSize(),
    ],
    output: {
      file: `dist/afosto-instant-search-widget.min.js`,
      format: 'umd',
      banner: createBanner(),
      sourcemap: true,
      exports: 'named',
      name: 'window',
      extend: true,
    },
  },
  {
    input: INPUT,
    external: [
      'classnames',
      'lodash.merge',
      'preact',
      'preact/hooks',
      'prop-types',
      'react-fast-compare',
      'algoliasearch-helper',
      'rc-slider',
      'uuid-random',
    ],
    plugins: [
      ...defaultPlugins,
      nodeResolve(),
      babel({
        babelHelpers: 'bundled',
        exclude: /node_modules/,
      }),
      scss(),
      copyI18n({ dest: 'i18n' }),
    ],
    output: [
      {
        dir: 'dist/esm',
        format: 'esm',
        exports: 'named',
        sourcemap: true,
      },
      {
        dir: 'dist/cjs',
        format: 'cjs',
        exports: 'named',
        sourcemap: true,
      },
    ],
  },
];
