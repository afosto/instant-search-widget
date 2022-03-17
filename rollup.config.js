import { resolve } from 'path';
import prettier from 'prettier';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import copy from 'rollup-plugin-copy';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';
import * as prettierConfig from './prettier.config';
import packageJson from './package.json';

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

const prettierOptions = {
  ...prettierConfig,
  parser: 'babel',
};

module.exports = [
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
      postcss({
        plugins: [],
        extract: resolve('dist/afosto-instant-search-widget.min.css'),
        minimize: true,
      }),
      commonjs({
        exclude: 'src/**',
      }),
      terser(),
      copy({
        targets: [
          {
            src: 'src/i18n/**/*',
            dest: 'dist/i18n',
            transform(content, filename) {
              const locale = filename.replace('.js', '');
              const messages = content
                .toString()
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
          },
        ],
      }),
      filesize(),
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
    ],
    plugins: [
      ...defaultPlugins,
      nodeResolve(),
      babel({
        babelHelpers: 'bundled',
        exclude: /node_modules/,
      }),
      postcss({
        plugins: [],
        inject: false,
      }),
      copy({
        targets: [{ src: 'src/i18n/**/*', dest: 'i18n' }],
      }),
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
