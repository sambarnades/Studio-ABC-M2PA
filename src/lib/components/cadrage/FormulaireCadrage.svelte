<script lang="ts">
	import type { Sequence, Domaine, ModalitePresence } from '$lib/types';
	import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import * as Select from '$lib/components/ui/select';
	import { Separator } from '$lib/components/ui/separator';
	import { Badge } from '$lib/components/ui/badge';
	import { DOMAINES, OBSTACLES_REPERES } from '$lib/data/obstacles-n3';
	import { MODALITES_PRESENCE } from '$lib/data/modalites-presence';
	import { BESOINS_N1 } from '$lib/data/besoins-n1';
	import { IconPlus, IconTrash } from '@tabler/icons-svelte';

	let { seq }: { seq: Sequence } = $props();

	let repere = $state('');

	function ajouterObstacle(): void {
		if (!repere) return;
		const r = OBSTACLES_REPERES.find((o) => o.label === repere);
		seq.cadrage.obstacles.push({
			id: crypto.randomUUID(),
			domaine: r?.domaines[0] ?? 'cognitif',
			formulation: r?.label ?? repere,
			manifestation: ''
		});
		repere = '';
	}

	function toggleModalite(id: ModalitePresence, checked: boolean): void {
		const set = new Set(seq.cadrage.modalitesPresence);
		if (checked) set.add(id);
		else set.delete(id);
		seq.cadrage.modalitesPresence = [...set];
	}

	function domaineLabel(d: Domaine): string {
		return DOMAINES.find((x) => x.id === d)?.label ?? d;
	}
</script>

