<script lang="ts">
	import type { Activite, Sequence } from '$lib/types';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '$lib/components/ui/table';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { typeABCInfo } from '$lib/data/types-abc';
	import { modaliteLabel } from '$lib/data/modalites-presence';
	import { IconPlus, IconPencil, IconTrash, IconArrowUp, IconArrowDown } from '@tabler/icons-svelte';
	import DialogActivite from './DialogActivite.svelte';

	let { seq }: { seq: Sequence } = $props();

	let open = $state(false);
	let edition = $state<Activite | null>(null);
	let seanceCible = $state(1);

	function ajouter(s: number): void {
		edition = null;
		seanceCible = s;
		open = true;
	}

	function modifier(a: Activite): void {
		edition = a;
		seanceCible = a.seance;
		open = true;
	}

	function supprimer(a: Activite): void {
		const i = seq.activites.indexOf(a);
		if (i !== -1) seq.activites.splice(i, 1);
	}

	function deplacer(a: Activite, delta: number): void {
		const meme = seq.activites.filter((x) => x.seance === a.seance).sort((x, y) => x.ordre - y.ordre);
		const i = meme.indexOf(a);
		const j = i + delta;
		if (i === -1 || j < 0 || j >= meme.length) return;
		const tmp = meme[i].ordre;
		meme[i].ordre = meme[j].ordre;
		meme[j].ordre = tmp;
	}

	function dureeSeance(s: number): number {
		return seq.activites.filter((a) => a.seance === s).reduce((t, a) => t + a.dureeMin, 0);
	}

	function activitesSeance(s: number): Activite[] {
		return seq.activites.filter((a) => a.seance === s).sort((a, b) => a.ordre - b.ordre);
	}
</script>

{#each Array.from({ length: seq.cadrage.nbSeances }, (_, i) => i + 1) as s}
	<Card class="mb-4">
		<CardHeader class="flex-row items-center justify-between gap-2">
			<CardTitle class="flex items-center gap-2 text-lg">
				Séance {s}
				<Badge variant="outline">{dureeSeance(s)} min</Badge>
			</CardTitle>
			<Button size="sm" variant="outline" onclick={() => ajouter(s)}>
				<IconPlus class="size-4" /> Ajouter une activité
			</Button>
		</CardHeader>
		<CardContent>
			{#if activitesSeance(s).length === 0}
				<p class="text-sm text-muted-foreground">Aucune activité pour cette séance.</p>
			{:else}
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead class="w-10">#</TableHead>
							<TableHead>Activité</TableHead>
							<TableHead>Type ABC LD</TableHead>
							<TableHead>Modalité</TableHead>
							<TableHead>Outil</TableHead>
							<TableHead class="text-right">Durée</TableHead>
							<TableHead class="w-28">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{#each activitesSeance(s) as a (a.id)}
							<TableRow>
								<TableCell class="text-muted-foreground">{a.ordre}</TableCell>
								<TableCell>
									<div class="font-medium">{a.titre}</div>
									{#if a.description}
										<div class="text-xs text-muted-foreground">{a.description}</div>
									{/if}
								</TableCell>
								<TableCell>
									<Badge class="border {typeABCInfo(a.typeABC).badgeClass}">
										{typeABCInfo(a.typeABC).label}
									</Badge>
								</TableCell>
								<TableCell>
									<Badge variant="outline">{modaliteLabel(a.modalitePresence)}</Badge>
								</TableCell>
								<TableCell class="text-sm text-muted-foreground">{a.outil ?? '—'}</TableCell>
								<TableCell class="text-right">{a.dureeMin} min</TableCell>
								<TableCell>
									<div class="flex gap-1">
										<Button size="icon" variant="ghost" aria-label="Monter" onclick={() => deplacer(a, -1)}>
											<IconArrowUp class="size-4" />
										</Button>
										<Button size="icon" variant="ghost" aria-label="Descendre" onclick={() => deplacer(a, 1)}>
											<IconArrowDown class="size-4" />
										</Button>
										<Button size="icon" variant="ghost" aria-label="Modifier" onclick={() => modifier(a)}>
											<IconPencil class="size-4" />
										</Button>
										<Button size="icon" variant="ghost" aria-label="Supprimer" onclick={() => supprimer(a)}>
											<IconTrash class="size-4" />
										</Button>
									</div>
								</TableCell>
							</TableRow>
						{/each}
					</TableBody>
				</Table>
			{/if}
		</CardContent>
	</Card>
{/each}

<DialogActivite {seq} seance={seanceCible} activite={edition} bind:open />
