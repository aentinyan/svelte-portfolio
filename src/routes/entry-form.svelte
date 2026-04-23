<script lang="ts">
	import ComplexitySelector from './complexity-selector.svelte';
	import NamedField from './named-field.svelte';

	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import { faX } from '@fortawesome/free-solid-svg-icons';

	let { oncreate, onclose } = $props();

	let entry = $state({
		name: '',
		description: '',
		thumbnail: '',
		complexity: 1,
		stack: new Array<string>(),
		style: {
			fg: 'white',
			bg: 'black'
		}
	});

	function fileToBase64(file: File): Promise<string | ArrayBuffer | null> {
		return new Promise((res, rej) => {
			const r = new FileReader();
			r.readAsDataURL(file);
			r.onload = () => res(r.result);
			r.onerror = () => rej(r.error);
		});
	}
</script>

<div class="w-80 rounded-xl bg-gray-100 p-4 font-medium">
	<div class="flex items-start justify-between">
		<h2 class="mb-4 font-bold">New Portfolio Entry</h2>
		<button class="cursor-pointer" type="button" onclick={onclose}>
			<FontAwesomeIcon icon={faX} size="xs" />
		</button>
	</div>

	<div class="flex flex-col gap-2">
		<NamedField name="Name">
			<input
				class="border-none bg-transparent px-2 placeholder-gray-300 focus:ring-0 focus:outline-none"
				name="name"
				placeholder="Enter name here..."
				bind:value={entry.name}
			/>
		</NamedField>

		<NamedField name="Description">
			<textarea
				class="border-none bg-transparent px-2 placeholder-gray-300 focus:ring-0 focus:outline-none"
				name="description"
				placeholder="Enter description here..."
				bind:value={entry.description}
			></textarea>
		</NamedField>

		<NamedField name="Complexity">
			<div class="m-2">
				<ComplexitySelector onselect={(count: number) => (entry.complexity = count)} />
			</div>
		</NamedField>

		<NamedField name="Thumbnail">
			<div class="py-2">
				<input
					class="cursor-pointer border-none bg-transparent px-2 text-gray-400 placeholder-gray-300
					file:mr-4 file:cursor-pointer file:rounded-xl file:bg-blue-50 file:bg-cyan-400 file:px-4 file:py-2 file:text-white
					hover:file:bg-cyan-300 focus:ring-0 focus:outline-none file:transition file:duration-150"
					name="thumbnail"
					type="file"
					accept="image/*"
					onchange={async function (this: HTMLInputElement) {
						if (!this.files) {
							return;
						}

						if (this.files.length == 0) {
							return;
						}

						const file = this.files[0];

						const b64 = await fileToBase64(file);
						if (!b64) {
							return;
						}

						entry.thumbnail = b64.toString();
					}}
				/>
			</div>
		</NamedField>

		<NamedField name="Stack">
			<div>
				<input
					class="border-none bg-transparent px-2 placeholder-gray-300 focus:ring-0 focus:outline-none"
					maxlength="25"
					name="stack"
					placeholder="Blender"
					onkeydown={function (this: HTMLInputElement, e: KeyboardEvent) {
						if (e.key == 'Enter' && this.value != '') {
							entry.stack.push(this.value);
							this.value = '';
						}
					}}
				/>
				<span class="text-gray-400"><span class="font-black">&#9166;</span> enter</span>
			</div>
			<div class="flex flex-wrap gap-2 p-4">
				{#each entry.stack as technology, i}
					<div class="cursor-default max-w-64 truncate rounded-md bg-gray-200 px-2 py-0.5 hover:bg-gray-300 hover:shadow-md transition duration-150">
						{technology}
						<button class="cursor-pointer transition duration-150" type="button" onclick={() => entry.stack.splice(i, 1)}>
							<FontAwesomeIcon icon={faX} size="xs" />
						</button>
					</div>
				{/each}
			</div>
		</NamedField>

		<div class="flex items-center gap-2 py-2">
			<label for="fg">Foreground</label>
			<input name="fg" type="color" bind:value={entry.style.fg} />

			<label for="bg">Background</label>
			<input name="bg" type="color" bind:value={entry.style.bg} />
		</div>

		<button
			class="flex-1 cursor-pointer rounded-xl border-2 bg-black bg-orange-400
				px-4 py-2 text-white hover:bg-orange-300 hover:shadow transition duration-150"
			type="button"
			onclick={() => oncreate(entry)}
			>Add
		</button>
	</div>
</div>

<style>
	input[type='color']::-webkit-color-swatch {
		border: 2px solid lightgray;
		border-radius: 4px;
	}

	input[type='color']::-moz-color-swatch {
		border: 2px solid lightgray;
		border-radius: 4px;
	}
</style>
