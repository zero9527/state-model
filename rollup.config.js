import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import dts from 'rollup-plugin-dts';
import pkg from './package.json';

// TODO：代码压缩
const plugins = [
	resolve(),
	commonjs(),
	typescript(),
];

export default [
	{
		input: 'src/index.ts',
		external: ['ms'],
		output: [
			{ 
				file: pkg.main, 
				format: 'es'
			}
		],
		plugins,
	},
	{
		input: 'src/index.ts',
		output: {
			name: 'zrModel',
			file: pkg.umd,
			format: 'umd'
		},
		plugins,
	},
	{
		input: 'src/index.ts',
		output: {
			file: pkg.typings,
			format: 'es',
		},
		plugins: [dts()],
	}
];
