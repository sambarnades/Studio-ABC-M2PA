<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Alert, AlertDescription, AlertTitle } from '$lib/components/ui/alert';
	import { IconPlus, IconTrash, IconCopy, IconFileImport, IconArrowRight } from '@tabler/icons-svelte';
	import {
		sequences,
		ajouterSequence,
		dupliquerSequence,
		supprimerSequence,
		importerSequence
	} from '$lib/stores/sequences.svelte';
	import { synthese } from '$lib/compteurs';

	let erreurImport = $state('');
	let inputFichier: HTMLInputElement;

	function nouvelle(): void {
		const seq = ajouterSequence();
		goto(`/sequence/${seq.id}`);
	}

	function importer(event: Event): void {
		const input = event.target as HTMLInputElement;
		const fichier = input.files?.[0];
		if (!fichier) return;
		erreurImport = '';
		const reader = new FileReader();
		reader.onload = () => {
			const seq = importerSequence(String(reader.result));
			if (seq) {
				goto(`/sequence/${seq.id}`);
			} else {
				erreurImport = 'Fichier JSON invalide : aucune séquence importée.';
			}
			input.value = '';
		};
		reader.readAsText(fichier);
	}
</script>

<div class="flex items-center justify-between gap-4">
	<div>
		<h1 class="font-heading text-2xl font-semibold tracking-tight">Vos séquences de formation</h1>
		<p class="text-sm text-muted-foreground">
			Concevez une scénarisation multi-séances en ABC Learning Design, cadrée selon la M2PA.
		</p>
	</div>
	<div class="flex gap-2">
		<Button variant="outline" onclick={() => inputFichier.click()}>
			<IconFileImport class="size-4" /> Importer JSON
		</Button>
		<Button onclick={nouvelle}><IconPlus class="size-4" /> Nouvelle séquence</Button>
		<input
			bind:this={inputFichier}
			type="file"
			accept="application/json,.json"
			class="hidden"
			onchange={importer}
		/>
	</div>
</div>

{#if erreurImport}
	<Alert variant="destructive" class="mt-4">
		<AlertTitle>Import impossible</AlertTitle>
		<AlertDescription>{erreurImport}</AlertDescription>
	</Alert>
{/if}

{#if sequences.length === 0}
	<Card class="mt-8">
		<CardHeader>
			<CardTitle>Aucune séquence pour l'instant</CardTitle>
			<CardDescription>
				Créez une première séquence : cadrage M2PA, puis storyboard ABC LD étiqueté sur plusieurs séances.
			</CardDescription>
		</CardHeader>
		<CardContent>
			<Button onclick={nouvelle}><IconPlus class="size-4" /> Nouvelle séquence</Button>
		</CardContent>
	</Card>
{:else}
	<div class="mt-6 grid gap-4 md:grid-cols-2">
		{#each sequences as seq (seq.id)}
			{@const s = synthese(seq.activites, seq.cadrage)}
			<Card>
				<CardHeader>
					<CardTitle class="flex items-center justify-between gap-2">
						<a href={`/sequence/${seq.id}`} class="hover:underline">
							{seq.cadrage.titre || 'Séquence sans titre'}
						</a>
						<Badge variant="secondary">{seq.cadrage.nbSeances} séance{seq.cadrage.nbSeances > 1 ? 's' : ''}</Badge>
					</CardTitle>
					<CardDescription>
						{seq.cadrage.niveau || 'Niveau non renseigné'}{#if seq.cadrage.discipline}
							· {seq.cadrage.discipline}{/if}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div class="mb-3 flex flex-wrap gap-1">
						<Badge variant="outline">{seq.activites.length} activité{seq.activites.length > 1 ? 's' : ''}</Badge>
						<Badge variant="outline">{s.totalMin} min scénarisées</Badge>
					</div>
					<div class="flex flex-wrap gap-2">
						<Button size="sm" onclick={() => goto(`/sequence/${seq.id}`)}>
							Ouvrir <IconArrowRight class="size-4" />
						</Button>
						<Button size="sm" variant="outline" onclick={() => dupliquerSequence(seq.id)}>
							<IconCopy class="size-4" /> Dupliquer
						</Button>
						<Button
							size="sm"
							variant="outline"
							onclick={() => {
								if (confirm('Supprimer définitivement cette séquence ?')) supprimerSequence(seq.id);
							}}
						>
							<IconTrash class="size-4" /> Supprimer
						</Button>
					</div>
				</CardContent>
			</Card>
		{/each}
	</div>
{/if}
