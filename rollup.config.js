import { resolve } from "path"
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import postcss from "rollup-plugin-postcss";

const INPUT = 'src/index.js';

const defaultPlugins = [
  alias({
    entries: [
      { find: 'react', replacement: 'preact/compat' },
      { find: 'react-dom/test-utils', replacement: 'preact/test-utils' },
      { find: 'react-dom', replacement: 'preact/compat' },
      { find: 'react/jsx-runtime', replacement: 'preact/jsx-runtime' }
    ]
  }),
];

module.exports = [
  {
    input: INPUT,
    plugins: [
      ...defaultPlugins,
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
      babel({
        babelHelpers: 'bundled',
        exclude: /node_modules/,
        presets: [['@babel/preset-env', { modules: false, useBuiltIns: 'usage', corejs: 3 }], ['@babel/preset-react']],
      }),
      terser(),
    ],
    output: {
      file: `dist/afosto-instant-search-widget.min.js`,
      format: 'umd',
      name: 'window',
      extend: true,
    },
  },
  {
    input: INPUT,
    external: ['classnames', 'preact', 'preact/hooks', 'prop-types', 'react-fast-compare', 'algoliasearch-helper'],
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
      })
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
  }
];
