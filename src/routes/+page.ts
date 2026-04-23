import type { PageLoad } from "./$types";

import { browser } from '$app/environment';
import type { Project } from "$lib/types";

async function loadProjects(): Promise<Project[]> {
	if (!browser)
	{
		return []
	};

	const storedProjects: Project[] = JSON.parse(localStorage.getItem('projects') ?? '[]');

	if (storedProjects.length > 0) {
		return storedProjects;
	}

	return await (await fetch("/assets/projects.json")).json();
}

export const load: PageLoad = async () => {
	return {
		defaultProjects: await loadProjects()
	}
}