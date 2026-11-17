<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { IconSun, IconMoon } from '@tabler/icons-svelte';
	import { onMount } from 'svelte';

	let dark = $state(false);

	onMount(() => {
		dark = document.documentElement.classList.contains('dark');
	});

	function toggle(): void {
		dark = !dark;
		document.documentElement.classList.toggle('dark', dark);
		try {
			localStorage.setItem('studio-theme', dark ? 'dark' : 'light');
		} catch {
			// stockage indisponible
		}
	}
</script>

<Button variant="outline" size="icon" onclick={toggle} aria-label="Basculer le thème clair/sombre">
	{#if dark}
		<IconSun class="size-4" />
	{:else}
		<IconMoon class="size-4" />
	{/if}
</Button>
