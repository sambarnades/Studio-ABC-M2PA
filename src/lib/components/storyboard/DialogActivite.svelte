<script lang="ts">
	import type { Activite, ModalitePresence, Sequence, TypeABC } from '$lib/types';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Select from '$lib/components/ui/select';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Label } from '$lib/components/ui/label';
	import { TYPES_ABC, typeABCInfo } from '$lib/data/types-abc';
	import { MODALITES_PRESENCE } from '$lib/data/modalites-presence';
	import { CATEGORIE_LABEL, OUTILS_MOODLE, type CategorieOutil } from '$lib/data/outils-moodle';

	const AUCUN = '__aucun__';

	let {
		seq,
		seance,
		activite,
		open = $bindable(false)
	}: {
		seq: Sequence;
		seance: number;
		activite: Activite | null;
		open: boolean;
	} = $props();

	let form = $state({
		titre: '',
		description: '',
		typeABC: 'acquisition' as TypeABC,
		modalitePresence: 'presentiel' as ModalitePresence,
		outil: AUCUN,
		dureeMin: 15
	});

	$effect(() => {
		if (open) {
			form = activite
				? {
						titre: activite.titre,
						description: activite.description,
						typeABC: activite.typeABC,
						modalitePresence: activite.modalitePresence,
						outil: activite.outil ?? AUCUN,
						dureeMin: activite.dureeMin
					}
				: {
						titre: '',
						description: '',
						typeABC: 'acquisition',
						modalitePresence: 'presentiel',
						outil: AUCUN,
						dureeMin: 15
					};
		}
	});

	let outils = $derived(OUTILS_MOODLE[form.typeABC]);
	let categories = $derived([...new Set(outils.map((o) => o.categorie))] as CategorieOutil[]);

	$effect(() => {
		if (form.outil !== AUCUN && !OUTILS_MOODLE[form.typeABC].some((o) => o.nom === form.outil)) {
			form.outil = AUCUN;
		}
	});

	function enregistrer(): void {
		const outil = form.outil === AUCUN ? null : form.outil;
		if (activite) {
			activite.titre = form.titre || 'Activité sans titre';
			activite.description = form.description;
			activite.typeABC = form.typeABC;
			activite.modalitePresence = form.modalitePresence;
			activite.outil = outil;
			activite.dureeMin = form.dureeMin;
		} else {
			const ordre =
				Math.max(0, ...seq.activites.filter((a) => a.seance === seance).map((a) => a.ordre)) + 1;
			seq.activites.push({
				id: crypto.randomUUID(),
				seance,
				ordre,
				titre: form.titre || 'Nouvelle activité',
				description: form.description,
				typeABC: form.typeABC,
				modalitePresence: form.modalitePresence,
				outil,
				dureeMin: form.dureeMin
			});
		}
		open = false;
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="max-w-lg">
		<Dialog.Header>
			<Dialog.Title>{activite ? 'Modifier l\u2019activité' : 'Nouvelle activité'} · séance {seance}</Dialog.Title>
			<Dialog.Description>
				Étiquetez l'activité : type ABC LD, modalité de présence, outil numérique, durée.
			</Dialog.Description>
		</Dialog.Header>

		<div class="grid gap-4">
			<div class="grid gap-2">
				<Label for="a-titre">Titre de l'activité</Label>
				<Input id="a-titre" bind:value={form.titre} placeholder="Ex. : Visionnage d'une capsule vidéo" />
			</div>
			<div class="grid gap-2">
				<Label for="a-desc">Description (facultatif)</Label>
				<Textarea id="a-desc" bind:value={form.description} rows={2} />
			</div>
			<div class="grid gap-4 md:grid-cols-2">
				<div class="grid gap-2">
					<Label for="a-type">Type ABC LD</Label>
					<Select.Root type="single" bind:value={form.typeABC}>
						<Select.Trigger id="a-type" class="w-full">
							<Select.Value />
						</Select.Trigger>
						<Select.Content>
							{#each TYPES_ABC as t}
								<Select.Item value={t.id}>{t.label}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
					<p class="text-xs text-muted-foreground">{typeABCInfo(form.typeABC).description}</p>
				</div>
				<div class="grid gap-2">
					<Label for="a-mod">Modalité de présence</Label>
					<Select.Root type="single" bind:value={form.modalitePresence}>
						<Select.Trigger id="a-mod" class="w-full">
							<Select.Value />
						</Select.Trigger>
						<Select.Content>
							{#each MODALITES_PRESENCE as m}
								<Select.Item value={m.id}>{m.label}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
				</div>
			</div>
			<div class="grid gap-2">
				<Label for="a-outil">Outil numérique (Moodle / H5P / externe)</Label>
				<Select.Root type="single" bind:value={form.outil}>
					<Select.Trigger id="a-outil" class="w-full">
						<Select.Value placeholder="Choisir un outil…" />
					</Select.Trigger>
					<Select.Content>
						<Select.Item value={AUCUN}>Aucun outil</Select.Item>
						{#each categories as cat}
							<Select.Group>
								<Select.GroupHeading>{CATEGORIE_LABEL[cat]}</Select.GroupHeading>
								{#each outils.filter((o) => o.categorie === cat) as o}
									<Select.Item value={o.nom}>{o.nom}</Select.Item>
								{/each}
							</Select.Group>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>
			<div class="grid gap-2 md:w-40">
				<Label for="a-duree">Durée (min)</Label>
				<Input
					id="a-duree"
					type="number"
					min="0"
					step="5"
					value={form.dureeMin}
					oninput={(e) => {
						const v = Number(e.currentTarget.value);
						form.dureeMin = Number.isFinite(v) && v >= 0 ? Math.round(v) : 0;
					}}
				/>
			</div>
		</div>

		<Dialog.Footer>
			<Button variant="outline" onclick={() => (open = false)}>Annuler</Button>
			<Button onclick={enregistrer}>Enregistrer</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
