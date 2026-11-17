<script lang="ts">
	import favicon from '#lib/assets/favicon.svg';
	import '../app.css';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { IconHome } from '@tabler/icons-svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Studio ABC·M2PA</title>
</svelte:head>

<div class="flex min-h-screen flex-col">
	<header class="border-b bg-background">
		<div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
			<a href="/" class="flex items-center gap-2 font-heading text-lg font-semibold tracking-tight">
				<IconHome class="size-5" />
				<span>Studio ABC·M2PA</span>
			</a>
			<ThemeToggle />
		</div>
	</header>
	<main class="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
		{@render children()}
	</main>
	<footer class="border-t py-4 text-center text-xs text-muted-foreground">
		Application autonome et locale — aucune donnée n'est envoyée sur un serveur. Scénarisation ABC Learning
		Design (Young & Perović, UCL, 2015, CC BY-NC-SA) · planification M2PA (Ryckebusch, Carra & Cadalen, 2026).
	</footer>
</div>
