/**
 * Additional Roll Modifiers
 * 
 * Author: David Knapman
 * Content License: Apache License 2.0
 * Software License: Apache License 2.0
 */

// Import TypeScript modules
import { registerSettings } from './settings';
import { libWrapper } from './libWrapper';
import { AdditionalModifiersResult } from '../types/DiceTerm';
import { MODULE_NAMESPACE } from '../types/Constants';

// Initialize module
Hooks.once('init', async () => {
	console.log(`${MODULE_NAMESPACE} | Initializing`);

	registerSettings();

	let modifiers: any = Die.MODIFIERS;

	modifiers['rep'] = function replace(modifier: string) {
		const rgx = /(?:rep|REP)([<>=]+)?([0-9]+),([0-9]+)/;
		const match = modifier.match(rgx);

		if (!match) {
			return this;
		}

		// [comparison, target, replaceValue]
		const matchSlice = match.slice(1);

		const target = parseInt(matchSlice[1]);
		const replaceValue = parseInt(matchSlice[2]);
		const comparison = matchSlice[0];

		// Replace any results that match the comparison criteria
		const n = this.results.length;
		for (let i = 0; i < n; i++) {
			const r: AdditionalModifiersResult = this.results[i];

			r.replaced = false;
			if (DiceTerm.compareResult(r.result, comparison, target)) {
				r.replaced = true;
				r.result = replaceValue;
			}
		}
	};

	libWrapper!.register(MODULE_NAMESPACE, 'DiceTerm.prototype.getResultCSS', function (wrapped: any, ...args: any[]) {
		let result = wrapped(...args);
		
		if (args[0].replaced) {
            result.push('replaced');
        }
		return result;

	}, 'MIXED' );
});