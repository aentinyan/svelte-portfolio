<script lang="ts">
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import { faStar as faSolidStar } from '@fortawesome/free-solid-svg-icons';
	import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';

	const { onselect } = $props();

	let selected = $state(1);

	$effect(() => onselect(selected));
</script>

<div class="flex">
	{#each { length: selected } as _, i}
		<button class="p-0.5 text-cyan-500 transition duration-100 hover:text-cyan-400 cursor-pointer" onclick={() => (selected = i + 1)}>
			<FontAwesomeIcon icon={faSolidStar} />
		</button>
	{/each}
	{#each { length: 5 - selected } as _, i}
		<button class="p-0.5 transition duration-100 hover:text-cyan-400 cursor-pointer" onclick={() => (selected += i + 1)}>
			<FontAwesomeIcon icon={faRegularStar} />
		</button>
	{/each}
</div>
