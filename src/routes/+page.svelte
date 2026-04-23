<script lang="ts">
	import './layout.css';
	import { SvelteMap, SvelteSet } from 'svelte/reactivity';
	import PortfolioEntry from './portfolio-entry.svelte';
	import EntryForm from './entry-form.svelte';

	import type { Project } from '$lib/types';
	import ComplexitySelector from './complexity-selector.svelte';

	import { browser } from '$app/environment';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	// svelte-ignore state_referenced_locally
	let projects: Array<Project> = $state(data.defaultProjects);

	let technologies = $derived(new SvelteSet(projects.flatMap((project: Project) => project.stack)));

	let filters = $state({
		technologies: new SvelteMap<string, boolean>(),
		complexity: 1
	});

	let filteredProjects = $derived(
		projects.filter((project: Project) => {
			if (filters.complexity > project.complexity) {
				return false;
			}

			for (const [technology, enabled] of filters.technologies) {
				if (enabled && !project.stack.includes(technology)) {
					return false;
				}
			}

			return true;
		})
	);

	function toggleTechnologyFilter(technology: string, on: boolean): void {
		filters.technologies.set(technology, on);
	}

	let entryFormShown: boolean = $state(false);

	function toggleEntryForm(shown: boolean): void {
		entryFormShown = shown;
	}

	function saveEntries(): void {
		if (browser) {
			localStorage.setItem('projects', JSON.stringify(projects));
		}
	}
</script>

<main class="my-4 flex flex-col">
	<h1 class="my-8 text-center text-4xl font-black uppercase">Portfolio</h1>
	<div class="flex sm:flex-col md:flex-row flex-wrap items-end gap-4 self-center">
		<div
			class="flex flex-2 flex-col flex-wrap divide-y-2 divide-dashed divide-gray-300 rounded-xl bg-gray-100 p-4 font-medium"
		>
			<h3 class="mb-2 pb-2">Filters</h3>
			<div class="flex flex-wrap gap-8">
				<div class="flex flex-col">
					<label for="complexity">Complexity</label>
					<ComplexitySelector onselect={(count: number) => (filters.complexity = count)} />
				</div>
				<div class="flex flex-col">
					<p>Stack</p>
					<div class="flex max-w-240 flex-wrap gap-2">
						{#each technologies as technology}
							<button
								type="button"
								class="max-w-64 cursor-pointer truncate rounded-md px-2 py-0.5 transition duration-100 {filters.technologies.get(
									technology
								)
									? 'bg-cyan-400 text-white shadow-md hover:bg-cyan-300'
									: 'bg-gray-200 hover:bg-cyan-200 hover:shadow-lg'}"
								onclick={function (this: HTMLButtonElement) {
									toggleTechnologyFilter(technology, !filters.technologies.get(technology));
								}}
							>
								{technology}
							</button>
						{/each}
					</div>
				</div>
			</div>
		</div>
		<div class="relative flex flex-col">
			<button
				class="flex-1 cursor-pointer rounded-xl border-2 bg-black bg-cyan-400 px-4
					py-2 text-white hover:bg-cyan-300 hover:shadow transition duration-150"
				type="button"
				onclick={saveEntries}
				>Save Entries
			</button>

			<button
				class="flex-1 rounded-xl border-2 bg-black px-4 py-2 text-white {entryFormShown
					? 'bg-orange-200'
					: 'cursor-pointer bg-orange-400 hover:bg-orange-300 hover:shadow transition duration-150'}"
				type="button"
				onclick={() => toggleEntryForm(true)}
				disabled={entryFormShown}
				>Add Entry
			</button>

			{#if entryFormShown}
				<div class="absolute right-0 z-4 shadow-xl">
					<EntryForm
						oncreate={(entry: Project) => {
							projects.push(entry);
							toggleEntryForm(false);
						}}
						onclose={() => toggleEntryForm(false)}
					/>
				</div>
			{/if}
		</div>
	</div>
</main>

{#if filteredProjects.length == 0}
<div class="width-full">
	<p class="w-full text-center">По данному запросу проектов не найдено.</p>
</div>
{:else}
	<div class="bg-black">
		{#each filteredProjects as project}
			<PortfolioEntry {...project} />
		{/each}
	</div>
{/if}
