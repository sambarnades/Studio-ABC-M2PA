<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import * as Tabs from '$lib/components/ui/tabs';
	import { sequences, save } from '$lib/stores/sequences.svelte';
	import FormulaireCadrage from '$lib/components/cadrage/FormulaireCadrage.svelte';
	import TableauStoryboard from '$lib/components/storyboard/TableauStoryboard.svelte';
	import PanneauSynthese from '$lib/components/storyboard/PanneauSynthese.svelte';
	import PanelExport from '$lib/components/export/PanelExport.svelte';

	let id = $derived(page.params.id ?? '');
	let seq = $derived(sequences.find((s) => s.id === id));
	let onglet = $state('cadrage');
	let snapshot = $state('');

	$effect(() => {
		if (!seq) {
			goto('/');
			return;
		}
		const s = JSON.stringify({ c: seq.cadrage, a: seq.activites });
		if (s !== snapshot) {
			snapshot = s;
			seq.updatedAt = Date.now();
			save();
		}
	});
</script>

{#if seq}
	<div class="mb-4">
		<h1 class="font-heading text-2xl font-semibold tracking-tight">
			{seq.cadrage.titre || 'Séquence sans titre'}
		</h1>
		<p class="text-sm text-muted-foreground">
			Cadrage M2PA → scénarisation ABC Learning Design multi-séances → export tableau. Données enregistrées
			localement dans votre navigateur.
		</p>
	</div>

	<Tabs.Root bind:value={onglet}>
		<Tabs.List>
			<Tabs.Trigger value="cadrage">1 · Cadrage (M2PA)</Tabs.Trigger>
			<Tabs.Trigger value="storyboard">2 · Storyboard ABC LD</Tabs.Trigger>
			<Tabs.Trigger value="differenciation" disabled>3 · Différenciation (V1.1)</Tabs.Trigger>
			<Tabs.Trigger value="export">Export</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="cadrage">
			<FormulaireCadrage {seq} />
		</Tabs.Content>
		<Tabs.Content value="storyboard">
			<PanneauSynthese {seq} />
			<TableauStoryboard {seq} />
		</Tabs.Content>
		<Tabs.Content value="export">
			<PanelExport {seq} />
		</Tabs.Content>
	</Tabs.Root>
{/if}
