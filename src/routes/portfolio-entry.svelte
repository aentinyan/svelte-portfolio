<script lang="ts">
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import { faStar as faSolidStar } from '@fortawesome/free-solid-svg-icons';
	import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';

	const { name, description, complexity, thumbnail, stack, style } = $props();
</script>

<section
	class="project flex min-h-100 bg-(--bg) mask-linear-[67deg,gray_0%,white_60%] mask-luminance p-16 text-(--fg)"
	style="--fg: {style.fg}; --bg: {style.bg}"
>
	<picture class="flex-2 mr-16 rounded-4xl overflow-hidden max-h-[50vh]">
		<img class="w-full" src={thumbnail} alt={name} />
	</picture>
	<div class="flex flex-2 flex-col justify-between">
		<div>
			<div class="flex flex-row items-end justify-between">
				<h1 class="text-6xl font-black font-stretch-extra-expanded">{name}</h1>
				<div class="ml-8">
					{#each { length: complexity }}
						<FontAwesomeIcon size="2x" icon={faSolidStar} />
					{/each}
					{#each { length: 5 - complexity }}
						<FontAwesomeIcon size="2x" icon={faRegularStar} />
					{/each}
				</div>
			</div>
			<div class="my-4 flex flex-wrap gap-2">
				{#each stack as technology}
					<div
						class="max-w-64 cursor-default truncate rounded-md bg-(--fg) px-2 py-0.5 text-(--bg)"
					>
						{technology}
					</div>
				{/each}
			</div>
			<p>{description}</p>
		</div>
	</div>
</section>
