import { MODULE_NAMESPACE } from "../types/Constants";

export const enum modifierType {
	ReplaceRoll = "ReplaceRoll"
}

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

export function modifierEnabled(modifier: modifierType, foundryGame: Game): boolean {
	return foundryGame.settings.get(MODULE_NAMESPACE, modifier) as boolean;
}

export function anyModifiersEnabled(foundryGame: Game): boolean {
	if (foundryGame.settings.get(MODULE_NAMESPACE, modifierType.ReplaceRoll) as boolean) {
		return true;
	};
	return false;
}
