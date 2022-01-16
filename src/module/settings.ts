import { modifierType, MODULE_NAMESPACE } from "../types/Constants";

/**
 * Registers settings for each modifier at startup
 */
export function registerSettings(): void {
	const replaceRollSetting: ClientSettings.PartialSetting<boolean> = {
    	config: true,
		type: Boolean,
    	default: true,
    	hint: "Modifier to replace rolls with a flat value when the result matches certain criteria. e.g. /r 10d4rep=1,9 rolls 10 d4s and replaces any 1s with a 9",
    	name: "Replace roll",
    	onChange: (value: boolean) => {
			console.log(`Replace Roll setting changed, new value ${value}`)
		},
    	scope: "world",
	};

	if (game instanceof Game){
		game.settings.register(MODULE_NAMESPACE, modifierType.ReplaceRoll, replaceRollSetting);
	}
}

/**
 * Gets if the specified modifier is enabled or disabled
 * @param modifier The modifier to check is enabled
 * @param foundryGame The game object
 * @returns The value of the modifier setting
 */
export function modifierEnabled(modifier: modifierType, foundryGame: Game): boolean {
	return foundryGame.settings.get(MODULE_NAMESPACE, modifier) as boolean;
}

/**
 * Checks if any of our modifiers are enabled
 * @param foundryGame The game object
 * @returns True if any modifier is enabled, false otherwise
 */
export function anyModifiersEnabled(foundryGame: Game): boolean {
	if (foundryGame.settings.get(MODULE_NAMESPACE, modifierType.ReplaceRoll) as boolean) {
		return true;
	};
	return false;
}
