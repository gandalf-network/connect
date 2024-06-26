import babel from '@rollup/plugin-babel';
import ts from 'rollup-plugin-typescript2';
import replace from '@rollup/plugin-replace';
require('dotenv').config();

const PLUGINS = [
  ts({
    tsconfigOverride: { exclude: ['**/*.test.ts', '**/*.spec.ts'] },
  }),
  babel({
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
  }),
  replace({
    preventAssignment: true,
    'process.env.UNIVERSAL_APP_CLIP_BASE_URL': JSON.stringify(
      process.env.UNIVERSAL_APP_CLIP_BASE_URL,
    ),
    'process.env.IOS_APP_CLIP_BASE_URL': JSON.stringify(
      process.env.IOS_APP_CLIP_BASE_URL,
    ),
    'process.env.ANDROID_APP_CLIP_BASE_URL': JSON.stringify(
      process.env.ANDROID_APP_CLIP_BASE_URL,
    ),
    'process.env.WATSON_URL': JSON.stringify(process.env.WATSON_URL),
  }),
];

export default [
  {
    input: 'src/index.ts',
    output: [
      { file: 'dist/index.js', format: 'cjs' },
      { file: 'dist/index.mjs', format: 'es' },
    ],
    plugins: PLUGINS,
  },
  {
    input: 'src/types/index.ts',
    output: [
      { file: 'dist/components.js', format: 'cjs' },
      { file: 'dist/components.mjs', format: 'es' },
    ],
    plugins: PLUGINS,
  },
];
