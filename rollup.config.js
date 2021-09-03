const typescript = require('rollup-plugin-typescript2');
const { nodeResolve } = require('@rollup/plugin-node-resolve');

module.exports = {
	input: 'src/module/additionalRollModifiers.ts',
	output: {
		dir: 'dist/module',
		format: 'es',
		sourcemap: true,
	},
	plugins: [nodeResolve(), typescript({})],
};
