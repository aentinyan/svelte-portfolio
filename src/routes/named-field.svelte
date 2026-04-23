<script lang="ts">
	const { name, children } = $props();
</script>

<div
	class="group flex flex-col divide-y-2 divide-gray-200 overflow-hidden
		rounded-xl border-2 border-gray-200 bg-white
		focus-within:divide-cyan-400 focus-within:border-cyan-400 focus-within:shadow-lg transition duration-100"
>
	<span class="bg-gray-200 group-focus-within:bg-cyan-400 group-focus-within:text-white py-1 px-2">{name}</span>
	<div class="contents">
		{@render children?.()}
	</div>
</div>
