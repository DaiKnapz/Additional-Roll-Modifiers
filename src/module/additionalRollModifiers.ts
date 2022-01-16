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
import { MODULE_NAMESPACE } from '../types/Constants';
import { registerModifiers } from './modifiers';

// Initialize module
Hooks.once('init', async () => {
	console.log(`${MODULE_NAMESPACE} | Initializing`);

	registerSettings();

	if (game instanceof Game) {
		registerModifiers(Die.MODIFIERS, game);
	}

	libWrapper!.register(MODULE_NAMESPACE, 'DiceTerm.prototype.getResultCSS', function (wrapped: any, ...args: any[]) {
		let result = wrapped(...args);
		
		if (args[0].replaced) {
            result.push('replaced');
        }
		return result;

	}, 'MIXED' );
});