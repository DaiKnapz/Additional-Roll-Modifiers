/**
 * This is your TypeScript entry file for Foundry VTT.
 * Register custom settings, sheets, and constants using the Foundry API.
 * Change this heading to be more descriptive to your module, or remove it.
 * Author: [your name]
 * Content License: [copyright and-or license] If using an existing system
 * 					you may want to put a (link to a) license or copyright
 * 					notice here (e.g. the OGL).
 * Software License: [your license] Put your desired license here, which
 * 					 determines how others may use and modify your module.
 */

// Import TypeScript modules
import { registerSettings } from './settings';
import { preloadTemplates } from './preloadTemplates';

// Initialize module
Hooks.once('init', async () => {
	console.log('Additional-Roll-Modifiers | Initializing Additional-Roll-Modifiers');

	// Assign custom classes and constants here

	// Register custom module settings
	registerSettings();

	// Preload Handlebars templates
	await preloadTemplates();

	// Register custom sheets (if any)
});

// Setup module
Hooks.once('setup', async () => {
	// Do anything after initialization but before
	// ready
});

// When ready
Hooks.once('ready', async () => {
	// Do anything once the module is ready
});

Hooks.on('init', () => {
	Die.MODIFIERS['rep'] = function replace(modifier) {
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
			const r = this.results[i];
			if (DiceTerm.compareResult(r.result, comparison, target)) {
				// r.replaced = true;
				r.result = replaceValue;
			}
		}
	};
});
