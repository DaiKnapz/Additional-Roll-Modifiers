import { modifierType, MODULE_NAMESPACE } from '../types/Constants';

/**
 * Registers settings for each modifier at startup
 */
export function registerSettings(): void {
	if (!(game instanceof Game)) {
		return;
	}

	const replaceRollSetting: ClientSettings.PartialSetting<boolean> = {
		config: true,
		type: Boolean,
		default: true,
		hint: game.i18n.localize('Additional-Roll-Modifiers.ReplaceRollHint'),
		name: game.i18n.localize('Additional-Roll-Modifiers.ReplaceRollName'),
		onChange: (value: boolean) => {
			console.log(
				`${(game as Game).i18n.localize('Additional-Roll-Modifiers.ReplaceRollSettingModified')} ${value}`,
			);
		},
		scope: 'world',
	};

	game.settings.register(MODULE_NAMESPACE, modifierType.ReplaceRoll, replaceRollSetting);
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
	}
	return false;
}
