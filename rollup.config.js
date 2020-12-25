import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import typescript from '@rollup/plugin-typescript'
import pkg from './package.json'

const isDev = process.env.NODE_ENV !== 'production'

const banner = `/*!
 * @ifake/signature
 * (c) 2020-${new Date().getFullYear()} BiYuqi
 * Released under the MIT License.
 */`

export default {
  input: './src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: 'IfSignature',
      exports: 'named',
      footer:
        'if(typeof window !== "undefined" && window.IfSignature) { \n' +
        '  window.IfSignature = window.IfSignature.IfSignature;\n}',
      banner
    },
    {
      file: pkg.module,
      format: 'es',
      banner
    }
  ],
  external: [...Object.keys(pkg.dependencies)],
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({
      babelHelpers: 'runtime',
      exclude: /node_modules/
    }),
    json(),
    !isDev && terser(),
    typescript({
      tsconfig: './tsconfig.json'
    })
  ]
}
