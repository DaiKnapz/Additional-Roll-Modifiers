import { AdditionalModifiers, AdditionalModifiersResult } from "../types/DiceTerm"
import { anyModifiersEnabled, modifierEnabled, modifierType } from "./settings";

/**
 * Registers all the modifiers that are enabled in the settings
 * @param modifiers The modifiers to add our new modifiers to
 * @param foundryGame The game object to interact with
 */
export const registerModifiers = function (modifiers: Die.Modifiers, foundryGame: Game): void {
    if (!anyModifiersEnabled(foundryGame)) {
        return;
    }

    let newModifiers: AdditionalModifiers = modifiers;

    if (modifierEnabled(modifierType.ReplaceRoll, foundryGame)) {
        newModifiers.rep = replace;
    }

    modifiers = newModifiers;
}

/**
 * A function for replacing any results matching the criteria with a specified constant value
 * @param results The results of the Dice rolls
 * @param modifier The modifier text
 * @param comparisonFn A comparison function to see if values match criteria. Uses DiceTerm.compareResult 
 */
export function replaceFunction(
    results: AdditionalModifiersResult[],
    modifier: string,
    comparisonFn: (result: number, comparison: string, target: number) => boolean): void {
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

/**
 * A dice modifier for replacing any results matching the criteria with a specified constant value
 * @param this The Die object
 * @param modifier The modifier
 */
export const replace = function (this: Die, modifier: string) {
    return replaceFunction(this.results, modifier, DiceTerm.compareResult)
};

