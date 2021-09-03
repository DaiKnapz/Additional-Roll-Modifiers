import { AdditionalModifiers, AdditionalModifiersResult } from "../types/DiceTerm"
import { anyModifiersEnabled, modifierEnabled } from "./settings";

Die.MODIFIERS

export const registerModifiers = function(): void {
	if (!anyModifiersEnabled()) {
		return;
	}

	let newModifiers: AdditionalModifiers = Die.MODIFIERS;
	
	if (modifierEnabled("ReplaceRoll")) {
		newModifiers.rep = replace;
	}

	Die.MODIFIERS = newModifiers;
}

function replace(this: Die, modifier: string) {
    const rgx = /(?:rep|REP)([<>=]+)?([0-9]+),([0-9]+)/;
    const match = modifier.match(rgx);

    if (!match) {
        return;
    }

    // [comparison, target, replaceValue]
    const matchSlice = match.slice(1);

	const comparison = matchSlice[0];
    const target = parseInt(matchSlice[1]);
    const replaceValue = parseInt(matchSlice[2]);

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

