import { MODULE_NAMESPACE } from "../types/Constants";

export function registerSettings(): void {
	const replaceRollSetting: ClientSettings.PartialSetting<boolean> = {
    	config: true,
		type: Boolean,
    	default: true,
    	hint: "Modifier to replace rolls with a flat value when the result matches certain criteria. e.g. /r 10d4rep=1,9 rolls 10 d4s and replaces any 1s with a 9",
    	name: "Relace roll",
    	onChange: (value) => {
			console.log(`Replace roll setting changed, new value${value}`)
		},
    	scope: "world",
	};

	if (game instanceof Game){
		game.settings.register(MODULE_NAMESPACE, "ReplaceRoll", replaceRollSetting);
	}
}