<div class="grid gap-4">
	<Card>
		<CardHeader>
			<CardTitle>Informations de la séquence</CardTitle>
			<CardDescription>Le contexte de la formation à scénariser.</CardDescription>
		</CardHeader>
		<CardContent class="grid gap-4 md:grid-cols-2">
			<div class="grid gap-2 md:col-span-2">
				<Label for="titre">Titre de la séquence</Label>
				<Input id="titre" bind:value={seq.cadrage.titre} placeholder="Ex. : Initiation à la photosynthèse" />
			</div>
			<div class="grid gap-2">
				<Label for="niveau">Niveau</Label>
				<Input id="niveau" bind:value={seq.cadrage.niveau} placeholder="Ex. : 5e, BTS 1re année…" />
			</div>
			<div class="grid gap-2">
				<Label for="discipline">Discipline</Label>
				<Input id="discipline" bind:value={seq.cadrage.discipline} placeholder="Ex. : SVT, français…" />
			</div>
			<div class="grid gap-2">
				<Label for="nbSeances">Nombre de séances</Label>
				<Input
					id="nbSeances"
					type="number"
					min="1"
					max="30"
					value={seq.cadrage.nbSeances}
					oninput={(e) => {
						const v = Number(e.currentTarget.value);
						seq.cadrage.nbSeances = Number.isFinite(v) && v >= 1 ? Math.floor(v) : 1;
					}}
				/>
			</div>
			<div class="grid gap-2">
				<Label for="dureeTotale">Durée totale prévue (min, facultatif)</Label>
				<Input
					id="dureeTotale"
					type="number"
					min="0"
					value={seq.cadrage.dureeTotaleMin ?? ''}
					oninput={(e) => {
						const v = e.currentTarget.value;
						seq.cadrage.dureeTotaleMin = v === '' ? null : Math.max(0, Number(v));
					}}
				/>
			</div>
			<div class="grid gap-2">
				<Label for="effectif">Effectif (facultatif)</Label>
				<Input
					id="effectif"
					type="number"
					min="0"
					value={seq.cadrage.effectif ?? ''}
					oninput={(e) => {
						const v = e.currentTarget.value;
						seq.cadrage.effectif = v === '' ? null : Math.max(0, Number(v));
					}}
				/>
			</div>
		</CardContent>
	</Card>

	<Card>
		<CardHeader>
			<CardTitle>Objectifs et activité support</CardTitle>
			<CardDescription>
				L'objectif pédagogique (ce que vous organisez) et l'objectif d'apprentissage (ce que l'apprenant sera
				capable de faire) ne se confondent pas. Les critères de réussite restent communs à tous.
			</CardDescription>
		</CardHeader>
		<CardContent class="grid gap-4">
			<div class="grid gap-2">
				<Label for="objPed">Objectif pédagogique</Label>
				<Textarea
					id="objPed"
					bind:value={seq.cadrage.objectifPedagogique}
					placeholder="« Permettre aux apprenants de… »"
					rows={2}
				/>
			</div>
			<div class="grid gap-2">
				<Label for="objApp">Objectif d'apprentissage</Label>
				<Textarea
					id="objApp"
					bind:value={seq.cadrage.objectifApprentissage}
					placeholder="« À l'issue de la séquence, l'apprenant sera capable de… »"
					rows={2}
				/>
			</div>
			<div class="grid gap-2">
				<Label for="actSupport">Activité support</Label>
				<Textarea
					id="actSupport"
					bind:value={seq.cadrage.activiteSupport}
					placeholder="Situation-problème, corpus, texte, oral, manipulation…"
					rows={2}
				/>
			</div>
			<div class="grid gap-4 md:grid-cols-2">
				<div class="grid gap-2">
					<Label for="prereq">Prérequis (un par ligne)</Label>
					<Textarea id="prereq" bind:value={seq.cadrage.prerequis} rows={3} />
				</div>
				<div class="grid gap-2">
					<Label for="criteres">Critères de réussite (un par ligne)</Label>
					<Textarea id="criteres" bind:value={seq.cadrage.criteresReussite} rows={3} />
				</div>
			</div>
		</CardContent>
	</Card>

	<Card>
		<CardHeader>
			<CardTitle>Obstacles potentiels — à anticiper dès la conception</CardTitle>
			<CardDescription>
				Identifiez ce qui peut faire obstacle à l'apprentissage (notion, tâche, support, langage, procédure,
				traitement de l'information), à partir du catalogue des obstacles transversaux M2PA. Un obstacle n'est
				jamais une caractéristique figée de l'apprenant.
			</CardDescription>
		</CardHeader>
		<CardContent class="grid gap-4">
			<div class="flex flex-wrap items-end gap-2">
				<div class="grid w-full max-w-sm gap-2">
					<Label for="repere">Obstacle repère (catalogue M2PA)</Label>
					<Select.Root type="single" bind:value={repere}>
						<Select.Trigger id="repere" class="w-full">
							<Select.Value placeholder="Choisir un obstacle repère…" />
						</Select.Trigger>
						<Select.Content>
							{#each OBSTACLES_REPERES as o}
								<Select.Item value={o.label}>{o.label}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
				</div>
				<Button variant="outline" onclick={ajouterObstacle} disabled={!repere}>
					<IconPlus class="size-4" /> Ajouter
				</Button>
			</div>

			{#if seq.cadrage.obstacles.length === 0}
				<p class="text-sm text-muted-foreground">Aucun obstacle repéré pour l'instant.</p>
			{:else}
				<div class="grid gap-3">
					{#each seq.cadrage.obstacles as ob, i (ob.id)}
						<div class="grid gap-2 rounded-md border p-3 md:grid-cols-[180px_1fr_1fr_auto] md:items-center">
							<Select.Root type="single" value={ob.domaine} onValueChange={(v) => (ob.domaine = v as Domaine)}>
								<Select.Trigger class="w-full">
									<Select.Value />
								</Select.Trigger>
								<Select.Content>
									{#each DOMAINES as d}
										<Select.Item value={d.id}>{d.label}</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
							<Input bind:value={ob.formulation} placeholder="Formulation de l'obstacle" aria-label="Obstacle" />
							<Input bind:value={ob.manifestation} placeholder="Manifestation dans la tâche" aria-label="Manifestation" />
							<Button
								variant="outline"
								size="icon"
								aria-label="Supprimer cet obstacle"
								onclick={() => seq.cadrage.obstacles.splice(i, 1)}
							>
								<IconTrash class="size-4" />
							</Button>
						</div>
					{/each}
				</div>
			{/if}
		</CardContent>
	</Card>

	<Card>
		<CardHeader>
			<CardTitle>Contexte et variables</CardTitle>
			<CardDescription>Contraintes de présence, outils disponibles, organisation.</CardDescription>
		</CardHeader>
		<CardContent class="grid gap-4">
			<div class="grid gap-2">
				<Label>Modalités de présence prévues</Label>
				<div class="flex flex-wrap gap-4">
					{#each MODALITES_PRESENCE as m}
						<label class="flex items-center gap-2 text-sm">
							<Checkbox
								checked={seq.cadrage.modalitesPresence.includes(m.id)}
								onCheckedChange={(v) => toggleModalite(m.id, v === true)}
							/>
							{m.label}
						</label>
					{/each}
				</div>
			</div>
			<div class="grid gap-2">
				<Label>Plateforme numérique</Label>
				<div class="flex flex-wrap gap-4">
					<label class="flex items-center gap-2 text-sm">
						<Checkbox checked disabled /> Moodle (ELEA) — V1
					</label>
					<label class="flex items-center gap-2 text-sm text-muted-foreground">
						<Checkbox checked={false} disabled /> Google Classroom — roadmap
					</label>
					<label class="flex items-center gap-2 text-sm text-muted-foreground">
						<Checkbox checked={false} disabled /> Apple Classe — roadmap
					</label>
				</div>
			</div>
			<div class="grid gap-2">
				<Label for="contraintes">Autres contraintes (matériel, salle, organisation…)</Label>
				<Textarea id="contraintes" bind:value={seq.cadrage.contraintes} rows={3} />
			</div>
		</CardContent>
	</Card>

	<Card>
		<CardHeader>
			<CardTitle>Niveau 1 M2PA — les 8 besoins partagés par tous les apprenants</CardTitle>
			<CardDescription>
				Toujours présents dans la scénarisation générale (niveau 1). La sécurisation est le méta-besoin qui
				prime sur tous les autres.
			</CardDescription>
		</CardHeader>
		<CardContent>
			<div class="flex flex-wrap gap-1">
				{#each BESOINS_N1 as b}
					<Badge variant="secondary" title={b.pistes}>{b.label}</Badge>
				{/each}
			</div>
			<Separator class="my-3" />
			<ul class="grid gap-1 text-sm text-muted-foreground md:grid-cols-2">
				{#each BESOINS_N1 as b}
					<li><strong>{b.label}</strong> ({b.categorie.toLowerCase()}) : {b.pistes}</li>
				{/each}
			</ul>
		</CardContent>
	</Card>
</div>
