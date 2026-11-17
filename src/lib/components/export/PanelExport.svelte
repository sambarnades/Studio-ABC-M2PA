<script lang="ts">
	import type { Sequence } from '$lib/types';
	import { toCsv, toHtml, toMarkdown, download } from '$lib/export';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Separator } from '$lib/components/ui/separator';
	import { IconCopy, IconDownload, IconPrinter, IconCheck } from '@tabler/icons-svelte';

	let { seq }: { seq: Sequence } = $props();

	let md = $derived(toMarkdown(seq));
	let copieOk = $state(false);

	let base = $derived(
		(seq.cadrage.titre || 'sequence')
			.toLowerCase()
			.normalize('NFD')
			.replace(/[̀-ͯ]/g, '')
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-+|-+$/g, '')
	);

	async function copier(): Promise<void> {
		await navigator.clipboard.writeText(md);
		copieOk = true;
		setTimeout(() => (copieOk = false), 1500);
	}
</script>

<Card>
	<CardHeader>
		<CardTitle>Export — tableau intégré à l'ABC LD</CardTitle>
		<CardDescription>
			Le storyboard s'exporte en tableau, pensé pour la coopération et les outils numériques (copier-coller dans
			Moodle, un ENT, un wiki, un pad). Aucun export Word/LibreOffice.
		</CardDescription>
	</CardHeader>
	<CardContent class="grid gap-4">
		<div class="flex flex-wrap gap-2">
			<Button variant="outline" onclick={copier}>
				{#if copieOk}<IconCheck class="size-4" /> Copié !{:else}<IconCopy class="size-4" /> Copier le Markdown{/if}
			</Button>
			<Button variant="outline" onclick={() => download(`${base}.md`, md, 'text/markdown')}>
				<IconDownload class="size-4" /> .md
			</Button>
			<Button variant="outline" onclick={() => download(`${base}.csv`, toCsv(seq), 'text/csv')}>
				<IconDownload class="size-4" /> .csv
			</Button>
			<Button variant="outline" onclick={() => download(`${base}.html`, toHtml(seq), 'text/html')}>
				<IconDownload class="size-4" /> .html
			</Button>
			<Button
				variant="outline"
				onclick={() => download(`${base}.json`, JSON.stringify(seq, null, 2), 'application/json')}
			>
				<IconDownload class="size-4" /> .json (réimportable)
			</Button>
			<Button variant="outline" onclick={() => window.print()}>
				<IconPrinter class="size-4" /> Imprimer
			</Button>
		</div>
		<Separator />
		<div>
			<p class="mb-2 text-xs font-semibold text-muted-foreground uppercase">Aperçu Markdown</p>
			<ScrollArea class="h-96 rounded-md border bg-muted/40 p-3">
				<pre class="whitespace-pre-wrap text-xs">{md}</pre>
			</ScrollArea>
		</div>
	</CardContent>
</Card>
