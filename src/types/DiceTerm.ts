export interface AdditionalModifiersResult extends DiceTerm.Result {
    replaced?: boolean;
}

export interface AdditionalModifiers extends Die.Modifiers {
	rep?: (modifier: string) => void;
}