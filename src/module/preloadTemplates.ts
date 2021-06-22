export async function preloadTemplates(): Promise<Handlebars.TemplateDelegate[]> {
	const templatePaths: string[] = [
		// Add paths to "modules/Additional-Roll-Modifiers/templates"
	];

	return loadTemplates(templatePaths);
}
