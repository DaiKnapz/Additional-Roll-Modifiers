import { AdditionalModifiers, AdditionalModifiersResult } from "../types/DiceTerm"
import { anyModifiersEnabled, modifierEnabled } from "./settings";

export const registerModifiers = function (): void {
    if (!anyModifiersEnabled()) {
        return;
    }

    let newModifiers: AdditionalModifiers = Die.MODIFIERS;

    if (modifierEnabled("ReplaceRoll")) {
        newModifiers.rep = replace;
    }

    Die.MODIFIERS = newModifiers;
}

export function replaceFunction(
    results: AdditionalModifiersResult[],
    modifier: string,
    comparisonFn: (result: number, comparison: string, target: number) => boolean) {
    const rgx = /(?:rep|REP)([<>=]+)?([0-9]+),([0-9]+)/;
    const match = modifier.match(rgx);

    if (!match) {
        return;
    }

    // From foundry reroll modifier
    const slice = match.slice(1);

    const comparison = slice[0] || "=";
    const target = parseInt(slice[1]);
    const replaceValue = parseInt(slice[2]);

    // Replace any results that match the comparison criteria
    const n = results.length;
    for (let i = 0; i < n; i++) {
        results[i].replaced = false;
        if (comparisonFn(results[i].result, comparison, target)) {
            results[i].replaced = true;
            results[i].result = replaceValue;
        }
    }
}

const replace = function (this: Die, modifier: string) {
    return replaceFunction(this.results, modifier, DiceTerm.compareResult)
};

